import React from "react";
import { traditionalUGPGPrograms } from "../../data/traditionalUgPgData";
import "../../styles/admission-guidance/traditional-ugpg.css";

export default function TraditionalUGPG() {
  return (
    <section className="tugpg-section" id="traditionalugpg">
      <div className="container">
        <h2 className="tugpg-heading">Traditional UG & PG Programs</h2>
        <p className="tugpg-subtext">
          Recognized undergraduate and postgraduate degrees across Arts,
          Science, Commerce, and Professional domains
        </p>

        <div className="tugpg-wrapper">
          {traditionalUGPGPrograms.map((program, idx) => (
            <div className="tugpg-block" key={idx} id={program.hash}>
              <h3 className={`tugpg-level ${program.level.toLowerCase()}`}>
                {program.level} Programs
              </h3>

              {/* Eligibility Section */}
              {program.eligibility && (
                <span className="tugpg-eligibility-pill">
                  <strong className="eligibility-label">Eligibility :</strong>{program.eligibility}
                </span>
              )}

              <div className="tugpg-categories">
                {program.categories.map((category, i) => (
                  <div className="tugpg-category-card" key={i}>
                    <h4>{category.name}</h4>

                    <div className="tugpg-courses">
                      {category.courses.map((course, j) => (
                        <span className="tugpg-course-pill" key={j}>
                          {course}
                        </span>
                      ))}
                    </div>
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
