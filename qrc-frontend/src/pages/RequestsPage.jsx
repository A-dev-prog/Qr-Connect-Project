import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MobileNav from "../components/MobileNav";
import { useEffect, useState } from "react";
import {
  getPendingRequests,
  respondToRequest,
} from "../services/connectionService";

function RequestsPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getPendingRequests();

        console.log("Pending Requests:", data); // ✅ debug

        // ✅ ensure requests is always an array
        setRequests(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setRequests([]); // ✅ fallback
      }
    };

    fetchRequests();
  }, []);

  const handleRespond = async (id, accept) => {
    try {
      await respondToRequest(id, accept);

      // ✅ remove request from UI after action
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-gray-950 via-gray-900 to-black min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-bold">Connection Requests</h2>

          {/* ✅ empty state */}
          {Array.isArray(requests) &&
  requests.map((req) => {
    console.log("REQ OBJECT:", req);

    const senderName =
      req?.senderName ||
      req?.sender?.name ||
      req?.sender?.fullName ||
      "Unknown User";

    return (
      <div
        key={req?.id}
        className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:border-blue-500 transition"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-800"></div>

          <div>
            <h3 className="font-semibold">{senderName}</h3>

            <p className="text-gray-400 text-sm">
              Wants to connect with you
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => handleRespond(req.id, true)}
            className="px-5 py-2 border border-emerald-500 text-emerald-400 rounded-lg hover:bg-emerald-500 hover:text-white transition"
          >
            Accept
          </button>

          <button
            onClick={() => handleRespond(req.id, false)}
            className="px-5 py-2 border border-red-500 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition"
          >
            Reject
          </button>
        </div>
      </div>
    );
  })}
        </div>
      </div>

      <MobileNav />
    </div>
  );
}

export default RequestsPage;
