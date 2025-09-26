import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/AdminHome.css";

const AdminHome = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("⚠️ No admin token found. Please login again.");
        setLoading(false);
        navigate("/admin/login");
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };

      try {
        // Fetch cars
        const carsRes = await axios.get("http://10.181.222.14:8000/apis/superadmin/cars/", { headers });
        console.log("Cars API Response:", carsRes.data);
        const carsData = carsRes.data.results || [];
        if (!Array.isArray(carsData)) {
          throw new Error("Cars API response 'results' is not an array");
        }
        setCars(carsData);

        // Fetch bookings
        const bookingsRes = await axios.get("http://10.181.222.14:8000/apis/superadmin/bookings/", { headers });
        console.log("Bookings API Response:", bookingsRes.data);
        const bookingsData = bookingsRes.data.results || [];
        if (!Array.isArray(bookingsData)) {
          throw new Error("Bookings API response 'results' is not an array");
        }
        setBookings(bookingsData);

        // Fetch users
        const usersRes = await axios.get("http://10.181.222.14:8000/apis/superadmin/users/", { headers });
        console.log("Users API Response:", usersRes.data);
        const usersData = usersRes.data.results || [];
        if (!Array.isArray(usersData)) {
          throw new Error("Users API response 'results' is not an array");
        }
        setUsers(usersData);

        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err.response?.data || err.message);
        if (err.response?.status === 401) {
          setError("⚠️ Session expired. Please login again.");
          navigate("/admin/login");
        } else if (err.response?.status === 403) {
          setError("🚫 You are not authorized to view this data.");
        } else {
          setError(`❌ Failed to fetch data: ${err.message}`);
        }
        setCars([]);
        setBookings([]);
        setUsers([]);
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="admin-home dark-theme">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Track and manage cars, bookings & users from one place.</p>
      </header>

      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <section className="admin-stats">
            <div className="stat-cards">
              <h2>{cars.length}</h2>
              <p>Total Cars</p>
            </div>
            <div className="stat-cards">
              <h2>{bookings.length}</h2>
              <p>Bookings</p>
            </div>
            <div className="stat-cards">
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
        </>
      )}
    </div>
  );
};

export default AdminHome;