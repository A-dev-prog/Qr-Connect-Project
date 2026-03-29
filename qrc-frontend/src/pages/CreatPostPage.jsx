import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import { useState } from "react";

function CreatePostPage() {
  const [category, setCategory] = useState("user");

  return (
    <div className="flex bg-gradient-to-br from-gray-950 via-gray-900 to-black min-h-screen text-white">

      {/* Desktop Sidebar */}
      <Sidebar />

      <div className="flex-1 p-6 flex justify-center">

        <div className="w-full max-w-2xl bg-gray-900/60 backdrop-blur-lg border border-gray-800 rounded-2xl p-6 shadow-lg">

          {/* Header */}
          <h1 className="text-2xl font-bold mb-6 text-center">
            Create New Post
          </h1>

          {/* User Info */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-full"></div>
            <div>
              <p className="font-semibold">Abhish Tarhekar</p>
              <p className="text-sm text-gray-400">Posting publicly</p>
            </div>
          </div>

          {/* Category Toggle */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setCategory("user")}
              className={`px-4 py-2 rounded-full transition ${
                category === "user"
                  ? "bg-green-600 text-white"
                  : "bg-gray-800 text-gray-400"
              }`}
            >
              👤 User Post
            </button>

            <button
              onClick={() => setCategory("tech")}
              className={`px-4 py-2 rounded-full transition ${
                category === "tech"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-400"
              }`}
            >
              🚀 Tech Update
            </button>
          </div>

          {/* Caption Input */}
          <textarea
            placeholder="What's on your mind?"
            rows="4"
            className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 mb-6 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          ></textarea>

          {/* Image Upload Section */}
          <div className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center mb-6 hover:border-blue-500 transition cursor-pointer">
            <p className="text-gray-400">
              📷 Click to upload image (UI only)
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">

            <div className="flex gap-4 text-gray-400 text-sm">
              <button className="hover:text-white transition">
                🏷 Add Tags
              </button>
              <button className="hover:text-white transition">
                🌍 Public
              </button>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl transition active:scale-95">
              Post
            </button>

          </div>

        </div>

      </div>

      <MobileNav />
    </div>
  );
}

export default CreatePostPage;