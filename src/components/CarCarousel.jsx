import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CarCard from "./CarCard";
import "../styles/CarCarousel.css";

const CarCarousel = ({ cars, loading }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const navigate = useNavigate();

  return (
    <div className="carousel-wrapper">
      {/* Custom Arrows */}
      <button className="custom-arrow prev" ref={prevRef}>
        <img src="/assets/icons/left-arrow.png" alt="Prev" />
      </button>
      <button className="custom-arrow next" ref={nextRef}>
        <img src="/assets/icons/right-arrow.png" alt="Next" />
      </button>

      {loading ? (
        <p className="loading-msg">⏳ Loading cars...</p>
      ) : cars && cars.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={4}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2800,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={900}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            1280: { slidesPerView: 4 },
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
        >
          {cars.map((car) => (
            <SwiperSlide key={car.id}>
              <CarCard car={car} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="no-cars-msg">🚗 No cars available right now.</p>
      )}

      {/* View All Cars */}
      <div className="view-all-btn-container">
        <button className="view-all-btn" onClick={() => navigate("/cars")}>
          View All Cars
        </button>
      </div>
    </div>
  );
};

export default CarCarousel;
