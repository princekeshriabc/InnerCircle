// components/Navbar.jsx
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserContext } from "../context/user.context";
import { FiSettings, FiLogOut } from "react-icons/fi"; // Import settings icon

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { title: "Home", path: "/" },
    { title: "Course Selector", path: "/course-selector" },
    { title: "Courses", path: "/courses" },
    { title: "Pricing", path: "/pricing" },
    { title: "FAQ", path: "/faq" },
    { title: "Contact US", path: "/contact" },
  ];
  const menuVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const menuItemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-md fixed w-full top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/ezy-skills-logo.png"
                alt="EZY Skills Logo"
                className="h-8 w-8 sm:h-10 sm:w-10" // Adjusted size for mobile
              />
              <span className="ml-2 text-lg sm:text-xl font-bold text-[#FF9361] whitespace-nowrap">
                Inner Circle
              </span>
            </Link>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {navItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className="text-sm xl:text-base text-gray-600 hover:text-[#FF9361] hover:bg-blue-100 px-3 py-2 rounded-md transition-all duration-300" // Added hover:bg-blue-100 and padding
                >
                  {item.title}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Auth Buttons or User Profile */}
          <div className="hidden sm:flex items-center space-x-4">
            {!user ? (
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 text-sm text-[#FF9361] border border-[#FF9361] rounded-md hover:bg-[#FF9361] hover:text-white transition-colors"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 text-sm bg-[#FF9361] text-white rounded-md hover:bg-[#ff7a41] transition-colors"
                  onClick={() => navigate("/register")}
                >
                  Create Account
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                >
                  <FiSettings
                    className="w-5 h-5 text-gray-600 hover:text-[#FF9361]"
                    onClick={() => navigate("/settings")}
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                >
                  <img
                    src={user.profileImage || "https://via.placeholder.com/40"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-[#FF9361]"
                    onClick={() => navigate("/profile")}
                  />
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
            >
              <motion.div
                animate={isMenuOpen ? "open" : "closed"}
                className="w-6 h-5 flex flex-col justify-between"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 8 },
                  }}
                  className="w-full h-0.5 bg-[#FF9361] block"
                ></motion.span>
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  className="w-full h-0.5 bg-[#FF9361] block"
                ></motion.span>
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -8 },
                  }}
                  className="w-full h-0.5 bg-[#FF9361] block"
                ></motion.span>
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        variants={menuVariants}
        className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-lg rounded-b-2xl overflow-hidden"
      >
        <div className="px-4 py-2 space-y-2">
          {navItems.map((item, index) => (
            <motion.div
              key={index}
              variants={menuItemVariants}
              className="border-b border-gray-100 last:border-0 hover:bg-blue-100"
            >
              <Link
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="block w-full py-2 px-3 text-gray-600 hover:text-[#FF9361] hover:bg-blue-100 rounded-md transition-all duration-300" // Added hover:bg-blue-100 and padding
              >
                {item.title}
              </Link>
            </motion.div>
          ))}

          {/* Mobile Auth Buttons */}
          <div className="pt-2 pb-4">
            {!user ? (
              <motion.div variants={menuItemVariants} className="space-y-2">
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-2 text-[#FF9361] border border-[#FF9361] rounded-lg hover:bg-[#FF9361] hover:text-white transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-2 bg-[#FF9361] text-white rounded-lg hover:bg-[#ff7a41] transition-colors"
                >
                  Create Account
                </button>
              </motion.div>
            ) : (
              <motion.div variants={menuItemVariants} className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={user.profileImage || "https://via.placeholder.com/40"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-[#FF9361]"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <Link
                  to="/settings"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-[#FF9361] transition-colors"
                >
                  <FiSettings className="w-5 h-5" />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={() => {
                    // logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FiLogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Backdrop */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-opacity-25 z-40"
        />
      )}
    </motion.nav>
  );
};

export default Navbar;
