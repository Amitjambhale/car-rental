import React from "react";
import { Link } from "react-router-dom";
import { FaCarSide } from "react-icons/fa";
import "../styles/CarCard.css"; // ✅ CSS properly imported

const CarCard = ({ car }) => {
  return (
    <div className="car-card">
      <div className="image-wrapper">
        <img src={car.image} alt={car.name} />
      </div>
      <div className="car-details">
        <div className="brand-line">
          <FaCarSide className="icon" />
          <span>{car.brand}</span>
        </div>
        <h3 className="car-name">{car.name}</h3>
        <Link to={`/car/${car.id}`} className="view-link">
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
