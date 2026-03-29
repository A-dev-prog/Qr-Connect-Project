import { useNavigate } from "react-router-dom";

function Topbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };
  return (
    <div className="w-full bg-gray-900/60 backdrop-blur-lg border-b border-gray-800 p-4 flex justify-between items-center">
      <h2 className="text-white font-semibold text-lg">Dashboard</h2>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
      >
        Logout
      </button>
    </div>
  );
}

export default Topbar;