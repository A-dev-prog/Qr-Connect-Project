import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MobileNav from "../components/MobileNav";
import DemoTour from "../animation/DemoTour" // ✅ import demo
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyConnections } from "../services/connectionService";

function Dashboard() {
  const navigate = useNavigate();

  const [showDemo, setShowDemo] = useState(false); // ✅ demo state

  const user = {
    name: "User",
    profileCompleted: false,
  };

  const recentActivity = [
    "You connected with Rahul 🤝",
    "You received 2 new requests 📩",
    "New message from Aman 💬",
  ];

  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const loadConnections = async () => {
      try {
        const data = await getMyConnections();
        setConnections(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadConnections();
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden">
      
      {/* 🔥 DEMO OVERLAY */}
      {showDemo && <DemoTour onClose={() => setShowDemo(false)} />}

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* TOPBAR */}
        <Topbar />

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8">

          {/* 🔥 WELCOME */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">
                Welcome back, {user.name} 👋
              </h2>
              <p className="text-gray-400">
                Here's what's happening today
              </p>
            </div>

            {/* 🎬 DEMO BUTTON */}
            <button
  onClick={() => setShowDemo(true)}
  className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition"
>
  🎬 Watch Demo
</button>
          </div>

          {/* QUICK ACTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div
              onClick={() => navigate("/scan")}
              className="cursor-pointer bg-gray-900/60 backdrop-blur-lg border border-gray-800 p-6 rounded-xl hover:scale-105 transition"
            >
              <h3 className="text-lg font-semibold">📷 Scan QR</h3>
              <p className="text-gray-400 mt-2">
                Connect instantly with others
              </p>
            </div>

            <div
              onClick={() => navigate("/connections")}
              className="cursor-pointer bg-gray-900/60 backdrop-blur-lg border border-gray-800 p-6 rounded-xl hover:scale-105 transition"
            >
              <h3 className="text-lg font-semibold">🤝 My Connections</h3>
              <p className="text-gray-400 mt-2">
                View and manage your network
              </p>
            </div>

            <div
              onClick={() => navigate("/feed")}
              className="cursor-pointer bg-gray-900/60 backdrop-blur-lg border border-gray-800 p-6 rounded-xl hover:scale-105 transition"
            >
              <h3 className="text-lg font-semibold">📰 Explore Feed</h3>
              <p className="text-gray-400 mt-2">
                See latest tech updates
              </p>
            </div>
          </div>

          {/* PROFILE COMPLETION */}
          {!user.profileCompleted && (
            <div className="bg-blue-900/30 border border-blue-800 p-6 rounded-xl flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">
                  Complete your profile 🚀
                </h3>
                <p className="text-gray-400 text-sm">
                  Unlock full features by completing your profile
                </p>
              </div>

              <button
                onClick={() => navigate("/profile")}
                className="bg-blue-600 px-4 py-2 rounded-lg"
              >
                Complete Now
              </button>
            </div>
          )}

          {/* RECENT ACTIVITY */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Recent Activity
            </h3>

            <div className="space-y-3">
              {recentActivity.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-900/60 border border-gray-800 p-4 rounded-lg"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* CONNECTION PREVIEW */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Your Network 👥
            </h3>

            <div className="flex items-center">
              {connections.slice(0, 5).map((c) => {
                const imageUrl =
                  c.profileImageUrl && c.profileImageUrl.trim() !== ""
                    ? c.profileImageUrl.startsWith("http")
                      ? c.profileImageUrl
                      : `http://localhost:8080/${c.profileImageUrl}`
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name || "User")}&background=random`;

                return (
                  <img
                    key={c.id}
                    src={imageUrl}
                    alt="connection"
                    onClick={() => navigate(`/profile/${c.id}`)}
                    className="w-12 h-12 rounded-full object-cover border-2 border-black -ml-2 first:ml-0 cursor-pointer hover:scale-110 transition"
                  />
                );
              })}

              {connections.length > 5 && (
                <span className="ml-3 text-sm text-gray-400">
                  +{connections.length - 5} more
                </span>
              )}

              <button
                onClick={() => navigate("/connections")}
                className="ml-3 text-sm text-blue-400"
              >
                View All →
              </button>
            </div>
          </div>

        </div>
      </div>

      <MobileNav />
    </div>
  );
}

export default Dashboard;