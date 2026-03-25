import TutorialLayout from "../layout-components/TutorialLayout";
import "../../../styles/tutorials/foreign-language.css";

export default function ForeignLanguage() {
  const heroProps = {
    title: "Spoken English & Foreign Language Programs",
    subtitle:
      "Build fluency, confidence and global communication skills with expert language training",
  };

  return (
    <TutorialLayout heroProps={heroProps}>
      <section className="language-section">

        {/* ===== CORE LANGUAGE SKILLS ===== */}
        <h2 className="language-title">Core Communication Programs</h2>

        <div className="language-main-grid">
          <div className="language-main-card">
            <h3>Spoken English</h3>
            <p>
              <strong>Focus:</strong> Grammar, vocabulary, pronunciation, fluency
            </p>
            <p>
              <strong>Suitable For:</strong> Students, professionals & beginners
            </p>
          </div>

          <div className="language-main-card">
            <h3>Personality & Communication Skills</h3>
            <p>
              <strong>Focus:</strong> Public speaking, confidence building,
              interviews
            </p>
            <p>
              <strong>Suitable For:</strong> Career development & academics
            </p>
          </div>
        </div>

        {/* ===== FOREIGN LANGUAGES ===== */}
        <h2 className="language-title">Foreign Language Courses</h2>

        <div className="language-grid">
          <div className="language-card">
            <h4>French</h4>
            <p>
              <strong>Skills:</strong> Speaking, reading, writing, listening
            </p>
            <p>
              <strong>Levels:</strong> Beginner to Advanced
            </p>
          </div>

          <div className="language-card">
            <h4>German</h4>
            <p>
              <strong>Skills:</strong> Conversational & professional use
            </p>
            <p>
              <strong>Levels:</strong> A1 to C2
            </p>
          </div>

          <div className="language-card">
            <h4>Japanese</h4>
            <p>
              <strong>Skills:</strong> Basic speaking, writing & JLPT prep
            </p>
            <p>
              <strong>Levels:</strong> N5 to N2
            </p>
          </div>

          <div className="language-card">
            <h4>Spanish</h4>
            <p>
              <strong>Skills:</strong> Daily conversation & grammar
            </p>
            <p>
              <strong>Levels:</strong> Beginner to fluent
            </p>
          </div>
        </div>

        {/* ===== CERTIFICATION SUPPORT ===== */}
        <h2 className="language-title">Certification & Career Support</h2>

        <div className="language-cert-grid">
          <div className="language-cert-card">
            <h4>IELTS & TOEFL</h4>
            <p>
              English proficiency exams for overseas education and jobs
            </p>
          </div>

          <div className="language-cert-card">
            <h4>International Language Certifications</h4>
            <p>
              Goethe, DELF, JLPT & global standards
            </p>
          </div>
        </div>

      </section>
    </TutorialLayout>
  );
}
