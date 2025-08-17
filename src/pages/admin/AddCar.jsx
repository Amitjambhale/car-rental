// src/admin/pages/AddCar.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import initialCars from "../../data/cars";

const storageKey = "malhar_cars_v1";

const readCars = () => {
  const raw = localStorage.getItem(storageKey);
  return raw ? JSON.parse(raw) : initialCars;
};

const AddCar = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    rent: "",
    fuelType: "",
    transmission: "",
    seats: "",
    image: ""
  });

  useEffect(() => {
    // ensure storage seeded
    if (!localStorage.getItem(storageKey)) localStorage.setItem(storageKey, JSON.stringify(initialCars));
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const cars = readCars();
    const newCar = {
      ...form,
      id: Date.now(),
      rent: Number(form.rent),
      seats: Number(form.seats),
      transmission: form.transmission || "manual"
    };
    const next = [newCar, ...cars];
    localStorage.setItem(storageKey, JSON.stringify(next));
    navigate("/admin");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add New Car</h2>
      <form onSubmit={onSubmit} style={{ maxWidth: 520, display: "grid", gap: 10 }}>
        <input name="name" placeholder="Car Name" value={form.name} onChange={onChange} required />
        <input name="rent" type="number" placeholder="Rent per day" value={form.rent} onChange={onChange} required />
        <input name="fuelType" placeholder="Fuel Type (Petrol/Diesel/CNG)" value={form.fuelType} onChange={onChange} required />
        <input name="transmission" placeholder="Transmission (manual/automatic)" value={form.transmission} onChange={onChange} required />
        <input name="seats" type="number" placeholder="Seats" value={form.seats} onChange={onChange} required />
        <input name="image" placeholder="Image URL (optional)" value={form.image} onChange={onChange} />
        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit">Add Car</button>
          <button type="button" onClick={() => navigate("/admin")}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;
