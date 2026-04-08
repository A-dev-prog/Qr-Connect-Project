import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MobileNav from "../components/MobileNav";

import { scanUserQR } from "../services/qrService";
import { sendConnectionRequest } from "../services/connectionService";

const QRScanner = () => {
  const [profile, setProfile] = useState(null);
  const [scanning, setScanning] = useState(true);

  const navigate = useNavigate();

  const qrRef = useRef(null);
  const scannedRef = useRef(false);
  const isScannerRunning = useRef(false); // ✅ NEW

  const loggedInUserId = localStorage.getItem("userId");

  useEffect(() => {
    if (!scanning) return;

    const qrCode = new Html5Qrcode("reader");
    qrRef.current = qrCode;

    qrCode
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },

        async (decodedText) => {
          if (scannedRef.current) return;
          scannedRef.current = true;

          console.log("Scanned:", decodedText);

          let userId;

          try {
            if (decodedText.startsWith("http")) {
              const url = new URL(decodedText);
              const parts = url.pathname.split("/").filter(Boolean);
              userId = parts[parts.length - 1];
            } else if (decodedText.includes(":")) {
              userId = decodedText.split(":")[1];
            } else {
              userId = decodedText;
            }
          } catch (e) {
            console.error("QR parse error:", e);
          }

          console.log("Final User ID:", userId);

          if (userId === loggedInUserId) {
            alert("You can't scan your own QR ❌");
            scannedRef.current = false;
            return;
          }

          try {
            const data = await scanUserQR(userId);
            console.log("Scan API Response:", data);

            // stop scanner first
if (isScannerRunning.current) {
  await qrCode.stop();
  isScannerRunning.current = false;
}

// 🔥 redirect after scan
navigate(`/profile/${data.id || userId}`, {
  state: { profile: data },
});

            // ✅ SAFE STOP
            if (isScannerRunning.current) {
              await qrCode.stop();
              isScannerRunning.current = false;
            }

          } catch (err) {
            console.error("Scan failed", err);
            scannedRef.current = false;
          }
        }
      )
      .then(() => {
        isScannerRunning.current = true; // ✅ mark running
      })
      .catch((err) => console.error(err));

    return () => {
      // ✅ SAFE CLEANUP
      if (qrRef.current && isScannerRunning.current) {
        qrRef.current.stop().catch(() => {});
        isScannerRunning.current = false;
      }
    };
  }, [scanning]);

  const handleSendRequest = async () => {
    try {
      await sendConnectionRequest(profile.id);
      alert("Request Sent ✅");
    } catch (err) {
      console.error(err);
    }
  };

  const handleRescan = () => {
    setProfile(null);
    scannedRef.current = false;
    setScanning(true);
  };

  return (
  <div className="flex h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">

    {/* ✅ Sidebar */}
    <Sidebar />

    <div className="flex-1 flex flex-col overflow-hidden">

      {/* ✅ Topbar */}
      <Topbar />

      <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center">

        <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6">

          <h2 className="text-2xl font-bold text-center mb-4">
            Scan QR Code
          </h2>

          {scanning && (
            <div className="rounded-xl overflow-hidden border border-white/20">
              <div id="reader" className="w-full"></div>
            </div>
          )}

          {profile && (
            <div className="mt-6 p-4 rounded-xl bg-white/10 border border-white/20">
              <h3 className="text-xl font-semibold">{profile.name}</h3>
              <p className="text-gray-300 text-sm">{profile.email}</p>

              {profile.connectionStatus && (
                <p className="text-sm mt-2 text-blue-400">
                  Status: {profile.connectionStatus}
                </p>
              )}

              <button
                onClick={handleSendRequest}
                className="mt-4 w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition"
              >
                Send Request
              </button>
            </div>
          )}

          {!scanning && (
            <button
              onClick={handleRescan}
              className="mt-4 w-full py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
            >
              Scan Again
            </button>
          )}

        </div>

      </div>
    </div>

    {/* ✅ Mobile Nav */}
    <MobileNav />

  </div>
);
};

export default QRScanner;