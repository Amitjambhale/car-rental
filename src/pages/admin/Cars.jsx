// src/admin/pages/CarsAdmin.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/AdminCars.css";

const CarsAdmin = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [newCar, setNewCar] = useState({
    id: "",
    car_name: "",
    prize: "",
    fuel_type: "Petrol",
    seats: "",
    transmission: "Manual",
    is_booked: false,
    available_from_date: "",
    available_from_time: "",
    imageFile: null,
    image: "",
  });

  // ✅ Load cars from backend
  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        alert("⚠️ Admin not logged in!");
        return;
      }

      const res = await axios.get(
        "http://192.168.1.46:8000/apis/superadmin/cars/",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCars(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("❌ Error fetching cars:", err.response?.data || err);
      setCars([]); // prevent crash on error
      if (err.response?.status === 401) {
        alert("⚠️ Unauthorized! Please log in again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // File upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewCar({ ...newCar, imageFile: file });
  };

  // ✅ Add or Update Car
  const handleSaveCar = async (e) => {
    e.preventDefault();
    if (!newCar.car_name || !newCar.prize || !newCar.seats) {
      alert("Please fill all required fields (Name, Rent, Seats)!");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const formData = new FormData();
      formData.append("car_name", newCar.car_name);
      formData.append("prize", parseInt(newCar.prize, 10));
      formData.append("fuel_type", newCar.fuel_type);
      formData.append("seats", parseInt(newCar.seats, 10));
      formData.append("transmission", newCar.transmission);
      formData.append("is_booked", newCar.is_booked);
      formData.append("available_from_date", newCar.available_from_date);
      formData.append("available_from_time", newCar.available_from_time);
      if (newCar.imageFile) formData.append("image", newCar.imageFile);

      if (editMode) {
        await axios.put(
          `http://192.168.1.46:8000/apis/superadmin/cars/${newCar.id}/`,
          formData,
          { headers }
        );
        alert("✅ Car updated!");
      } else {
        await axios.post(
          "http://192.168.1.46:8000/apis/superadmin/cars/",
          formData,
          { headers }
        );
        alert("✅ Car added!");
      }

      await fetchCars(); // refresh list
      resetForm();
    } catch (err) {
      console.error("❌ Save car error:", err.response?.data || err);
      if (err.response?.status === 401) {
        alert("⚠️ Unauthorized! Please log in again.");
      } else {
        alert("Failed to save car.");
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setNewCar({
      id: "",
      car_name: "",
      prize: "",
      fuel_type: "Petrol",
      seats: "",
      transmission: "Manual",
      is_booked: false,
      available_from_date: "",
      available_from_time: "",
      imageFile: null,
      image: "",
    });
    setEditMode(false);
    setShowForm(false);
  };

  // ✅ Delete car
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(
        `http://192.168.1.46:8000/apis/superadmin/cars/${id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCars(cars.filter((c) => c.id !== id));
    } catch (err) {
      console.error("❌ Delete error:", err.response?.data || err);
      if (err.response?.status === 401) {
        alert("⚠️ Unauthorized! Please log in again.");
      } else {
        alert("Failed to delete car.");
      }
    }
  };

  // ✅ Edit mode
  const handleEdit = (car) => {
    setNewCar({
      id: car.id,
      car_name: car.car_name,
      prize: car.prize,
      fuel_type: car.fuel_type,
      seats: car.seats,
      transmission: car.transmission,
      is_booked: car.is_booked,
      available_from_date: car.available_from_date || "",
      available_from_time: car.available_from_time || "",
      image: car.image,
      imageFile: null,
    });
    setEditMode(true);
    setShowForm(true);
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-header">
        <h2>🚘 Admin - Manage Cars</h2>
        <button className="btn btn-add" onClick={() => setShowForm(!showForm)}>
          {showForm ? "✖ Close Form" : "+ Add New Car"}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <form className="add-car-form" onSubmit={handleSaveCar}>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Car Name"
              value={newCar.car_name}
              onChange={(e) =>
                setNewCar({ ...newCar, car_name: e.target.value })
              }
              required
            />

            <input
              type="number"
              placeholder="Rent (₹)"
              value={newCar.prize}
              onChange={(e) => setNewCar({ ...newCar, prize: e.target.value })}
              required
              min="100"
            />

            <input
              type="number"
              placeholder="Seats"
              value={newCar.seats}
              onChange={(e) => setNewCar({ ...newCar, seats: e.target.value })}
              required
              min="1"
            />

            <select
              className="styled-select"
              value={newCar.fuel_type}
              onChange={(e) =>
                setNewCar({ ...newCar, fuel_type: e.target.value })
              }
            >
              <option>Petrol</option>
              <option>Diesel</option>
              <option>CNG</option>
              <option>Electric</option>
              <option>Petrol + CNG</option>
              <option>Diesel + CNG</option>
            </select>

            <select
              value={newCar.transmission}
              onChange={(e) =>
                setNewCar({ ...newCar, transmission: e.target.value })
              }
            >
              <option>Manual</option>
              <option>Automatic</option>
            </select>

            {/* ✅ Booked */}
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={newCar.is_booked}
                onChange={(e) =>
                  setNewCar({ ...newCar, is_booked: e.target.checked })
                }
              />
              Is booked
            </label>

            {/* ✅ Available From */}
            <input
              type="date"
              value={newCar.available_from_date}
              onChange={(e) =>
                setNewCar({ ...newCar, available_from_date: e.target.value })
              }
            />
            <input
              type="time"
              value={newCar.available_from_time}
              onChange={(e) =>
                setNewCar({ ...newCar, available_from_time: e.target.value })
              }
            />

            {/* Image Upload */}
            <div className="upload-box">
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-save">
              {editMode ? "Update Car ✅" : "Save Car 💾"}
            </button>
          </div>
        </form>
      )}

      {/* Cars Table */}
      <div className="table-container">
        {loading ? (
          <p>Loading cars...</p>
        ) : cars.length === 0 ? (
          <p className="empty-msg">No cars found.</p>
        ) : (
          <div className="responsive-table">
            <table className="car-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Rent</th>
                  <th>Fuel</th>
                  <th>Seats</th>
                  <th>Transmission</th>
                  <th>Booked</th>
                  <th>Available From</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car.id}>
                    <td>
                      {car.image ? (
                        <img
                          src={`http://192.168.1.46:8000${car.image}`}
                          alt={car.car_name}
                          className="car-img"
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td>{car.car_name}</td>
                    <td>₹{car.prize}</td>
                    <td>{car.fuel_type}</td>
                    <td>{car.seats}</td>
                    <td>{car.transmission}</td>
                    <td>{car.is_booked ? "Yes" : "No"}</td>
                    <td>
                      {car.available_from_date} {car.available_from_time}
                    </td>
                    <td className="action-buttons">
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEdit(car)}
                      >
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
          </div>
        )}
      </div>
    </div>
  );
};

export default CarsAdmin;
