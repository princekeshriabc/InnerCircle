// components/HeroSection.jsx
import React, {useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup"; 

const GetStart = () => {
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const handlePopupSubmit = (formData) => {
      // Handle form submission here
      console.log("Form submitted:", formData);
      // You can add your API call or other logic here
    };

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#FF9361] via-[#f3966a] to-[#2e2047] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />

        {/* Optional: Animated particles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center relative z-10">
        <div className="text-center p-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            Start building with InnerCircle
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Prepare for a development environment that can
            <br />
            finally keep pace with the speed of your mind.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/register")}
              className="relative flex items-center justify-center gap-2 px-6 py-3 text-white text-base font-medium rounded-lg
                bg-gradient-to-r from-black via-gray-700 to-blue-500
                hover:from-black hover:via-gray-700 hover:to-blue-600
                shadow-[0_1px_rgba(255,255,255,0.75)_inset]
                before:absolute before:inset-0 
                before:bg-[radial-gradient(141.42%_141.42%_at_100%_0%,rgba(255,255,255,0.4),rgba(255,255,255,0))]
                before:rounded-lg
                after:absolute after:inset-0 
                after:bg-[radial-gradient(89.94%_89.94%_at_18.42%_15.79%,rgba(255,255,255,0.2),rgba(255,255,255,0))]
                after:rounded-lg
                transition-all duration-200 ease-in-out
                text-shadow-[0_0_2px_rgba(0,0,0,0.2)]"
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Bottom Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 flex justify-center pb-8 pt-4"
      >
        <motion.button
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsPopupOpen(true)}
          className="relative flex items-center justify-center gap-2 px-6 py-3 text-white text-base font-medium rounded-lg
        bg-gradient-to-r from-black via-gray-700 to-blue-500
        hover:from-black hover:via-gray-700 hover:to-blue-600
        shadow-[0_1px_rgba(255,255,255,0.75)_inset]
        before:absolute before:inset-0 
        before:bg-[radial-gradient(141.42%_141.42%_at_100%_0%,rgba(255,255,255,0.4),rgba(255,255,255,0))]
        before:rounded-lg
        after:absolute after:inset-0 
        after:bg-[radial-gradient(89.94%_89.94%_at_18.42%_15.79%,rgba(255,255,255,0.2),rgba(255,255,255,0))]
        after:rounded-lg
        transition-all duration-200 ease-in-out
        text-shadow-[0_0_2px_rgba(0,0,0,0.2)]"
        >
          Talk with our Team
        </motion.button>
      </motion.div>

      {/* Add Popup component */}
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handlePopupSubmit}
      />
    </div>
  );
};

export default GetStart;
