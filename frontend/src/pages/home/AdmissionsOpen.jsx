import React from "react";
import { FaDownload } from "react-icons/fa";
import "../../styles/home/admission-open-section.css";

export default function AdmissionsOpen() {
  const currentYear = new Date().getFullYear();

  return (
    <section className="admissions-section">
      <div className="container">
        <div className="admissions-container">
          <div className="admissions-text">
            <h2>Admissions Open — {currentYear}</h2>
            <p>
              Admissions Open! Explore our career-focused programs in
              Technology, Design, and Healthcare. Limited seats — enroll now!
            </p>

            <div className="admissions-buttons">
              <button
                className="admissions-apply-btn"
                onClick={() => (window.location.href = "/apply-now")}
              >
                Apply for Admission
              </button>

              <a
                href="/brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <button className="admissions-brochure-btn">
                  <FaDownload style={{ marginRight: "8px" }} />
                  Download Brochure
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
