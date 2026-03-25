import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "../navbar/NavbarData";
import logo from "../../assets/logo.png";
import "../../styles/navbar.css";
import { useRef, useState } from "react";

export default function Navbar() {
  const collapseRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState("");
  const [openSubDropdown, setOpenSubDropdown] = useState("");

  const activeParent = location.pathname.startsWith("/student-zone")
    ? "Student Zone"
    : location.pathname.startsWith("/tutorials")
      ? "Tutorials"
      : location.pathname.startsWith("/competitive-exams")
        ? "Competitive Exams"
        : location.pathname.startsWith("/admission-guidance")
          ? "Admission Guidance"
          : navLinks.find((l) => l.path === location.pathname)?.label || "";

  const handleNavClick = () => {
    const collapseEl = collapseRef.current;
    if (collapseEl.classList.contains("show"))
      collapseEl.classList.remove("show");
  };

  // 🎯 Smart scroll (auto navigates to correct page)
  const scrollToSection = (hash, pagePath) => {
    if (location.pathname !== pagePath) {
      navigate(pagePath);
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNormalLinkClick = (label, path) => {
    handleNavClick();
    setOpenDropdown("");
    setOpenSubDropdown("");
    if (location.pathname !== path) navigate(path);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom fixed-top">
      <div className="container">
        <NavLink
          to="/"
          className="brand d-flex align-items-center gap-2"
          onClick={() => handleNormalLinkClick("Home", "/")}
        >
          <img src={logo} alt="Mindmine Academy" className="brand-logo" />
          <div className="brand-text">
            <span className="brand-mindmine">MINDMINE</span>
            <span className="brand-academy">ACADEMY</span>
          </div>
        </NavLink>

        <button
          className="navbar-toggler"
          onClick={() => collapseRef.current.classList.toggle("show")}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" ref={collapseRef}>
          <ul className="navbar-nav">
            {navLinks.map((item) => (
              <li
                key={item.label}
                className={`nav-item ${item.dropdown ? "custom-dropdown" : ""}`}
              >
                {!item.dropdown && (
                  <NavLink
                    to={item.path}
                    className={`nav-link ${
                      item.label.toLowerCase() === "apply now"
                        ? "apply-btn"
                        : ""
                    } ${activeParent === item.label ? "active-link" : ""}`}
                    onClick={() => handleNormalLinkClick(item.label, item.path)}
                  >
                    {item.label}
                  </NavLink>
                )}

                {item.dropdown && (
                  <div className="custom-dropdown">
                    <span
                      className={`custom-dropdown-toggle ${
                        activeParent === item.label ? "active-parent" : ""
                      } ${openDropdown === item.label ? "open" : ""}`}
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.label ? "" : item.label,
                        )
                      }
                    >
                      {item.label} <span className="dropdown-arrow"></span>
                    </span>

                    <ul
                      className={`custom-dropdown-menu ${
                        openDropdown === item.label ? "show" : ""
                      }`}
                    >
                      {item.dropdown.map((sub) => (
                        <li
                          key={sub.label}
                          className="custom-dropdown-item-wrapper"
                        >
                          {sub.subDropdown ? (
                            <div
                              className={`custom-dropdown-sub ${
                                openSubDropdown === sub.label ? "open" : ""
                              }`}
                            >
                              <span
                                className="custom-dropdown-item"
                                onClick={() =>
                                  setOpenSubDropdown(
                                    openSubDropdown === sub.label
                                      ? ""
                                      : sub.label,
                                  )
                                }
                              >
                                {sub.label}{" "}
                                <span className="dropdown-arrow"></span>
                              </span>

                              <ul className="custom-dropdown-menu sub-dropdown-menu">
                                {sub.subDropdown.map((subSub) => (
                                  <li key={subSub.label}>
                                    <span
                                      className="custom-dropdown-item"
                                      onClick={() => {
                                        handleNavClick();
                                        setOpenDropdown("");
                                        setOpenSubDropdown("");

                                        if (subSub.path) {
                                          navigate(subSub.path);
                                        } else {
                                          scrollToSection(
                                            subSub.hash,
                                            "/admission-guidance",
                                          );
                                        }
                                      }}
                                    >
                                      {subSub.label}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <span
                              className="custom-dropdown-item"
                              onClick={() => {
                                handleNavClick();
                                setOpenDropdown("");
                                setOpenSubDropdown("");

                                if (sub.path) {
                                  navigate(sub.path);
                                } else {
                                  scrollToSection(
                                    sub.hash,
                                    item.path || location.pathname,
                                  );
                                }
                              }}
                            >
                              {sub.label}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
