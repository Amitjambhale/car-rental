import React, { useState } from "react";
import "../styles/Home.css";
import cars from "../data/cars";
import { useNavigate } from "react-router-dom";


// Components
import CarCarousel from "../components/CarCarousel";

// React Icons
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineDirectionsCar } from "react-icons/md";

// Images
import logo from "../../public/assets/logo.png";
import location from "../../public/assets/location1.png";


// Dummy reviews
const reviews = [
  {
    name: "Amit Verma",
    tripLocation: "Lonavala",
    comment:
      "Had an amazing weekend getaway to Lonavala with the Hyundai i20. The car was in top condition, super comfortable for long drives, and the music system made the ride even more enjoyable.",
    image: "/assets/users/amit.jpg",
  },
  {
    name: "Priya Sharma",
    tripLocation: "Mahabaleshwar",
    comment:
      "We took the Maruti Baleno for a 3-day family trip to Mahabaleshwar and it was a fantastic experience. The car was spotless, had great boot space for our luggage, and gave excellent mileage.",
    image: "/assets/users/priya.jpg",
  },
  {
    name: "Rahul Mehta",
    tripLocation: "Mumbai Business Trip",
    comment:
      "Rented the Honda Amaze for a two-day work trip to Mumbai. The car was clean, fuel-efficient, and smooth in traffic. AC cooling was fast, and Bluetooth worked perfectly for my calls.",
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

  // Booking Form state
  const [formData, setFormData] = useState({
    bookingType: "",
    pickupDate: "",
    pickupTime: "",
    dropDate: "",
    dropTime: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      <section className="luxury-hero">
        <div className="hero-content-wrapper">
          <div className="hero-content-grid">

            {/* Branding Section */}
            <div className="branding-section">
              <div className="logo-container">
                <img src={logo} alt="Malhar Logo" className="brand-logo" />
              </div>
              <h1 className="hero-headline gradient-text">
                Welcome to Malhar Car Rental
              </h1>
              <p className="sub-headline">Available only in Pune</p>

              <div className="contact-info">
                <div className="phone">
                  <FaPhoneAlt className="contact-icon" />
                  <span>+91-9730562424</span>
                </div>
                <div className="location">
                  <img src={location} alt="Location" className="location-icon" />
                  <span>Pune, India</span>
                </div>
              </div>

            </div>

            {/* Booking Section */}
            <div className="booking-section">
              <div className="luxury-booking-card">

                {/* Heading */}
                <div className="form-header">
                  <MdOutlineDirectionsCar className="form-header-icon" />
                  <h2>Book Your Luxury Ride</h2>
                  <span className="underline"></span>
                </div>

                {/* Form */}
                <form className="booking-form" onSubmit={handleSearch}>
                  {/* Booking Type - Full Width */}
                  <div className="form-row single">
                    <div className="floating-label">
                      <select
                        name="bookingType"
                        value={formData.bookingType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Booking Type</option>
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                      </select>
                      <label>Booking Type</label>
                    </div>
                  </div>

                  {/* Pickup */}
                  <div className="form-row">
                    <div className="floating-label">
                      <input
                        type="date"
                        name="pickupDate"
                        value={formData.pickupDate}
                        onChange={handleChange}
                        required
                      />
                      <label>Pickup Date</label>
                    </div>
                    <div className="floating-label">
                      <input
                        type="time"
                        name="pickupTime"
                        value={formData.pickupTime}
                        onChange={handleChange}
                        required
                      />
                      <label>Pickup Time</label>
                    </div>
                  </div>

                  {/* Drop */}
                  <div className="form-row">
                    <div className="floating-label">
                      <input
                        type="date"
                        name="dropDate"
                        value={formData.dropDate}
                        onChange={handleChange}
                        required
                      />
                      <label>Drop Date</label>
                    </div>
                    <div className="floating-label">
                      <input
                        type="time"
                        name="dropTime"
                        value={formData.dropTime}
                        onChange={handleChange}
                        required
                      />
                      <label>Drop Time</label>
                    </div>
                  </div>

                  <button type="submit" className="book-now-button">
                    Find Car
                  </button>
                </form>
              </div>
            </div>
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

      <section className="review-section">
        <h2 className="section-heading">Customer Experiences</h2>

        <div className="review-cards-container">
          {reviews.map((review, index) => (
            <div className="review-card" key={index}>
              <div className="card-top-strip"></div>
              <div className="review-header">
                <img src={review.image} alt={review.name} className="reviewer-img" />
                <div>
                  <h3 className="reviewer-name">{review.name}</h3>
                  <p className="trip-label">Trip to {review.tripLocation}</p>
                </div>
              </div>
              <div className="review-stars">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>

        {/* 👇 Centered Add Review Button */}
        <div className="add-review-wrapper">
          <button className="add-review-btn" onClick={() => setShowForm(true)}>
            + Add Review
          </button>
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

                {/* ⭐ Star Rating instead of Select */}
                <div className="star-rating">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <React.Fragment key={star}>
                      <input
                        type="radio"
                        id={`star${star}`}
                        name="rating"
                        value={star}
                        checked={newReview.rating === star}
                        onChange={(e) =>
                          setNewReview({ ...newReview, rating: Number(e.target.value) })
                        }
                      />
                      <label htmlFor={`star${star}`}>★</label>
                    </React.Fragment>
                  ))}
                </div>



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



      {/* Contact Section */}
      <section className="contact-section">
        <h2 className="section-heading">Contact Us</h2>
        <div className="contact-container">
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" rows="4" required />
            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>

    </div>
  );
};

export default Home;
