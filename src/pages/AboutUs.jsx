import React from "react";
import "../styles/About.css";
import aboutImage from "/assets/about-hero.jpg"; // apna image path

const AboutUs = () => {
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
                    affordable. At <strong>DriveEasy Rentals</strong>, we provide
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
                    <h3>200+</h3>
                    <p>Cars Available</p>
                </div>
                <div className="stat-card">
                    <h3>50+</h3>
                    <p>Locations Served</p>
                </div>
            </section>

            {/* Team Section */}
            <section className="team-section">
                <h2>Meet Our Team</h2>
                <div className="team-members">
                    <div className="team-card">
                        <img src="/assets/users/amit.jpg" alt="Team Member" />
                        <h4>Raj Sharma</h4>
                        <p>Founder & CEO</p>
                    </div>
                    <div className="team-card">
                        <img src="/assets/users/priya.jpg" alt="Team Member" />
                        <h4>Pooja Verma</h4>
                        <p>Operations Head</p>
                    </div>
                    <div className="team-card">
                        <img src="/assets/users/rahul.jpg" alt="Team Member" />
                        <h4>Amit Kumar</h4>
                        <p>Customer Support Lead</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <h2>Ready to Start Your Journey?</h2>
                <p>Book your self-drive car today and experience the freedom of travel.</p>
                <button className="book-btn">Book Now</button>
            </section>
        </div>
    );
};

export default AboutUs;
