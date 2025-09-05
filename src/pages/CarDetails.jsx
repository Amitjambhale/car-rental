// src/pages/CarDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaGasPump, FaUserFriends, FaRupeeSign, FaArrowLeft } from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";
import "../styles/CarDetails.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; // ✅ Navigation hata diya
import "swiper/css";
import "swiper/css/pagination";

import CarCard from "../components/CarCard";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [similarCars, setSimilarCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const res = await fetch(`http://192.168.1.46:8000/api/cars/`);
        const allCars = await res.json();

        const foundCar = allCars.find((c) => c.id === parseInt(id));
        setCar(foundCar || null);

        setSimilarCars(allCars.filter((c) => c.id !== parseInt(id)));
      } catch (error) {
        console.error("Error fetching car details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, [id]);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (!car) return <h2 style={{ textAlign: "center" }}>Car not found</h2>;

  return (
    <div className="car-details-page">
      {/* Hero Section */}
      <div className="car-hero">
        <img
          src={`http://192.168.1.46:8000${car.image}`}
          alt={car.car_name}
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
          <FaGasPump /> <span>{car.fuel_type}</span>
        </div>
        <div className="spec-card">
          <GiSteeringWheel /> <span>Manual</span>
        </div>
        <div className="spec-card">
          <FaUserFriends /> <span>5 Seater</span>
        </div>
        <div className="spec-card">
          <FaRupeeSign /> <span>{car.prize} / day</span>
        </div>
      </div>

      {/* Description */}
      <div className="car-description">
        <h2>About {car.car_name}</h2>
        <p>
          Experience comfort and performance with our {car.car_name}. Perfect for
          both city rides and long trips, this car offers great mileage,
          spacious interiors, and a smooth driving experience. Book now to
          enjoy a hassle-free self-drive rental experience.
        </p>
      </div>

      {/* Actions */}
      <div className="car-actions">
        <Link to="/" className="back-btn">
          <FaArrowLeft /> Back
        </Link>
        <button className="book-now-btn">Book Now →</button>
      </div>

      {/* Similar Cars Section */}
      {similarCars.length > 0 && (
        <div className="similar-cars">
          <h2>Similar Cars</h2>

          <Swiper
            modules={[Pagination, Autoplay]} // ✅ sirf pagination aur autoplay
            spaceBetween={20}
            slidesPerView={4}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={800}
            breakpoints={{
              1024: { slidesPerView: 3 },
              768: { slidesPerView: 2 },
              480: { slidesPerView: 1 },
              0: { slidesPerView: 1 },
            }}
          >
            {similarCars.map((sc) => (
              <SwiperSlide key={sc.id}>
                <CarCard car={sc} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
