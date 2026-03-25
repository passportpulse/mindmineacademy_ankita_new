import React, { useState } from "react";
import "../styles/form.css";
import { API_BASE_URL } from "../../src/config/api";
import courses from "../data/courses";

export default function ApplyForm() {
  const statesAndUTs = [
    // States
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",

    // Union Territories
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman & Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  // ---------------------- STATE ----------------------
  const [formData, setFormData] = useState({
    campus: "",
    course: "",
    fullName: "",
    dob: "",
    gender: "",
    caste: "",
    aadhaar: "",
    address: "",
    city: "",
    pin: "",
    phone: "",
    email: "",
    fatherName: "",
    fatherOccupation: "",
    fatherPhone: "",
    motherName: "",
    motherOccupation: "",
    motherPhone: "",
    guardianName: "",
    guardianRelation: "",
    guardianPhone: "",
    // Academic Info
    lastQualification: "",
    passingYear: "",
    previousCourse: "",
    previousInstitute: "",
    percentage: "",
  });

  const [step, setStep] = useState(1); // Step 1: Personal & Family, Step 2: Academic
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [error, setError] = useState("");

  // ---------------------- HANDLERS ----------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const is10Digits = (v) => /^\d{10}$/.test(v);
  const is12Digits = (v) => /^\d{12}$/.test(v);

  const handleNext = () => {
    const requiredFields = ["course", "fullName", "phone", "email"];

    for (let field of requiredFields) {
      if (!formData[field]) {
        setError("Please fill all required fields before proceeding.");
        return;
      }
    }

    if (formData.aadhaar && !is12Digits(formData.aadhaar)) {
      setError("Aadhaar must be 12 digits");
      return;
    }

    if (!is10Digits(formData.phone)) {
      setError("Phone number must be 10 digits");
      return;
    }

    if (formData.fatherPhone && !is10Digits(formData.fatherPhone)) {
      setError("Father phone must be 10 digits");
      return;
    }

    if (formData.motherPhone && !is10Digits(formData.motherPhone)) {
      setError("Mother phone must be 10 digits");
      return;
    }

    if (formData.guardianPhone && !is10Digits(formData.guardianPhone)) {
      setError("Guardian phone must be 10 digits");
      return;
    }

    setError("");
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    setError("");

    // Validate academic info
    const year = Number(formData.passingYear);
    const currentYear = new Date().getFullYear();

    if (!formData.lastQualification || !formData.passingYear) {
      setError("Please fill all required academic fields.");
      return;
    }

    if (year > currentYear || year < 1950) {
      setError("Passing year must not be in the future");
      return;
    }

    if (
      formData.percentage &&
      (formData.percentage < 0 || formData.percentage > 100)
    ) {
      setError("Percentage must be between 0 and 100");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Submission failed");

      setTrackingId(data.trackingId);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------- SUCCESS PAGE ----------------------
  if (submitted) {
    return (
      <div class="apply-form-container">
        <div class="apply-form-card success-box">
          <h2>🎉 Application Submitted Successfully!</h2>
          <p>Thank you for applying to Mindmine Academy.</p>

          <div class="tracking-box">
            <strong>Your Tracking ID:</strong>
            <span>{trackingId}</span>
          </div>

          <p class="important-note">
            ⚠️ <strong>Important:</strong> Please save your Tracking ID safely.
          </p>

          <p>
            You will need this Tracking ID to check your application status
            later.
          </p>
        </div>
      </div>
    );
  }

  // ---------------------- FORM ----------------------
  return (
    <div className="apply-form-container">
      <div className="apply-form-card">
        <div className="form-header">
          <h1>Student Enrollment Form</h1>
          <p className="form-info">
            Step {step}:{" "}
            {step === 1 ? "Personal & Family Info" : "Academic Info"} | Session:
            2025-26
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <p className="required-note">* Fields are mandatory</p>
          {step === 1 && (
            <>
              <h2>Campus & Course Info</h2>
              <div className="grid-2">
                <select
                  name="campus"
                  value={formData.campus}
                  onChange={handleChange}
                >
                  <option disabled value="">
                    Select Campus *
                  </option>
                  <option value="Moulali">Moulali</option>
                  <option value="Thakurpur">Thakurpur</option>
                </select>

                <select
                  className="full-width"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                >
                  <option disabled value="">
                    Select Course *
                  </option>
                  {courses.map((c) => (
                    <option
                      key={c.slug}
                      value={`${c.title} (${c.type} - ${c.duration})`}
                    >
                      {c.title} ({c.type} - {c.duration})
                    </option>
                  ))}
                </select>
              </div>

              <h2>Student Details</h2>
              <div className="grid-2">
                <input
                  name="fullName"
                  placeholder="Full Name * (as per Aadhaar)"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                <input
                  type="date"
                  name="dob"
                  max={new Date().toISOString().split("T")[0]}
                  value={formData.dob}
                  onChange={handleChange}
                />

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option disabled value="">
                    Gender *
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>

                <select
                  name="caste"
                  value={formData.caste}
                  onChange={handleChange}
                >
                  <option disabled value="">
                    Caste
                  </option>
                  <option>GEN</option>
                  <option>SC</option>
                  <option>ST</option>
                  <option>OBC</option>
                </select>

                <input
                  name="aadhaar"
                  placeholder="Aadhaar No (12 digits)"
                  value={formData.aadhaar}
                  onChange={handleChange}
                />
                <input value="Indian" disabled />

                <textarea
                  className="full-width"
                  name="address"
                  placeholder="Full Address * (House No, Street, Area)"
                  value={formData.address}
                  onChange={handleChange}
                />

                <input
                  name="city"
                  placeholder="City *"
                  value={formData.city}
                  onChange={handleChange}
                />

                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                >
                  <option disabled value="">
                    Select State
                  </option>
                  {statesAndUTs.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                <input
                  name="pin"
                  placeholder="Pin Code * (6 digits)"
                  value={formData.pin}
                  onChange={handleChange}
                />

                <input
                  name="phone"
                  placeholder="Contact No * (10 digits)"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email * (example@gmail.com)"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <h2>Father's Info</h2>
              <div className="grid-2">
                <input
                  name="fatherName"
                  placeholder="Father Name *"
                  value={formData.fatherName}
                  onChange={handleChange}
                />
                <input
                  name="fatherOccupation"
                  placeholder="Occupation"
                  value={formData.fatherOccupation}
                  onChange={handleChange}
                />
                <input
                  name="fatherPhone"
                  placeholder="Father Phone (10 digits)"
                  value={formData.fatherPhone}
                  onChange={handleChange}
                />
              </div>

              <h2>Mother's Info</h2>
              <div className="grid-2">
                <input
                  name="motherName"
                  placeholder="Mother Name"
                  value={formData.motherName}
                  onChange={handleChange}
                />
                <input
                  name="motherOccupation"
                  placeholder="Occupation"
                  value={formData.motherOccupation}
                  onChange={handleChange}
                />
                <input
                  name="motherPhone"
                  placeholder="Mother Phone (10 digits)"
                  value={formData.motherPhone}
                  onChange={handleChange}
                />
              </div>

              <h2>Local Guardian</h2>
              <div className="grid-3">
                <input
                  name="guardianName"
                  placeholder="Name"
                  value={formData.guardianName}
                  onChange={handleChange}
                />
                <input
                  name="guardianRelation"
                  placeholder="Relation"
                  value={formData.guardianRelation}
                  onChange={handleChange}
                />
                <input
                  name="guardianPhone"
                  placeholder="Phone"
                  value={formData.guardianPhone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-buttons">
                <button
                  type="button"
                  className="submit-btn"
                  onClick={handleNext}
                >
                  Next: Academic Info
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2>Academic Information</h2>
              <div className="grid-2">
                <input
                  name="lastQualification"
                  placeholder="Last Qualification * (e.g. Inter / Degree)"
                  value={formData.lastQualification}
                  onChange={handleChange}
                />
                <input
                  name="passingYear"
                  placeholder="Year of Passing * (e.g. 2022)"
                  value={formData.passingYear}
                  onChange={handleChange}
                />
                <input
                  name="previousCourse"
                  placeholder="Percentage (0–100)"
                  value={formData.previousCourse}
                  onChange={handleChange}
                />
                <input
                  name="previousInstitute"
                  placeholder="Previous Institute"
                  value={formData.previousInstitute}
                  onChange={handleChange}
                />
                <input
                  name="percentage"
                  placeholder="Percentage (0–100 only)"
                  value={formData.percentage}
                  onChange={handleChange}
                />
              </div>

              <div className="form-buttons">
                <button
                  type="button"
                  className="apply-back-btn"
                  onClick={handleBack}
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="apply-submit-btn"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </>
          )}

          {error && <div className="error-box">{error}</div>}
        </form>
      </div>
    </div>
  );
}
