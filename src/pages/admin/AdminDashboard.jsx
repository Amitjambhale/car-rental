// src/admin/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { saveCarsToStorage } from "../../utils/storage";
import initialCars from "../../data/cars";
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
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newCar, setNewCar] = useState({
    id: "",
    name: "",
    rent: "",
    fuelType: "Petrol",
    seats: "",
    transmission: "Manual",
    image: "",
  });

  useEffect(() => {
    setCars(loadCarsFromStorage());
  }, []);

  const save = (next) => {
    setCars(next);
    saveCarsToStorage(next);
  };

  // File to Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewCar({ ...newCar, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // Add / Update Car
  const handleSaveCar = (e) => {
    e.preventDefault();
    if (!newCar.id || !newCar.name || !newCar.rent) {
      alert("Please fill all required fields!");
      return;
    }

    let next;
    if (editMode) {
      next = cars.map((c) => (c.id === newCar.id ? newCar : c));
      setEditMode(false);
    } else {
      next = [...cars, { ...newCar, id: parseInt(newCar.id) }];
    }

    save(next);
    resetForm();
  };

  const resetForm = () => {
    setNewCar({
      id: "",
      name: "",
      rent: "",
      fuelType: "Petrol",
      seats: "",
      transmission: "Manual",
      image: "",
    });
    setShowForm(false);
    setEditMode(false);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;
    save(cars.filter((c) => c.id !== id));
  };

  const handleEdit = (car) => {
    setNewCar(car);
    setEditMode(true);
    setShowForm(true);
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin - Manage Cars</h2>
        <button className="btn btn-add" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "+ Add New Car"}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <form className="add-car-form" onSubmit={handleSaveCar}>
          <input
            type="number"
            placeholder="Car ID"
            value={newCar.id}
            onChange={(e) => setNewCar({ ...newCar, id: parseInt(e.target.value) })}
            required
            disabled={editMode} // Edit mode me ID change nahi hoga
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
            onChange={(e) => setNewCar({ ...newCar, transmission: e.target.value })}
          >
            <option>Manual</option>
            <option>Automatic</option>
          </select>

          {/* Image Upload */}
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {newCar.image && (
            <img
              src={newCar.image}
              alt="preview"
              style={{ width: "100px", marginTop: "10px", borderRadius: "6px" }}
            />
          )}

          <button type="submit" className="btn btn-add">
            {editMode ? "Update Car" : "Save Car"}
          </button>
        </form>
      )}

      {/* Cars Table */}
      <div className="table-container">
        {cars.length === 0 ? (
          <p>No cars found.</p>
        ) : (
          <table className="car-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Rent</th>
                <th>Fuel</th>
                <th>Seats</th>
                <th>Transmission</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car.id}>
                  <td>{car.id}</td>
                  <td>
                    {car.image ? (
                      <img
                        src={car.image}
                        alt={car.name}
                        style={{ width: "80px", borderRadius: "6px" }}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td>{car.name}</td>
                  <td>₹{car.rent}</td>
                  <td>{car.fuelType}</td>
                  <td>{car.seats}</td>
                  <td>{car.transmission}</td>
                  <td>
                    <button className="btn btn-edit" onClick={() => handleEdit(car)}>
                      Edit
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(car.id)}
                    >
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
