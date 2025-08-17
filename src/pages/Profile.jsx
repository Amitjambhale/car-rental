import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import "../styles/Profile.css";

function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("profile/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserInfo(res.data.user);
        setBookingHistory(res.data.bookings || []);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <h2>User Profile</h2>

      {userInfo ? (
        <div className="profile-section">
          <h3>Personal Info</h3>
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Phone:</strong> {userInfo.phone}</p>
          <p><strong>Current Place:</strong> {userInfo.currentPlace}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      <div className="profile-section">
        <h3>Booking History</h3>
        {bookingHistory.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <ul>
            {bookingHistory.map((b) => (
              <li key={b.id}>
                <strong>{b.car}</strong> - {b.date} - {b.status}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Profile;
