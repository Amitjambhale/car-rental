import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/CarDetails.css";

function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/cars/${id}`);
        if (!res.ok) throw new Error("Car not found");
        const data = await res.json();
        setCar(data);
      } catch (err) {
        console.error("Failed to fetch car", err);
        setError("Could not load car details.");
      }
    };

    fetchCar();
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!car) return <p className="loading">Loading...</p>;

  return (
    <div className="car-details">
      <h2>{car.name}</h2>

      <img
        src={car.image || "/fallback-car.jpg"} // use a fallback image if needed
        alt={car.name}
        className="car-detail-image"
      />

      <p className="car-description">{car.description}</p>

      <p className="car-status">
        Status:{" "}
        <span className={car.status === "available" ? "status-available" : "status-booked"}>
          {car.status}
        </span>
      </p>

      <button className="btn">Book Now</button>
    </div>
  );
}

export default CarDetails;
