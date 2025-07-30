import React, { useState } from "react";
import "../styles/Home.css";
import CarCarousel from "../components/CarCarousel";
import CheckAvailability from "../components/CheckAvailability";
import cars from "../data/cars";
import bgImage from "/assets/bg-car.jpg";

const reviews = [
  {
    name: "Amit Verma",
    tripLocation: "Lonavala",
    comment:
      "Had an amazing weekend getaway to Lonavala with the Hyundai i20. The car was in top condition, super comfortable for long drives, and the music system made the ride even more enjoyable. Loved the handling on the ghats, and pickup was smooth. Will definitely book again!",
    image: "/assets/users/amit.jpg",
  },
  {
    name: "Priya Sharma",
    tripLocation: "Mahabaleshwar",
    comment:
      "We took the Maruti Baleno for a 3-day family trip to Mahabaleshwar and it was a fantastic experience. The car was spotless, had great boot space for our luggage, and gave excellent mileage. Booking was instant, and the support team helped with route suggestions too.",
    image: "/assets/users/priya.jpg",
  },
  {
    name: "Rahul Mehta",
    tripLocation: "Mumbai Business Trip",
    comment:
      "Rented the Honda Amaze for a two-day work trip to Mumbai. The car was clean, fuel-efficient, and smooth in traffic. AC cooling was fast, and Bluetooth worked perfectly for my calls. A hassle-free, professional experience from start to finish.",
    image: "/assets/users/rahul.jpg",
  },
];

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <div
        className="hero-section"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="overlay" />
        <div className="hero-text">
          <CheckAvailability cars={cars} />
        </div>
      </div>

      {/* Car Carousel */}
      <section className="cars section-spacing-bottom">
  <h2 className="section-heading">Find Your Perfect Self Drive Car</h2>
  <CarCarousel cars={cars} />
</section>

{/* Benefits Section */}
<section className="benefits-section">
  <h2 className="benefits-title">Top Benefits of Renting from Us</h2>
  <div className="benefits-container">
    <div className="benefit-card">
      <img
        src="/assets/icons/secure-payment.png"
        alt="Secure Payments"
        className="benefit-icon"
      />
      <h3 className="benefit-title">Secure Payments</h3>
      <p className="benefit-desc">
        Our Payment Partners are Industry Leaders.
      </p>
    </div>

    <div className="benefit-card">
      <img
        src="/assets/icons/verified-dealer.png"
        alt="Verified Dealers"
        className="benefit-icon"
      />
      <h3 className="benefit-title">Verified Dealers</h3>
      <p className="benefit-desc">
        Only trusted & verified dealers onboarded.
      </p>
    </div>

    <div className="benefit-card">
      <img
        src="/assets/icons/clock.png"
        alt="No Bullshit"
        className="benefit-icon"
      />
      <h3 className="benefit-title">No Bullshit</h3>
      <p className="benefit-desc">
        A Day Rent is simply for 24 hrs, We mean it.
      </p>
    </div>

          <div className="benefit-card">
            <img
              src="/assets/icons/instant-booking.png"
              alt="Instant Booking"
              className="benefit-icon"
            />
            <h3 className="benefit-title">Instant Booking</h3>
            <p className="benefit-desc">
              Book your ride instantly with real-time availability updates.
            </p>
          </div>

          <div className="benefit-card">
            <img
              src="/assets/icons/customer-service_5432364.png"
              alt="24/7 Support"
              className="benefit-icon"
            />
            <h3 className="benefit-title">24/7 Support</h3>
            <p className="benefit-desc">
              Round-the-clock customer support for a seamless experience.
            </p>
          </div>

          <div className="benefit-card">
            <img
              src="/assets/icons/car-selection.png"
              alt="Wide Car Selection"
              className="benefit-icon"
            />
            <h3 className="benefit-title">Wide Car Selection</h3>
            <p className="benefit-desc">
              Choose from hatchbacks, sedans, SUVs & more.
            </p>
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section className="review-section">
        <h2 className="section-heading">Customer Experiences</h2>
        <div className="review-cards-container">
          {reviews.map((review, index) => {
            const [expanded, setExpanded] = useState(false);
            const isLong = review.comment.length > 200;
            return (
              <div className="review-card" key={index}>
                <div className="review-top">
                  <div className="trip-label">Trip to {review.tripLocation}</div>
                  <p className={`review-comment ${expanded ? "expanded" : ""}`}>
                    {expanded || !isLong
                      ? review.comment
                      : review.comment.substring(0, 200) + "..."}
                  </p>
                  {isLong && (
                    <button
                      className="read-more-btn"
                      onClick={() => setExpanded(!expanded)}
                    >
                      {expanded ? "Read Less" : "Read More"}
                    </button>
                  )}
                </div>

                <div className="review-bottom">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="reviewer-img"
                  />
                  <div className="reviewer-details">
                    <div className="reviewer-name">{review.name}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
