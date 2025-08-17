import React, { useState } from "react";
import "../styles/Admin.css";

const Admin = () => {
  const [cars, setCars] = useState([
    {
      id: 1,
      name: "Scorpio",
      rent: 3000,
      fuelType: "Petrol",
      transmission: "Manual",
      seats: 7,
      image: "/assets/swift.png",
    },
    {
      id: 2,
      name: "TUV 300",
      rent: 2200,
      fuelType: "CNG",
      transmission: "Manual",
      seats: 5,
      image: "/assets/creata1.png",
    },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    rent: "",
    fuelType: "",
    transmission: "",
    seats: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.id) {
      // Update existing car
      setCars(
        cars.map((car) =>
          car.id === formData.id ? { ...formData, id: car.id } : car
        )
      );
    } else {
      // Add new car
      setCars([
        ...cars,
        { ...formData, id: Date.now(), rent: Number(formData.rent) },
      ]);
    }

    // Reset form
    setFormData({
      id: null,
      name: "",
      rent: "",
      fuelType: "",
      transmission: "",
      seats: "",
      image: "",
    });
  };

  const handleDelete = (id) => {
    setCars(cars.filter((car) => car.id !== id));
  };

  const handleEdit = (car) => {
    setFormData(car);
  };

  return (
    <div className="admin-page">
      <h2>Admin - Manage Cars</h2>

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          name="name"
          placeholder="Car Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="rent"
          placeholder="Rent per Day"
          value={formData.rent}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="fuelType"
          placeholder="Fuel Type"
          value={formData.fuelType}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="transmission"
          placeholder="Transmission"
          value={formData.transmission}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="seats"
          placeholder="Seats"
          value={formData.seats}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {formData.id ? "Update Car" : "Add Car"}
        </button>
      </form>

      {/* Cars List */}
      <div className="admin-car-list">
        {cars.map((car) => (
          <div key={car.id} className="admin-car-card">
            <img src={car.image} alt={car.name} />
            <h3>{car.name}</h3>
            <p>Rent: ₹{car.rent}/day</p>
            <p>Fuel: {car.fuelType}</p>
            <p>Transmission: {car.transmission}</p>
            <p>Seats: {car.seats}</p>
            <div className="admin-buttons">
              <button onClick={() => handleEdit(car)}>Edit</button>
              <button onClick={() => handleDelete(car.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
