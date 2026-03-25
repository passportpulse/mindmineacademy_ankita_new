import React from "react";
import heroImg from "../../assets/home-hero.avif";
import "../../styles/about/vission-mission-section.css";

export default function VisionAndMission() {
  return (
    <section className="vision-mission">
      <div className="container">
        <div className="vm-header">
          <h2>Our Vision & Mission</h2>
          <p>
            Empowering students with knowledge, skills, and opportunities for
            sustainable careers.
          </p>
        </div>

        <div className="vm-grid">
          <div className="vm-card">
            <img src={heroImg} alt="Vision" />
            <div className="vm-overlay">
              <h3>Vision</h3>
              <ul>
                <li>Empower students with employable skills.</li>

                <li>Provide academic knowledge.</li>

                <li>
                  Deliver industry-aligned training for sustainable careers.
                </li>
              </ul>
            </div>
          </div>

          <div className="vm-card">
            <img src={heroImg} alt="Mission" />
            <div className="vm-overlay">
              <h3>Mission</h3>
              <ul>
                <li>
                  Develop industry-ready youth through vocational learning.
                </li>
                <li>
                  Provide training in new-age technologies and healthcare
                  studies.
                </li>
                <li>
                  Ensure affordability & accessibility of higher education
                  across Bengal.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
