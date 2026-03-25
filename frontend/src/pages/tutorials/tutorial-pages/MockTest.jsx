import TutorialLayout from "../layout-components/TutorialLayout";
import "../../../styles/tutorials/mock-test.css";

export default function MockTest() {
  const heroProps = {
    title: "Mock Test & Practice Programs",
    subtitle:
      "Real exam simulation, performance analysis and continuous improvement practice",
  };

  return (
    <TutorialLayout heroProps={heroProps}>
      <section className="mocktest-section">

        {/* ===== CORE PRACTICE ===== */}
        <h2 className="mocktest-title">Practice & Simulation</h2>

        <div className="mocktest-main-grid">
          <div className="mocktest-main-card">
            <h3>Full Length Mock Exams</h3>
            <p>
              Experience real exam patterns with timed full syllabus mock tests.
            </p>
          </div>

          <div className="mocktest-main-card">
            <h3>Section Wise Practice</h3>
            <p>
              Focus on weak areas with targeted subject based mock sessions.
            </p>
          </div>

          <div className="mocktest-main-card">
            <h3>Previous Year Papers</h3>
            <p>
              Practice real exam questions from past years with solutions.
            </p>
          </div>
        </div>

        {/* ===== EXAM CATEGORIES ===== */}
        <h2 className="mocktest-title">Mock Tests Available For</h2>

        <div className="mocktest-grid">
          <div className="mocktest-card">JEE & NEET</div>
          <div className="mocktest-card">SSC & Banking</div>
          <div className="mocktest-card">Railway & Defence</div>
          <div className="mocktest-card">State Govt Exams</div>
          <div className="mocktest-card">School Level Exams</div>
          <div className="mocktest-card">Competitive Entrance</div>
        </div>

        {/* ===== FEATURES ===== */}
        <h2 className="mocktest-title">Smart Evaluation System</h2>

        <div className="mocktest-feature-grid">
          <div className="mocktest-feature-card">
            <h4>Instant Results</h4>
            <p>Get immediate score with rank analysis.</p>
          </div>

          <div className="mocktest-feature-card">
            <h4>Performance Tracking</h4>
            <p>Monitor progress with detailed analytics.</p>
          </div>

          <div className="mocktest-feature-card">
            <h4>Expert Solutions</h4>
            <p>Learn faster with step-by-step explanations.</p>
          </div>
        </div>

      </section>
    </TutorialLayout>
  );
}
