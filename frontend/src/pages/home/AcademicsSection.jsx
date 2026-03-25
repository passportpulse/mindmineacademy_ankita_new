import "../../styles/home/academics-section.css";
import courses from "../../data/courses";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdTime } from "react-icons/io";
import { FaHeartbeat } from "react-icons/fa";
import { MdRestaurantMenu, MdDesignServices } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AcademicsSection() {
  const navigate = useNavigate();

  const [showAll, setShowAll] = useState({
    healthcare: false,
    food: false,
    management: false,
  });

  const renderCourses = (category) => {
    const filtered = courses.filter(c => c.category === category);
    const visible = showAll[category] ? filtered : filtered.slice(0, 3);

    return visible.map((course, index) => (
      <div className="course-card" key={index}>
        <img src={course.image} alt={course.title} />

        <div className="course-info">
          <h3>{course.title}</h3>
          <span className="course-type">{course.type}</span>
          <p>{course.shortDescription}</p>

          <div className="course-footer">
            <span className="course-duration">
              <IoMdTime /> {course.duration}
            </span>

            <button
              className="details-btn"
              onClick={() => navigate(`/course/${course.slug}`)}
            >
              Details
            </button>
          </div>
        </div>
      </div>
    ));
  };

  const toggleViewAll = (category) => {
    setShowAll(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <section className="academics-section">
      <div className="container">

        <div className="academics-title">
          <span className="academics-small">Academics</span>
          <h2>Our Core Courses</h2>
        </div>

        {/* HEALTHCARE */}
        <div className="academics-subsection">
          <div className="academics-subheader">
            <div className="subheader-left">
              <FaHeartbeat />
              <h3>Healthcare Programs</h3>
            </div>

            <button onClick={() => toggleViewAll("healthcare")}>
              {showAll.healthcare ? "Show Less" : "View All"} <IoIosArrowForward />
            </button>
          </div>

          <div className="academics-cards">
            {renderCourses("healthcare")}
          </div>
        </div>

        {/* FOOD */}
        <div className="academics-subsection">
          <div className="academics-subheader">
            <div className="subheader-left">
              <MdRestaurantMenu />
              <h3>Food & Culinary Programs</h3>
            </div>

            <button onClick={() => toggleViewAll("food")}>
              {showAll.food ? "Show Less" : "View All"} <IoIosArrowForward />
            </button>
          </div>

          <div className="academics-cards">
            {renderCourses("food")}
          </div>
        </div>

        {/* MANAGEMENT */}
        <div className="academics-subsection">
          <div className="academics-subheader">
            <div className="subheader-left">
              <MdDesignServices />
              <h3>Design & Management Programs</h3>
            </div>

            <button onClick={() => toggleViewAll("management")}>
              {showAll.management ? "Show Less" : "View All"} <IoIosArrowForward />
            </button>
          </div>

          <div className="academics-cards">
            {renderCourses("management")}
          </div>
        </div>

      </div>
    </section>
  );
}
