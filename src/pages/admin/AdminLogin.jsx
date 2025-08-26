// src/pages/admin/AdminLogin.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Hardcoded login credentials
    const adminEmail = "admin@gmail.com";
    const adminPass = "123456";

    if (formData.email === adminEmail && formData.password === adminPass) {
      localStorage.setItem("adminToken", "true"); // ✅ Admin token save
      alert("Admin Logged In!");
      navigate("/admin/home");


    } else {
      alert("❌ Invalid Admin Email or Password!");
    }
  };

  return (
    <div className="admin-login-container-wrapper">
      <div className="admin-login-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={formData.email}
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            required
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>

        <div className="back-home-wrapper">
          <Link to="/" className="back-home-btn">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
