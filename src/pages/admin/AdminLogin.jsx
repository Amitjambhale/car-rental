// src/pages/admin/AdminLogin.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/AdminLogin.css";
import { getCookie } from "../../utils/csrf";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // 👈 import eye icons

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false); // 👈 toggle password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const csrfToken = getCookie("csrftoken");

      const payload = {
        Email: formData.email,
        password: formData.password,
      };

      const res = await axios.post(
        "http://10.181.222.14:8000/apis/superadmin/token/",
        payload,
        {
          headers: {
            "X-CSRFToken": csrfToken,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      localStorage.setItem("adminToken", res.data.token.access);
      if (res.status === 200) {
        alert("✅ Admin Logged In!");
        navigate("/admin/home");
      } else {
        alert("❌ Invalid Admin Email or Password!");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(
        `⚠️ Login failed: ${error.response?.data?.detail || "Please check your credentials!"}`
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

          <div className="passwords-input-wrapper">
            <input
              type={showPassword ? "text" : "password"} // 👈 toggle
              name="password"
              placeholder="Password"
              value={formData.password}
              required
              onChange={handleChange}
            />
            <span
              className="passwords-toggle-icon"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>

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
