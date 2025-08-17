import React from "react";
import { Link } from "react-router-dom";
import "../styles/AdminNavbar.css";

function AdminNavbar() {
  return (
    <nav className="admin-navbar">
     
        <div className="admin-navbar-left">
        <h2>Admin Panel</h2>
      
        <Link to="/admin">Admin Home</Link>
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/manage-cars">Manage Cars</Link>
        <Link to="/admin/manage-bookings">Manage Bookings</Link>
      </div>
      <div className="admin-navbar-right">
        <button
          onClick={() => {
            localStorage.removeItem("adminToken"); // example logout
            window.location.href = "/admin/login";
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default AdminNavbar;
