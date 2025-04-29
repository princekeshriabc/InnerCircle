import React from "react";
import { motion } from "framer-motion";

const PurchasePlan = () => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <div className="min-h-[81.6vh] flex flex-col items-center justify-center bg-gradient-to-bl from-[#f4d6c9] via-[#fc8e57] to-[#261d77] px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-md mb-8"
      >
        <h2 className="text-white text-3xl font-extrabold uppercase tracking-wide mb-2">
          SKIP THE QUEUE
        </h2>
      </motion.div>

      {/* Flip card container with perspective */}
      <motion.div className="relative w-full max-w-xs h-[480px] [perspective:1000px]">
        {/* Flip card itself */}
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative w-full h-full rounded-3xl shadow-lg cursor-pointer [transform-style:preserve-3d]"
        >
          {/* FRONT SIDE */}
          <div className="absolute w-full h-full bg-gradient-to-tr from-orange-500 to-blue-600 rounded-3xl p-8 flex flex-col items-center justify-center [backface-visibility:hidden]">
            {/* Circle Icon */}
            <div className="absolute -top-8 bg-orange-600 rounded-full p-4 flex items-center justify-center shadow-lg border border-orange-400">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>

            {/* Plan Name */}
            <h3 className="text-white text-lg font-semibold mb-4 mt-6">
              BASIC
            </h3>

            {/* Description */}
            <p className="text-white text-center text-xs sm:text-sm mb-8 px-4">
              Buy for the betterment of the organization. This plan is for those
              who want to support the organization and get some extra features.
            </p>

            {/* Boosts Circle */}
            <div className="bg-blue-700 shadow-[inset_8px_8px_16px_#244bca,inset_-8px_-8px_20px_#4170ff] rounded-full w-32 h-32 flex flex-col items-center justify-center mb-8">
              <p className="text-orange-300 text-xs uppercase tracking-widest">
                Per month
              </p>
              <p className="text-white text-3xl font-bold">₹999.00</p>
            </div>

            {/* Buy Button */}
            <button
              onClick={() => setIsFlipped(true)}
              className="px-4 py-2 text-white text-base font-medium rounded-lg
                bg-gradient-to-r from-black via-gray-700 to-blue-500
                hover:from-black hover:via-gray-700 hover:to-blue-600
                
                transition-all duration-200 ease-in-out"
            >
              Buy
            </button>
          </div>

          {/* BACK SIDE */}
          <div
            className="absolute w-full h-full bg-gray-50 rounded-3xl p-8 flex flex-col items-center justify-center [backface-visibility:hidden] bg-gradient-to-tl from-orange-500 to-blue-600"
            style={{ transform: "rotateY(180deg)" }}
          >
            {/* QR Code Image */}
            <img
              src="./QRcode.jpg"
              alt="QR Code"
              className="w-56 h-56 object-contain mb-6 "
            />

            {/* Back Button */}
            <button
              onClick={() => setIsFlipped(false)}
              className=" mt-4 px-4 py-2 text-white text-base font-medium rounded-lg
                bg-gradient-to-r from-black via-gray-700 to-blue-500
                hover:from-black hover:via-gray-700 hover:to-blue-600
                
                transition-all duration-200 ease-in-out"
            >
              Back
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PurchasePlan;
