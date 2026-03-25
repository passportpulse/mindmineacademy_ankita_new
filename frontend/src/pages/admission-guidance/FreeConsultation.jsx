import React from "react";
import { FaUserGraduate } from "react-icons/fa";
import "../../styles/admission-guidance/free-consultation.css";

export default function FreeConsultation() {
  return (
    <section className="fc-section">
      <div className="fc-card">
        <div className="fc-content">
          <div className="fc-icon">
            <FaUserGraduate />
          </div>

          <h2 className="fc-title">
            Not Sure Which Course Is Right for You?
          </h2>

          <p className="fc-text">
            Our career counselors are here to help you choose the best path for
            your future.
          </p>

          <button
            className="fc-button"
            onClick={() => (window.location.href = "/apply-now")}
          >
            Book a Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
