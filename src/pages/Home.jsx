import React from "react";
import "../styles/Home.css";
import CarCarousel from "../components/CarCarousel";
import CheckAvailability from "../components/CheckAvailability";
import cars from "../data/cars"; // default export (no curly braces)
import bgImage from "/assets/bg-car.jpg"; // vite will resolve this from public/assets

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section with Background Image */}
      <div
        className="hero-section"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="overlay" />
        <div className="hero-text">
          <h1>Welcome to Car Rental</h1>
          <p>Book reliable and affordable cars for your journey.</p>
          <CheckAvailability cars={cars} />
        </div>
      </div>

      {/* Car Carousel Section */}
      <section className="cars">
        <h2 className="section-heading">Best Selling Models</h2>
        <CarCarousel cars={cars} />
      </section>
    </div>
  );
};

export default Home;
