import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    title: "Scan QR 📷",
    desc: "Connect instantly by scanning QR code",
  },
  {
    title: "Send Request 🤝",
    desc: "Send connection request in one tap",
  },
  {
    title: "Accept Request ✅",
    desc: "Build your network easily",
  },
  {
    title: "Chat 💬",
    desc: "Start real-time conversation",
  },
  {
    title: "View Profile 👤",
    desc: "Explore full user profile",
  },
];

export default function DemoTour({ onClose }) {
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index < steps.length - 1) setIndex(index + 1);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -40 }}
          transition={{ duration: 0.4 }}
          className="bg-gray-900 p-8 rounded-2xl text-center w-[350px]"
        >
          <h2 className="text-xl font-bold mb-3">{steps[index].title}</h2>

          <p className="text-gray-400 mb-6">{steps[index].desc}</p>

          <button
            onClick={() => {
              if (index === steps.length - 1) {
                onClose(); // 🔥 CLOSE DEMO
              } else {
                setIndex(index + 1);
              }
            }}
            className="bg-blue-600 px-4 py-2 rounded-lg"
          >
            {index === steps.length - 1 ? "Finish" : "Next"}
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
