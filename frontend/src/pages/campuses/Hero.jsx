import React, { useState } from "react";
import "../../styles/campus/hero.css";
import campus1 from "../../assets/campus1.png";
import campus2 from "../../assets/campus2.png";
// import campus3 from "../../assets/bagnan.png";

const campuses = [
  {
    name: "Moulali City Campus",
    address:
      "52A Indian Mirror Street, Taltala, Opp. G.D. Hospital, Kolkata – 700013",
    desc: "Located in the heart of Kolkata, Moulali City Campus offers a modern learning environment with classrooms, skill development centers, and practical labs for holistic student growth.",
    programs: [
      "Modern Classrooms",
      "Skill Development",
      "Practical Labs",
      "Student Hub",
    ],
    mapLink: "https://www.google.com/maps?q=22.5616997,88.3619713&z=17&hl=en",
    image: campus1,
  },
  {
    name: "Thakurpukur Campus",
    address: "64 James Long Sarani, Near Joka Metro Station, Kolkata – 700104",
    desc: "Thakurpukur Campus focuses on digital skills, IT labs, and professional training programs with easy metro access for students.",
    programs: [
      "Smart Classrooms",
      "Digital Skills Labs",
      "Professional Workshops",
      "IT Labs",
    ],
    mapLink: "https://www.google.com/maps?q=22.4542307,88.3041509&z=17&hl=en",
    image: campus2,
  },
  // {
  //   name: "Bagnan Campus",
  //   address:
  //     "Maharaja Agrasain Dham, Near Ghoraghata Railway Station, Howrah – 711303",
  //   desc: "Bagnan Campus provides accessible education, industry skill development, and a student-friendly environment for South Kolkata learners.",
  //   programs: [
  //     "Community Programs",
  //     "Skill Development",
  //     "Innovation Labs",
  //     "Student Hub",
  //   ],
  //   mapLink: "https://www.google.com/maps?q=22.4522204,87.9443786&z=17&hl=en",
  //   image: campus3,
  // },
];

export default function CampusSection() {
  const [selected, setSelected] = useState(campuses[0]);

  return (
    <section className="campus-section">
      {/* Hero Section */}
      <div className="hero-top">
        <div className="hero-images">
          <img src={campus1} alt="Campus view 1" />
          <img src={campus2} alt="Campus view 2" />
        </div>

        <div className="overlay">
          <h1>Our Campuses</h1>
          <p>
            Three urban campuses for skill-based higher education across West
            Bengal.
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container">
        <div className="hero-bottom">
          {/* Left: Campus List */}
          <div className="campus-list">
            <h3>Select a Location</h3>
            {campuses.map((campus, index) => (
              <div
                key={index}
                className={`campus-item ${
                  selected.name === campus.name ? "active" : ""
                }`}
                onClick={() => setSelected(campus)}
              >
                <h4>{campus.name}</h4>
                <p>{campus.address}</p>
              </div>
            ))}
          </div>

          {/* Right: Selected Campus Details */}
          <div className="campus-details">
            <h3>{selected.name}</h3>
            <p className="campus-desc">{selected.desc}</p>

            <ul className="program-list">
              {selected.programs.map((program, i) => (
                <li key={i}>
                  <span className="tick">&#10003;</span> {program}
                </li>
              ))}
            </ul>

            <div className="btn-group">
              <a
                href="/brochure.pdf" // file in public folder
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Download Brochure
              </a>

              <a
                href={selected.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                View on Map
              </a>

              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=info.mindmine2026@gmail.com&su=${encodeURIComponent(
                  "Inquiry about Campus",
                )}&body=${encodeURIComponent("Hello, I would like to know more about your campus programs.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Contact Campus
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
