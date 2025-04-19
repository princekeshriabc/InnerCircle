// screens/GuideDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import axios from "../config/axios";

const GuideDetail = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const response = await axios.get(`/guides/${id}`);
        const fetchedGuide = response.data.data;
        setGuide(fetchedGuide);
        setLoading(false);

        // Now check the user after guide is set
        const user = JSON.parse(localStorage.getItem("user"));
        // console.log("user:", user);
        // console.log("fetched guide:", fetchedGuide);

        if (user && fetchedGuide && fetchedGuide.createdBy._id === user._id) {
          setIsCurrentUser(true);
        } else {
          setIsCurrentUser(false);
        }
      } catch (error) {
        console.error("Error fetching guide or checking user:", error);
        setLoading(false);
      }
    };

    fetchGuide();
  }, [id]);
  

    const handleUpdate = () => {
      navigate(`/guides/edit/${id}`);
    };

    const handleDelete = async () => {
      try {
        await axios.delete(`/guides/${id}`);
        navigate('/guides');
      } catch (error) {
        console.error("Error deleting guide:", error);
      }
    };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!guide) {
    return <div>Guide not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {guide.category}
          </span>
          <span className="text-gray-500">{guide.difficulty}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold mb-4">{guide.topic}</h1> 
          {isCurrentUser && (
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDeleteModalOpen(true)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </motion.button>
            </div>
          )}
        </div>
        <p className="text-gray-600 mb-4">{guide.description}</p>
        <div className="text-sm text-gray-500">
          By {guide.isAnonymous ? "Anonymous" : guide.createdBy.name}
        </div>
      </div>
      <div className="space-y-8">
        {guide.chapters.map((chapter, index) => (
          <div key={index} className="border-b pb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {chapter.chapterTitle}
            </h2>
            <div className="space-y-6">
              {chapter.content.map((content, contentIndex) => (
                <div key={contentIndex} className="ml-4">
                  <h3 className="text-xl font-medium mb-2">
                    {content.subtopic}
                  </h3>
                  <p className="text-gray-700 mb-2">{content.explanation}</p>
                  {content.link && (
                    <a
                      href={content.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      Learn More →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
       {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this guide? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default GuideDetail;

// console.log("isCurrentUser:", isCurrentUser);
  // const fetchGuide = async () => {
  //   try {
  //     const response = await axios.get(`/guides/${id}`);
  //     setGuide(response.data.data);
  //     console.log("guide after set:", guide);
  //   } catch (error) {
  //     console.error("Error fetching guide:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  //  const checkCurrentUser = async () => {
  //   try {
  //     const user = JSON.parse(localStorage.getItem('user')); // Assuming you store user data in localStorage
  //     console.log("user:",user);
  //     console.log("guide in curr user:",guide);
  //     if (guide && user && guide.createdBy._id === user._id) {
  //       console.log("isCurrentUser set:", isCurrentUser);
  //       setIsCurrentUser(true);
  //     }
  //     // console.log("isCurrentUser:", isCurrentUser);
  //   } catch (error) {
  //     console.error("Error checking user:", error);
  //   }
  //      };
  // console.log("isCurrentUser x:", isCurrentUser);
// console.log("guide x:", guide);
  
// screens/GuideDetail.jsx
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import axios from "../config/axios";

// const GuideDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [guide, setguide] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isCurrentUser, setIsCurrentUser] = useState(false); // Add this state
//   // console.log(id)
//   useEffect(() => {
//     fetchGuide();
//     checkCurrentUser(); // Add this function call
//   }, [id]);

//   const checkCurrentUser = async () => {
//     try {
//       const user = JSON.parse(localStorage.getItem('user')); // Assuming you store user data in localStorage
//       console.log("user:",user);
//       console.log("guide:",guide);
//       if (guide && user && guide.createdBy._id === user._id) {
//         setIsCurrentUser(true);
//       }
//     } catch (error) {
//       console.error("Error checking user:", error);
//     }
//   };

//   const fetchGuide = async () => {
//     try {
//       const response = await axios.get(`/guides/${id}`);
//       console.log("fetch guide:", response.data.data.createdBy._id);
//       setguide(response.data.data);
//       console.log("guide after set:", guide);
//     } catch (error) {
//       console.error("Error fetching guide:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdate = () => {
//     navigate(`/guides/edit/${id}`);
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`/guides/${id}`);
//       navigate('/guides');
//     } catch (error) {
//       console.error("Error deleting guide:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (!guide) {
//     return <div>Guide not found</div>;
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="container mx-auto px-4 py-8 max-w-4xl"
//     >
//       <div className="mb-8">
//         <div className="flex items-center justify-between mb-4">
//           <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
//             {guide.category}
//           </span>
//           <span className="text-gray-500">{guide.difficulty}</span>
//         </div>
        
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-3xl font-bold">{guide.topic}</h1>
//           {console.log(isCurrentUser)}
//           {isCurrentUser && (
//             <div className="flex space-x-3">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleUpdate}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center"
//               >
//                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                 </svg>
//                 Edit
//               </motion.button>

//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setIsDeleteModalOpen(true)}
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center"
//               >
//                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                 </svg>
//                 Delete
//               </motion.button>
//             </div>
//           )}
//         </div>

//         <p className="text-gray-600 mb-4">{guide.description}</p>
//         <div className="text-sm text-gray-500">
//           By {guide.isAnonymous ? "Anonymous" : guide.createdBy.name}
//         </div>
//       </div>

//       {/* Chapters section remains the same */}
//       <div className="space-y-8">
//         {guide.chapters.map((chapter, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className="border-b pb-8"
//           >
//             {/* Chapter content remains the same */}
//           </motion.div>
//         ))}
//       </div>

//       {/* Delete Confirmation Modal */}
//       {isDeleteModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
//           >
//             <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to delete this guide? This action cannot be undone.
//             </p>
//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={() => setIsDeleteModalOpen(false)}
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
//               >
//                 Delete
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default GuideDetail;
