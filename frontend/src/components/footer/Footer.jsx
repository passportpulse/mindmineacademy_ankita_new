import "../../styles/footer.css";
import { MapPin, Phone, Mail } from "lucide-react";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-container">
          {/* Column 1: About */}
          <div className="footer-col">
            <div className="footer-brand">
              <img
                src={logo}
                alt="Mindmine Academy Logo"
                className="footer-logo"
              />
              <div className="footer-title">
                <h3>MINDMINE ACADEMY</h3>
              </div>
            </div>
            <p>
              Mindmine Academy – Learn. Grow. Lead. Turning dreams into real
              achievements through quality education and skill development.
            </p>

            <div className="footer-socials">
              <a
                href="https://www.facebook.com/share/1DbSymqvR7/"
                aria-label="Facebook"
                className="facebook"
              >
                <FontAwesomeIcon icon={faFacebookF} size="lg" />
              </a>
              <a
                href="https://www.instagram.com/collegemindmine?igsh=MTJ3MDFianNleHJsZw=="
                aria-label="Instagram"
                className="instagram"
              >
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              {/* <a href="#" aria-label="LinkedIn" className="linkedin">
                <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
              </a> */}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="/about-us">About Institute</a>
              </li>
              <li>
                <a href="/admission-guidance">Admissions</a>
              </li>
              <li>
                <a href="/tutorials/joint-entrance">Courses</a>
              </li>
              <li>
                <a href="/">Career</a>
              </li>
              <li>
                <a href="/">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Popular Courses */}
          <div className="footer-col">
            <h3>Popular Courses</h3>
            <ul>
              <li>
                <a  href="/admission-guidance#open-board">Open Board</a>
              </li>
              <li>
                <a href="/admission-guidance#traditionalugpg">Traditional UG/PG</a>
              </li>
              <li>
                <a href="/admission-guidance#council">Council Course</a>
              </li>
              <li>
                <a href="/admission-guidance#research">Research Program</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="footer-col">
            <h3>Contact Us</h3>
            <p className="footer-item">
              <MapPin className="footer-icon" />
              Mindmine Academy,
              <br />
              52A Indian Mirror Street, Taltala
              <br />
              Opp. G.D. Hospital Kolkata – 700013
            </p>
            <p className="footer-item">
              <Phone className="footer-icon" />
              <a href="tel:7595077657">7595077657 /</a>
              <a href="tel:7605057139">7605057139</a>
            </p>
            <p className="footer-item">
              <Mail className="footer-icon" />
              <a href="mailto:info.mindmine2026@gmail.com">
                info.mindmine2026@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          &copy; 2026 Mindmine Academy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
