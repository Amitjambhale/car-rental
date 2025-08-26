import React, { useEffect, useState } from "react";
import CarCard from "../components/CarCard";
import "../styles/CarList.css";
import initialCars from "../data/cars"; // ✅ import initialCars

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    setCars(initialCars); // ✅ directly initialCars set
  }, []);

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
