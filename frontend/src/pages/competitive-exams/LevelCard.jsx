import React from "react";
import { FaClock, FaCheckCircle } from "react-icons/fa";

export default function LevelCard({ title, duration, description, exams }) {
  return (
    <div className="exam-level-card">

      <div className="exam-level-card-header">
        <h3>{title}</h3>

        <div className="exam-level-duration">
          <FaClock className="exam-level-clock" />
          <span>{duration}</span>
        </div>
      </div>

      <p className="exam-level-description">{description}</p>

      <div className="exam-level-grid">
        {exams.map((exam, index) => (
          <div className="exam-level-box" key={index}>
            <FaCheckCircle className="exam-level-tick" />
            <span>{exam}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
