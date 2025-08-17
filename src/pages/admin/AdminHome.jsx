// src/admin/pages/Home.jsx
import React from "react";
import "../../styles/AdminHome.css"; // Admin ka CSS alag rakhenge

const AdminHome = () => {
  return (
    <div className="admin-home">
      <h1 className="admin-title">Welcome, Admin</h1>
      <p className="admin-subtitle">
        Use the options below to manage cars, bookings, and users.
      </p>

      <div className="admin-actions">
        <div className="admin-card">
          <h3>Manage Cars</h3>
          <p>Add, edit, or remove cars from the collection.</p>
          <button onClick={() => alert("Navigate to Manage Cars page")}>
            Go to Cars
          </button>
        </div>

        <div className="admin-card">
          <h3>Manage Bookings</h3>
          <p>View and update customer bookings.</p>
          <button onClick={() => alert("Navigate to Manage Bookings page")}>
            Go to Bookings
          </button>
        </div>

        <div className="admin-card">
          <h3>Manage Users</h3>
          <p>View and control registered user accounts.</p>
          <button onClick={() => alert("Navigate to Manage Users page")}>
            Go to Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
