import React from "react";
import { Link } from "react-router-dom"; // ✅ Add this
import CarCard from "../components/CarCard";
import cars from "../data/cars";
import bgImage from "../assets/bg-car.jpg";
import "../styles/Home.css";
import CheckAvailability from "../components/CheckAvailability";



function Home() {
    return (
        <div className="home-page">
            <div className="hero-section" style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="overlay" />
                <div className="hero-text">
                    <h1>Welcome to Car Rental</h1>
                    <p>Book reliable and affordable cars for your journey.</p>
                </div>
            </div>

            <section className="cars">
                <h2 className="section-heading">Available Cars</h2>
                <div className="car-grid">
                    {cars.slice(0, 4).map((car) => ( // Optional: show only 3 on Home
                        <CarCard key={car.id} car={car} />
                    ))}
                </div>

                <div className="view-all-wrapper">
                    <Link to="/cars" className="custom-btn">
                        View All Cars →
                    </Link>
                </div>

                <CheckAvailability cars={cars} />
            </section>

        </div>
    );
}

export default Home;
