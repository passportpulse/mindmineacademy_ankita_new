import React from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import "../../styles/process/admission-cta.css";

export default function AdmissionCTA() {
  return (
    <section className="admission-cta">
      <div className="container">
        <div className="cta-container">
          <h2>Ready to Apply?</h2>
          <p className="cta-subtitle">
            Admissions are now open for the upcoming academic session — limited
            seats are available for our
            <strong> professional and skill-based programs</strong> designed to
            equip students with practical knowledge, industry-relevant skills,
            and career-ready expertise across multiple fields. Secure your seat
            today and take the first step toward a successful professional
            journey.
          </p>

          <div className="cta-contact">
            <a href="tel:7595077657" className="cta-item">
              <FaPhoneAlt />
              <span>7595077657</span>
            </a>

            <a href="mailto:info.mindmine2026@gmail.com" className="cta-item">
              <FaEnvelope />
              <span>info.mindmine2026@gmail.com</span>
            </a>
          </div>

          <button
            className="apply-now-btn"
            onClick={() => (window.location.href = "/apply-now")}
          >
            Apply Now
          </button>
        </div>
      </div>
    </section>
  );
}
