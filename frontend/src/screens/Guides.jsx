// screens/Guides.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "../config/axios";
import { Link } from "react-router-dom";
import GuideCard from "../components/guides/GuideCard";

const Guides = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const response = await axios.get("/guides/all");
      // console.log(response.data);
      setGuides(response.data.data);
    } catch (error) {
      console.error("Error fetching guides:", error);
    } finally {
      setLoading(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-scree py-12 bg-gradient-to-bl from-[#f4d6c9] via-[#fc8e57] to-[#2a217c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            className="text-3xl font-bold text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Learning Guides
          </motion.h1>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/guides/create"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition-colors duration-200 text-base font-medium 
              bg-gradient-to-r from-black via-gray-700 to-blue-500
             hover:from-black hover:via-gray-700 hover:to-blue-600 hover:bg-blue-600"
            >
              Create Guide
            </Link>
          </motion.div>
        </div>

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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 "
            variants={container}
            initial="hidden"
            animate="show"
          >
            {guides.map((guide) => (
              <GuideCard key={guide._id} guide={guide} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Guides;
