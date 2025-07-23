import React, { useState } from "react";
import "../styles/CheckAvailability.css";

function CheckAvailability() {
  const [formData, setFormData] = useState({
    bookingType: "Daily",
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
    <div className="availability-section">
      <div className="check-form-container transparent-form">
        <form className="check-form" onSubmit={handleSubmit}>
          <div className="pune-title">Pune</div>

          <div className="form-group">
            <label>Booking Type</label>
            <select
              name="bookingType"
              value={formData.bookingType}
              onChange={handleChange}
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group wide">
              <label>Pick-Up Date</label>
              <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group small">
              <label>Pick-Up Time</label>
              <input
                type="time"
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group wide">
              <label>Drop Date</label>
              <input
                type="date"
                name="dropDate"
                value={formData.dropDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group small">
              <label>Drop Time</label>
              <input
                type="time"
                name="dropTime"
                value={formData.dropTime}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="find-btn">
              Find a Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckAvailability;
