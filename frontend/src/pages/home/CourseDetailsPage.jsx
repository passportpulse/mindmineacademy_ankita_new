import { useParams, useNavigate } from "react-router-dom";
import courses from "../../data/courses";
import { IoMdTime } from "react-icons/io";
import "../../styles/home/course-details/course-details.css";

export default function SingleCoursePage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <p style={{ textAlign: "center", padding: "80px" }}>Course not found</p>
    );
  }

  return (
    <section className="single-course">
      <div className="container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back to Courses
        </button>

        <div className="single-course-grid">
          <img src={course.image} alt={course.title} />

          <div className="single-course-info">
            <h2>{course.title}</h2>
            <span className="course-type">{course.type}</span>

            <p className="full-desc">{course.fullDescription}</p>

            <div className="meta">
              <span>
                <IoMdTime /> {course.duration}
              </span>
              <span>
                <strong>Eligibility:</strong> {course.eligibility}
              </span>
            </div>

            <h4>Modules Covered</h4>
            <ul>
              {course.modules.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
