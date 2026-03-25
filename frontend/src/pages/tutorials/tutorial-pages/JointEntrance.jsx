import TutorialLayout from "../layout-components/TutorialLayout";
import "../../../styles/tutorials/joint-entrance.css";

export default function JointEntrance() {
  const heroProps = {
    title: "Entrance Exam Preparation Programs",
    subtitle:
      "Structured coaching for engineering, medical, technical and postgraduate entrance exams",
  };

  return (
    <TutorialLayout heroProps={heroProps}>
      <section className="joint-exam-section">
        {/* ===== MAIN STREAMS ===== */}
        <h2 className="joint-title">Core Preparation Streams</h2>

        <div className="joint-main-grid">
          <div className="joint-main-card">
            <h3>JEE (Engineering)</h3>
            <p>
              <strong>Subjects:</strong> Physics, Chemistry, Mathematics
            </p>
            <p>
              <strong>Eligibility:</strong> Class 10+2 appeared
            </p>
          </div>

          <div className="joint-main-card">
            <h3>NEET (Medical)</h3>
            <p>
              <strong>Subjects:</strong> Physics, Chemistry, Biology
            </p>
            <p>
              <strong>Eligibility:</strong> Class 10+2 appeared
            </p>
          </div>
        </div>

        {/* ===== DIPLOMA & TECHNICAL ===== */}
        <h2 className="joint-title">Technical & Diploma Entrance</h2>

        <div className="exams-grid">
          <div className="exam-card">
            <h4>VOCLET</h4>
            <p>
              <strong>Subjects:</strong> Physics, Chemistry, Mathematics,
              Mechanics, Computer
            </p>
            <p>
              <strong>Eligibility:</strong> Class 10th appeared
            </p>
          </div>

          <div className="exam-card">
            <h4>JELET</h4>
            <p>
              <strong>Subjects:</strong> Engineering Mathematics, Electrical
              Technology, Computer Application, Engineering Mechanics
            </p>
            <p>
              <strong>Eligibility:</strong> Class 10th + Polytechnic
            </p>
          </div>

          <div className="exam-card">
            <h4>JEXPO</h4>
            <p>
              <strong>Subjects:</strong> Physics, Chemistry, Mathematics,
              English
            </p>
            <p>
              <strong>Eligibility:</strong> Class 10th appeared
            </p>
          </div>
        </div>

        {/* ===== POST GRADUATE ===== */}
        <h2 className="joint-title">Post Graduate Level Exams</h2>

        <div className="joint-pg-grid">
          <div className="joint-pg-card">
            <h4>NET</h4>
            <p>
              <strong>Subjects:</strong> Post Graduation Discipline
            </p>
            <p>
              <strong>Eligibility:</strong> Master’s Degree
            </p>
          </div>

          <div className="joint-pg-card">
            <h4>SET</h4>
            <p>
              <strong>Subjects:</strong> Multiple Specializations
            </p>
            <p>
              <strong>Eligibility:</strong> Master’s Degree
            </p>
          </div>
        </div>
      </section>
    </TutorialLayout>
  );
}
