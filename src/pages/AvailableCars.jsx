// src/pages/AvailableCars.jsx
import React, { useState, useEffect } from "react";
import "../styles/AvailableCars.css";
import { FaGasPump, FaSuitcase, FaUserFriends, FaCogs, FaBroom } from "react-icons/fa";
import CarCard from "../components/CarCard";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    fuel: [],
    transmission: [],
    rent: [],
  });


// ✅ Map backend response → CarCard props
const mapCarData = (car) => ({
  id: car.id,
  name: car.car_name,
  fuelType: car.fuel_type,
  rent: parseFloat(car.prize), // "2200.00" → 2200
  image: `http://10.181.222.14:8000${car.image}`, // correct field
  isBooked: car.is_booked,
  availableFrom: car.available_from,
  transmission: car.transmission || "manual", // fallback agar backend na bheje
});


  // ✅ API Call
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = localStorage.getItem("token");

        // Helper function to format date as DD-MM-YYYY
        const formatDateDDMMYYYY = (date) => {
          const d = new Date(date);
          const day = String(d.getDate()).padStart(2, "0");
          const month = String(d.getMonth() + 1).padStart(2, "0");
          const year = d.getFullYear();
          return `${day}-${month}-${year}`;
        };

        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        const res = await fetch("http://10.181.222.14:8000/api/findcar/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify({
            pick_up_date: formatDateDDMMYYYY(today),   // "16-09-2025"
            pick_time: "21:40",
            drop_off_date: formatDateDDMMYYYY(tomorrow), // "17-09-2025"
            drop_time: "05:21",
            Is_Booked: "False",
            Available_From: "None"
          }),
        });


        if (!res.ok) {
          const errorData = await res.json();
          console.error("Backend error:", errorData);
          throw new Error(`Failed to fetch cars: ${res.status} - ${errorData.error}`);
        }

        const data = await res.json();
        setCars(data.map(mapCarData)); // ✅ map here
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // ✅ Checkbox filters
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

  // ✅ Filtered Cars
  const filteredCars = cars.filter((car) => {
    if (filters.fuel.length && !filters.fuel.includes(car.fuelType)) {
      return false;
    }
    if (filters.transmission.length && !filters.transmission.includes(car.transmission?.toLowerCase())) {
      return false;
    }
    if (filters.rent.length) {
      if ((filters.rent.includes("under2000") && car.rent >= 2000) ||
        (filters.rent.includes("2000-3000") && (car.rent < 2000 || car.rent > 3000)) ||
        (filters.rent.includes("3000plus") && car.rent <= 3000)) {
        return false;
      }
    }
    return true;
  });

  if (loading) return <p>Loading cars...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="available-cars-page">
      <div className="heading-wrapper">
        <h2 className="section-heading">Available Cars</h2>
      </div>

      <div className="available-cars-container">
        {/* Filters Sidebar */}
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
            {["Petrol", "Diesel", "CNG"].map((fuel) => (
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
            {["manual", "automatic"].map((trans) => (
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

          {/* Rent */}
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
            filteredCars.map((car) => <CarCard key={car.id} car={car} />)
          ) : (
            <p className="no-results">No cars match your filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailableCars;
