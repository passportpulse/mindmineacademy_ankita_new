import React, { useState } from "react";
import "../styles/enquiry.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "../../src/config/api";

export default function Enquiry() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    lastQualification: "",
    course: "",
    message: "",
  });

  const [showOtherInput, setShowOtherInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCourseChange = (e) => {
    const value = e.target.value;

    if (value === "Other") {
      setShowOtherInput(true);
      setFormData({ ...formData, course: "" }); // clear for manual typing
    } else {
      setShowOtherInput(false);
      setFormData({ ...formData, course: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.lastQualification ||
      !formData.course ||
      !formData.message
    ) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.name,
          phone: formData.phone,
          email: formData.email,
          lastQualification: formData.lastQualification,
          courseEnquiry: formData.course,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success("Enquiry sent successfully!");
      setSuccess(true);

      setFormData({
        name: "",
        phone: "",
        email: "",
        lastQualification: "",
        course: "",
        message: "",
      });

      setShowOtherInput(false);
    } catch (err) {
      toast.error(err.message || "Failed to send enquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="enquiry-section">
        <div className="enquiry-card">
          {success && (
            <div className="success-box">
              <h2>Thank You!</h2>
              <p>Your enquiry has been sent successfully.</p>
              <p>
                <strong>We will get back to you soon.</strong>
              </p>
            </div>
          )}

          {!success && (
            <form className="enquiry-form" onSubmit={handleSubmit}>
              <label>Full Name *</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />

              <label>Phone *</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />

              <label>Email *</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
              />

              <label>Last Qualification *</label>
              <input
                name="lastQualification"
                value={formData.lastQualification}
                onChange={handleChange}
                placeholder="Your last qualification"
              />

              <label>Course Enquiry *</label>
              <select
                value={showOtherInput ? "Other" : formData.course}
                onChange={handleCourseChange}
              >
                <option value="" disabled>
                  -- Select Course --
                </option>
                <option value="Level 1 – Foundation">
                  Level 1 – Foundation
                </option>
                <option value="Level 2 – Beginner Competitive">
                  Level 2 – Beginner Competitive
                </option>
                <option value="Level 3 – Advanced Competitive">
                  Level 3 – Advanced Competitive
                </option>
                <option value="Level 4 – Professional Mastery">
                  Level 4 – Professional Mastery
                </option>
                <option value="Special Programs">Special Programs</option>
                <option value="Class 10">Class X</option>
                <option value="Class 12">Class XII</option>
                <option value="UG">Traditional UG</option>
                <option value="PG">Traditional PG</option>
                <option value="Council Course">Council Course</option>
                <option value="Research Program">Research Program</option>
                <option value="JE">Joint Entrance</option>
                <option value="Foreign Language">Foreign Language</option>
                <option value="Mock Test">Mock Test</option>
                <option value="General Studies">General Studies</option>
                <option value="Other">Other</option>
              </select>

              {showOtherInput && (
                <input
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  placeholder="Enter your course"
                />
              )}

              <label>Message *</label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message"
              />

              <button className="btn-submit" disabled={loading}>
                {loading ? "Sending..." : "Submit Enquiry"}
              </button>
            </form>
          )}
        </div>
      </section>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
