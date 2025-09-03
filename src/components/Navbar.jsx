import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import { FaUserCircle, FaBars } from "react-icons/fa";
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

  return (
    <nav className="navbar">
      {/* ✅ Mobile Top Row */}
      <div className="mobile-top-row">
        <div className="hamburger" onClick={toggleMenu}>
          <FaBars />
        </div>

        {isLoggedIn ? (
          <button onClick={handleLogout} className="mobile-logout">
            Logout
          </button>
        ) : (
          <Link to="/login" className="mobile-login">
            Login
          </Link>
        )}
      </div>

      {/* ✅ Desktop Links */}
      <div className="navbar-inner">
        <div className="navbar-left">
          <h2 className="navbar-logo">Malhar Cars</h2>

          <div className="navbar-links">
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
              About
            </NavLink>
            <NavLink to="/cars" className={({ isActive }) => (isActive ? "active" : "")}>
              Cars
            </NavLink>
          </div>
        </div>

        <div className="navbar-right">
          {isLoggedIn ? (
            <>
              <FaUserCircle className="profile-icon" onClick={goToProfile} />
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login" className="login-btn">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-close" onClick={toggleMenu}>
          ×
        </div>
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")} onClick={toggleMenu}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")} onClick={toggleMenu}>
          About
        </NavLink>
        <NavLink to="/cars" className={({ isActive }) => (isActive ? "active" : "")} onClick={toggleMenu}>
          Cars
        </NavLink>
        {isLoggedIn && (
          <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")} onClick={toggleMenu}>
            Profile
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
