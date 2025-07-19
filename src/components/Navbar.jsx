import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      {/* Mobile Top Row */}
      <div className="mobile-top-row">
        <div className="hamburger" onClick={toggleMenu}>☰</div>

        <div className="mobile-logo-phone">
          <img src={logo} alt="Logo" className="navbar-logo small" />
          <a href="tel:+919876543210" className="mobile-phone">📞 +91-9876543210</a>
        </div>

        <Link to="/login" className="mobile-login">Login</Link>
      </div>

      {/* Desktop Navbar */}
      <div className="navbar-inner">
        <div className="navbar-left">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <span className="navbar-phone">📞 +91-9876543210</span>
        </div>

        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/cars">Cars</Link>
          <Link to="/check-availability">Check Availability</Link>
        </div>

        <div className="auth-buttons">
          <Link to="/login">Login</Link>
        </div>
      </div>

      {/* Mobile Side Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-close" onClick={toggleMenu}>×</div>
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <Link to="/about" onClick={toggleMenu}>About</Link>
        <Link to="/cars" onClick={toggleMenu}>Cars</Link>
        <Link to="/check-availability" onClick={toggleMenu}>Check Availability</Link>
      </div>
    </nav>
  );
}

export default Navbar;
