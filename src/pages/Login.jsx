import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    currentPlace: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert(isRegistering ? "Registered!" : "Logged in!");
  };

  return (
    <div className="login-container-wrapper">
      <div className="login-container">
        
        <h2>{isRegistering ? "Register" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
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
                name="currentPlace"
                placeholder="Current Place"
                required
                onChange={handleChange}
              />
            </>
          )}
          <button type="submit">
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>

        <p onClick={() => setIsRegistering(!isRegistering)} className="toggle-text">
          {isRegistering ? "Already have an account? Login" : "New user? Register here"}
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

export default Login;
