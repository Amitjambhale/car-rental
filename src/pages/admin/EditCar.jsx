// src/admin/pages/EditCar.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import initialCars from "../../data/cars";

const storageKey = "malhar_cars_v1";

const readCars = () => {
  const raw = localStorage.getItem(storageKey);
  return raw ? JSON.parse(raw) : initialCars;
};

const EditCar = () => {
  const { id } = useParams();
  const carId = Number(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(null);

  useEffect(() => {
    const cars = readCars();
    const found = cars.find((c) => c.id === carId);
    if (!found) {
      alert("Car not found");
      navigate("/admin");
      return;
    }
    setForm(found);
  }, [carId, navigate]);

  if (!form) return null;

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const cars = readCars();
    const next = cars.map((c) => (c.id === carId ? { ...form, rent: Number(form.rent), seats: Number(form.seats) } : c));
    localStorage.setItem(storageKey, JSON.stringify(next));
    navigate("/admin");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Car</h2>
      <form onSubmit={onSubmit} style={{ maxWidth: 520, display: "grid", gap: 10 }}>
        <input name="name" value={form.name} onChange={onChange} required />
        <input name="rent" type="number" value={form.rent} onChange={onChange} required />
        <input name="fuelType" value={form.fuelType} onChange={onChange} required />
        <input name="transmission" value={form.transmission} onChange={onChange} required />
        <input name="seats" type="number" value={form.seats} onChange={onChange} required />
        <input name="image" value={form.image} onChange={onChange} />
        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit">Save</button>
          <button type="button" onClick={() => navigate("/admin")}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditCar;
