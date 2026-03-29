import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-400">QR Connect</h1>

        <div className="hidden md:flex gap-6">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/qr">My QR</Link>
          <Link to="/requests">Requests</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;