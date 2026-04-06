import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

function ChatPage() {
  const { id } = useParams(); // receiverId
  const currentUserId = Number(localStorage.getItem("userId"));

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const bottomRef = useRef(null);
  const stompClientRef = useRef(null);
  const subscriptionRef = useRef(null);
  const connectedRef = useRef(false);

  // 🔥 CONNECT WEBSOCKET
  useEffect(() => {
    if (!currentUserId) return;

    if (connectedRef.current) return;
    connectedRef.current = true;

    const socket = new SockJS("http://localhost:8080/ws");

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: () => {},
    });

    client.onConnect = () => {
      console.log("Connected ✅");

      setIsConnected(true);
      stompClientRef.current = client;

      // 🔥 unsubscribe old
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }

      // 🔥 subscribe
      subscriptionRef.current = client.subscribe(
        `/topic/messages/${currentUserId}`,
        (msg) => {
          const newMessage = JSON.parse(msg.body);

          console.log("Received:", newMessage);

          setMessages((prev) => {
            // 🔥 prevent duplicate
            if (prev.find((m) => m.id === newMessage.id)) {
              return prev;
            }

            return [
              ...prev,
              {
                id:
                  newMessage.id ||
                  `${newMessage.senderId}-${Date.now()}`,
                text: newMessage.content,
                sender:
                  newMessage.senderId == currentUserId
                    ? "me"
                    : "other",
              },
            ];
          });
        }
      );
    };

    client.activate();

    return () => {
      console.log("Cleaning socket ❌");

      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }

      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
        stompClientRef.current = null;
      }

      connectedRef.current = false;
      setIsConnected(false);
    };
  }, [currentUserId]);

  // 🔥 AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔥 SEND MESSAGE
  const handleSend = () => {
    if (!input.trim()) return;

    if (!isConnected) {
      alert("Connecting... please wait ⏳");
      return;
    }

    const client = stompClientRef.current;

    client.publish({
      destination: "/app/chat.send",
      body: JSON.stringify({
        senderId: currentUserId,
        receiverId: Number(id),
        content: input,
      }),
    });

    setInput("");
  };

  return (
    <div className="flex bg-gradient-to-br from-gray-950 via-gray-900 to-black min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col md:flex-row">
        {/* USERS LIST */}
        <div className="hidden md:block w-80 border-r border-gray-800 bg-gray-950 p-4">
          <h2 className="text-lg font-semibold mb-4">Chats</h2>

          <div className="space-y-3">
            <div className="p-3 bg-gray-900 rounded-lg flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full"></div>
              <div>
                <p className="font-medium">User {id}</p>
                <p className="text-sm text-green-400">Connected</p>
              </div>
            </div>
          </div>
        </div>

        {/* CHAT */}
        <div className="flex-1 flex flex-col">
          {/* HEADER */}
          <div className="border-b border-gray-800 p-4 flex items-center gap-3 bg-gray-900/60 backdrop-blur-lg">
            <div className="w-10 h-10 bg-blue-600 rounded-full"></div>
            <div>
              <p className="font-semibold">User {id}</p>
              <p className="text-sm text-green-400">Online</p>
            </div>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={msg.id || index}
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-xl ${
                  msg.sender === "me"
                    ? "bg-blue-600 ml-auto"
                    : "bg-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={bottomRef}></div>
          </div>

          {/* INPUT */}
          <div className="border-t border-gray-800 p-4 flex gap-3 bg-gray-950">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-800 p-3 rounded-lg outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />

            <button
              onClick={handleSend}
              disabled={!isConnected}
              className={`px-6 py-2 rounded-lg ${
                isConnected
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
            >
              {isConnected ? "Send" : "Connecting..."}
            </button>
          </div>
        </div>
      </div>

      <MobileNav />
    </div>
  );
}

export default ChatPage;