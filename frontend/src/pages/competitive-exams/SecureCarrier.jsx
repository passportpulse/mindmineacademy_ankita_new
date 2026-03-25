import "../../styles/competitive-exams/secure-carrier.css";
import { FaGraduationCap } from "react-icons/fa"; // scholar hat icon

export default function SecureCarrier() {
  return (
    <section className="secure-career-section">
      <div className="secure-card">
        <div className="secure-text">
          <div className="scholar-image">
            <FaGraduationCap />
          </div>
          <h2>Ready to Secure Your Career?</h2>
          <p>
            Join Mindmine Academy today and start your journey towards a
            successful government job.
          </p>

          <div className="secure-buttons">
            <button className="apply-btn" onClick={() => window.location.href = "/apply-now"}>Apply for Admission</button>
            <button className="contact-btn" onClick={() => window.location.href = "tel:+917605057139"} >Contact Us</button>
          </div>
        </div>
      </div>
    </section>
  );
}
