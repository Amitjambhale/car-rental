import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import "../styles/Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Email: "",
    Name: "",
    Date_Of_Birth: "",
    Mobile_no: "",
    password: "",
    password2: ""
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePassword2Visibility = () => {
    setShowPassword2(!showPassword2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.password2) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const payload = {
        Email: formData.Email,
        Name: formData.Name,
        Date_Of_Birth: formData.Date_Of_Birth,
        Mobile_no: formData.Mobile_no,
        password: formData.password,
        password2: formData.password2
      };

      const res = await axios.post("http://10.181.222.14:8000/api/register/", payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200 || res.status === 201) {
        setMessage("Registration successful!"); // Set success message
        navigate("/login"); // Immediate navigation to login
      } else {
        setMessage(res.data.message || "Something went wrong.");
      }
    } catch (err) {
      if (err.response) {
        console.error("Backend status:", err.response.status);
        console.error("Backend data:", JSON.stringify(err.response.data, null, 2));
        setMessage("Registration failed. Check inputs.");
      } else {
        console.error("Request error:", err);
        setMessage("Network or server is down.");
      }
    }
  };

  return (
    <div className="register-container-wrapper">
      <div className="register-container">
        <h2>Register</h2>
        {message && <p className={`register-message ${message.includes("failed") || message.includes("Passwords") || message.includes("wrong") ? "error" : ""}`}>{message}</p>}
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
            type="text"
            name="Name"
            placeholder="Name"
            value={formData.Name}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="Date_Of_Birth"
            placeholder="Date of Birth"
            value={formData.Date_Of_Birth}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="Mobile_no"
            placeholder="Mobile No"
            value={formData.Mobile_no}
            onChange={handleChange}
            required
          />
          <div className="register-password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="register-password-toggle-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <BiHide /> : <BiShow />}
            </span>
          </div>
          <div className="register-password-input-wrapper">
            <input
              type={showPassword2 ? "text" : "password"}
              name="password2"
              placeholder="Confirm Password"
              value={formData.password2}
              onChange={handleChange}
              required
            />
            <span className="register-password-toggle-icon" onClick={togglePassword2Visibility}>
              {showPassword2 ? <BiHide /> : <BiShow />}
            </span>
          </div>
          <button type="submit">Register</button>
        </form>
        <p className="register-toggle-text">
          Already have an account?{" "}
          <Link to="/login" className="register-toggle-link">Login</Link>
        </p>
        <div className="register-back-home-wrapper">
          <Link to="/" className="register-back-home-btn">⬅ Back to Home</Link>
        </div>
      </div>
    </div>
  );
}