import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");
  console.log(allowedRole);
  
  

  if (!token || role !== allowedRole) {
    return <Navigate to="/admin/adminlogin" replace />;
  }

  return children;
};

export default ProtectedRoute;

