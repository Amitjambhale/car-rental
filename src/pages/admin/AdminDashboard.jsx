// src/admin/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import initialCars from "../../data/cars"; // fallback initial data

const storageKey = "malhar_cars_v1";

const loadCarsFromStorage = () => {
  const raw = localStorage.getItem(storageKey);
  if (raw) return JSON.parse(raw);
  // first time: seed localStorage
  localStorage.setItem(storageKey, JSON.stringify(initialCars));
  return initialCars;
};

const AdminDashboard = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    setCars(loadCarsFromStorage());
  }, []);

  const save = (next) => {
    setCars(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;
    save(cars.filter((c) => c.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Admin - Manage Cars</h2>
        <Link to="/admin/add">
          <button style={{ padding: "8px 12px" }}>+ Add New Car</button>
        </Link>
      </div>

      <div style={{ marginTop: 16 }}>
        {cars.length === 0 ? (
          <p>No cars in collection.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: 8 }}>ID</th>
                <th style={{ textAlign: "left", padding: 8 }}>Name</th>
                <th style={{ textAlign: "left", padding: 8 }}>Rent</th>
                <th style={{ textAlign: "left", padding: 8 }}>Fuel</th>
                <th style={{ textAlign: "left", padding: 8 }}>Seats</th>
                <th style={{ textAlign: "left", padding: 8 }}>Transmission</th>
                <th style={{ textAlign: "left", padding: 8 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car.id} style={{ borderTop: "1px solid #eee" }}>
                  <td style={{ padding: 8 }}>{car.id}</td>
                  <td style={{ padding: 8 }}>{car.name}</td>
                  <td style={{ padding: 8 }}>₹{car.rent}</td>
                  <td style={{ padding: 8 }}>{car.fuelType}</td>
                  <td style={{ padding: 8 }}>{car.seats}</td>
                  <td style={{ padding: 8 }}>{car.transmission}</td>
                  <td style={{ padding: 8 }}>
                    <Link to={`/admin/edit/${car.id}`}>
                      <button style={{ marginRight: 8 }}>Edit</button>
                    </Link>
                    <button onClick={() => handleDelete(car.id)} style={{ background: "#e74c3c", color: "#fff", border: "none", padding: "6px 10px" }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
