// src/pages/CarList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import CarCard from "../components/CarCard";
import "../styles/CarList.css";

const API_URL = "http://192.168.1.46:8000/api/cars/";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await axios.get(API_URL);
      console.log("🚗 Cars data:", res.data);
      setCars(res.data);
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

      {/* {error && <p className="error">{error}</p>} */}

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
