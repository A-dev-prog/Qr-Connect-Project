import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { getNotifications } from "../services/notificationService";
import { getMyProfile } from "../services/profileService"; // ✅ ADD
import toast from "react-hot-toast";

function Topbar() {
  const navigate = useNavigate();
  const userId = Number(localStorage.getItem("userId"));

  const [notifications, setNotifications] = useState([]);

  // ✅ dropdown states
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // ✅ refs for outside click
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // ✅ dynamic user
  const [user, setUser] = useState(null);

  // 🔥 LOAD PROFILE
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getMyProfile();
        setUser(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile ❌");
      }
    };

    loadProfile();
  }, []);

  // 🔥 LOAD NOTIFICATIONS
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await getNotifications(userId);

        setNotifications(Array.isArray(data) ? data : data?.content || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load notifications ❌");
        setNotifications([]);
      }
    };

    if (userId) loadNotifications();
  }, [userId]);

  // 🔥 WEBSOCKET
  useEffect(() => {
    if (!userId) return;

    const socket = new SockJS("http://localhost:8080/ws");

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      client.subscribe(`/topic/notifications/${userId}`, (msg) => {
        try {
          const notification = JSON.parse(msg.body);
          setNotifications((prev) => [notification, ...prev]);
        } catch (e) {
          console.error("Invalid WS data", e);
        }
      });
    };

    client.activate();

    return () => client.deactivate();
  }, [userId]);

  // 🔥 OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
  if (notifRef.current && !notifRef.current.contains(e.target)) {
    setShowNotifDropdown(false);
  }
  if (profileRef.current && !profileRef.current.contains(e.target)) {
    setShowProfileDropdown(false);
  }
};

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.addEventListener("click", handleClickOutside);
  }, []);

  // 🔥 UNREAD COUNT
  const unreadCount = Array.isArray(notifications)
    ? notifications.filter((n) => !n.read).length
    : 0;

  // 🔥 CLICK NOTIFICATION
  const handleNotificationClick = async (n) => {
    try {
      await fetch(`http://localhost:8080/api/notifications/${n.id}/read`, {
        method: "PUT",
      });

      setNotifications((prev) =>
        prev.map((item) => (item.id === n.id ? { ...item, read: true } : item)),
      );

      if (n.type === "MESSAGE") {
        navigate(`/chat/${n.senderId}`);
      } else if (n.type === "CONNECTION") {
        navigate(`/profile/${n.senderId}`);
      }

      setShowNotifDropdown(false);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong ❌");
    }
  };

  // 🔥 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="w-full sticky top-0 z-40 bg-gray-900/70 backdrop-blur-lg border-b border-gray-800 p-4 flex justify-between items-center">
      {/* TITLE */}
      <h2 className="text-white font-semibold text-lg">Dashboard</h2>

      <div className="flex items-center gap-6">
        {/* 🔔 NOTIFICATIONS */}
        <div className="relative" ref={notifRef}>
          <div
            className="cursor-pointer text-2xl"
            onClick={(e) => {
              e.stopPropagation();
              setShowNotifDropdown((prev) => !prev);
              setShowProfileDropdown(false);
            }}
          >
            🔔
          </div>

          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}

          {showNotifDropdown && (
            <div
              className="absolute right-0 mt-3 w-80 
              bg-white/10 backdrop-blur-xl border border-white/20 
              rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto animate-fadeIn"
            >
              <h3 className="p-3 border-b border-white/10 font-semibold">
                Notifications
              </h3>

              {notifications.length === 0 ? (
                <p className="p-4 text-gray-300 text-center">
                  No notifications
                </p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => handleNotificationClick(n)}
                    className={`p-3 cursor-pointer transition border-b border-white/10 ${
                      n.read
                        ? "bg-transparent"
                        : "bg-blue-500/20 hover:bg-blue-500/30"
                    }`}
                  >
                    <p className="text-sm">{n.message}</p>

                    {n.createdAt && (
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(n.createdAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* 👤 PROFILE */}
        <div className="relative" ref={profileRef}>
          <img
  src={
    user?.profileImageUrl && user.profileImageUrl.trim() !== ""
      ? user.profileImageUrl.startsWith("http")
        ? user.profileImageUrl // ✅ already full URL
        : `http://localhost:8080/${user.profileImageUrl}` // ✅ relative path
      : "https://ui-avatars.com/api/?name=User&background=random"
  }
  alt="profile"
  className="w-10 h-10 rounded-full object-cover"
  onClick={(e) => {
  e.stopPropagation(); // ✅ important
  setShowProfileDropdown((prev) => !prev);
  setShowNotifDropdown(false);
}}
/>

          {showProfileDropdown && (
            <div
              className="absolute right-0 mt-3 w-56 
              bg-white/10 backdrop-blur-xl border border-white/20 
              rounded-xl shadow-xl z-50 overflow-hidden animate-fadeIn transition-all duration-200 ease-out"
            >
              <div className="px-4 py-3 border-b border-white/10">
                <p className="font-semibold text-sm">{user?.name || "User"}</p>
                <p
                  className="text-xs text-gray-300 cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  View Profile
                </p>
              </div>

              <button
                onClick={() => navigate("/profile")}
                className="w-full text-left px-4 py-2 hover:bg-white/10 text-sm"
              >
                👤 My Profile
              </button>

              <button
                onClick={() => navigate("/connections")}
                className="w-full text-left px-4 py-2 hover:bg-white/10 text-sm"
              >
                🤝 Connections
              </button>

              <button
                onClick={() => navigate("/feed")}
                className="w-full text-left px-4 py-2 hover:bg-white/10 text-sm"
              >
                📰 Feed
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-red-500/20 text-red-400 text-sm"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
