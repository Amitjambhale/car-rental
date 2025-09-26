import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminBookings.css";

const API_URL = "http://10.181.222.14:8000/apis/superadmin/bookings/";

const Bookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("adminRefreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const res = await axios.post("http://10.181.222.14:8000/api/refresh/", {
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
    setLoading(true); // Set loading to true
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("⚠️ No admin token found. Please login first.");
        setLoading(false);
        navigate("/admin/login");
        return;
      }

      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("API Response:", res.data); // Log response for debugging

      // Extract 'results' array from paginated response
      const bookingData = res.data.results || [];

      // Validate that bookingData is an array
      if (!Array.isArray(bookingData)) {
        throw new Error("API response 'results' is not an array");
      }

      // Transform data to match expected field names
      const transformedBookings = bookingData.map(booking => ({
        id: booking.id || booking.booking_id || null,
        user_name: booking.user_name || booking.user?.username || `ID: ${booking.register || booking.user || "N/A"}`,
        car_name: booking.car_name || booking.car?.name || `ID: ${booking.car || "N/A"}`,
        pickup_date: booking.pickup_date || "N/A",
        pickup_time: booking.pickup_time || "N/A",
        dropoff_date: booking.dropoff_date || "N/A",
        dropoff_time: booking.dropoff_time || "N/A",
        driving_licence: booking.driving_licence || null,
        residence_proof: booking.residence_proof || null,
        pan_card: booking.pan_card || null,
        aadhaar_card: booking.aadhaar_card || null,
        payment_screenshot: booking.payment_screenshot || null,
      }));

      setBookings(transformedBookings);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        const newToken = await refreshToken();
        if (newToken) {
          fetchBookings(); // Retry
        } else {
          setError("⚠️ Session expired. Please login again.");
          setLoading(false);
        }
      } else if (error.response?.status === 403) {
        setError("🚫 You are not authorized to view bookings.");
        setLoading(false);
      } else {
        setError(`❌ Failed to load bookings: ${error.message}`);
        setLoading(false);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to delete Booking ID: ${id}?`)) {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          setError("⚠️ No admin token found.");
          setLoading(false);
          return;
        }

        await axios.delete(`${API_URL}${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBookings(bookings.filter((b) => b.id !== id));
        setSelectedBooking(null);
      } catch (error) {
        console.error("Error deleting booking:", error.response?.data || error.message);
        if (error.response?.status === 401) {
          const newToken = await refreshToken();
          if (newToken) {
            try {
              await axios.delete(`${API_URL}${id}/`, {
                headers: { Authorization: `Bearer ${newToken}` },
              });
              setBookings(bookings.filter((b) => b.id !== id));
              setSelectedBooking(null);
            } catch (retryError) {
              setError("❌ Failed to delete booking. Session expired.");
            }
          } else {
            setError("⚠️ Session expired. Please login again.");
          }
        } else {
          setError(`❌ Failed to delete booking: ${error.message}`);
        }
      }
    }
  };

  const handleViewDocuments = (booking) => {
    setSelectedBooking(booking);
  };

  const closeDocumentView = () => {
    setSelectedBooking(null);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="bookings-container">
      <h2 className="booking-title">Admin Bookings</h2>

      {loading ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : bookings.length === 0 ? (
        <p className="no-bookings">No bookings found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Booking ID</th>
                <th>User</th>
                <th>Car</th>
                <th>Pickup Date</th>
                <th>Pickup Time</th>
                <th>Dropoff Date</th>
                <th>Dropoff Time</th>
                <th>Documents</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, index) => (
                <tr key={b.id || index}>
                  <td>{index + 1}</td>
                  <td>{b.id}</td>
                  <td>{b.user_name}</td>
                  <td>{b.car_name}</td>
                  <td>{b.pickup_date}</td>
                  <td>{b.pickup_time}</td>
                  <td>{b.dropoff_date}</td>
                  <td>{b.dropoff_time}</td>
                  <td>
                    <button
                      className="btn btn-view"
                      onClick={() => handleViewDocuments(b)}
                    >
                      👁️ View Documents
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(b.id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedBooking && (
        <div className="document-modal">
          <div className="modal-content">
            <h3>Documents for Booking ID: {selectedBooking.id}</h3>
            <button className="btn btn-close" onClick={closeDocumentView}>
              ✖️ Close
            </button>
            <ul>
              <li>
                Driving Licence:{" "}
                {selectedBooking.driving_licence ? (
                  <a
                    href={`http://10.181.222.14:8000${selectedBooking.driving_licence}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                ) : (
                  "N/A"
                )}
              </li>
              <li>
                Residence Proof:{" "}
                {selectedBooking.residence_proof ? (
                  <a
                    href={`http://10.181.222.14:8000${selectedBooking.residence_proof}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                ) : (
                  "N/A"
                )}
              </li>
              <li>
                PAN Card:{" "}
                {selectedBooking.pan_card ? (
                  <a
                    href={`http://10.181.222.14:8000${selectedBooking.pan_card}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                ) : (
                  "N/A"
                )}
              </li>
              <li>
                Aadhaar Card:{" "}
                {selectedBooking.aadhaar_card ? (
                  <a
                    href={`http://10.181.222.14:8000${selectedBooking.aadhaar_card}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                ) : (
                  "N/A"
                )}
              </li>
              <li>
                Payment Screenshot:{" "}
                {selectedBooking.payment_screenshot ? (
                  <a
                    href={`http://10.181.222.14:8000${selectedBooking.payment_screenshot}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                ) : (
                  "N/A"
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;