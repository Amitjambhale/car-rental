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
    name: "",
    rent: "",
    fuelType: "Petrol",
    seats: "",
    transmission: "Manual",
    image: "",
  });

  // ✅ Load cars from backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          alert("⚠️ Admin not logged in!");
          return;
        }

        const res = await axios.get(
          "http://192.168.1.46:8000/apis/superadmin/cars/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setCars(res.data); // 👈 backend returns list of cars
      } catch (err) {
        console.error("❌ Error fetching cars:", err.response?.data || err);
        alert("Failed to load cars.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // File to Base64 (for preview before upload)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewCar({ ...newCar, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // ✅ Add or Update Car in backend
  const handleSaveCar = async (e) => {
    e.preventDefault();
    if (!newCar.name || !newCar.rent) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      if (editMode) {
        // Update existing car
        await axios.put(
          `http://192.168.1.46:8000/apis/superadmin/cars/${newCar.id}/`,
          newCar,
          { headers }
        );
        alert("✅ Car updated!");
      } else {
        // Create new car
        await axios.post(
          "http://192.168.1.46:8000/apis/superadmin/cars/",
          newCar,
          { headers }
        );
        alert("✅ Car added!");
      }

      // Refresh list
      const res = await axios.get(
        "http://192.168.1.46:8000/apis/superadmin/cars/",
        { headers }
      );
      setCars(res.data);

      resetForm();
    } catch (err) {
      console.error("❌ Save car error:", err.response?.data || err);
      alert("Failed to save car.");
    }
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
      alert("Failed to delete car.");
    }
  };

  const handleEdit = (car) => {
    setNewCar(car);
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
              onChange={(e) =>
                setNewCar({ ...newCar, fuelType: e.target.value })
              }
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

            {/* Image Upload */}
            <div className="upload-box">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {newCar.image && (
                <img
                  src={newCar.image}
                  alt="preview"
                  className="preview-img"
                />
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-save">
            {editMode ? "Update Car ✅" : "Save Car 💾"}
          </button>
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car.id}>
                    <td>
                      {car.image ? (
                        <img
                          src={car.image}
                          alt={car.name}
                          className="car-img"
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
