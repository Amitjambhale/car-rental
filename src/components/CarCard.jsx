// src/components/CarCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaGasPump, FaCogs, FaUserFriends, FaSuitcase } from "react-icons/fa";
import "../styles/CarCard.css";

const CarCard = ({ car }) => {
  const {
    id,
    name,
    fuelType,
    rent,
    image,
    isBooked,
    availableFrom,
    transmission = "Manual",
  } = car;

  // Date formatter
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className={`car-card ${isBooked ? "booked" : "available"}`}>
      {/* Car Image */}

      <span className={`status-tag ${isBooked ? "booked" : "available"}`}>
        {isBooked ? "Booked" : "Available"}
      </span>
      <div className="car-image">

        <img src={image} alt={name} />

      </div>

      {/* Car Info */}
      <div className="car-info">
        <h3 className="car-names">{name}</h3>
        <p className="car-price">₹ {rent} / day</p>

        {/* Features */}
        <div className="car-features">
          <span>
            <FaGasPump /> {fuelType}
          </span>
          <span>
            <FaSuitcase /> 2 Baggage
          </span>
          <span>
            <FaCogs /> {transmission}
          </span>
          <span>
            <FaUserFriends /> 5 Seater
          </span>
        </div>

        {/* Availability Info (always rendered) */}
        <p className="available-from">
          {isBooked && availableFrom
            ? `📅 Available from ${formatDate(availableFrom)}`
            : "✅ Available Now"}
        </p>

        {/* Actions */}
        <div className="car-actions">
          <Link to={`/cars/${id}`} className="details-btns">
            View Details
          </Link>
          <Link to={`/booking/${id}`} className="books-btns">
            Book Now
          </Link>
        </div>

      </div>
    </div>
  );
};

export default CarCard;
