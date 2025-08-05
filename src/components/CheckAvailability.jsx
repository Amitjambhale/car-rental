import React, { useState } from "react";
import "../styles/CheckAvailability.css";
import { useNavigate } from "react-router-dom";

function CheckAvailability() {
  const [formData, setFormData] = useState({
    bookingType: "",
    pickupDate: "",
    pickupTime: "",
    dropDate: "",
    dropTime: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullData = { ...formData, city: "Pune" };
    console.log("Searching:", fullData);
    navigate("/available-cars", { state: fullData });
  };

  return (
    <div className="check-availability-page">
      <div className="availability-header">
        {/* Logo */}
        <img src="/assets/logo.png" alt="Logo" className="availability-logo" />

        {/* Heading */}
        <h1>Welcome to Car Rental</h1>

        {/* Mobile Number */}
        <p className="availability-phone">📞 <strong>Contact:</strong> +91-9730562424</p>


      </div>

      <div className="availability-section">
        <form className="check-form-horizontal" onSubmit={handleSubmit}>
          <div className="field">
            <label>City</label>
            <select name="city" disabled>
              <option value="Pune">Pune</option>
            </select>
          </div>

          <div className="field booking-type">
            <label>
              Book at <span title="Select rental type">ⓘ</span>
            </label>
            <div className="custom-select-wrapper">
              <span className="select-icon">₹</span>
              <select
                name="bookingType"
                value={formData.bookingType}
                onChange={handleChange}
                required
              >
                <option value="">-- select --</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label>Pick Up Date</label>
            <input
              type="date"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Pick Time</label>
            <input
              type="time"
              name="pickupTime"
              value={formData.pickupTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Drop Off Date</label>
            <input
              type="date"
              name="dropDate"
              value={formData.dropDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Drop Time</label>
            <input
              type="time"
              name="dropTime"
              value={formData.dropTime}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="find-btn">
            Find Car
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckAvailability;
