import React from "react";
import "../styles/Profile.css";

const userInfo = {
  name: "Amit Jambhale",
  email: "amit@example.com",
  phone: "9876543210",
  currentPlace: "Pune",
};

const bookingHistory = [
  {
    id: 1,
    car: "Maruti Swift",
    date: "2025-07-10",
    status: "Booked",
  },
  {
    id: 2,
    car: "Hyundai i20",
    date: "2025-06-22",
    status: "Completed",
  },
];

function Profile() {
  return (
    <div className="profile-container">
      <h2>User Profile</h2>

      <div className="profile-section">
        <h3>Personal Info</h3>
        <p><strong>Name:</strong> {userInfo.name}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Phone:</strong> {userInfo.phone}</p>
        <p><strong>Current Place:</strong> {userInfo.currentPlace}</p>
      </div>

      <div className="profile-section">
        <h3>Booking History</h3>
        {bookingHistory.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <ul>
            {bookingHistory.map((booking) => (
              <li key={booking.id}>
                <strong>{booking.car}</strong> - {booking.date} - {booking.status}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Profile;
