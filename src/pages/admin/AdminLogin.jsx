import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    adminCode: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegistering) {
      console.log("Admin Registration Data:", formData);
      alert("Admin Registered!");
    } else {
      // ✅ Hardcoded login credentials
      const adminEmail = "admin@example.com";
      const adminPass = "123456";

      if (formData.email === adminEmail && formData.password === adminPass) {
        alert("Admin Logged In!");
        navigate("/admin"); // ✅ Navigate to AdminHome
      } else {
        alert("Invalid Admin Email or Password!");
      }
    }
  };

  return (
    <div className="admin-login-container-wrapper">
      <div className="admin-login-container">
        <h2>{isRegistering ? "Admin Register" : "Admin Login"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />
          {isRegistering && (
            <>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="adminCode"
                placeholder="Secret Admin Code"
                required
                onChange={handleChange}
              />
            </>
          )}
          <button type="submit">
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>

        <p
          onClick={() => setIsRegistering(!isRegistering)}
          className="toggle-text"
        >
          {isRegistering
            ? "Already an admin? Login"
            : "New admin? Register here"}
        </p>

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
