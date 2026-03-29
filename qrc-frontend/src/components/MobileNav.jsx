import { Link, useLocation } from "react-router-dom";

function MobileNav() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-white"
      : "text-gray-500";

  return (
    <div className="fixed bottom-0 left-0 w-full md:hidden bg-gray-950 border-t border-gray-800 px-6 py-3 flex justify-between items-center">

      {/* Home */}
      <Link to="/dashboard" className={`flex flex-col items-center text-xs ${isActive("/dashboard")}`}>
        <span className="text-xl">🏠</span>
        Home
      </Link>

      {/* Feed */}
      <Link to="/feed" className={`flex flex-col items-center text-xs ${isActive("/feed")}`}>
        <span className="text-xl">📰</span>
        Feed
      </Link>

      {/* Center Floating Button */}
      <Link to="/create-post" className="relative -top-6">
        <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-2xl shadow-lg hover:scale-105 transition active:scale-95">
          +
        </div>
      </Link>

      {/* Chat */}
      <Link to="/chat" className={`flex flex-col items-center text-xs ${isActive("/chat")}`}>
        <span className="text-xl">💬</span>
        Chat
      </Link>

      {/* Profile */}
      <Link to="/profile" className={`flex flex-col items-center text-xs ${isActive("/profile")}`}>
        <span className="text-xl">👤</span>
        Profile
      </Link>

    </div>
  );
}

export default MobileNav;