import { Link } from "react-router-dom";
import { QrCode, Users, Share2, MessageSquare } from "lucide-react";

function HomePage() {
  return (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white min-h-screen">

      {/* Navbar */}
      <header className="flex justify-between items-center px-6 md:px-12 py-6 border-b border-gray-800">

        <h1 className="text-xl font-bold text-white">
          QR Connect
        </h1>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-4 py-2 text-sm rounded-lg border border-gray-700 hover:bg-gray-800 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="px-6 md:px-12 py-20 text-center max-w-4xl mx-auto">

        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Connect Professionals Instantly with a
          <span className="text-blue-500"> Smart QR Identity</span>
        </h1>

        <p className="text-gray-400 mt-6 text-lg">
          QR Connect allows professionals to share their digital identity,
          social profiles, and portfolio instantly through a QR code.
          Build your professional network faster and smarter.
        </p>

        <div className="flex justify-center gap-4 mt-10 flex-wrap">

          <Link
            to="/register"
            className="px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-700 transition"
          >
            Create Account
          </Link>

          <Link
            to="/login"
            className="px-6 py-3 border border-gray-700 rounded-xl hover:bg-gray-800 transition"
          >
            Login
          </Link>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="px-6 md:px-12 py-20 max-w-6xl mx-auto">

        <h2 className="text-3xl font-semibold text-center mb-14">
          Powerful Networking Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition">
            <QrCode className="text-blue-500 mb-4" size={32} />
            <h3 className="font-semibold text-lg">QR Identity</h3>
            <p className="text-gray-400 text-sm mt-2">
              Generate a personal QR code to share your professional identity instantly.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition">
            <Users className="text-blue-500 mb-4" size={32} />
            <h3 className="font-semibold text-lg">Networking</h3>
            <p className="text-gray-400 text-sm mt-2">
              Connect with professionals by scanning their QR code.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition">
            <Share2 className="text-blue-500 mb-4" size={32} />
            <h3 className="font-semibold text-lg">Share Profile</h3>
            <p className="text-gray-400 text-sm mt-2">
              Share your GitHub, LinkedIn, portfolio, and social links easily.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition">
            <MessageSquare className="text-blue-500 mb-4" size={32} />
            <h3 className="font-semibold text-lg">Real-time Chat</h3>
            <p className="text-gray-400 text-sm mt-2">
              Communicate with your new connections directly in the platform.
            </p>
          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 md:px-12 py-20 bg-gray-950 border-t border-gray-800">

        <h2 className="text-3xl font-semibold text-center mb-14">
          How QR Connect Works
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto text-center">

          <div>
            <div className="text-blue-500 text-3xl font-bold mb-4">1</div>
            <h3 className="font-semibold text-lg">Create Profile</h3>
            <p className="text-gray-400 mt-2 text-sm">
              Add your professional details and social media links.
            </p>
          </div>

          <div>
            <div className="text-blue-500 text-3xl font-bold mb-4">2</div>
            <h3 className="font-semibold text-lg">Generate QR</h3>
            <p className="text-gray-400 mt-2 text-sm">
              Get your unique QR code to share your profile instantly.
            </p>
          </div>

          <div>
            <div className="text-blue-500 text-3xl font-bold mb-4">3</div>
            <h3 className="font-semibold text-lg">Connect</h3>
            <p className="text-gray-400 mt-2 text-sm">
              Scan QR codes of other professionals and build your network.
            </p>
          </div>

        </div>

      </section>

      {/* PROFESSIONAL USE CASE */}
      <section className="px-6 md:px-12 py-20 text-center max-w-4xl mx-auto">

        <h2 className="text-3xl font-semibold mb-6">
          Built for Professionals
        </h2>

        <p className="text-gray-400 text-lg">
          QR Connect helps developers, designers, freelancers, and students
          quickly exchange professional information during hackathons,
          conferences, networking events, or interviews.
        </p>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 text-center py-8 text-gray-500 text-sm">
        © 2026 QR Connect — Professional Networking Platform
      </footer>

    </div>
  );
}

export default HomePage;