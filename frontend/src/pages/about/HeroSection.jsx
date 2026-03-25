import "../../styles/about/hero-section.css";

export default function HeroSection() {
  return (
    <section className="about-hero">
      <div className="container">
        <div className="about-hero-container">
          {/* LEFT */}
          <div className="about-hero-left">
            <span className="about-badge">
              Skill-Based Education for Future Careers
            </span>

            <h1 className="about-hero-title">
              Building Professional Careers Through
              <span> Industry-Aligned Programs</span>
            </h1>

            <p className="about-hero-desc">
              Our academy offers career-focused programs across Technology, Design, and Healthcare, shaping students into job-ready professionals.
            </p>

            {/* HIGHLIGHT BOX */}
            <div className="about-highlight">
              <div>
                <h4>Industry-Aligned</h4>
                <p>Professional Programs</p>
              </div>
              <div>
                <h4>Multiple Campuses</h4>
                <p>Accessible City Locations</p>
              </div>
              <div>
                <h4>Recognized</h4>
                <p>Accredited Courses & Certifications</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="about-hero-right">
            <div className="about-info-card">
              <h3>Who We Are</h3>
              <p>
                An institution delivering industry-focused programs in emerging fields and practical skill development.
              </p>
            </div>

            <div className="about-info-card">
              <h3>Our Campuses</h3>
              <p>
                Multiple city-accessible campuses offering hands-on training and professional learning environments.
              </p>
            </div>

            <div className="about-info-card">
              <h3>Recognition</h3>
              <p>
                Accredited programs and recognized certifications ensuring quality education and career readiness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
