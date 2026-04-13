import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import { useState, useRef, useEffect } from "react";
import { getMyConnections } from "../services/connectionService";
import { getChatHistory } from "../services/chatService";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useParams } from "react-router-dom";

function ChatPage() {
  const currentUserId = Number(localStorage.getItem("userId"));

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const bottomRef = useRef(null);
  const chatContainerRef = useRef(null);
  const stompClientRef = useRef(null);
  const subscriptionRef = useRef(null);
  const connectedRef = useRef(false);

  const [connections, setConnections] = useState([]);
  const [activeUser, setActiveUser] = useState(null);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  

  const { id } = useParams();

  // 🔥 LOAD CONNECTIONS
  useEffect(() => {
    const loadConnections = async () => {
      try {
        const data = await getMyConnections();
        setConnections(data);

        if (data.length > 0) {
          setActiveUser(data[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadConnections();
  }, []);

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

      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }

      subscriptionRef.current = client.subscribe(
        `/topic/messages/${currentUserId}`,
        (msg) => {
          const newMessage = JSON.parse(msg.body);

          // ✅ show only for active chat
          if (
            newMessage.senderId !== activeUser?.id &&
            newMessage.receiverId !== activeUser?.id
          ) {
            return;
          }

          setMessages((prev) => {
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
                  newMessage.senderId === currentUserId
                    ? "me"
                    : "other",
                time: newMessage.timestamp,
              },
            ];
          });
        }
      );
    };

    client.activate();

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }

      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }

      connectedRef.current = false;
      setIsConnected(false);
    };
  }, [currentUserId, activeUser]);

  // 🔥 LOAD CHAT HISTORY
  useEffect(() => {
    if (!activeUser) return;

    const loadHistory = async () => {
      try {
        const data = await getChatHistory(
          currentUserId,
          activeUser.id,
          0
        );

        const formatted = data.map((msg) => ({
          id: msg.id,
          text: msg.content,
          sender: msg.senderId === currentUserId ? "me" : "other",
          time: msg.timestamp,
        }));

        setMessages(formatted);
        setPage(1);
        setHasMore(true);
      } catch (err) {
        console.error(err);
      }
    };

    loadHistory();
  }, [activeUser]);

  // 🔥 SCROLL LOAD MORE
  const handleScroll = async () => {
    if (!chatContainerRef.current) return;

    const top = chatContainerRef.current.scrollTop;

    if (top === 0 && hasMore && activeUser) {
      try {
        const prevHeight = chatContainerRef.current.scrollHeight;

        const data = await getChatHistory(
          currentUserId,
          activeUser.id,
          page
        );

        if (data.length === 0) {
          setHasMore(false);
          return;
        }

        const formatted = data.map((msg) => ({
          id: msg.id,
          text: msg.content,
          sender: msg.senderId === currentUserId ? "me" : "other",
          time: msg.timestamp,
        }));

        setMessages((prev) => {
          const existingIds = new Set(prev.map((m) => m.id));
          const newMsgs = formatted.filter(
            (m) => !existingIds.has(m.id)
          );

          return [...newMsgs, ...prev];
        });

        setPage((prev) => prev + 1);

        // maintain scroll
        setTimeout(() => {
          const newHeight = chatContainerRef.current.scrollHeight;
          chatContainerRef.current.scrollTop =
            newHeight - prevHeight;
        }, 0);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // 🔥 AUTO SCROLL TO BOTTOM
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔥 SEND MESSAGE
  const handleSend = () => {
    if (!input.trim()) return;

    if (!activeUser) {
      alert("Select a user first");
      return;
    }

    if (!isConnected) {
      alert("Connecting...");
      return;
    }

    stompClientRef.current.publish({
      destination: "/app/chat.send",
      body: JSON.stringify({
        senderId: currentUserId,
        receiverId: activeUser.id,
        content: input,
      }),
    });

    setInput("");
  };

  useEffect(() => {
  if (!id || connections.length === 0) return;

  const user = connections.find((u) => u.id == id);

  if (user) {
    setActiveUser(user);
  }
}, [id, connections]);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      <div className="h-full">
  <Sidebar />
</div>

      <div className="flex-1 flex flex-col md:flex-row h-full">
        {/* USERS LIST */}
        <div className="hidden md:block w-80 border-r border-gray-800 bg-gray-950 p-4">
          <h2 className="text-lg font-semibold mb-4">Chats</h2>

          <div className="space-y-3">
            {connections.map((user) => (
              <div
                key={user.id}
                onClick={() => {
                  setActiveUser(user);
                  setMessages([]);
                }}
                className={`p-3 rounded-lg cursor-pointer flex items-center gap-3 ${
                  activeUser?.id === user.id
                    ? "bg-blue-600"
                    : "bg-gray-900 hover:bg-gray-800"
                }`}
              >
                <img
                  src={
                    user.profileImageUrl ||
                    "https://via.placeholder.com/40"
                  }
                  className="w-10 h-10 rounded-full"
                />

                <div>
                  <p>{user.name}</p>
                  <p className="text-sm text-gray-400">
                    {user.profession}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CHAT */}
        <div className="flex-1 flex flex-col h-full">
          <div className="border-b border-gray-800 p-4 flex gap-3">
            <img
              src={
                activeUser?.profileImageUrl ||
                "https://via.placeholder.com/40"
              }
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p>{activeUser?.name || "Select User"}</p>
              <p className="text-green-400 text-sm">Online</p>
            </div>
          </div>

          {/* MESSAGES */}
          <div
            ref={chatContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-xs px-4 py-2 rounded-xl ${
                  msg.sender === "me"
                    ? "bg-blue-600 ml-auto"
                    : "bg-gray-800"
                }`}
              >
                <p>{msg.text}</p>

                {msg.time && (
                  <p className="text-xs text-gray-300 text-right mt-1">
                    {new Date(msg.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </div>
            ))}

            <div ref={bottomRef}></div>
          </div>

          {/* INPUT */}
          <div className="border-t border-gray-800 p-4 flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-gray-800 p-3 rounded-lg"
              placeholder="Type message..."
              onKeyDown={(e) =>
                e.key === "Enter" && handleSend()
              }
            />

            <button
              onClick={handleSend}
              disabled={!isConnected}
              className={`px-6 rounded-lg ${
                isConnected
                  ? "bg-blue-600"
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