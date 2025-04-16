import React, { createContext, useState, useContext } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

// Create the UserContext
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const navigate = useNavigate();

  // Add logout function to context
  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // If no token, just clear local state
        localStorage.clear();
        setUser(null);
        return true;
      }
      // Call logout API
      await axios.get("/users/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Clear storage and state
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      // localStorage.clear();

      // Navigate to home
      // navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
