import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MobileNav from "../components/MobileNav";
import { getMyConnections } from "../services/connectionService";

const ConnectionsPage = () => {
  const [connections, setConnections] = useState([]);
  const navigate = useNavigate();

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
  <div className="flex bg-gradient-to-br from-gray-950 via-gray-900 to-black min-h-screen text-white">
    
    {/* ✅ SIDEBAR (fixed feel) */}
    <Sidebar />

    {/* MAIN CONTENT */}
    <div className="flex-1 flex flex-col overflow-hidden">
      
      <Topbar />

      {/* 🔥 CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-6">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">My Connections</h2>
          <p className="text-gray-400 text-sm">
            Manage and chat with your network
          </p>
        </div>

        {/* EMPTY STATE */}
        {connections.length === 0 ? (
          <div className="text-center mt-20 text-gray-400">
            <p>No connections yet 🤝</p>
          </div>
        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {connections.map((c) => (
              <div
                key={c.id}
                onClick={() => navigate(`/profile/${c.id}`)}
                className="cursor-pointer group relative p-5 rounded-2xl 
                bg-white/5 backdrop-blur-xl border border-white/10
                hover:scale-[1.03] hover:bg-white/10 transition duration-300 shadow-lg"
              >

                {/* 🔥 Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition"></div>

                {/* CONTENT */}
                <div className="relative z-10 flex flex-col gap-4">

                  {/* TOP */}
                  <div className="flex items-center gap-4">
                    <img
                      src={c.profileImageUrl || "https://via.placeholder.com/50"}
                      alt="profile"
                      className="w-14 h-14 rounded-full object-cover border border-gray-700"
                    />

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">
                        {c.name}
                      </h3>

                      <p className="text-gray-400 text-sm">
                        {c.profession || "No profession"}
                      </p>
                    </div>

                    <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
                      Connected
                    </span>
                  </div>

                  {/* EMAIL */}
                  {c.email && (
                    <p className="text-gray-500 text-xs">
                      {c.email}
                    </p>
                  )}

                  {/* 🔥 ACTION BUTTON */}
                  <div className="flex justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/chat/${c.id}`);
                      }}
                      className="px-4 py-1 text-sm rounded-full bg-blue-500/80 hover:bg-blue-600 transition"
                    >
                      Message 💬
                    </button>
                  </div>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>

    {/* ✅ MOBILE NAV */}
    <MobileNav />
  </div>
);
};

export default ConnectionsPage;