import React from "react";
import "../../../styles/tutorials/cta.css";
import study from "../../../assets/study.jpg";

export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-container">
          <div className="cta-text">
            <h2 className="cta-title">Start Your Preparation Journey</h2>
            <p className="cta-description">
              Structured learning paths, expert mentors, and result-driven
              preparation designed to help you achieve your goals with
              confidence.
            </p>
            <button className="cta-primary-btn">Get Started</button>
          </div>

          <div className="cta-media">
            <img src={study} alt="Students studying" />
          </div>
        </div>
      </div>
    </section>
  );
}
