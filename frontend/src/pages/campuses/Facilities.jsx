import React from "react";
import { FaBook, FaLaptopCode, FaUtensils, FaFutbol } from "react-icons/fa";
import "../../styles/campus/facilities.css";

const facilities = [
  {
    title: "Digital Library",
    desc: "Access to online journals and study materials.",
    icon: <FaBook />,
  },
  {
    title: "Advanced Tech Labs",
    desc: "High-speed computer labs for IT courses.",
    icon: <FaLaptopCode />,
  },
  {
    title: "Student Cafeteria",
    desc: "Affordable hygienic meals & refreshments.",
    icon: <FaUtensils />,
  },
  {
    title: "Sports Complex",
    desc: "Indoor & outdoor games and recreation.",
    icon: <FaFutbol />,
  },
];

export default function Facilities() {
  return (
    <section className="facilities-section">
      <div className="container">
        <div className="facilities-header">
          <h2>Premium Facilities</h2>
          <p>
            Beyond academics — supporting student growth through active spaces.
          </p>
        </div>

        <div className="facilities-grid">
          {facilities.map((facility, index) => (
            <div key={index} className="facility-card">
              <div className="facility-icon">{facility.icon}</div>
              <h3>{facility.title}</h3>
              <p>{facility.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
