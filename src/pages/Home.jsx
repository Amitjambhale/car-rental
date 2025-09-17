
import "../styles/Home.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

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
    name: "Amit Jambhale",
    tripLocation: "Nashik",
    comment:
      "Booked a Swift Dzire for a weekend trip to Nashik. The car was clean, well-maintained, and super smooth on the highway. Pickup and drop were hassle-free.",
    image: "/assets/users/amit.jpg",
    rating: 4,
  },
  {
    name: "Vaibhav Sagar",
    tripLocation: "Mahabaleshwar",
    comment:
      "Our Mahabaleshwar trip was amazing with the Innova Crysta. Comfortable seats, good mileage, and enough space for all our luggage. Totally worth it.",
    image: "/assets/users/priya.jpg",
    rating: 5,
  },
  {
    name: "Rohit Shelke",
    tripLocation: "Kokan",
    comment:
      "We drove down to Kokan with a Maruti Baleno. The ride was super smooth on coastal roads, AC worked great even in the afternoon heat, and mileage was excellent.",
    image: "/assets/users/rahul.jpg",
    rating: 4,
  },
  {
    name: "Abhi Kate",
    tripLocation: "Latur",
    comment:
      "Rented a Honda Ciaz for my Latur trip. The car was neat, Bluetooth was handy for music, and overall it was a stress-free drive. Would definitely recommend.",
    image: "/assets/users/amit.jpg",
    rating: 5,
  },
  {
    name: "Tohid Inamdar",
    tripLocation: "Mumbai",
    comment:
      "Booked a Polo for a business trip to Mumbai. The car was powerful in traffic, very comfortable, and gave a premium feel. Great service experience as well.",
    image: "/assets/users/rahul.jpg",
    rating: 3,
  },
  {
    name: "Subodh Shelke",
    tripLocation: "Ganpatipule",
    comment:
      "We took an Ertiga for a group trip to Ganpatipule and Diveagar. Perfect for long drives with friends, spacious enough, and smooth ride throughout the coastal journey.",
    image: "/assets/users/priya.jpg",
    rating: 4,
  },
];



const Home = () => {
  const navigate = useNavigate();

  const [expandedReviewIndex, setExpandedReviewIndex] = useState(null);
  const [cars, setCars] = useState([]);   // ✅ removed duplicate import conflict
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://192.168.1.46:8000/api/cars/")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((car) => ({
          id: car.id,
          name: car.car_name,
          fuelType: car.fuel_type,
          rent: parseFloat(car.prize),
          image: car.image.startsWith("http") ? car.image : `http://192.168.1.46:8000${car.image}`,
          isBooked: car.is_booked,
          availableFrom: car.available_from,
        }));


        setCars(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cars:", err);
        setLoading(false);
      });
  }, []);


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

  // Booking form
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

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const payload = {
      pick_up_date: formatDate(formData.pickupDate),
      pick_time: formData.pickupTime,
      drop_off_date: formatDate(formData.dropDate),
      drop_time: formData.dropTime,
    };

    try {
      const response = await axios.post(
        "http://192.168.1.46:8000/api/findcar/",
        payload
      );

      navigate("/available-cars", {
        state: { availableCars: response.data, formData },
      });
    } catch (error) {
      console.error("❌ Error fetching cars:", error.response?.data || error.message);
      alert("Error: " + JSON.stringify(error.response?.data || error.message));
    }
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

              {/* Contact Info */}
              <div className="contact-info">
                <div className="phone">
                  <FaPhoneAlt className="contact-icon" />
                  <a href="tel:+919730562424" className="phone-link">
                    +91-9730562424
                  </a>
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
                  {/* Booking Type */}
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
      <section className="carss section-spacing-bottom">
        <h2 className="section-heading">Find Your Perfect Self Drive Car</h2>
        {loading ? <p>Loading cars...</p> : <CarCarousel cars={cars} loading={loading} />}
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


      {/* // Review Section */}
      <section className="review-section">
        <h2 className="section-heading">Happy Customers</h2>

        <div className="review-carousel">
          {reviews.map((review, index) => (
            <div className="review-slide" key={index}>
              {/* Decorative Top Strip */}
              <div className="card-top-strip"></div>

              <img src={review.image} alt={review.name} className="review-avatar" />

              <div className="review-stars">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>


              <p className="review-comment">“{review.comment}”</p>

              {/* Footer Section */}
              <div className="review-footer">
                <h3 className="reviewer-name">{review.name}</h3>
                <span className="trip-badge">🚘 Trip to {review.tripLocation}</span>
              </div>

            </div>
          ))}
        </div>
      </section>


      {/* Contact Section */}


      <section className="contact-premium">
        <div className="contact-container-premium">
          <h2 className="contact-title">Get in Touch</h2>
          <p className="contact-subtitle">
            Have questions or need assistance? We’re here to help you 24/7.
          </p>

          <div className="contact-cards">
            <div className="contact-card">
              <i className="fas fa-phone-alt"></i>
              <h4>Call Us</h4>
              <p>+91 98765 43210</p>
            </div>

            <div className="contact-card">
              <i className="fas fa-envelope"></i>
              <h4>Email</h4>
              <p>support@malharcarrental.com</p>
            </div>

            <div className="contact-card">
              <i className="fas fa-map-marker-alt"></i>
              <h4>Visit Us</h4>
              <p>Pune, Maharashtra, India</p>
            </div>
          </div>

          <div className="contact-extra">
            <a href="https://wa.me/918010345589" target="_blank" rel="noreferrer">
              <i className="fab fa-whatsapp"></i> Chat on WhatsApp
            </a>
            <div className="social-icons">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-linkedin-in"></i>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home;
