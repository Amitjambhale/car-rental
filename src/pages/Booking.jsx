import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../src/utils/axiosInstance";
import "../styles/Booking.css";

function Booking() {
  const { id } = useParams();
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [showScanner, setShowScanner] = useState(false); // ✅ state for QR modal

  const [formData, setFormData] = useState({
    pickup_date: "",
    pickup_time: "",
    dropoff_date: "",
    dropoff_time: "",
    driving_licence: null,
    residence_proof: null,
    pan_card: null,
    payment_screenshot: null,
    aadhaar_card: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [yyyy, mm, dd] = dateStr.split("-");
        return `${dd}-${mm}-${yyyy}`;
      };
      const formatTime = (timeStr) => (timeStr ? timeStr.slice(0, 5) : "");

      const data = new FormData();
      data.append("pickup_date", formatDate(formData.pickup_date));
      data.append("pickup_time", formatTime(formData.pickup_time));
      data.append("dropoff_date", formatDate(formData.dropoff_date));
      data.append("dropoff_time", formatTime(formData.dropoff_time));

      ["driving_licence", "residence_proof", "pan_card", "payment_screenshot", "aadhaar_card"].forEach((key) => {
        if (formData[key]) data.append(key, formData[key]);
      });

      const token = localStorage.getItem("authToken");

      const res = await axiosInstance.post(
        `http://10.181.222.14:8000/api/cars/${id}/book/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201 || res.status === 200) {
        setBookingSuccess(true);
        setMessage("Booking successful!");
      }
    } catch (err) {
      console.error("Booking error:", err.response?.data || err.message);
      setMessage(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Booking failed. Please check your details."
      );
    }
  };

  return (
    <div className="booking-page-container">
      <div className="booking-wrapper">
        <h2 className="booking-heading">Book Your Car</h2>
      </div>
      {bookingSuccess ? (
        <div className="booking-thankyou-box">
          <h2>🎉 Booking Confirmed!</h2>
          <p>You’ll receive a WhatsApp confirmation shortly.</p>
          <Link to="/" className="booking-btn">
            🏠 Go to Home
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="booking-form-wrapper">
          {message && <p className="booking-form-message">{message}</p>}

          {/* Pickup Date & Time */}
          <div className="booking-form-row">
            <input type="date" name="pickup_date" value={formData.pickup_date} onChange={handleChange} required />
            <input type="time" name="pickup_time" value={formData.pickup_time} onChange={handleChange} required />
          </div>

          {/* Dropoff Date & Time */}
          <div className="booking-form-row">
            <input type="date" name="dropoff_date" value={formData.dropoff_date} onChange={handleChange} required />
            <input type="time" name="dropoff_time" value={formData.dropoff_time} onChange={handleChange} required />
          </div>

          {/* File Uploads */}
          <label className="booking-label">Driving Licence:</label>
          <input type="file" name="driving_licence" accept="image/*" onChange={handleChange} required />

          <label className="booking-label">Residence Proof:</label>
          <input type="file" name="residence_proof" accept="image/*" onChange={handleChange} required />

          <label className="booking-label">PAN Card:</label>
          <input type="file" name="pan_card" accept="image/*" onChange={handleChange} required />

          {/* ✅ Payment QR Scanner Section */}
          <div className="payment-section">
            <h3>📲 Make Payment</h3>
            <p>Scan the QR code below to complete your payment.</p>
            <div className="qr-box">
              <img
                src="/assets/admin-scanner.jpg"
                alt="Payment QR"
                className="qr-image"
                onClick={() => setShowScanner(true)} // ✅ open modal
              />
            </div>
            <p className="qr-hint">Click the QR to enlarge</p>
          </div>

          <label className="booking-label">Upload Payment Screenshot:</label>
          <input type="file" name="payment_screenshot" accept="image/*" onChange={handleChange} required />

          <label className="booking-label">Aadhaar Card:</label>
          <input type="file" name="aadhaar_card" accept="image/*" onChange={handleChange} required />

          <button type="submit" className="booking-submit-btn">
            Book Now →
          </button>
        </form>
      )}

      {/* ✅ QR Modal */}
      {showScanner && (
        <div className="qr-modal" onClick={() => setShowScanner(false)}>
          <div className="qr-modal-content">
            <img src="/assets/admin-scanner.jpg" alt="QR Full" className="qr-full" />
          </div>
        </div>
      )}


    </div>
  );
}

export default Booking;
