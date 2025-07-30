import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CarCard from "./CarCard";
import "../styles/CarCarousel.css";

const CarCarousel = ({ cars }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="carousel-wrapper">
      {/* Custom Arrows */}
      <button className="custom-arrow prev" ref={prevRef} />
      <button className="custom-arrow next" ref={nextRef} />

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
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        breakpoints={{
          1024: { slidesPerView: 4 },
          768: { slidesPerView: 2 },
          480: { slidesPerView: 1 },
          0: { slidesPerView: 1 },
        }}
      >
        {cars.map((car) => (
          <SwiperSlide key={car.id}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CarCard car={car} />
            </div>
          </SwiperSlide>

        ))}
      </Swiper>
    </div>
  );
};

export default CarCarousel;
