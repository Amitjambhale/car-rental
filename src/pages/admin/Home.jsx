import React, { useEffect, useState } from "react";
import "../../styles/AdminHome.css";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminHome = () => {
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("adminToken"); // 👈 yaha access token hona chahiye
    if (!token) {
      setError("⚠️ No admin token found. Please login again.");
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    // 🚗 Fetch cars
    axios
      .get("http://192.168.1.46:8000/apis/superadmin/cars/", { headers })
      .then((res) => setCars(res.data))
      .catch((err) => {
        console.error("Cars fetch error:", err);
        setError("❌ Failed to fetch cars.");
      });

    // 📖 Fetch bookings
    axios
      .get("http://192.168.1.46:8000/apis/superadmin/bookings/", { headers })
      .then((res) => setBookings(res.data))
      .catch((err) => {
        console.error("Bookings fetch error:", err);
        setError("❌ Failed to fetch bookings.");
      });

    // 👤 Fetch users
    axios
      .get("http://192.168.1.46:8000/apis/superadmin/users/", { headers })
      .then((res) => setUsers(res.data))
      .catch((err) => {
        console.error("Users fetch error:", err);
        setError("❌ Failed to fetch users.");
      });
  }, []);

  return (
    <div className="admin-home dark-theme">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Track and manage cars, bookings & users from one place.</p>
      </header>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <section className="admin-stats">
        <div className="stat-card">
          <h2>{cars.length}</h2>
          <p>Total Cars</p>
        </div>
        <div className="stat-card">
          <h2>{bookings.length}</h2>
          <p>Bookings</p>
        </div>
        <div className="stat-card">
          <h2>{users.length}</h2>
          <p>Users</p>
        </div>
      </section>

      <section className="admin-actions">
        <div className="admin-card">
          <h3>Manage Bookings</h3>
          <p>View and update customer bookings.</p>
          <Link to="/admin/bookings" className="admin-link">
            Go to Bookings
          </Link>
        </div>
        <div className="admin-card">
          <h3>Manage Cars</h3>
          <p>Add, edit, or remove cars from the system.</p>
          <Link to="/admin/cars" className="admin-link">
            Go to Cars
          </Link>
        </div>
        <div className="admin-card">
          <h3>Manage Users</h3>
          <p>Control registered user accounts.</p>
          <Link to="/admin/registermodels" className="admin-link">
            Go to Users
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AdminHome;
