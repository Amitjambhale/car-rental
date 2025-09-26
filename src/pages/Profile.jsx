import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import "../styles/Profile.css";

function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // ✅ Call your profile API
        const res = await axiosInstance.get("http://10.181.222.14:8000/api/profile/",{
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,  // 👈 Bearer Token goes here
  },
});

        // Adjust depending on backend response6
        setUserInfo(res.data.user || res.data);
        setBookingHistory(res.data.bookings || []);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="profile-container">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <h2 className="page-title">My Profile</h2>

      {userInfo ? (
        <div className="profile-section personal-info">
          <h3>Personal Info</h3>
          <div className="info-grid">
            <p><strong>Name:</strong> {userInfo.Name}</p>
            <p><strong>Email:</strong> {userInfo.Email}</p>
            <p><strong>Date of Birth:</strong> {userInfo.Date_Of_Birth}</p>
            <p><strong>Mobile:</strong> {userInfo.Mobile_no}</p>
          </div>
        </div>
      ) : (
        <p>Could not load profile.</p>
      )}

      <div className="profile-section bookings">
        <h3>Booking History</h3>
        {bookingHistory.length === 0 ? (
          <p className="empty-msg">No bookings yet.</p>
        ) : (
          <div className="booking-list">
            {bookingHistory.map((b) => (
              <div className="booking-card" key={b.id}>
                <div className="booking-header">
                  <h4>{b.car}</h4>
                  <span className={`status ${b.status?.toLowerCase()}`}>
                    {b.status}
                  </span>
                </div>
                <p><strong>Date:</strong> {b.date}</p>
                <p><strong>Pickup:</strong> {b.pickup_location || "N/A"}</p>
                <p><strong>Dropoff:</strong> {b.drop_location || "N/A"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
