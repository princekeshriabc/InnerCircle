// components/guides/GuideCard.jsx
import React,{useState} from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "../../config/axios";
import CommentModal from "./CommentModel";

const GuideCard = ({ guide,updateGuide }) => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const handleLikeClick = async () => {
      if (isLiking) return;
      setIsLiking(true);
  
      try {
        const response = await axios.post(`/guides/${guide._id}/like`);
        updateGuide(response.data.data);
      } catch (error) {
        console.error("Error toggling like:", error);
      } finally {
        setIsLiking(false);
      }
    };
  
    const handleAddComment = async (guideId, text, isAnonymous) => {
      try {
        const response = await axios.post(`/guides/${guideId}/comment`, {
          text,
          isAnonymous,
        });
        updateGuide(response.data.data);
        // Optionally close the modal
        // setIsCommentModalOpen(false);
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    };
  // console.log(guide);
  return (
    <>
      <motion.div
        variants={item}
        whileHover={{ y: -5 }}
        className=" rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-gradient-to-r from-[#f3e6e0] via-[#f1dcd3] to-[#f4d7cb] hover:[#f5bda3] hover:via-blue-200 hover:to-[#f4c5b0]
                                hover:bg-[#f5bda3]"
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
          <div className="flex justify-between items-start">
            <Link to={`/guides/${guide._id}`}>
              <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-200">
                {guide.topic}
              </h2>
            </Link>
            <Link
              to={`/guides/${guide._id}`}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Read More →
            </Link>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2">{guide.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={handleLikeClick}
                className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors"
                disabled={isLiking}
              >
                <svg
                  className={`w-5 h-5 ${
                    guide.likes ? "text-red-500 fill-current" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>{guide.likes.length}</span>
              </button>

              <button
                onClick={() => setIsCommentModalOpen(true)}
                className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span>{guide.comments.length}</span>
              </button>

              <div className="flex items-center gap-1 text-gray-600">
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
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
                <span>{guide.views}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                {guide.createdBy?.name?.charAt(0) || "A"}
              </div>
              <span className="text-sm text-gray-600">
                {guide.isAnonymous ? "Anonymous" : guide.createdBy?.name}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        comments={guide.comments}
        onAddComment={handleAddComment}
        guideId={guide._id}
      />
    </>
  );
};

export default GuideCard;
