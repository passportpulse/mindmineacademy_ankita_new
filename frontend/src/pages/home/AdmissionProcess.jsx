import "../../styles/home/admission-process-section.css";
import { FaCheck } from "react-icons/fa";

const steps = [
  {
    step: "1",
    title: "Enquiry & Visit",
    desc: "Call us or walk-in to any campus.",
  },
  {
    step: "2",
    title: "Counseling",
    desc: "Course & career guidance session.",
  },
  {
    step: "3",
    title: "Application Submit",
    desc: "Fill admission form & attach documents.",
  },
  {
    step: "4",
    title: "Verification",
    desc: "Document review & eligibility check.",
  },
  {
    step: "check",
    title: "Admission Confirmed",
    desc: "Welcome to Mindmine Academy!",
  },
];

export default function AdmissionProcess() {
  return (
    <section className="admission-section">
      <div className="container">
        <p className="section-subtitle">Admission Process</p>
        <h2 className="section-title">Join Us in 5 Simple Steps</h2>

        <div className="admission-grid">
          {steps.map((item, index) => (
            <div className="admission-card" key={index}>
              <div
                className={`step-circle ${
                  item.step === "check" ? "step-success" : ""
                }`}
              >
                {item.step === "check" ? <FaCheck /> : item.step}
              </div>

              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
