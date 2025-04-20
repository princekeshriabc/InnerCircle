// import { Navigate } from "react-router-dom";
// import { useUser } from "../context/user.context";
// import { useEffect, useState } from "react";
// import axios from "../config/axios";

// const ProtectedRoute = ({ children }) => {
//   const [authorized, setAuthorized] = useState(null); // null = loading, false = not authorized, true = authorized

//   const token = localStorage.getItem("token");
//   const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

//   useEffect(() => {
//     const checkAuthorization = async () => {
//       if (!user || !token) {
//         setAuthorized(false);
//         return;
//       }

//       try {
//         const response = await axios.get(`/users/${user._id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.status === 200 && response.data) {
//           setAuthorized(true);
//         } else {
//           setAuthorized(false);
//         }
//       } catch (error) {
//         setAuthorized(false);
//       }
//     };

//     checkAuthorization();
//   }, [user, token]);

//   if (!authorized) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// export default ProtectedRoute;



import { Navigate } from "react-router-dom";
import { useUser } from "../context/user.context";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const token = localStorage.getItem("token");

  if (!user || !token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
