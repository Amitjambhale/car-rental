// src/pages/CarDetails.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaGasPump, FaUserFriends, FaRupeeSign, FaArrowLeft } from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";
import cars from "../data/cars";
import "../styles/CarDetails.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CarCard from "../components/CarCard"; // ✅ tumhara Home wala card


const CarDetails = () => {
  const { id } = useParams();
  const car = cars.find((c) => c.id === parseInt(id));

  if (!car) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Car not found</h2>;
  }

 const similarCars = cars.filter(
  (c) => c.id !== car.id // Sirf apne alawa sab cars dikhao
);


  return (
    <div className="car-details-page">
      {/* Hero Section */}
      {/* Hero Section */}
      <div className="car-hero">
        <img src={car.image} alt={car.name} className="car-hero-img" />
        <div className="car-hero-overlay" />
        <div className="hero-text">
          <h1>{car.name}</h1>
          <p>₹{car.rent} / day</p>
        </div>
      </div>

      {/* Specs Section */}
      <div className="car-specs">
        <div className="spec-card">
          <FaGasPump /> <span>{car.fuelType}</span>
        </div>
        <div className="spec-card">
          <GiSteeringWheel /> <span>Manual</span>
        </div>
        <div className="spec-card">
          <FaUserFriends /> <span>{car.seats} Seater</span>
        </div>
        <div className="spec-card">
          <FaRupeeSign /> <span>{car.rent} / day</span>
        </div>
      </div>

      {/* Description */}
      <div className="car-description">
        <h2>About {car.name}</h2>
        <p>
          Experience comfort and performance with our {car.name}. Perfect for
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

      {similarCars.length > 0 && (
        <div className="similar-cars">
          <h2>Similar Cars</h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={4}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
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
