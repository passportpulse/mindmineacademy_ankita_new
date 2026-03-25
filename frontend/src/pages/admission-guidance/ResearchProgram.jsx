import React from "react";
import { phdSubjectsData } from "../../data/researchProgramData";
import "../../styles/admission-guidance/research-program.css";

export default function ResearchProgram() {
  const eligibility = "Master's degree in relevant discipline required.";

  return (
    <section className="rp-section" id="research">
      <div className="container">
        <div className="rp-container">
          <header className="rp-header">
            <span className="rp-badge">Doctoral Program</span>
            <h2 className="rp-title">PhD – All Subjects</h2>
            <p className="rp-description">
              Pursue advanced research under expert supervision with recognized
              doctoral programs across multiple disciplines.
            </p>
          </header>

          {/* Eligibility Line */}
          <p className="rp-eligibility">
            <strong>Eligibility:</strong> {eligibility}
          </p>

          <div className="rp-subjects-grid">
            {phdSubjectsData.map((subject, index) => (
              <div className="rp-subject-item" key={index}>
                {subject}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
