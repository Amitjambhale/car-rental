import React from "react";
import { NavLink } from "react-router-dom";

import "../styles/AdminNavbar.css";



function AdminNavbar() {
  return (
    <nav className="admin-navbar">

      <div className="admin-navbar-left">
        <h2 className="Admin-header">Admin Panel</h2>

        <NavLink to="/admin/home">Home</NavLink>
        <NavLink to="/admin/cars">Cars</NavLink>
        <NavLink to="/admin/bookings">Bookings</NavLink>
        <NavLink to="/admin/registermodels">Register Models</NavLink>

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
