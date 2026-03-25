import React from "react";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import LevelCard from "./LevelCard";
import "../../styles/competitive-exams/exam-levels.css";
export default function ExamLevels() {
  return (
    <section className="exam-level-section">
      <div className="exam-level-container">

        <div className="exam-level-header">
          <BookOpenIcon className="exam-level-icon" />
          <h2 className="exam-level-title">Course Levels & Programs</h2>
          <span className="exam-level-divider"></span>
        </div>

        <div id="level1">
          <LevelCard
            title="Level 1 – Foundation"
            duration="3 Months"
            description="Introductory preparation class for beginners to build strong academic basics."
            exams={["Basic Aptitude", "Reasoning", "Math Fundamentals", "English Basics"]}
          />
        </div>

        <div id="level2">
          <LevelCard
            title="Level 2 – Beginner Competitive"
            duration="6 Months"
            description="Ideal for introductory competitive exam preparation."
            exams={[
              "Defence",
              "Rail Group D",
              "Police",
              "Kolkata Police",
              "West Bengal Police",
              "Army",
              "Navy",
              "Airforce",
            ]}
          />
        </div>

        <div id="level3">
          <LevelCard
            title="Level 3 – Advanced Competitive"
            duration="12 Months"
            description="Structured training for major government and banking exams."
            exams={[
              "SSC",
              "RRB",
              "IBPS",
              "WBPS",
              "KP",
              "CGL",
              "CHSL",
              "Banking",
            ]}
          />
        </div>

        <div id="level4">
          <LevelCard
            title="Level 4 – Professional Mastery"
            duration="24 Months"
            description="High-level preparation for elite government and service exams."
            exams={["WBCS", "Bank PO", "School Service"]}
          />
        </div>

        <div id="level5">
          <LevelCard
            title="Special Programs"
            duration="Customized Duration"
            description="Specialized coaching for national & international competitive exams."
            exams={[
              "NDA",
              "CDS",
              "UPSC (IAS/IPS)",
              "IELTS",
              "GRE",
              "CAT",
              "MAT",
              "GMAT",
            ]}
          />
        </div>

      </div>
    </section>
  );
}
