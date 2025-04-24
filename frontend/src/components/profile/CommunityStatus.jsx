// components/CommunityStatus.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "../../config/axios";

const CommunityStatus = () => {
  const [stats, setStats] = useState({
    totalGuides: 0,
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get("/guides/all");
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const userGuides = response.data.data.filter(
        (guide) => guide.createdBy._id === currentUser._id
      );

      const calculatedStats = userGuides.reduce(
        (acc, guide) => ({
          totalGuides: acc.totalGuides + 1,
          totalViews: acc.totalViews + (guide.views || 0),
          totalLikes: acc.totalLikes + (guide.likes?.length || 0),
          totalComments: acc.totalComments + (guide.comments?.length || 0),
        }),
        { totalGuides: 0, totalViews: 0, totalLikes: 0, totalComments: 0 }
      );

      setStats(calculatedStats);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Guides",
      value: stats.totalGuides,
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      color: "from-purple-400 to-purple-600",
    },
    {
      title: "Total Views",
      value: stats.totalViews,
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Total Likes",
      value: stats.totalLikes,
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      color: "from-red-400 to-red-600",
    },
    {
      title: "Total Comments",
      value: stats.totalComments,
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
      color: "from-green-400 to-green-600",
    },
  ];

  return (
    <div className="py-8 bg-gradient-to-bl from-[#f4d6c9] via-[#fc8e57] to-[#2a217c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Your Community Status
          </h1>
          <p className="text-gray-200 text-lg">
            Track your impact and engagement in the community
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`bg-gradient-to-r ${stat.color} rounded-lg p-6 shadow-xl`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-white">{stat.icon}</div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: index * 0.1 + 0.3,
                    }}
                    className="bg-white bg-opacity-20 rounded-full p-2"
                  >
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </motion.div>
                </div>
                <div className="text-white">
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    className="text-3xl font-bold mb-2"
                  >
                    {stat.value}
                  </motion.h2>
                  <p className="text-white text-opacity-80">{stat.title}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Additional Stats or Graphs could go here */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 bg-orange bg-opacity-10 rounded-xl p-6 backdrop-blur-lg"
        >
          <h3 className="text-2xl font-semibold text-white mb-4">
            Quick Overview
          </h3>
          <p className="text-gray-200">
            You've created {stats.totalGuides} guides that have received{" "}
            {stats.totalViews} views, {stats.totalLikes} likes, and{" "}
            {stats.totalComments} comments. Keep creating amazing content!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityStatus;
