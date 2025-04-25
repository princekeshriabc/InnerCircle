import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import ProgressSection from "../components/profile/ProgressSection"; 
import MyGuides from "../components/guides/MyGuides";
import CommunityStatus from "../components/profile/CommunityStatus";

const menuItems = [
  "Personal Info",
  "Progress",
  "My Guides",
  "Community Status",
];

const Profile = () => {
  const [activeSection, setActiveSection] = useState("Personal Info");
  const [user, setUser] = useState({ name: "", email: "", profilePicture: "" });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")) || {
      name: "User",
      email: "user@example.com",
      profilePicture: "",
    };
    setUser(userData);
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case "Personal Info":
        return (
          <motion.div
            key="personal-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full space-y-4 "
          >
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover shadow-md"
              />
            ) : (
              <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center text-5xl text-white">
                <span className="text-blue-500">{user.name.charAt(0)}</span>
              </div>
            )}
            <h1 className="text-2xl font-semibold">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </motion.div>
        );
      case "Progress":
        return (
          <motion.div
            key="progress"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 text-center"
          >
            <ProgressSection />
          </motion.div>
        );
      case "My Guides":
        return (
          <motion.div
            key="my-guides"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center"
          >
            <MyGuides />
          </motion.div>
        );
      case "Community Status":
        return (
          <motion.div
            key="community-status"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6"
          >
            <CommunityStatus  />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-[81.6vh] text-center bg-gradient-to-bl from-[#f4d6c9] via-[#fc8e57] to-[#2a217c]">
      {/* Main Section */}
      <main className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 p-6 space-y-4 shadow-md">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveSection(item)}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium ${
                activeSection === item
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1  p-8 overflow-y-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Profile;