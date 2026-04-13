import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MobileNav from "../components/MobileNav";
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useNavigate } from "react-router-dom";
import { getExternalFeed } from "../services/feedService"; 
import { FaNewspaper, FaPlus, FaGlobe } from "react-icons/fa";
import {
  getTrendingFeed,
  getLatestFeed,
  createPost,
} from "../services/feedService";

function FeedPage() {
  const [trending, setTrending] = useState([]);
  const [latest, setLatest] = useState([]);
  const [input, setInput] = useState("");
  const [external, setExternal] = useState([]);
  const [activeTab, setActiveTab] = useState("posts"); // default
const navigate = useNavigate();

  const stompClientRef = useRef(null);
  const subscriptionRef = useRef(null);

  // 🔥 LOAD INITIAL DATA
  useEffect(() => {
    const loadFeeds = async () => {
      try {
        const t = await getTrendingFeed();
        const l = await getLatestFeed();
        const e = await getExternalFeed();
        setExternal(e);

        setTrending(t);
        setLatest(l);
      } catch (err) {
        console.error(err);
      }
    };

    loadFeeds();
  }, []);

  // 🔥 REAL-TIME FEED SUBSCRIBE
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      console.log("Feed connected ✅");

      subscriptionRef.current = client.subscribe("/topic/feed", (msg) => {
        const newPost = JSON.parse(msg.body);

        console.log("New post:", newPost);

        // 🔥 add to latest
        setLatest((prev) => [newPost, ...prev]);
      });
    };

    client.activate();
    stompClientRef.current = client;

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
      if (client) {
        client.deactivate();
      }
    };
  }, []);

  // 🔥 CREATE POST
  const handlePost = async () => {
    if (!input.trim()) return;

    try {
      await createPost(input);
      setInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 POST CARD UI
  const PostCard = ({ post }) => (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-md">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={post.authorImage || "https://via.placeholder.com/40"}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-semibold">{post.authorName}</p>
          <p className="text-xs text-gray-400">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <p className="mb-3">{post.content}</p>

      {post.imageUrl && <img src={post.imageUrl} className="rounded-lg mb-3" />}

      {post.videoUrl && (
        <video controls className="rounded-lg mb-3">
          <source src={post.videoUrl} />
        </video>
      )}

      <div className="text-sm text-gray-400">❤️ {post.likes} Likes</div>
    </div>
  );

  return (
    <div className="flex h-screen bg-black text-white">
  <Sidebar />

  <div className="flex-1 flex flex-col overflow-hidden">
    <Topbar />

    {/* 🔥 NAV BAR */}
    {/* 🔥 PREMIUM NAVBAR */}
<div className="sticky top-0 z-20 backdrop-blur-xl bg-white/5 border-b border-white/10 px-6 py-3">
  <div className="flex items-center justify-between max-w-3xl mx-auto">

    {/* LEFT - POSTS */}
    <button
      onClick={() => setActiveTab("posts")}
      className="relative flex flex-col items-center text-sm group"
    >
      <span
        className={`transition ${
          activeTab === "posts"
            ? "text-blue-400"
            : "text-gray-400 group-hover:text-white"
        }`}
      >
       <FaNewspaper size={40} />
      </span>

      {/* ACTIVE INDICATOR */}
      {activeTab === "posts" && (
        <div className="mt-1 h-[2px] w-6 bg-blue-500 rounded-full animate-pulse"></div>
      )}
    </button>

    {/* CENTER - CREATE POST BUTTON */}
    <button
      onClick={() => navigate("/create-post")}
      className="relative flex items-center justify-center w-14 h-14 rounded-full 
      bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg 
      hover:scale-110 transition-all duration-300 active:scale-95"
    >
      <span className="text-2xl font-bold"><FaPlus /></span>

      {/* GLOW EFFECT */}
      <div className="absolute inset-0 rounded-full bg-blue-500 blur-xl opacity-30 animate-pulse"></div>
    </button>

    {/* RIGHT - TECH NEWS */}
    <button
      onClick={() => setActiveTab("external")}
      className="relative flex flex-col items-center text-sm group"
    >
      <span
        className={`transition ${
          activeTab === "external"
            ? "text-purple-400"
            : "text-gray-400 group-hover:text-white"
        }`}
      >
        <FaGlobe size={40} />
      </span>

      {/* ACTIVE INDICATOR */}
      {activeTab === "external" && (
        <div className="mt-1 h-[2px] w-6 bg-purple-500 rounded-full animate-pulse"></div>
      )}
    </button>

  </div>
</div>

    {/* 🔥 CONTENT */}
    <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8">

      {/* 🆕 USER POSTS (DEFAULT) */}
      {activeTab === "posts" && (
        <>
          <h2 className="text-xl font-bold">🆕 Latest Posts</h2>

          {latest.length === 0 && (
            <p className="text-gray-400">No posts yet</p>
          )}

          {latest.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </>
      )}

      {/* 🌍 TECH NEWS */}
      {activeTab === "external" && (
        <>
          <h2 className="text-xl font-bold">🌍 Tech News</h2>

          {external.length === 0 && (
            <p className="text-gray-400">Loading news...</p>
          )}

          {external.map((post, index) => (
            <div
              key={index}
              className="bg-gray-900 p-4 rounded-xl border border-gray-800"
            >
              {post.imageUrl && (
                <img src={post.imageUrl} className="rounded-lg mb-3" />
              )}

              <h3 className="font-semibold text-lg">{post.title}</h3>

              <p className="text-gray-400 text-sm">
                {post.description || "No description available"}
              </p>

              <a
                href={post.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 text-sm mt-2 inline-block"
              >
                Read more →
              </a>

              <p className="text-xs text-gray-500 mt-2">
                Source: {post.source}
              </p>
            </div>
          ))}
        </>
      )}

    </div>
  </div>

  <MobileNav />
</div>
  );
}

export default FeedPage;
