// src/pages/admin/AdminLogin.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/AdminLogin.css";
import { getCookie } from "../../utils/csrf";

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

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const csrfToken = getCookie("csrftoken");

    // ✅ backend ke hisaab se payload
    const payload = {
      Email: formData.email,   // 👈 Capital "E"
      password: formData.password,
    };

    const res = await axios.post(
      "http://192.168.1.46:8000/apis/superadmin/token/",
      payload,
      {
        headers: {
          "X-CSRFToken": csrfToken,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (res.status === 200) {
      // ✅ Save JWT access token
      localStorage.setItem("adminToken", res.data.access);

      alert("✅ Admin Logged In!");
      navigate("/admin/home");
    } else {
      alert("❌ Invalid Admin Email or Password!");
    }
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    alert(
      `⚠️ Login failed: ${
        error.response?.data?.detail || "Please check your credentials!"
      }`
    );
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
