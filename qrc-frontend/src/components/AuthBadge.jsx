import { useEffect } from "react";

function AuthBadge({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
      <div
        className={`px-6 py-3 rounded-lg shadow-lg border backdrop-blur-lg
        ${
          type === "success"
            ? "bg-green-600/20 border-green-500 text-green-400"
            : "bg-red-600/20 border-red-500 text-red-400"
        }`}
      >
        {message}
      </div>
    </div>
  );
}

export default AuthBadge;