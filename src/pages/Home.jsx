import React, { useState } from "react";
import "../styles/Home.css";
import CheckAvailability from "../components/CheckAvailability";
import cars from "../data/cars";
import bgImage from "/assets/bg-car.jpg";
import { useNavigate } from "react-router-dom";
import CarCarousel from "../components/CarCarousel";

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
  const navigate = useNavigate();
  const [expandedReviewIndex, setExpandedReviewIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    tripLocation: "",
    comment: "",
  });

  const handleSearch = (formData) => {
    navigate("/available-cars", {
      state: { availableCars: cars, formData },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Review Submitted:\n${JSON.stringify(newReview, null, 2)}`);
    setShowForm(false);
    setNewReview({ name: "", tripLocation: "", comment: "" });
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div
        className="hero-section"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="overlay" />
        <div className="hero-text">
          <CheckAvailability onSearch={handleSearch} />
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
          {/* Repeat this benefit-card block for all 6 cards */}
          <div className="benefit-card">
            <img src="/assets/icons/secure-payment.png" alt="Secure" className="benefit-icon" />
            <h3>Secure Payments</h3>
            <p>Our Payment Partners are Industry Leaders.</p>
          </div>
          <div className="benefit-card">
            <img src="/assets/icons/verified-dealer.png" alt="Verified" className="benefit-icon" />
            <h3>Verified Dealers</h3>
            <p>Only trusted & verified dealers onboarded.</p>
          </div>
          <div className="benefit-card">
            <img src="/assets/icons/clock.png" alt="No Bullshit" className="benefit-icon" />
            <h3>No Bullshit</h3>
            <p>A Day Rent is simply for 24 hrs. We mean it.</p>
          </div>
          <div className="benefit-card">
            <img src="/assets/icons/instant-booking.png" alt="Instant Booking" className="benefit-icon" />
            <h3>Instant Booking</h3>
            <p>Book instantly with real-time availability.</p>
          </div>
          <div className="benefit-card">
            <img src="/assets/icons/customer-service_5432364.png" alt="Support" className="benefit-icon" />
            <h3>24/7 Support</h3>
            <p>Round-the-clock customer support.</p>
          </div>
          <div className="benefit-card">
            <img src="/assets/icons/car-selection.png" alt="Car Selection" className="benefit-icon" />
            <h3>Wide Car Selection</h3>
            <p>Choose from hatchbacks, sedans, SUVs & more.</p>
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section className="review-section">
        <h2 className="section-heading">Customer Experiences</h2>
        <div className="review-cards-container">
          {reviews.map((review, index) => {
            const isExpanded = expandedReviewIndex === index;
            const isLong = review.comment.length > 200;
            return (
              <div className="review-card-wrapper" key={index}>
                <div className="review-card">
                  <div className="review-top">
                    <div className="trip-label">
                      Trip to {review.tripLocation}
                    </div>
                    <p
                      className={`review-comment ${
                        isExpanded ? "expanded" : ""
                      }`}
                    >
                      {isExpanded || !isLong
                        ? review.comment
                        : review.comment.substring(0, 200) + "..."}
                    </p>
                    {isLong && (
                      <button
                        className="read-more-btn"
                        onClick={() =>
                          setExpandedReviewIndex(
                            isExpanded ? null : index
                          )
                        }
                      >
                        {isExpanded ? "Read Less" : "Read More"}
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

                {/* Show Add Review Button only next to 3rd card */}
                {index === 2 && (
                  <div className="add-review-wrapper">
                    <button
                      className="add-review-btn-right"
                      onClick={() => setShowForm(true)}
                    >
                      + Add Review
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Review Form Modal */}
        {showForm && (
          <div className="review-form-popup">
            <div className="review-form-content">
              <h3>Add Your Review</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={newReview.name}
                  onChange={(e) =>
                    setNewReview({ ...newReview, name: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Trip Location"
                  value={newReview.tripLocation}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      tripLocation: e.target.value,
                    })
                  }
                  required
                />
                <textarea
                  placeholder="Your Review"
                  rows="4"
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      comment: e.target.value,
                    })
                  }
                  required
                />
                <div className="form-actions">
                  <button type="submit">Submit</button>
                  <button type="button" onClick={() => setShowForm(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
