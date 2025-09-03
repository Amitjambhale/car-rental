import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/AdminBookings.css";

const API_URL = "http://192.168.1.46:8000/apis/superadmin/bookings/";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(API_URL);
      setBookings(res.data); // API returns booking objects
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleEdit = (booking) => {
    console.log("Edit booking:", booking);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      setBookings(bookings.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <div className="bookings-container">
      <h2 className="title">Admin Bookings</h2>

      <div className="bookings-grid">
        {bookings.length > 0 ? (
          bookings.map((b) => (
            <div key={b.id} className="booking-card">
              <div className="booking-header">
                <h3>Booking ID: {b.id}</h3>
                <p><strong>User:</strong> {b.user}</p>
                <p><strong>Car:</strong> {b.car}</p>
              </div>

              <div className="booking-dates">
                <p>📅 <strong>Pickup:</strong> {b.pickup_date} ⏰ {b.pickup_time}</p>
                <p>📅 <strong>Dropoff:</strong> {b.dropoff_date} ⏰ {b.dropoff_time}</p>
              </div>

              <div className="documents">
                <h4>📂 Documents</h4>
                <ul>
                  <li>
                    DL:{" "}
                    <a href={b.documents?.driving_licence} target="_blank" rel="noreferrer">
                      View
                    </a>
                  </li>
                  <li>
                    Residence Proof:{" "}
                    <a href={b.documents?.residence_proof} target="_blank" rel="noreferrer">
                      View
                    </a>
                  </li>
                  <li>
                    PAN:{" "}
                    <a href={b.documents?.pan_card} target="_blank" rel="noreferrer">
                      View
                    </a>
                  </li>
                  <li>
                    Aadhaar:{" "}
                    <a href={b.documents?.aadhaar_card} target="_blank" rel="noreferrer">
                      View
                    </a>
                  </li>
                  <li>
                    Payment:{" "}
                    <a href={b.documents?.payment_screenshot} target="_blank" rel="noreferrer">
                      View
                    </a>
                  </li>
                </ul>
              </div>

              <div className="action-buttons">
                <button className="btn btn-edit" onClick={() => handleEdit(b)}>
                  ✏️ Edit
                </button>
                <button className="btn btn-delete" onClick={() => handleDelete(b.id)}>
                  🗑 Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-bookings">No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default Bookings;
