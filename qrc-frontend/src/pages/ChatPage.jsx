import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import { useState, useRef, useEffect } from "react";

function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! I scanned your QR.", sender: "other" },
    { id: 2, text: "Nice to connect with you 🚀", sender: "me" },
    { id: 3, text: "Let's collaborate soon.", sender: "other" },
  ]);

  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      { id: Date.now(), text: input, sender: "me" },
    ]);

    setInput("");
  };

  return (
    <div className="flex bg-gradient-to-br from-gray-950 via-gray-900 to-black min-h-screen text-white">

      {/* Desktop Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col md:flex-row">

        {/* Users List (Desktop) */}
        <div className="hidden md:block w-80 border-r border-gray-800 bg-gray-950 p-4">
          <h2 className="text-lg font-semibold mb-4">Chats</h2>

          <div className="space-y-3">
            <div className="p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition cursor-pointer flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full"></div>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-green-400">Online</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div className="flex-1 flex flex-col">

          {/* Chat Header */}
          <div className="border-b border-gray-800 p-4 flex items-center gap-3 bg-gray-900/60 backdrop-blur-lg">
            <div className="w-10 h-10 bg-blue-600 rounded-full"></div>
            <div>
              <p className="font-semibold">John Doe</p>
              <p className="text-sm text-green-400">Online</p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-xl transition-all duration-300 ${
                  msg.sender === "me"
                    ? "bg-blue-600 ml-auto animate-slideInRight"
                    : "bg-gray-800 animate-slideInLeft"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={bottomRef}></div>
          </div>

          {/* Input Section */}
          <div className="border-t border-gray-800 p-4 flex gap-3 bg-gray-950">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-800 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700 px-6 rounded-lg transition active:scale-95"
            >
              Send
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <MobileNav />
    </div>
  );
}

export default ChatPage;