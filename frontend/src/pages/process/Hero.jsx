import { FaPhoneAlt, FaWpforms, FaFileAlt, FaUserCheck } from "react-icons/fa";
import "../../styles/process/hero.css";

export default function Hero() {
  return (
    <section className="admission-process">
      <div className="container">
        {/* HERO HEADER */}
        <div className="process-header">
          <h2>Admission Process</h2>
          <p className="subtitle">Enquiry & Counseling</p>

          <p className="description">
            Call us or visit any campus to discuss courses, eligibility, and
            career opportunities with our expert counselors.
          </p>

          <a href="tel:7595077657" className="call-btn" style={{textDecoration:'none'}}>
            <FaPhoneAlt /> Call for Counseling
          </a>
        </div>

        {/* STEPS */}
        <div className="process-steps">
          <div className="process-card">
            <span className="step-number">01</span>
            <div className="icon">
              <FaWpforms />
            </div>
            <h3>Application Form</h3>
            <p>
              Fill out the admission form and submit basic documents to begin
              your application process.
            </p>
          </div>

          <div className="process-card">
            <span className="step-number">02</span>
            <div className="icon">
              <FaFileAlt />
            </div>
            <h3>Document Verification</h3>
            <p>
              Our team verifies your eligibility and academic records for
              approval by campus authority.
            </p>
          </div>

          <div className="process-card">
            <span className="step-number">03</span>
            <div className="icon">
              <FaUserCheck />
            </div>
            <h3>Enrollment Confirmation</h3>
            <p>
              Deposit the admission fee and receive your enrollment ID with
              complete course confirmation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
