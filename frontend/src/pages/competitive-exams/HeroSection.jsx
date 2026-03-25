import "../../styles/competitive-exams/hero-section.css";
// import { FaClock, FaRupeeSign } from "react-icons/fa";

export default function CompetitiveHeroSection() {
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="ce-hero-wrapper">
        <div className="ce-hero-container">
          <div className="text-center">
            {/* Hero Button */}
            <div className="ce-hero-button-container">
              <button className="ce-hero-button">Premium Education Provider</button>
            </div>

            {/* Headings */}
            <h1 className="ce-hero-heading">Mindmine Academy for</h1>
            <h1 className="ce-hero-gradient-text">Competitive Exams (MACE)</h1>

            {/* Hero Text */}
            <div className="ce-hero-text">
              <p>52A Indian Mirror Street, Opposite GD Hospital, Taltala, Kolkata</p>
              <p>Empowering students to crack the toughest government exams with expert strategy.</p>
            </div>

            {/* Action Buttons */}
            <div className="ce-hero-actions">
              <button className="ce-primary-btn">
                Get Started <i className="fa-solid fa-arrow-right"></i>
              </button>

              <a href="tel:+917605057139" className="ce-phone-btn">
                <i className="fa-solid fa-phone-volume"></i>
                <span>7605057139</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HERO CARDS (FLOATING) ================= */}
      {/* <section className="ce-hero-cards-wrapper">
        <div className="ce-hero-cards">
          {/* Card 1: Course Duration */}
          {/* <div className="ce-hero-card">
            <div className="ce-card-title">
              <FaClock className="ce-card-icon clock" />
              <div className="ce-card-text">
                <h3>Course Duration</h3>
                <p>Structured Learning Levels</p>
              </div>
            </div>
            <div className="ce-course-duration">
              <div className="ce-duration-row">
                <span>Level 1</span>
                <span className="ce-fees-duration-right">3 Months</span>
              </div>
              <div className="ce-duration-row">
                <span>Level 2</span>
                <span className="ce-fees-duration-right">6 Months</span>
              </div>
              <div className="ce-duration-row">
                <span>Level 3</span>
                <span className="ce-fees-duration-right">12 Months</span>
              </div>
              <div className="ce-duration-row">
                <span>Level 4</span>
                <span className="ce-fees-duration-right">24 Months</span>
              </div>
            </div>
          </div> */} 

          {/* Card 2: Affordable Fees */}
          {/* <div className="ce-hero-card">
            <div className="ce-card-title">
              <FaRupeeSign className="ce-card-icon rupee" />
              <div className="ce-card-text">
                <h3>Affordable Fees</h3>
                <p>Invest in Your Future</p>
              </div>
            </div>
            <div className="ce-course-fees">
              <div className="ce-fees-row highlight">
                <div className="ce-fees-text">
                  <span>Level 4</span>
                  <span>
                    6 Months <span className="ce-per-month">/ month</span>
                  </span>
                </div>
              </div>

              <div className="ce-fees-row">
                <span>Level 3</span>
                <span className="ce-fees-row-right">₹1500 / month</span>
              </div>
            </div>
          </div> */}
        {/* </div> */}
      {/* </section> */}
    </>
  );
}
