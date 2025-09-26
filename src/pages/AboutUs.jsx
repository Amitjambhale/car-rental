import React from "react";
import "../styles/About.css";
import aboutImage from "/assets/about-hero.jpg"; // apna image path
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  const handleBookNow = () => {
    // ✅ Navigate to Home page
    navigate("/");
  };
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div
        className="about-hero"
        style={{ backgroundImage: `url(${aboutImage})` }}
      >
        <div className="about-hero-text">
          <h1>About Our Car Rental Service</h1>
          <p>
            We make self-drive car rentals easy, affordable, and enjoyable for
            everyone. Your next adventure starts here!
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="mission-section">
        <h2>Who We Are</h2>
        <p>
          We are passionate about making your travels smooth, convenient, and
          affordable. At <strong>Malhar car rentals</strong>, we provide
          top-quality self-drive cars for all your travel needs — from quick
          city rides to long road trips. Our goal is to give you the freedom to
          explore, without any compromises.
        </p>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-card">
          <h3>500+</h3>
          <p>Happy Customers</p>
        </div>
        <div className="stat-card">
          <h3>30+</h3>
          <p>Cars Available</p>
        </div>
        <div className="stat-card">
          <h3>Pune</h3>
          <p>Location Served</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Start Your Journey?</h2>
        <p>Book your self-drive car today and experience the freedom of travel.</p>
        <button onClick={handleBookNow} className="book-btn">Book Now</button>
      </section>
    </div>
  );
};

export default AboutUs;