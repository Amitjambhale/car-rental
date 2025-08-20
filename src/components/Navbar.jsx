import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // ✅ check login status whenever route changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]); // 👈 ab har navigation par check hoga

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Mobile Top Row */}
      <div className="mobile-top-row">
        <div className="hamburger" onClick={toggleMenu}>☰</div>

        {isLoggedIn ? (
          <button onClick={handleLogout} className="mobile-login">Logout</button>
        ) : (
          <Link to="/login" className="mobile-login">Login</Link>
        )}
      </div>

      {/* Desktop Navbar */}
      <div className="navbar-inner">
        <div className="navbar-left">
          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/cars">Cars</Link>
            
          </div>
        </div>

        <div className="auth-buttons">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>

      {/* Mobile Side Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-close" onClick={toggleMenu}>×</div>
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <Link to="/about" onClick={toggleMenu}>About</Link>
        <Link to="/cars" onClick={toggleMenu}>Cars</Link>
       
      </div>
    </nav>
  );
}

export default Navbar;
