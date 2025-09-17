import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminBookings.css";

const API_URL = "http://192.168.1.46:8000/apis/superadmin/bookings/";
const CAR_API_URL = "http://192.168.1.46:8000/api/cars/";

const Bookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("adminRefreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const res = await axios.post("http://192.168.1.46:8000/api/refresh/", {
        refresh: refreshToken,
      });

      if (res.status === 200) {
        localStorage.setItem("adminToken", res.data.access);
        window.dispatchEvent(new Event("storageChange"));
        return res.data.access;
      } else {
        throw new Error("Failed to refresh token");
      }
    } catch (err) {
      console.error("Token refresh error:", err.response?.data || err.message);
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminRefreshToken");
      navigate("/admin/login");
      return null;
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("⚠️ No admin token found. Please login first.");
        return;
      }

      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Fetch car details for each booking
      const bookingsWithCarNames = await Promise.all(
        res.data.map(async (booking) => {
          try {
            const carRes = await axios.get(`${CAR_API_URL}${booking.car}/`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            return { ...booking, car_name: carRes.data.car_name };
          } catch (carError) {
            console.error(`Error fetching car ${booking.car}:`, carError);
            return { ...booking, car_name: "Unknown Car" }; // Fallback
          }
        })
      );

      setBookings(bookingsWithCarNames);
    } catch (error) {
      console.error("Error fetching bookings:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        const newToken = await refreshToken();
        if (newToken) {
          try {
            const res = await axios.get(API_URL, {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            });

            const bookingsWithCarNames = await Promise.all(
              res.data.map(async (booking) => {
                try {
                  const carRes = await axios.get(`${CAR_API_URL}${booking.car}/`, {
                    headers: {
                      Authorization: `Bearer ${newToken}`,
                    },
                  });
                  return { ...booking, car_name: carRes.data.car_name };
                } catch (carError) {
                  console.error(`Error fetching car ${booking.car}:`, carError);
                  return { ...booking, car_name: "Unknown Car" };
                }
              })
            );

            setBookings(bookingsWithCarNames);
          } catch (retryError) {
            setError("⚠️ Session expired. Please login again.");
          }
        } else {
          setError("⚠️ Session expired. Please login again.");
        }
      } else if (error.response?.status === 403) {
        setError("🚫 You are not authorized to view bookings.");
      } else {
        setError("❌ Failed to load bookings.");
      }
    }
  };

  const handleEdit = (booking) => {
    console.log("Edit booking:", booking);
    // TODO: Implement edit functionality
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("⚠️ No admin token found.");
        return;
      }

      await axios.delete(`${API_URL}${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(bookings.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Error deleting booking:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        const newToken = await refreshToken();
        if (newToken) {
          try {
            await axios.delete(`${API_URL}${id}/`, {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            });
            setBookings(bookings.filter((b) => b.id !== id));
          } catch (retryError) {
            setError("❌ Failed to delete booking. Session expired.");
          }
        } else {
          setError("⚠️ Session expired. Please login again.");
        }
      } else {
        setError("❌ Failed to delete booking.");
      }
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="bookings-container">
      <h2 className="title">Admin Bookings ({bookings.length})</h2>

      {error && <p className="error">{error}</p>}

      <div className="bookings-grid">
        {bookings.length > 0 ? (
          bookings.map((b) => (
            <div key={b.id} className="booking-card">
              <div className="booking-header">
                <h3>Booking ID: {b.id}</h3>
                <p><strong>User:</strong> {b.user}</p>
                <p><strong>Car:</strong> {b.car_name} (ID: {b.car})</p>
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
                    <a
                      href={`http://192.168.1.46:8000${b.driving_licence}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    Residence Proof:{" "}
                    <a
                      href={`http://192.168.1.46:8000${b.residence_proof}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    PAN:{" "}
                    <a
                      href={`http://192.168.1.46:8000${b.pan_card}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    Aadhaar:{" "}
                    <a
                      href={`http://192.168.1.46:8000${b.aadhaar_card}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    Payment:{" "}
                    <a
                      href={`http://192.168.1.46:8000${b.payment_screenshot}`}
                      target="_blank"
                      rel="noreferrer"
                    >
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