import React, { useState } from "react";
import "../styles/Booking.css"; // We'll create this CSS file too
import { Link } from "react-router-dom";


function Booking() {
const [bookingSuccess, setBookingSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    aadhaar: "",
    license: "",
    age: "",
    residency: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.residency.toLowerCase() !== "pune") {
    alert("Booking allowed only for Pune residents.");
    return;
  }

  // Simulate a successful booking without backend
  setTimeout(() => {
    setBookingSuccess(true);
  }, 500); // Simulates network delay
};



return (
  <div className="booking-container">
    {bookingSuccess ? (
      <div className="thankyou-box">
        <h2>🎉 Booking Confirmed!</h2>
        <p>Thank you for booking. You’ll receive a WhatsApp confirmation shortly.</p>
        <Link to="/" className="btn">🏠 Go to Home</Link>
      </div>
    ) : (
      <form onSubmit={handleSubmit}>
        {/* Your existing form fields */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="aadhaar"
          placeholder="Aadhaar Number"
          value={formData.aadhaar}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="license"
          placeholder="Driving License Number"
          value={formData.license}
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

        <button type="submit" className="btn">Book Now</button>
      </form>
    )}
  </div>
);

}

export default Booking;
