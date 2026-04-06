import { NavLink } from "react-router-dom";
import {
  MonitorPlay,
  User,
  QrCode,
  Bell,
  MessageSquare,
  UserRoundCheck,
  ScanQrCode
} from "lucide-react";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-950 border-r border-gray-800 p-6 hidden md:flex flex-col">
      <h1 className="text-xl font-bold text-white mb-10">QR Connect</h1>

      <nav className="flex flex-col gap-2">
        {/* Profile */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
            ${
              isActive
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`
          }
        >
          <User size={20} />
          Profile
        </NavLink>

        {/* QR */}
        <NavLink
          to="/qr"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
            ${
              isActive
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`
          }
        >
          <QrCode size={20} />
          My QR
        </NavLink>


        {/* Scanner */}
        <NavLink
          to="/scan"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
            ${
              isActive
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`
          }
        >
          <ScanQrCode size={20} strokeWidth={2.2} absoluteStrokeWidth />
          Scan
        </NavLink>

        {/* Feed */}
        <NavLink
          to="/feed"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
            ${
              isActive
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`
          }
        >
          <MonitorPlay size={20} />
          Feed
        </NavLink>

        {/* Requests */}
        <NavLink
          to="/requests"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
            ${
              isActive
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`
          }
        >
          <Bell size={20} />
          Requests
        </NavLink>

        {/* My Connections */}
        <NavLink
          to="/connections"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
            ${
              isActive
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`
          }
        >
          <UserRoundCheck size={20} />
          Connections
        </NavLink>

        {/* Chat */}
        <NavLink
          to="/chat/:id"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
            ${
              isActive
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`
          }
        >
          <MessageSquare size={20} />
          Chat
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
