import { useState } from "react";
import "../../styles/admission-guidance/hero-section.css";

export default function Hero() {
  const [active, setActive] = useState("all");

  const handleClick = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section>
      <div className="admission-hero">
        <h1 className="hero-heading">Explore Our Programs</h1>
        <p className="hero-text">
          Get expert admission guidance with industry-aligned programs that help
          you choose the right path and grow into a confident, job-ready
          professional.
        </p>
      </div>

      <div className="hero-filters">
        <button
          className={`filter-btn ${active === "all" ? "active" : ""}`}
          onClick={() => handleClick("all")}
        >
          All
        </button>

        <button
          className={`filter-btn ${active === "open-board" ? "active" : ""}`}
          onClick={() => handleClick("open-board")}
        >
          Open Board
        </button>

        <button
          className={`filter-btn ${active === "traditionalugpg" ? "active" : ""}`}
          onClick={() => handleClick("traditionalugpg")}
        >
          Traditional UG / PG
        </button>

        <button
          className={`filter-btn ${active === "council" ? "active" : ""}`}
          onClick={() => handleClick("council")}
        >
          Council Course
        </button>

        <button
          className={`filter-btn ${active === "research" ? "active" : ""}`}
          onClick={() => handleClick("research")}
        >
          Research Programme
        </button>
      </div>
    </section>
  );
}
