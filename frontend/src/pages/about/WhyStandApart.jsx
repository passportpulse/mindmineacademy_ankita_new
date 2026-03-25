import "../../styles/about/why-stand-apart-section.css";
import {
  FaUniversity,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaIndustry,
  FaTools,
  FaCheckCircle,
} from "react-icons/fa";

const features = [
  {
    icon: <FaUniversity />,
    title: "Accredited Programs",
    subtitle: "High-Quality Education"
  },
  {
    icon: <FaCheckCircle />,
    title: "Career-Oriented",
    subtitle: "Prepared for Real-World Jobs"
  },
  {
    icon: <FaIndustry />,
    title: "Industry-Ready",
    subtitle: "Hands-On Practical Training"
  },
  {
    icon: <FaTools />,
    title: "Skill-Focused",
    subtitle: "Practical & Relevant Skills"
  },
];

export default function WhyStandApart() {
  return (
    <section className="stand-apart">
      <div className="container">
        <div className="stand-header">
          <h2>Why We Stand Apart</h2>
          <p>
            Empowering students with practical skills, real-world experience, and
            career-focused learning across various fields.
          </p>
        </div>

        <div className="stand-grid">
          {features.map((f, index) => (
            <div className="stand-card" key={index}>
              <div className="stand-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
