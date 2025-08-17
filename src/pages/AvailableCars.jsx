import React, { useState } from "react";
import carsData from "../data/cars";
import "../styles/AvailableCars.css";
import { FaGasPump, FaSuitcase, FaUserFriends, FaCogs, FaBroom } from "react-icons/fa";
import { Link } from "react-router-dom";

const AvailableCars = () => {
  const [filters, setFilters] = useState({
    fuel: [],
    transmission: [],
    rent: [],
  });

  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const updated = prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value];
      return { ...prev, [type]: updated };
    });
  };

  const handleClearAll = () => {
    setFilters({ fuel: [], transmission: [], rent: [] });
  };

  const filteredCars = carsData.filter((car) => {
    const carTransmission = car.transmission.toLowerCase();
    const carFuel = car.fuelType;
    const rent = car.rent;

    if (filters.fuel.length && !filters.fuel.includes(carFuel)) {
      return false;
    }

    if (filters.transmission.length && !filters.transmission.includes(carTransmission)) {
      return false;
    }

    if (filters.rent.length) {
      if (
        (filters.rent.includes("under2000") && rent >= 2000) ||
        (filters.rent.includes("2000-3000") && (rent < 2000 || rent > 3000)) ||
        (filters.rent.includes("3000plus") && rent <= 3000)
      ) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="available-cars-page">
      <div className="heading-wrapper">
        <h2 className="section-heading">Available Cars</h2>
      </div>

      <div className="available-cars-container">
        {/* Filters */}
        <div className="filters-sidebar">
          <div className="filters-header">
            <h4 className="filters-heading">Filters</h4>
            <button className="clear-btn" onClick={handleClearAll}>
              <FaBroom /> Clear All
            </button>
          </div>

          {/* Fuel Type */}
          <div className="filter-group">
            <h5>Fuel Type</h5>
            {['Petrol', 'Diesel', 'CNG'].map((fuel) => (
              <label key={fuel}>
                <FaGasPump className={`filter-icon ${fuel.toLowerCase()}`} />
                <input
                  type="checkbox"
                  checked={filters.fuel.includes(fuel)}
                  onChange={() => handleCheckboxChange("fuel", fuel)}
                />
                <span>{fuel}</span>
              </label>
            ))}
          </div>

          {/* Transmission */}
          <div className="filter-group">
            <h5>Transmission</h5>
            {['manual', 'automatic'].map((trans) => (
              <label key={trans}>
                <FaCogs className="filter-icon" />
                <input
                  type="checkbox"
                  checked={filters.transmission.includes(trans)}
                  onChange={() => handleCheckboxChange("transmission", trans)}
                />
                <span>{trans.charAt(0).toUpperCase() + trans.slice(1)}</span>
              </label>
            ))}
          </div>

          {/* Rent Range */}
          <div className="filter-group">
            <h5>Rent Range</h5>
            <label>
              <input
                type="checkbox"
                checked={filters.rent.includes("under2000")}
                onChange={() => handleCheckboxChange("rent", "under2000")}
              />
              <span>Under ₹2000</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.rent.includes("2000-3000")}
                onChange={() => handleCheckboxChange("rent", "2000-3000")}
              />
              <span>₹2000 - ₹3000</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.rent.includes("3000plus")}
                onChange={() => handleCheckboxChange("rent", "3000plus")}
              />
              <span>₹3000+</span>
            </label>
          </div>
        </div>

        {/* Car List */}
        <div className="car-list-horizontal">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <div className="car-card-horizontal" key={car.id}>
                <div className="car-image-horizontal">
                  <img src={car.image} alt={car.name} />
                </div>
                <div className="car-info-horizontal">
                  <div className="top-row">
                    <h3 className="car-name-gradient">{car.name}</h3>
                    <p className="car-type">{car.category}</p>
                  </div>
                  <div className="rent-kms-row">
                    <p className="price">₹ {car.rent}</p>
                    <p className="kms">(300 kms/day)</p>
                  </div>
                  <div className="features">
                    <span className={`transmission ${car.transmission.toLowerCase()}`}><FaCogs /> {car.transmission}</span>
                    <span><FaGasPump /> {car.fuelType}</span>
                    <span><FaSuitcase /> 2 Baggage</span>
                    <span><FaUserFriends /> 5 Seater</span>
                  </div>
                  <p className="extra">Extra kms charged at ₹9/km</p>
                  <div className="actions">
                    <span className="view-details">View Details</span>
                    <Link to="/booking">
                      <button className="book-now">Book Now →</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No cars match your filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailableCars;
