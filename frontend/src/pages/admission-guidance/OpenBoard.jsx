import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { openBoardPrograms } from "../../data/openBoardData";
import "../../styles/admission-guidance/open-board.css";

export default function OpenBoard() {
  return (
    <section className="open-board-section" id="open-board">
      <div className="container">
        <h2 className="section-heading">Open Board Programs</h2>
        <p className="section-subtext">
          Flexible & recognized education pathways for Class X and Class XII
        </p>

        <div className="open-board-grid">
          {openBoardPrograms.map((program) => (
            <div
              key={program.id}
              id={program.hash}
              className={`open-board-card ${program.dark ? "dark" : ""}`}
            >
              <h3>{program.title}</h3>
              {/* Eligibility */}
              <div className="eligibility-box">
                <h4>Eligibility</h4>
                <p>{program.eligibility}</p>
              </div>
              <div className="subjects-grid">
                {program.subjects.map((sub, index) => (
                  <div className="subject-item" key={index}>
                    <FaCheckCircle className="tick-icon" />
                    <span>{sub}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
