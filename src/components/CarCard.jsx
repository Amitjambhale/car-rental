import React from "react";
import { Link } from "react-router-dom";
import "../styles/CarCard.css";


function CarCard({ car }) {
  return (
    <div className="car-card">
      <img src={car.image} alt={car.name} className="car-image" />

      <div className="car-info">
        <div className="car-header">
          <h3>{car.name}</h3>
          <span className={`status-badge ${car.status === "available" ? "available" : "booked"}`}>
            {car.status}
          </span>
        </div>

        <p className="car-rent">Rent: ₹{car.rent}/day</p>
        <p className="car-specs">{car.seats} Seater | {car.fuel}</p>

        <div className="card-actions">
          <Link to={`/car/${car.id}`} className="car-link">View Details</Link>
          <Link to="/booking" className="custom-btn">Book Now</Link>

        </div>
      </div>
    </div>
  );
}

export default CarCard;
