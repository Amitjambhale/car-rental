import React, { useState } from "react";
import "../styles/CheckAvailability.css";

function CheckAvailability() {
  const [formData, setFormData] = useState({
    bookingType: "",
    pickupDate: "",
    pickupTime: "",
    dropDate: "",
    dropTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Checking availability:", { ...formData, city: "Pune" });
  };

  return (
    <div className="check-availability-page">
      <div className="availability-header">
        <h1>Welcome to Car Rental</h1>
        <p>Book reliable and affordable cars for your journey.</p>
      </div>

      <div className="availability-section">
        <form className="check-form-horizontal" onSubmit={handleSubmit}>
          {/* City (static dropdown with only Pune) */}
          <div className="field">
            <label >City</label>
            <select name="city" disabled>
              <option value="Pune">Pune</option>
            </select>
          </div>

          {/* Booking Type */}
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

          {/* Pickup Date */}
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

          {/* Pickup Time */}
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

          {/* Drop Date */}
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

          {/* Drop Time */}
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

          {/* Submit Button */}
          <button type="submit" className="find-btn">
            Find Car
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckAvailability;
