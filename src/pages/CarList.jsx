// src/pages/CarList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import CarCard from "../components/CarCard";
import "../styles/CarList.css";

const API_URL = "http://10.181.222.14:8000/api/cars/";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await axios.get(API_URL);
    

      // ✅ Normalize backend data
      const formatted = res.data.map((car) => ({
        id: car.id,
        name: car.car_name,
        fuelType: car.fuel_type,
        rent: parseFloat(car.prize),
        // 👉 सही URL बनाना (base URL + relative path)
        image: `http://10.181.222.14:8000${car.image}`,
        isBooked: car.is_booked,
        availableFrom: car.available_from,
      }));

     
      setCars(formatted);
    } catch (err) {
      console.error("❌ Error fetching cars:", err.response?.data || err.message);
      setError("Failed to load cars. Please try again later.");
    }
  };

  return (
    <div className="car-list-page">
      <div className="heading-wrapper">
        <h2 className="section-heading">Cars Collection</h2>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="car-grid">
        {cars.length > 0 ? (
          cars.map((car) => <CarCard key={car.id} car={car} />)
        ) : (
          <p className="loading">Loading cars...</p>
        )}
      </div>
    </div>
  );
};

export default CarList;
