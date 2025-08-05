import React, { useState } from "react";
import "../styles/Booking.css";
import { Link } from "react-router-dom";

function Booking() {
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    residency: "",
    aadhaarFile: null,
    panFile: null,
    licenseFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (e.target.type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.residency.toLowerCase() !== "pune") {
      alert("Booking allowed only for Pune residents.");
      return;
    }

    // Simulate a successful booking
    setTimeout(() => {
      setBookingSuccess(true);
    }, 500);
  };

  return (
    <div className="booking-container">
      {bookingSuccess ? (
        <div className="thankyou-box">
          <h2>🎉 Booking Confirmed!</h2>
          <p>You’ll receive a WhatsApp confirmation shortly.</p>
          <Link to="/" className="btn">🏠 Go to Home</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="booking-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="residency"
            placeholder="Current City (Only Pune allowed)"
            value={formData.residency}
            onChange={handleChange}
            required
          />

          <label className="upload-label">Upload Aadhaar Card:</label>
          <input
            type="file"
            name="aadhaarFile"
            accept="image/*,application/pdf"
            onChange={handleChange}
            required
          />

          <label className="upload-label">Upload PAN Card:</label>
          <input
            type="file"
            name="panFile"
            accept="image/*,application/pdf"
            onChange={handleChange}
            required
          />

          <label className="upload-label">Upload Driving License:</label>
          <input
            type="file"
            name="licenseFile"
            accept="image/*,application/pdf"
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn">Book Now</button>
        </form>
      )}
    </div>
  );
}

export default Booking;
