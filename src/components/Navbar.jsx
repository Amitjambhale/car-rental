import React, { useState } from "react";
import { Link } from "react-router-dom";

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
          <img src="/assets/logo.png" alt="Logo" className="navbar-logo small" />
          <a href="tel:+919730562424" className="mobile-phone">📞 +91-9730562424</a>
        </div>

        <Link to="/login" className="mobile-login">Login</Link>
      </div>

      {/* Desktop Navbar */}
      <div className="navbar-inner">
        <div className="navbar-left">
          <img src="/assets/logo.png" className="navbar-logo" alt="Logo" />
          <span className="navbar-phone">📞 +91-9730562424</span>

          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/cars">Cars</Link>
            <Link to="/check-availability">Check Availability</Link>
          </div>
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
