import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";
import "../../styles/contact/contact.css";
import Enquiry from "../../components/Enquiry";

export default function ContactSection() {
  return (
    <section className="contact-section">
      <div className="container">
        {/* LEFT INFO */}
        <div className="contact-left">
          <div className="contact-card">
            <FaMapMarkerAlt className="icon" />
            <h4>Campus Location</h4>
            <p>
              Moulali Campus
              <br />
              52A Indian Mirror Street, Taltala, Opp. G.D. Hospital Kolkata –
              700013
            </p>
          </div>

          <div className="contact-card">
            <FaPhoneAlt className="icon" />
            <h4>Admissions Helpdesk</h4>
            <p>
              +91 7595077657
              <br />
              +91 7605057139
              <br />
              info.mindmine2026@gmail.com
            </p>
          </div>

          <div className="contact-card">
            <FaClock className="icon" />
            <h4>Office Hours</h4>
            <p>
              Moulali & Joka Mon – Sat: 10:00 AM – 7:30 PM
              <br />
              Sunday Closed
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="contact-right">
          <Enquiry />
        </div>
      </div>
    </section>
  );
}
