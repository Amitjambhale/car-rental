import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminCars.css";

const CarsAdmin = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // Added error state
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [newCar, setNewCar] = useState({
    id: "",
    car_name: "",
    prize: "",
    fuel_type: "Petrol",
    seats: "",
    is_booked: false,
    available_from_date: "",
    available_from_time: "",
    imageFile: null,
    image: "",
  });

  // Load cars from backend
  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("⚠️ No admin token found. Please login first.");
        setLoading(false);
        navigate("/admin/login");
        return;
      }

      const res = await axios.get(
        "http://10.181.222.14:8000/apis/superadmin/cars/",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("API Response:", res.data); // Log response for debugging

      // Extract 'results' array from paginated response
      const carData = res.data.results || [];

      // Validate that carData is an array
      if (!Array.isArray(carData)) {
        throw new Error("API response 'results' is not an array");
      }

      const normalized = carData.map((car) => {
        let available_from_date = "";
        let available_from_time = "";

        if (car.available_from) {
          const dateObj = new Date(car.available_from);
          available_from_date = dateObj.toISOString().split("T")[0]; // yyyy-mm-dd
          available_from_time = dateObj.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }); // hh:mm
        }

        return {
          id: car.id || car.car_id || null,
          car_name: car.car_name || car.name || "N/A",
          prize: car.prize || car.price || 0,
          fuel_type: car.fuel_type || "N/A",
          seats: car.seats || car.Seats || car.seat_count || 5,
          is_booked: car.is_booked || false,
          available_from_date,
          available_from_time,
          image: car.image || null,
        };
      });

      setCars(normalized);
      setLoading(false);
    } catch (err) {
      console.error("❌ Error fetching cars:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        setError("⚠️ Session expired. Please login again.");
        navigate("/admin/login");
      } else if (err.response?.status === 403) {
        setError("🚫 You are not authorized to view cars.");
      } else {
        setError(`❌ Failed to load cars: ${err.message}`);
      }
      setCars([]);
      setLoading(false);
    }
  };

  // File upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewCar({ ...newCar, imageFile: file });
  };

  // Add or Update Car
  const handleSaveCar = async (e) => {
    e.preventDefault();
    if (!newCar.car_name || !newCar.prize || !newCar.seats) {
      setError("Please fill all required fields (Name, Rent, Seats)!");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("⚠️ No admin token found. Please login first.");
        navigate("/admin/login");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const formData = new FormData();
      formData.append("car_name", newCar.car_name);
      formData.append("price", parseInt(newCar.prize, 10)); // Changed to 'price'
      formData.append("fuel_type", newCar.fuel_type);
      formData.append("seats", parseInt(newCar.seats, 10)); // Changed to 'seats'
      formData.append("is_booked", newCar.is_booked);

      if (newCar.available_from_date && newCar.available_from_time) {
        formData.append(
          "available_from",
          `${newCar.available_from_date}T${newCar.available_from_time}:00Z`
        );
      }

      if (newCar.imageFile) formData.append("image", newCar.imageFile);

      if (editMode) {
        await axios.put(
          `http://10.181.222.14:8000/apis/superadmin/cars/${newCar.id}/`,
          formData,
          { headers }
        );
        alert("✅ Car updated!");
      } else {
        await axios.post(
          "http://10.181.222.14:8000/apis/superadmin/cars/",
          formData,
          { headers }
        );
        alert("✅ Car added!");
      }

      await fetchCars();
      resetForm();
    } catch (err) {
      console.error("❌ Save car error:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        setError("⚠️ Session expired. Please login again.");
        navigate("/admin/login");
      } else {
        setError(`Failed to save car: ${err.response?.data?.detail || err.message}`);
      }
    }
  };

  const resetForm = () => {
    setNewCar({
      id: "",
      car_name: "",
      prize: "",
      fuel_type: "Petrol",
      seats: "",
      is_booked: false,
      available_from_date: "",
      available_from_time: "",
      imageFile: null,
      image: "",
    });
    setEditMode(false);
    setShowForm(false);
    setError(""); // Clear error on form reset
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("⚠️ No admin token found. Please login first.");
        navigate("/admin/login");
        return;
      }

      await axios.delete(
        `http://10.181.222.14:8000/apis/superadmin/cars/${id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCars(cars.filter((c) => c.id !== id));
      alert("✅ Car deleted!");
    } catch (err) {
      console.error("❌ Delete error:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        setError("⚠️ Session expired. Please login again.");
        navigate("/admin/login");
      } else {
        setError(`Failed to delete car: ${err.response?.data?.detail || err.message}`);
      }
    }
  };

  const handleEdit = (car) => {
    setNewCar({
      id: car.id,
      car_name: car.car_name || "",
      prize: car.prize || car.price || "",
      fuel_type: car.fuel_type || "Petrol",
      seats: car.seats || car.Seats || car.seat_count || "",
      is_booked: car.is_booked || false,
      available_from_date: car.available_from_date || "",
      available_from_time: car.available_from_time || "",
      image: car.image || "",
      imageFile: null,
    });
    setEditMode(true);
    setShowForm(true);
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-header">
        <h2>Admin - Manage Cars</h2>
        <button className="btn btn-add" onClick={() => setShowForm(!showForm)}>
          {showForm ? "✖ Close Form" : "+ Add New Car"}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

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
            <div className="date-time-wrapper">
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
            </div>
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
        ) : error ? (
          <p className="error">{error}</p>
        ) : cars.length === 0 ? (
          <p className="empty-msg">No cars found.</p>
        ) : (
          <div className="responsive-table">
            <table className="car-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Rent</th>
                  <th>Fuel</th>
                  <th>Seats</th>
                  <th>Booked</th>
                  <th>Available From</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car, index) => (
                  <tr key={car.id || index}>
                    <td>{index + 1}</td>
                    <td>
                      {car.image ? (
                        <img
                          src={`http://10.181.222.14:8000${car.image}`}
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
                    <td>{car.is_booked ? "Yes" : "No"}</td>
                    <td>
                      {car.available_from_date
                        ? `${car.available_from_date} ${car.available_from_time}`
                        : "—"}
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