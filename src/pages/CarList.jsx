import React from "react";
import cars from "../data/cars";
import CarCard from "../components/CarCard";
import "../styles/CarList.css";

const CarList = () => {
  return (
    <div className="car-list-page">
     <div className="heading-wrapper">
        <h2 className="section-heading">Cars Collection</h2>
      </div>
      <div className="car-grid">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default CarList;
