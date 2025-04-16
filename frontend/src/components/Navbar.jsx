// components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserContext,useUser } from "../context/user.context";
import { FiSettings, FiLogOut } from "react-icons/fi"; // Import settings icon


const Navbar = () => {
  const { user, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const success = await logout();
      if (success) {
        navigate("/"); // Navigate after successful logout
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
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
                src="/assets/img9.jpg"
                alt="Inner Circle Logo"
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full" // Adjusted size for mobile
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
                    src={user.profileImage || "/assets/img9.jpg"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-[#FF9361]"
                    onClick={() => navigate("/profile")}
                  />
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1.5 text-sm text-red-500 border border-red-500 rounded-md hover:bg-red-50 transition-colors ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleLogout}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Logging out...
                    </span>
                  ) : (
                    "Logout"
                  )}
                </motion.button>
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
