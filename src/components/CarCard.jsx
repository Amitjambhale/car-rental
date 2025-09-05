// src/components/CarCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaGasPump, FaLeaf } from "react-icons/fa";
import { GiGasPump } from "react-icons/gi";

import "../styles/CarCard.css";

const CarCard = ({ car }) => {
  const getFuelIcon = (fuelType) => {
    switch (fuelType?.toLowerCase()) {
      case "petrol":
      case "diesel":
        return <FaGasPump className="fuel-icon" style={{ color: "red" }} />;
      case "cng":
        return <GiGasPump className="fuel-icon" style={{ color: "blue" }} />;
      case "electric":
        return <FaLeaf className="fuel-icon" style={{ color: "green" }} />;
      default:
        return <FaGasPump className="fuel-icon" style={{ color: "gray" }} />;
    }
  };

  return (
    <div className="car-card">
      <div className="car-image">
        <img src={`http://192.168.1.46:8000${car.image}`} alt={car.car_name} />
      </div>

      <div className="car-info">
        <h3 className="car-name">{car.car_name}</h3>
        <p className="car-rent">₹{car.prize}/day</p>

        {/* Fuel + View Details row */}
        <div className="car-top-row">
          <div className="car-fuel">
            {getFuelIcon(car.fuel_type)} {car.fuel_type}
          </div>
          <Link to={`/cars/${car.id}`} className="view-link">
            View Details
          </Link>
        </div>

        {/* Status always at bottom */}
        <div
          className={`car-status ${car.is_booked ? "booked" : "available"}`}
        >
          {car.is_booked ? "Booked" : "Available"}
        </div>
      </div>
    </div>
  );
};

export default CarCard;
