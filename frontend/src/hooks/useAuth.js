// hooks/useAuth.js
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
    const navigate = useNavigate();
    

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");

      // Call logout API
      await axios.get("/users/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Update state
      setIsAuthenticated(false);
      setUser(null);

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Handle any errors here
    }
  };

  return { isAuthenticated, user, logout };
};

export default useAuth;
