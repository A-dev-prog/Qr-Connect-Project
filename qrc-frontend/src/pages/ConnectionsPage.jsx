import { useEffect, useState, us } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="p-6 w-full max-w-4xl">
  
  <h2 className="text-2xl font-bold mb-6 text-white">
    My Connections
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    
    {connections.map((c) => (
      <div
        key={c.id}
        onClick={() => navigate(`/user/${c.id}`)}
        className="cursor-pointer group relative p-5 rounded-2xl 
        bg-white/10 backdrop-blur-xl border border-white/20
        hover:scale-105 hover:bg-white/20 transition duration-300 shadow-lg"
      >

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition"></div>

        {/* Content */}
        <div className="relative z-10">
          
          <h3 className="text-lg font-semibold text-white">
            {c.name}
          </h3>

          <p className="text-gray-400 text-sm mt-1">
            {c.email}
          </p>

          {/* Status badge */}
          <span className="inline-block mt-3 px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
            Connected
          </span>

        </div>
      </div>
    ))}

  </div>
</div>
  );
};

export default ConnectionsPage;