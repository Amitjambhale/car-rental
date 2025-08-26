// src/components/RequireAdmin.jsx
import { Navigate } from "react-router-dom";

const RequireAdmin = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem("adminToken");

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default RequireAdmin;
