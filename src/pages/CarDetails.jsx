import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaGasPump, FaUserFriends, FaRupeeSign, FaArrowLeft } from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";
import "../styles/CarDetails.css";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://10.181.222.14:8000/api/cars/`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const allCars = await res.json();
        const foundCar = allCars.find((c) => c.id === parseInt(id));
        setCar(foundCar || null);
      } catch (error) {
        console.error("Error fetching car details:", error.message);
        setCar(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, [id]);

  if (loading) return <h2 className="loading-msg">Loading...</h2>;
  if (!car) return <h2 className="loading-msg">Car not found</h2>;

  return (
    <div className="car-details-page">
      {/* Hero Section */}
      <div className="car-hero">
        <img
          src={`http://10.181.222.14:8000${car.image}`}
          alt={car.car_name || "Car"}
          className="car-hero-img"
        />
        <div className="car-hero-overlay" />
        <div className="hero-text">
          <h1>{car.car_name}</h1>
          <p>₹{car.prize} / day</p>
        </div>
      </div>

      {/* Specs Section */}
      <div className="car-specs">
        <div className="spec-card">
          <FaGasPump className="icon" /> <span>{car.fuel_type}</span>
        </div>
        <div className="spec-card">
          <GiSteeringWheel className="icon" /> <span>{car.transmission || "Manual"}</span>
        </div>
        <div className="spec-card">
          <FaUserFriends className="icon" /> <span>{car.seats || 5} Seater</span>
        </div>
        <div className="spec-card">
          <FaRupeeSign className="icon" /> <span>₹{car.prize} / day</span>
        </div>
      </div>

      {/* Description */}
      <div className="car-description">
        <h2>About {car.car_name}</h2>
        <p>
          Experience comfort and performance with our {car.car_name}. Perfect for both
          city rides and long trips, this car offers great mileage, spacious interiors,
          and a smooth driving experience. Book now to enjoy a hassle-free self-drive rental.
        </p>
      </div>

      {/* Actions */}
      <div className="car-actions">
        <Link to="/" className="details-btn">
          <FaArrowLeft /> Back
        </Link>
        <button className="book-btns">Book Now →</button>
      </div>
    </div>
  );
};

export default CarDetails;
