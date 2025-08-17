import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://192.168.0.108:8000/api/login/", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200) {
        // ✅ Save token if backend sends it
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }
        setMessage("Login successful!");
        navigate("/"); // redirect to home/dashboard
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
        {message && <p>{message}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="Email"
            placeholder="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>

        <p className="toggle-text">
          Don’t have an account?{" "}
          <Link to="/register" className="toggle-link">
            Register
          </Link>
        </p>

        <div className="back-home-wrapper">
          <Link to="/" className="back-home-btn">⬅ Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
