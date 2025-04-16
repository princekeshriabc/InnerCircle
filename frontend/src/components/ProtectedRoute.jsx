import { Navigate } from "react-router-dom";
import { useUser } from "../context/user.context";

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
