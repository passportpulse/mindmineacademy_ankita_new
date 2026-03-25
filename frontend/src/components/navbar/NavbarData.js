export const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about-us" },
  {
    label: "Competitive Exams",
    path: "/competitive-exams",
    dropdown: [
      { label: "Level 1 – Foundation", hash: "#level1" },
      { label: "Level 2 – Beginner Competitive", hash: "#level2" },
      { label: "Level 3 – Advanced Competitive", hash: "#level3" },
      { label: "Level 4 – Professional Mastery", hash: "#level4" },
      { label: "Special Programs", hash: "#level5" },
    ],
  },
  {
    label: "Admission Guidance",
    path: "/admission-guidance",
    dropdown: [
      {
        label: "Open Board",
        hash: "#open-board",
        subDropdown: [
          { label: "X", hash: "#x" },
          { label: "XII", hash: "#xii" },
        ],
      },
      {
        label: "Traditional UG/PG",
        hash: "#traditionalugpg",
        subDropdown: [
          { label: "UG", hash: "#ug" },
          { label: "PG", hash: "#pg" },
        ],
      },
      { label: "Council Course", hash: "#council" },
      { label: "Research Program", hash: "#research" },
    ],
  },
  {
    label: "Tutorials",
    dropdown: [
      { label: "Joint Entrance", path: "/tutorials/joint-entrance" },
      { label: "Foreign Language", path: "/tutorials/foreign-language" },
      { label: "Mock Test", path: "/tutorials/mock-test" },
      { label: "General Studies", path: "/tutorials/general-studies" },
    ],
  },
  { label: "Admin", path: "/admin/dashboard" },
  {
    label: "Student Zone",
    dropdown: [
      { label: "Enquiry", path: "/student-zone/enquiry" },
      { label: "Apply", path: "/student-zone/apply" },
      { label: "Notices", path: "/student-zone/notices" },
      { label: "Check Status", path: "/student-zone/check-status" },
      { label: "Payment", path: "/student-zone/payment" },
    ],
  },
  { label: "Process", path: "/process" },
  { label: "Campuses", path: "/campuses" },
  { label: "Contact", path: "/contact" },
  { label: "Apply Now", path: "/apply-now" },
];
