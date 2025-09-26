import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "../styles/AdminNavbar.css";

function AdminNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    console.log("menuOpen changed to:", menuOpen);
  }, [menuOpen]);

  return (
    <nav className="admin-navbar" onClick={(e) => e.stopPropagation()}>
      {/* Left container: mobile icon + logo + desktop links */}
      <div className="navbar-left-container">
        <div className="mobile-menu-icon" onClick={toggleMenu} aria-label="Toggle menu">
          <FaBars />
        </div>

        <div className="admin-navbar-left">
          <h2 className="navbar-header">Admin Panel</h2>
          <div className="desktop-links">
            <NavLink to="/admin/home">Home</NavLink>
            <NavLink to="/admin/cars">Cars</NavLink>
            <NavLink to="/admin/bookings">Bookings</NavLink>
            <NavLink to="/admin/registermodels">Users</NavLink>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="admin-navbar-right">
        <button
          onClick={(e) => {
            e.stopPropagation();
            localStorage.removeItem("adminToken");
            window.location.href = "/admin/login";
          }}
        >
          Logout
        </button>
      </div>

      {/* Mobile menu drawer */}
      <div
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        role="menu"
        aria-hidden={!menuOpen}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mobile-close" onClick={toggleMenu} aria-label="Close menu">
          ×
        </div>
        <NavLink to="/admin/home" onClick={toggleMenu}>
          Home
        </NavLink>
        <NavLink to="/admin/cars" onClick={toggleMenu}>
          Cars
        </NavLink>
        <NavLink to="/admin/bookings" onClick={toggleMenu}>
          Bookings
        </NavLink>
        <NavLink to="/admin/registermodels" onClick={toggleMenu}>
          Users
        </NavLink>
      </div>
    </nav>
  );
}

export default AdminNavbar;
