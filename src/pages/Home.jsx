import React, { useState } from "react";
import "../styles/Home.css";
import cars from "../data/cars";
import bgImage from "../../public/assets/bg-car.jpg";
import logo from "../../public/assets/logo.png";
import location from "../../public/assets/location1.png";
import { useNavigate } from "react-router-dom";
import CarCarousel from "../components/CarCarousel";
import arrowDown from "../../public/assets/dropdown-arrow.svg";

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

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert(`Message Sent:\n${JSON.stringify(contactForm, null, 2)}`);
    setContactForm({ name: "", email: "", message: "" });
  };

  // Form state for CheckAvailability
  const [formData, setFormData] = useState({
    bookingType: "",
    pickupDate: "",
    pickupTime: "",
    dropDate: "",
    dropTime: "",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/available-cars", {
      state: { availableCars: cars, formData: { ...formData, city: "Pune" } },
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
      <section
        className="hero-section"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <div className="overlay">
          <div className="content-wrapper">
            <div className="center-header">
              <img src={logo} alt="Malhar Logo" className="logo" />
              <h1 className="hero-title">Welcome to Malhar Car Rental</h1>
              <p className="hero-subtitle">📞 +91-9730562424</p>
              <p className="hero-location">
                <img src={location} alt="Location Logo" className="location-icon" />
                Available only in Pune
              </p>
            </div>

            <form className="check-form" onSubmit={handleSearch}>
              <select
                name="bookingType"
                value={formData.bookingType}
                onChange={(e) =>
                  setFormData({ ...formData, bookingType: e.target.value })
                }
                required
                style={{
                  backgroundImage: `url(${arrowDown})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 17px center",
                  backgroundSize: "22px",
                  appearance: "none",
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                }}
              >
                <option value="">Select Booking Type</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
              <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={(e) =>
                  setFormData({ ...formData, pickupDate: e.target.value })
                }
                required
              />
              <input
                type="time"
                name="pickupTime"
                value={formData.pickupTime}
                onChange={(e) =>
                  setFormData({ ...formData, pickupTime: e.target.value })
                }
                required
              />
              <input
                type="date"
                name="dropDate"
                value={formData.dropDate}
                onChange={(e) =>
                  setFormData({ ...formData, dropDate: e.target.value })
                }
                required
              />
              <input
                type="time"
                name="dropTime"
                value={formData.dropTime}
                onChange={(e) =>
                  setFormData({ ...formData, dropTime: e.target.value })
                }
                required
              />
              <button type="submit">Find Car</button>
            </form>
          </div>
        </div>
      </section>

      {/* Car Carousel */}
      <section className="cars section-spacing-bottom">
        <h2 className="section-heading">Find Your Perfect Self Drive Car</h2>
        <CarCarousel cars={cars} />
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <h2 className="section-heading">Top Benefits of Renting from Us</h2>
        <div className="benefits-container">
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
                    <div className="trip-label">Trip to {review.tripLocation}</div>
                    <p className={`review-comment ${isExpanded ? "expanded" : ""}`}>
                      {isExpanded || !isLong
                        ? review.comment
                        : review.comment.substring(0, 200) + "..."}
                    </p>
                    {isLong && (
                      <button
                        className="read-more-btn"
                        onClick={() =>
                          setExpandedReviewIndex(isExpanded ? null : index)
                        }
                      >
                        {isExpanded ? "Read Less" : "Read More"}
                      </button>
                    )}
                  </div>
                  <div className="review-bottom">
                    <img src={review.image} alt={review.name} className="reviewer-img" />
                    <div className="reviewer-details">
                      <div className="reviewer-name">{review.name}</div>
                    </div>
                  </div>
                </div>
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
                    setNewReview({ ...newReview, tripLocation: e.target.value })
                  }
                  required
                />
                <textarea
                  placeholder="Your Review"
                  rows="4"
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
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

      {/* Blog Section */}
      <section className="blog-section">
        <h2 className="section-heading">Latest Blog</h2>
        <div className="blog-container">
          <div className="blog-card">
            <img src="/assets/blogs/roadtrip.jpg" alt="Roadtrip" className="blog-img" />
            <h3>Top 5 Weekend Getaways from Pune</h3>
            <p>Discover scenic drives near Pune for a perfect short trip with our self-drive cars.</p>
          </div>
          <div className="blog-card">
            <img src="/assets/blogs/safety.jpg" alt="Safety" className="blog-img" />
            <h3>Self-Drive Car Safety Tips</h3>
            <p>Follow these tips to make your ride safe, fun, and hassle-free every time.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2 className="section-heading">Contact Us</h2>
        <form className="contact-form" onSubmit={handleContactSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={contactForm.name}
            onChange={handleContactChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={contactForm.email}
            onChange={handleContactChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            value={contactForm.message}
            onChange={handleContactChange}
            required
          />
          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
};

export default Home;
