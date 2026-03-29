import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MobileNav from "../components/MobileNav";

function Dashboard() {
  return (
    <div className="flex bg-gradient-to-br from-gray-950 via-gray-900 to-black min-h-screen text-white">
      
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-gray-900/60 backdrop-blur-lg border border-gray-800 p-6 rounded-xl hover:scale-105 transition">
            <h3 className="text-lg font-semibold">Profile Completion</h3>
            <p className="text-gray-400 mt-2">80% Completed</p>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-lg border border-gray-800 p-6 rounded-xl hover:scale-105 transition">
            <h3 className="text-lg font-semibold">QR Scans</h3>
            <p className="text-gray-400 mt-2">120 This Month</p>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-lg border border-gray-800 p-6 rounded-xl hover:scale-105 transition">
            <h3 className="text-lg font-semibold">Requests</h3>
            <p className="text-gray-400 mt-2">5 Pending</p>
          </div>

        </div>
      </div>

      <MobileNav />
    </div>
  );
}

export default Dashboard;