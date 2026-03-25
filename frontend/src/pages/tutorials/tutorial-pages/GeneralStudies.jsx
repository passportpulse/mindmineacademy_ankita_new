import TutorialLayout from "../layout-components/TutorialLayout";
import "../../../styles/tutorials/general-studies.css";

export default function GeneralStudies() {
  const heroProps = {
    title: "General Studies & Competitive Foundation",
    subtitle:
      "Strong conceptual preparation for government exams, academics and competitive success",
  };

  return (
    <TutorialLayout heroProps={heroProps}>
      <section className="gs-section">

        {/* ===== CORE SUBJECTS ===== */}
        <h2 className="gs-title">Core General Studies Subjects</h2>

        <div className="gs-main-grid">
          <div className="gs-main-card">
            <h3>History</h3>
            <p>Ancient, Medieval, Modern and World History concepts.</p>
          </div>

          <div className="gs-main-card">
            <h3>Geography</h3>
            <p>Physical, Political, Economic and Environmental geography.</p>
          </div>

          <div className="gs-main-card">
            <h3>Polity</h3>
            <p>Indian Constitution, governance and public administration.</p>
          </div>

          <div className="gs-main-card">
            <h3>Economics</h3>
            <p>Indian economy, budgeting, growth and current trends.</p>
          </div>
        </div>

        {/* ===== EXAM FOCUS ===== */}
        <h2 className="gs-title">Exam Oriented Preparation</h2>

        <div className="gs-exam-grid">
          <div className="gs-exam-card">SSC & Banking</div>
          <div className="gs-exam-card">State Government Exams</div>
          <div className="gs-exam-card">Railway Exams</div>
          <div className="gs-exam-card">Defence Services</div>
          <div className="gs-exam-card">UPSC Foundation</div>
          <div className="gs-exam-card">School Competitive Exams</div>
        </div>

        {/* ===== SKILLS ===== */}
        <h2 className="gs-title">Skill Enhancement Areas</h2>

        <div className="gs-skill-grid">
          <div className="gs-skill-card">
            <h4>Current Affairs</h4>
            <p>Daily updates, analysis and exam relevance.</p>
          </div>

          <div className="gs-skill-card">
            <h4>Reasoning Ability</h4>
            <p>Logical thinking, problem solving and puzzles.</p>
          </div>

          <div className="gs-skill-card">
            <h4>Quantitative Aptitude</h4>
            <p>Speed maths and exam focused practice.</p>
          </div>
        </div>

      </section>
    </TutorialLayout>
  );
}
