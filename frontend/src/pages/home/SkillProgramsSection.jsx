import React from "react";
import { FaLaptop, FaCalculator } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { TfiStatsUp } from "react-icons/tfi";
import "../../styles/home/skill-programs-section.css";

const programs = [
  {
    title: "Computer Applications",
    category: "Professional Certificate",
    duration: "1 Year",
    icon: <FaLaptop />,
  },
  {
    title: "Office Administration",
    category: "Skill Training",
    duration: "6 Months",
    icon: <IoBookSharp />,
  },
  {
    title: "Tally & GST",
    category: "Finance Accounting",
    duration: "1 Year",
    icon: <FaCalculator />,
  },
  {
    title: "Digital Marketing Basics",
    category: "SEO • Social Media",
    duration: "6 Months",
    icon: <TfiStatsUp />,
  },
];

export default function SkillProgramsSection() {
  return (
    <section className="skill-programs-section">
      <div className="container">
        <h2 className="section-heading">Professional Skill Programs</h2>
      <div className="programs-grid">
        {programs.map((program, index) => (
          <div className="program-card" key={index}>
            <div className="program-icon-wrapper">{program.icon}</div>
            <div className="program-info">
              <h3 className="program-title">{program.title}</h3>
              <p className="program-category">{program.category}</p>
            </div>

            <hr className="program-divider" />

            <div className="program-footer">
              <span className="program-duration">{program.duration}</span>
              <IoIosArrowForward className="program-arrow"/>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
