import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { getNotifications } from "../services/notificationService";

function Topbar() {
  const navigate = useNavigate();
  const userId = Number(localStorage.getItem("userId"));

  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // 🔥 LOAD OLD NOTIFICATIONS
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await getNotifications(userId);
        setNotifications(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (userId) loadNotifications();
  }, [userId]);

  // 🔥 REAL-TIME WEBSOCKET
  useEffect(() => {
    if (!userId) return;

    const socket = new SockJS("http://localhost:8080/ws");

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      console.log("Notification WS Connected ✅");

      client.subscribe(`/topic/notifications/${userId}`, (msg) => {
        const notification = JSON.parse(msg.body);

        setNotifications((prev) => [notification, ...prev]);
      });
    };

    client.activate();

    return () => client.deactivate();
  }, [userId]);

  // 🔥 COUNT UNREAD
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="w-full bg-gray-900/60 backdrop-blur-lg border-b border-gray-800 p-4 flex justify-between items-center relative">
      
      {/* TITLE */}
      <h2 className="text-white font-semibold text-lg">Dashboard</h2>

      <div className="flex items-center gap-6">
        
        {/* 🔔 NOTIFICATION BELL */}
        <div
          className="relative cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span className="text-2xl">🔔</span>

          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>

        {/* 🔽 DROPDOWN */}
        {showDropdown && (
          <div className="absolute right-20 top-14 w-80 bg-gray-900 border border-gray-800 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            
            {notifications.length === 0 ? (
              <p className="p-4 text-gray-400 text-center">
                No notifications
              </p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-3 border-b border-gray-800 ${
                    !n.read ? "bg-gray-800" : ""
                  }`}
                >
                  <p className="text-sm">{n.message}</p>

                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
          toas
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Topbar;