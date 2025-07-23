import React, { useState } from "react";
import { Link } from "react-router-dom"; // 👈 Import Link
import "../styles/Login.css";

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    currentPlace: "",
    proof: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "proof") {
      setFormData({ ...formData, proof: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert(isRegistering ? "Registered!" : "Logged in!");
  };

  return (
    <div className="login-container-wrapper">
      {/* 🔙 Back to Home Button */}


      <div className="login-container">
        <h2>{isRegistering ? "Register" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
          <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange} />
          {isRegistering && (
            <>
              <input type="text" name="currentPlace" placeholder="Current Place" required onChange={handleChange} />
              <input type="file" name="proof" accept=".jpg,.jpeg,.png,.pdf" required onChange={handleChange} />
            </>
          )}
          <button type="submit">{isRegistering ? "Register" : "Login"}</button>
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
