import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem("admin"));

  if (!user || user.role !== allowedRole) {
    return <Navigate to="/admin/adminlogin" replace />;
  }

  return children;
};

export default ProtectedRoute;
