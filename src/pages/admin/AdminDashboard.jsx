// src/admin/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import initialCars from "../../data/cars"; // fallback initial data
import "../../styles/AdminDashboard.css";

const storageKey = "malhar_cars_v1";

const loadCarsFromStorage = () => {
  const raw = localStorage.getItem(storageKey);
  if (raw) return JSON.parse(raw);
  localStorage.setItem(storageKey, JSON.stringify(initialCars));
  return initialCars;
};

const AdminDashboard = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [filterFuel, setFilterFuel] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [newCar, setNewCar] = useState({
    id: "",
    name: "",
    rent: "",
    fuelType: "Petrol",
    seats: "",
    transmission: "Manual",
  });

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

  const handleAddCar = (e) => {
    e.preventDefault();
    if (!newCar.id || !newCar.name || !newCar.rent) {
      alert("Please fill all required fields!");
      return;
    }
    const next = [...cars, { ...newCar, id: parseInt(newCar.id) }];
    save(next);
    setNewCar({
      id: "",
      name: "",
      rent: "",
      fuelType: "Petrol",
      seats: "",
      transmission: "Manual",
    });
    setShowForm(false);
  };

  // Filter + search
  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.name.toLowerCase().includes(search.toLowerCase()) ||
      car.id.toString().includes(search);
    const matchesFuel = filterFuel === "All" || car.fuelType === filterFuel;
    return matchesSearch && matchesFuel;
  });

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin - Manage Cars</h2>
        <button className="btn btn-add" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "+ Add New Car"}
        </button>
      </div>

      {/* Add Car Form */}
      {showForm && (
        <form className="add-car-form" onSubmit={handleAddCar}>
          <input
            type="number"
            placeholder="Car ID"
            value={newCar.id}
            onChange={(e) => setNewCar({ ...newCar, id: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Car Name"
            value={newCar.name}
            onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Rent (₹)"
            value={newCar.rent}
            onChange={(e) => setNewCar({ ...newCar, rent: e.target.value })}
            required
          />
          <select
            value={newCar.fuelType}
            onChange={(e) => setNewCar({ ...newCar, fuelType: e.target.value })}
          >
            <option>Petrol</option>
            <option>Diesel</option>
            <option>CNG</option>
            <option>Electric</option>
          </select>
          <input
            type="number"
            placeholder="Seats"
            value={newCar.seats}
            onChange={(e) => setNewCar({ ...newCar, seats: e.target.value })}
          />
          <select
            value={newCar.transmission}
            onChange={(e) =>
              setNewCar({ ...newCar, transmission: e.target.value })
            }
          >
            <option>Manual</option>
            <option>Automatic</option>
          </select>
          <button type="submit" className="btn btn-add">
            Save Car
          </button>
        </form>
      )}

      {/* Controls */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search by ID or Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filterFuel} onChange={(e) => setFilterFuel(e.target.value)}>
          <option value="All">All Fuel Types</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="CNG">CNG</option>
          <option value="Electric">Electric</option>
        </select>
      </div>

      {/* Cars Table */}
      <div className="table-container">
        {filteredCars.length === 0 ? (
          <p>No cars found.</p>
        ) : (
          <table className="car-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Rent</th>
                <th>Fuel</th>
                <th>Seats</th>
                <th>Transmission</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCars.map((car) => (
                <tr key={car.id}>
                  <td data-label="ID">{car.id}</td>
                  <td data-label="Name">{car.name}</td>
                  <td data-label="Rent">₹{car.rent}</td>
                  <td data-label="Fuel">{car.fuelType}</td>
                  <td data-label="Seats">{car.seats}</td>
                  <td data-label="Transmission">{car.transmission}</td>
                  <td data-label="Actions">
                    <div className="action-buttons">
                    <Link to={`/admin/edit/${car.id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(car.id)}
                    >
                      Delete
                    </button>
                    </div>
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
