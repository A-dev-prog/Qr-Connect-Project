import { useNavigate } from "react-router-dom";

function BackButton({ fallback = "/dashboard", label = "Back" }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1); // go back
    } else {
      navigate(fallback); // fallback if no history
    }
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition text-sm"
    >
      ← {label}
    </button>
  );
}

export default BackButton;