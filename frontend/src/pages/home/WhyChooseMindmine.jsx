import {
  FaUniversity,
  FaTools,
  FaBriefcase,
} from "react-icons/fa";
import { LiaCertificateSolid } from "react-icons/lia";
import "../../styles/home/why-choose-mindmine.css";

export default function WhyChooseMindmine() {
  return (
    <section className="why-mindmine-section">
      <div className="container">
        <div className="why-mindmine-container">
          {/* LEFT SIDE */}
          <div className="why-mindmine-left">
            <h2>
              Why Students Choose <br />
              <span>Our Programs?</span>
            </h2>

            <p>
              We offer practical, career-focused programs that combine
              academic knowledge, hands-on skills, and professional
              development to prepare students for success in any field.
            </p>

            <button className="why-mindmine-btn" onClick={() => (window.location.href = "/apply-now")}>
              Join Us Today
            </button>
          </div>

          {/* RIGHT SIDE */}
          <div className="why-mindmine-right">
            <div className="why-card">
              <FaUniversity />
              <h4>Accredited Programs</h4>
              <p>
                All programs are recognized and adhere to national educational standards.
              </p>
            </div>

            <div className="why-card">
              <FaTools />
              <h4>Practical Learning</h4>
              <p>
                Hands-on training ensures students gain real-world skills and experience.
              </p>
            </div>

            <div className="why-card">
              <LiaCertificateSolid />
              <h4>Industry Recognition</h4>
              <p>
                Our courses are valued by employers and prepare students for diverse careers.
              </p>
            </div>

            <div className="why-card">
              <FaBriefcase />
              <h4>Career Support</h4>
              <p>
                Students receive guidance for internships, placements, and professional growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
