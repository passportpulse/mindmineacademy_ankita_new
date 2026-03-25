import React from "react";
import "../../../styles/tutorials/hero-section.css";
import image from "../../../assets/hero-students.png";

export default function HeroSection({ title, subtitle }) {
  return (
    <section className="tutorial-hero-section">
      <div className="container">
        <div className="tutorial-hero-content">
          <h1 className="tutorial-hero-title">{title}</h1>
          <p className="tutorial-hero-subtitle">{subtitle}</p>
          <button className="tutorial-hero-btn">
            Explore Exams <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>

        <div className="tutorial-hero-image">
          <img src={image} alt="Students studying" />
        </div>
      </div>
    </section>
  );
}
