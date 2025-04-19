// screens/EditGuide.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../config/axios";

const EditGuide = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    category: "",
    difficulty: "",
    tags: [],
    chapters: [],
    isAnonymous: false,
  });

  const categories = [
    "Technical",
    "Soft Skills",
    "Career Development",
    "Industry Knowledge",
    "Other",
  ];

  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const response = await axios.get(`/guides/${id}`);
        const guide = response.data.data;
        setFormData({
          topic: guide.topic,
          description: guide.description,
          category: guide.category,
          difficulty: guide.difficulty,
          tags: guide.tags || [],
          chapters: guide.chapters,
          isAnonymous: guide.isAnonymous,
        });
      } catch (error) {
        setError("Failed to fetch guide details");
        console.error("Error fetching guide:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuide();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setFormData((prev) => ({ ...prev, tags }));
  };

  const handleChapterChange = (index, field, value) => {
    const updatedChapters = [...formData.chapters];
    updatedChapters[index] = {
      ...updatedChapters[index],
      [field]: value,
    };
    setFormData((prev) => ({ ...prev, chapters: updatedChapters }));
  };

  const handleContentChange = (chapterIndex, contentIndex, field, value) => {
    const updatedChapters = [...formData.chapters];
    updatedChapters[chapterIndex].content[contentIndex] = {
      ...updatedChapters[chapterIndex].content[contentIndex],
      [field]: value,
    };
    setFormData((prev) => ({ ...prev, chapters: updatedChapters }));
  };

  const addChapter = () => {
    setFormData((prev) => ({
      ...prev,
      chapters: [
        ...prev.chapters,
        {
          chapterTitle: "",
          content: [{ subtopic: "", explanation: "", link: "" }],
        },
      ],
    }));
  };

  const removeChapter = (index) => {
    setFormData((prev) => ({
      ...prev,
      chapters: prev.chapters.filter((_, i) => i !== index),
    }));
  };

  const addContent = (chapterIndex) => {
    const updatedChapters = [...formData.chapters];
    updatedChapters[chapterIndex].content.push({
      subtopic: "",
      explanation: "",
      link: "",
    });
    setFormData((prev) => ({ ...prev, chapters: updatedChapters }));
  };

  const removeContent = (chapterIndex, contentIndex) => {
    const updatedChapters = [...formData.chapters];
    updatedChapters[chapterIndex].content = updatedChapters[
      chapterIndex
    ].content.filter((_, i) => i !== contentIndex);
    setFormData((prev) => ({ ...prev, chapters: updatedChapters }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/guides/${id}`, formData);
      setSuccessMessage("Guide updated successfully!");
      setTimeout(() => {
        navigate(`/guides/${id}`);
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update guide");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 max-w-4xl"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Guide</h1>
        <button
          onClick={() => navigate(`/guides/${id}`)}
          className="text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
        >
          {error}
        </motion.div>
      )}

      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4"
        >
          {successMessage}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Topic
              </label>
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Difficulty</option>
                  {difficulties.map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.tags.join(", ")}
                onChange={handleTagsChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isAnonymous"
                checked={formData.isAnonymous}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Post Anonymously
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Chapters</h2>
            <motion.button
              type="button"
              onClick={addChapter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Add Chapter
            </motion.button>
          </div>

          <AnimatePresence>
            {formData.chapters.map((chapter, chapterIndex) => (
              <motion.div
                key={chapterIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="border rounded-lg p-4 mb-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">
                    Chapter {chapterIndex + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeChapter(chapterIndex)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove Chapter
                  </button>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    value={chapter.chapterTitle}
                    onChange={(e) =>
                      handleChapterChange(
                        chapterIndex,
                        "chapterTitle",
                        e.target.value
                      )
                    }
                    placeholder="Chapter Title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />

                  {chapter.content.map((content, contentIndex) => (
                    <motion.div
                      key={contentIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-l-2 border-blue-200 pl-4 space-y-3"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium">
                          Content {contentIndex + 1}
                        </h4>
                        <button
                          type="button"
                          onClick={() =>
                            removeContent(chapterIndex, contentIndex)
                          }
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>

                      <input
                        type="text"
                        value={content.subtopic}
                        onChange={(e) =>
                          handleContentChange(
                            chapterIndex,
                            contentIndex,
                            "subtopic",
                            e.target.value
                          )
                        }
                        placeholder="Subtopic"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />

                      <textarea
                        value={content.explanation}
                        onChange={(e) =>
                          handleContentChange(
                            chapterIndex,
                            contentIndex,
                            "explanation",
                            e.target.value
                          )
                        }
                        placeholder="Explanation"
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />

                      <input
                        type="url"
                        value={content.link}
                        onChange={(e) =>
                          handleContentChange(
                            chapterIndex,
                            contentIndex,
                            "link",
                            e.target.value
                          )
                        }
                        placeholder="Reference Link (optional)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </motion.div>
                  ))}

                  <motion.button
                    type="button"
                    onClick={() => addContent(chapterIndex)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    + Add Content
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex justify-end space-x-4">
          <motion.button
            type="button"
            onClick={() => navigate(`/guides/${id}`)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Update Guide
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default EditGuide;
