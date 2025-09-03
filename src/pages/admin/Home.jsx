// src/admin/pages/AdminHome.jsx
import React from "react";
import "../../styles/AdminHome.css";
import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <div className="admin-home dark-theme">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Track and manage cars, bookings & users from one place.</p>
      </header>

      <section className="admin-stats">
        <div className="stat-card">
          <h2>25</h2>
          <p>Total Cars</p>
        </div>
        <div className="stat-card">
          <h2>85</h2>
          <p>Bookings</p>
        </div>
        <div className="stat-card">
          <h2>40</h2>
          <p>Users</p>
        </div>
      </section>

      <section className="admin-actions">
        <div className="admin-card">
          <h3>Manage Bookings</h3>
          <p>View and update customer bookings.</p>
          <Link to="/admin/bookings" className="admin-link">Go to Bookings</Link>
        </div>
        <div className="admin-card">
          <h3>Manage Cars</h3>
          <p>Add, edit, or remove cars from the system.</p>
          <Link to="/admin/cars" className="admin-link">Go to Cars</Link>
        </div>
        <div className="admin-card">
          <h3>Manage Users</h3>
          <p>Control registered user accounts.</p>
          <Link to="/admin/registermodels" className="admin-link">Go to Users</Link>
        </div>
      </section>
    </div>
  );
};

export default AdminHome;
