import React from "react";
import {
  FaUniversity,
  FaTools,
  FaUsers,
  FaChalkboardTeacher,
} from "react-icons/fa";
import "../../styles/home/excellence-section.css";

export default function ExcellenceSection() {
  const features = [
    {
      icon: <FaUniversity />,
      title: "Accredited",
      desc: "Our institution is officially recognized, ensuring credibility and trust in the education we provide.",
    },
    {
      icon: <FaTools />,
      title: "Practical Approach",
      desc: "We emphasize hands-on learning, preparing students to apply knowledge effectively in real-world situations.",
    },
    {
      icon: <FaUsers />,
      title: "Student Focus",
      desc: "A supportive atmosphere where students are guided, encouraged, and empowered to succeed.",
    },
    {
      icon: <FaChalkboardTeacher />,
      title: "Experienced Faculty",
      desc: "Learn from knowledgeable educators with extensive teaching experience and dedication to student growth.",
    },
  ];

  return (
    <section className="excellence-section">
      <div className="container">

        {/* HEADER */}
        <div className="excellence-header">
          <h4>Why Choose Us</h4>
          <h2>Excellence in Education</h2>
          <p>
            We are committed to nurturing talent, fostering practical skills, and guiding students towards a successful future.
          </p>
        </div>

        {/* GRID CARDS */}
        <div className="excellence-grid">
          {features.map((item, index) => (
            <div className="excellence-card" key={index}>
              <div className="excellence-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
