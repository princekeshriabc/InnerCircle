import React from 'react'
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Features = () => {
    const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full py-10 bg-gradient-to-bl from-[#FF9361] via-[#ec9b58] to-[#eba486]">
        <div className="flex flex-col lg:flex-row items-center justify-center py-12 lg:py-20 space-x-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2 mt-12 lg:mt-0 relative"
          >
            <div className="relative">
              {/* Background Circles */}
              {/* <div className="absolute inset-0 z-0">
                <div className="absolute right-0 top-0 w-72 h-72 bg-white rounded-full"></div>
                <div className="absolute right-20 top-20 w-64 h-64 bg-[#003B95] rounded-full"></div>
              </div> */}

              {/* Image */}
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                src="/laptop1.png" // Replace with actual image path
                alt="Student learning"
                className="relative z-10 w-3xl h-full"
              />
            </div>
          </motion.div>
          {/* Right Content */}

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2 space-y-6 text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#003B95] leading-tight">
              Chat Anonymous
              <br />
              With your Groups
              <br />
            </h1>
            <motion.button
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
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
              Let's Chat
            </motion.button>
          </motion.div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between py-12 lg:py-20 ">
          {/* Left Content */}

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2 space-y-6 text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#003B95] leading-tight">
              Find the best
              <br />
              Resource to
              <br />
              Upskill yourself
            </h1>
          </motion.div>
          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 5 }}
            className="w-full lg:w-1/2 mt-12 lg:mt-0 relative lg:right-28 right-0"
          >
            <div className="relative">
              <DotLottieReact
                src="https://lottie.host/9e0b8732-de8f-498b-871d-fe407c11b07a/chhSCADoNC.lottie"
                loop
                autoplay
                className='relative z-10 w-3xl h-full'
              />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Features
