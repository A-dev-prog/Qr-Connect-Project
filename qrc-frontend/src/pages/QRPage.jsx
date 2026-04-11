import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MobileNav from "../components/MobileNav";
import { generateQR } from "../services/qrService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function QRPage() {

  const navigate = useNavigate();

  const [qrImage, setQrImage] = useState(null);

  useEffect(() => {

    const loadQR = async () => {
      try {

        const image = await generateQR();
        setQrImage(image);

      } catch (error) {
        console.error("QR generation failed", error);
        toast.error("Failed to generate QR code");
      }
    };

    loadQR();

  }, []);

  return (
    <div className="flex bg-gradient-to-br from-gray-950 via-gray-900 to-black min-h-screen text-white">
      
      <Sidebar />

      <div className="flex-1 flex flex-col items-center">
        <Topbar />

        <div className="p-10">

          <div className="bg-gray-900/60 border border-gray-800 p-10 rounded-xl">

            <div className="w-60 h-60 bg-gray-800 flex items-center justify-center">

              {qrImage ? (
                <img
                  src={qrImage}
                  alt="QR Code"
                  className="w-full h-full object-contain"
                />
              ) : (
                <p className="text-gray-400">Generating QR...</p>
              )}

              

            </div>

          </div>

        </div>

        <button
  onClick={() => navigate("/scan")}
  className="mt-4 w-40 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
>
  Scan QR
</button>

      </div>

      <MobileNav />
    </div>
  );
}

export default QRPage;