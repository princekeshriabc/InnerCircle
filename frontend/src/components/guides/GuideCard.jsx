// components/guides/GuideCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const GuideCard = ({ guide }) => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={item}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              guide.difficulty === "Beginner"
                ? "bg-green-100 text-green-800"
                : guide.difficulty === "Intermediate"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {guide.difficulty}
          </span>
          <span className="text-sm text-gray-500">{guide.category}</span>
        </div>

        <Link to={`/guides/${guide._id}`}>
          <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-200">
            {guide.topic}
          </h2>
        </Link>

        <p className="text-gray-600 mb-4 line-clamp-2">{guide.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              {guide.createdBy?.name?.charAt(0) || "A"}
            </div>
            <span className="text-sm text-gray-600">
              {guide.isAnonymous ? "Anonymous" : guide.createdBy?.name}
            </span>
          </div>
          <Link
            to={`/guides/${guide._id}`}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Read More →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default GuideCard;
