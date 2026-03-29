import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";

function FeedPage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden">

      {/* Fixed Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Scrollable Feed Content */}
      <div className="flex-1 overflow-y-auto p-6 pb-24 md:pb-6">

        <h1 className="text-2xl font-bold mb-8">Community Feed</h1>

        {/* TECH SECTION */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">
            🚀 Tech Updates
          </h2>

          <div className="space-y-6">
            <div className="bg-gray-900/60 backdrop-blur-lg border border-gray-800 p-5 rounded-xl hover:border-blue-500 transition">
              <h3 className="font-semibold text-lg">
                New AI Developer Tools Released
              </h3>
              <p className="text-gray-400 mt-2">
                Powerful automation tools now help developers generate backend APIs instantly.
              </p>
            </div>

            <div className="bg-gray-900/60 backdrop-blur-lg border border-gray-800 p-5 rounded-xl hover:border-blue-500 transition">
              <h3 className="font-semibold text-lg">
                React Performance Upgrade
              </h3>
              <p className="text-gray-400 mt-2">
                New concurrent rendering improvements enhance UI responsiveness.
              </p>
            </div>
          </div>
        </div>

        {/* USER POSTS SECTION */}
        <div>
          <h2 className="text-xl font-semibold text-green-400 mb-4">
            👥 User Posts
          </h2>

          <div className="space-y-6">
            <div className="bg-gray-900/60 backdrop-blur-lg border border-gray-800 p-5 rounded-xl hover:border-green-500 transition">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full"></div>
                <div>
                  <p className="font-medium">Abhish Tarhekar</p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
              </div>

              <p className="text-gray-300">
                Just integrated JWT authentication in QR Connect 🔥
              </p>
            </div>

            <div className="bg-gray-900/60 backdrop-blur-lg border border-gray-800 p-5 rounded-xl hover:border-green-500 transition">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-600 rounded-full"></div>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-xs text-gray-400">5 hours ago</p>
                </div>
              </div>

              <p className="text-gray-300">
                Excited to connect with developers via QR Connect 🚀
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
}

export default FeedPage;