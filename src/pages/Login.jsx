import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://10.181.222.14:8000/api/login/", formData, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) {
        localStorage.setItem("authToken", res.data.Token.access);
        localStorage.setItem("refresh_token", res.data.Token.Refresh);
        window.dispatchEvent(new Event("storageChange"));
        setMessage("Login successful!");
        navigate("/");
      } else {
        setMessage(res.data.message || "Invalid login credentials.");
      }
    } catch (err) {
      if (err.response) {
        console.error("Backend error:", err.response.data);
        setMessage(err.response.data.message || "Invalid email or password.");
      } else {
        console.error("Request error:", err);
        setMessage("Network or server is down.");
      }
    }
  };

  return (
    <div className="login-container-wrapper">
      <div className="login-container">
        <h2>Login</h2>
        {message && <p className={`login-message ${message.includes("Invalid") || message.includes("failed") ? "error" : ""}`}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="Email"
            placeholder="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
          <div className="login-password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="login-password-toggle-icons" onClick={togglePasswordVisibility}>
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>
          <button type="submit">Login</button>
        </form>
        <p className="login-toggle-text">
          Don’t have an account?{" "}
          <Link to="/register" className="login-toggle-link">Register</Link>
        </p>
        <div className="login-back-home-wrapper">
          <Link to="/" className="login-back-home-btn">⬅ Back to Home</Link>
        </div>
      </div>
    </div>
  );
}