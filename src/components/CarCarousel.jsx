import React, { useRef, useEffect, useState } from "react";
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
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.destroy();
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <div className="carousel-wrapper">
      {/* Custom Arrows */}
      <button className="custom-arrow prev" ref={prevRef} aria-label="Previous Slide">
        <img src="/assets/icons/left-arrow.png" alt="Prev" />
      </button>
      <button className="custom-arrow next" ref={nextRef} aria-label="Next Slide">
        <img src="/assets/icons/right-arrow.png" alt="Next" />
      </button>

      {loading ? (
        <p className="loading-msg">⏳ Loading cars...</p>
      ) : cars && cars.length > 0 ? (
        <>
         <Swiper
  modules={[Navigation, Pagination, Autoplay]}
  navigation={{
    nextEl: ".custom-arrow.next",
    prevEl: ".custom-arrow.prev",
  }}
  spaceBetween={10}
  slidesPerView={3}
  pagination={{ clickable: true }}
  autoplay={{
    delay: 2800,
    disableOnInteraction: false,
  }}
  loop={true}
  speed={900}
  onSwiper={setSwiperInstance}
  breakpoints={{
    1280: { slidesPerView: 3 },
    1024: { slidesPerView: 2 },
    768: { slidesPerView: 1.2, centeredSlides: true }, // Tablet
    0: { slidesPerView: 1.1, centeredSlides: true },   // Mobile
  }}
>
  {cars.map((car) => (
    <SwiperSlide key={car.id}>
      <CarCard car={car} />
    </SwiperSlide>
  ))}
</Swiper>



          {/* 👇 Pagination Dots */}
          <div className="swiper-pagination"></div>
        </>
      ) : (
        <p className="no-cars-msg">🚗 No cars available right now.</p>
      )}

      {/* View All Cars Button */}
      <div className="view-all-btn-container">
        <button className="view-all-btn" onClick={() => navigate("/cars")}>
          View All Cars
        </button>
      </div>
    </div>
  );
};

export default CarCarousel;
