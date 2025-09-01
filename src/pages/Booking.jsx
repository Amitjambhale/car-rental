import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../src/utils/axiosInstance"; // ✅ Use our interceptor axios
import "../styles/Booking.css";

function Booking() {
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    car_id: "",
    pick_up_date: "",
    pick_time: "",
    drop_off_date: "",
    drop_time: "",
    driving_licence: null,
    residence_proof: null,
    pan_card: null,
    payment_screenshot: null,
    aadhaar_card: null,
  });

  // ✅ handle form field changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // ✅ submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== "") {
          data.append(key, formData[key]);
        }
      });

      const res = await axiosInstance.post("bookcar/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201 || res.status === 200) {
        setBookingSuccess(true);
        setMessage("Booking successful!");
      }
    } catch (err) {
      console.error("Booking error:", err.response?.data || err.message);
      setMessage(
        err.response?.data?.message || "Booking failed. Please check your details."
      );
    }
  };

  return (
    <div className="booking-container">
      {bookingSuccess ? (
        <div className="thankyou-box">
          <h2>🎉 Booking Confirmed!</h2>
          <p>You’ll receive a WhatsApp confirmation shortly.</p>
          <Link to="/" className="btn">
            🏠 Go to Home
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="booking-form">
          {message && <p className="form-message">{message}</p>}

          <input
            type="text"
            name="car_id"
            placeholder="Car ID"
            value={formData.car_id}
            onChange={handleChange}
            required
          />

          <div className="form-row">
            <input
              type="date"
              name="pick_up_date"
              value={formData.pick_up_date}
              onChange={handleChange}
              required
            />
            <input
              type="time"
              name="pick_time"
              value={formData.pick_time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <input
              type="date"
              name="drop_off_date"
              value={formData.drop_off_date}
              onChange={handleChange}
              required
            />
            <input
              type="time"
              name="drop_time"
              value={formData.drop_time}
              onChange={handleChange}
              required
            />
          </div>

          <label>Driving Licence:</label>
          <input
            type="file"
            name="driving_licence"
            accept="image/*"
            onChange={handleChange}
            required
          />

          <label>Residence Proof:</label>
          <input
            type="file"
            name="residence_proof"
            accept="image/*"
            onChange={handleChange}
            required
          />

          <label>PAN Card:</label>
          <input
            type="file"
            name="pan_card"
            accept="image/*"
            onChange={handleChange}
            required
          />

          <label>Payment Screenshot:</label>
          <input
            type="file"
            name="payment_screenshot"
            accept="image/*"
            onChange={handleChange}
            required
          />

          <label>Aadhaar Card:</label>
          <input
            type="file"
            name="aadhaar_card"
            accept="image/*"
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn">
            🚗 Book Now
          </button>
        </form>
      )}
    </div>
  );
}

export default Booking;
