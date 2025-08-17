import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

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

  const handleChange = (e) => {
    // name ko exact state ke keys ke sath match karna hai
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

    const res = await axios.post("http://192.168.0.108:8000/api/register/", payload, {
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 200 || res.status === 201) {
      setMessage(res.data.message || "Registration successful!");
      navigate("/login");
    } else {
      setMessage(res.data.message || "Something went wrong.");
    }
  }
  
  catch (err) {
  if (err.response) {
    console.error("Backend status:", err.response.status);
    console.error("Backend data:", JSON.stringify(err.response.data, null, 2)); // 👈 JSON format me dekhne ke liye
    setMessage("Registration failed. Check inputs.");
  } else {
    console.error("Request error:", err);
    setMessage("Network or server is down.");
  }
}

};


  return (
    <div className="login-container-wrapper">
      <div className="login-container">
        <h2>Register</h2>
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
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            value={formData.password2}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>

        <p className="toggle-text">
          Already have an account?{" "}
          <Link to="/login" className="toggle-link">Login</Link>
        </p>

        <div className="back-home-wrapper">
          <Link to="/" className="back-home-btn">⬅ Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
