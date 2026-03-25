import "../../styles/home/campuses-section.css";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const campuses = [
  {
    type: "main",
    tag: "City Office",
    title: "Moulali Campus",
    address:
      "52A Indian Mirror Street, Taltala, Opp. G.D. Hospital Kolkata – 700013",
    phone: "7595077657 / 7605057139",
    map: "https://maps.google.com/maps?q=22.5616997,88.3619713&z=17&output=embed",
    mapLink: "https://www.google.com/maps?q=22.5616997,88.3619713&z=17&hl=en",
    highlight: true,
  },
  {
    type: "sub",
    tag: "Sub Office",
    title: "Thakurpukur Campus",
    address: "64 James Long Sarani, Near Joka Metro Station, Kolkata – 700104",
    phone: "7595077656 / 7605057138",
    map: "https://www.google.com/maps?q=22.4542307,88.3041509&z=17&hl&output=embed",
    mapLink: "https://www.google.com/maps?q=22.4542307,88.3041509&z=17&hl=en",
  },
  // {
  //   type: "regional",
  //   tag: "Regional Office",
  //   title: "Bagnan Campus",
  //   address:
  //     "Maharaja Agrasain Dham, Near Ghoraghata Railway Station, Howrah - 711303",
  //   phone: "6289086116 / 7595077659",
  //   map: "https://www.google.com/maps?q=22.4522204,87.9443786&z=17&hl&output=embed",
  //   mapLink: "https://www.google.com/maps?q=22.4522204,87.9443786&z=17&hl=en",
  // },
];

export default function CampusesSection() {
  return (
    <section className="campus-section">
      <div className="container">
        <p className="section-title">Our Campuses</p>
        <h2 className="section-subtitle">
          Three campuses across West Bengal offering the best skill-based
          education
        </h2>

        <div className="campus-grid">
          {campuses.map((campus, index) => (
            <div
              className={`campus-card campus-${campus.type} ${
                campus.highlight ? "campus-highlight" : ""
              }`}
              key={index}
            >
              <span className="campus-tag">{campus.tag}</span>

              <h3>{campus.title}</h3>

              <p className="campus-address">
                <FaMapMarkerAlt /> {campus.address}
              </p>

              <p className="campus-phone">
                <FaPhoneAlt /> {campus.phone}
              </p>

              <div className="campus-map">
                <iframe
                  src={campus.map}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <a
                href={campus.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="map-btn"
              >
                View on Map
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
