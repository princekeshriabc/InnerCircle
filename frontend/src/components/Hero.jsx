// components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const categories = [
    'Cloud Computing',
    'Cyber Security',
    'DevOps',
    'Data Science',
    'Software Testing'
  ];

  const popularCourses = [
    {
      title: 'Data Analyst',
      reviews: '214 Reviews',
      icon: '📊' // You can replace with actual icon component
    },
    {
      title: 'Website Design',
      reviews: '214 Reviews',
      icon: '🎨' // You can replace with actual icon component
    }
  ];

  return (
    <div className="pt-16 bg-white"> {/* pt-16 to account for fixed navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between py-12 lg:py-20">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2 space-y-6 text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#003B95] leading-tight">
              Skill Your Way<br />
              Up To Success<br />
              With Us
            </h1>
            
            <p className="text-gray-600 text-lg md:text-xl">
              Get the skills you need for<br />
              the future of work.
            </p>

            {/* Categories */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-4">
              {categories.map((category, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
                >
                  {category}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2 mt-12 lg:mt-0 relative"
          >
            <div className="relative">
              {/* Background Circles */}
              <div className="absolute inset-0 z-0">
                <div className="absolute right-0 top-0 w-72 h-72 bg-[#FF9361] rounded-full"></div>
                <div className="absolute right-20 top-20 w-64 h-64 bg-[#003B95] rounded-full"></div>
              </div>

              {/* Image */}
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                src="/path-to-your-image.png" // Replace with actual image path
                alt="Student learning"
                className="relative z-10 max-w-md mx-auto"
              />

              {/* Popular Courses Cards */}
              <div className="absolute bottom-4 left-4 z-20 space-y-3">
                {popularCourses.map((course, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (index * 0.2) }}
                    className="bg-white rounded-lg shadow-lg p-4 flex items-center space-x-3 max-w-xs"
                  >
                    <span className="text-2xl">{course.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800">{course.title}</h3>
                      <p className="text-sm text-gray-500">{course.reviews}</p>
                    </div>
                    {index === 0 && (
                      <span className="absolute -top-2 right-2 bg-[#FF9361] text-white text-xs px-2 py-1 rounded-full">
                        Best seller
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;