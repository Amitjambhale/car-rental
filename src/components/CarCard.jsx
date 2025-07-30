import React from "react";
import { Link } from "react-router-dom";
import { FaCarSide, FaGasPump, FaLeaf } from "react-icons/fa";
import { GiGasPump } from "react-icons/gi";
import "../styles/CarCard.css";



const CarCard = ({ car }) => {
  const getFuelIcon = (fuelType) => {
    switch (fuelType.toLowerCase()) {
      case "petrol":
      case "diesel":
        return <FaGasPump className="fuel-icon" />;
      case "cng":
        return <GiGasPump className="fuel-icon" />;
      case "electric":
        return <FaLeaf className="fuel-icon" />;
      default:
        return <FaGasPump className="fuel-icon" />;
    }
  };

  return (
    <div className="car-card">
      <div className="car-image">
        <img src={car.image} alt={car.name} />
      </div>
      <div className="car-info">
        <h3 className="car-name">{car.name}</h3>
        <p className="car-rent">₹{car.rent}/day</p>

        <div className="car-bottom-row">
          <div className="car-fuel">
            <span className="fuel-icon">⛽ {car.fuelType}</span>
          </div>


          <a href="#" className="view-link">View Details</a>
        </div>
      </div>
    </div>

  );
};

export default CarCard;
