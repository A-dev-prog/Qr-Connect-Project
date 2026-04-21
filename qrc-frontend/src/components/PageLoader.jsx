import { motion } from "framer-motion";

function PageLoader() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black backdrop-blur-xl">
      
      <div className="flex flex-col items-center gap-6">

        {/* 🔵 Animated Logo Circle */}
        <motion.div
          className="relative w-16 h-16"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          <div className="absolute inset-0 rounded-full border-4 border-blue-500/30"></div>
          <div className="absolute inset-0 rounded-full border-t-4 border-blue-500"></div>
        </motion.div>

        {/* ✨ Glow Pulse */}
        <motion.div
          className="w-24 h-24 rounded-full bg-blue-500/20 blur-2xl absolute"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />

        {/* 🧠 Text */}
        <motion.p
          className="text-gray-300 text-sm tracking-wide"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          Preparing your experience...
        </motion.p>

      </div>
    </div>
  );
}

export default PageLoader;