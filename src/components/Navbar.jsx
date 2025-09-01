import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle, FaBars } from "react-icons/fa"; // Corrected import
import "../styles/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken"));
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const checkLogin = () => setIsLoggedIn(!!localStorage.getItem("authToken"));

    checkLogin();

    window.addEventListener("storage", checkLogin);
    window.addEventListener("storageChange", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
      window.removeEventListener("storageChange", checkLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refresh_token");
    window.dispatchEvent(new Event("storageChange"));
    setMenuOpen(false);
    navigate("/login");
  };

  const goToProfile = () => {
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };
console.log(isLoggedIn)
  return (
    <nav className="navbar">
      {/* Mobile Top Row */}
      <div className="mobile-top-row">
        <div className="hamburger" onClick={toggleMenu}>
          <FaBars />
        </div>

        {isLoggedIn ? (
          <button onClick={handleLogout} className="mobile-login">
            Logout
          </button>
        ) : (
          <Link to="/login" className="mobile-login">
            Login
          </Link>
        )}
      </div>

      {/* Desktop Navbar */}
      <div className="navbar-inner">
        <div className="navbar-left">
          <FaUserCircle className="profile-icon" onClick={goToProfile} /> {/* Fixed component name */}

          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/cars">Cars</Link>
          </div>
        </div>

        <div className="auth-buttons">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>

      {/* Mobile Side Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-close" onClick={toggleMenu}>
          ×
        </div>
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <Link to="/about" onClick={toggleMenu}>About</Link>
        <Link to="/cars" onClick={toggleMenu}>Cars</Link>
        {isLoggedIn && (
          <Link to="/profile" onClick={toggleMenu}>Profile</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
