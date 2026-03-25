import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  return (
    <>
<style>{`
  /* 1. Reset body to ensure no weird gaps */
  body {
    margin: 0;
    padding: 0;
  }

  .admin-layout {
    display: flex;
    /* This pushes the layout down so it doesn't hide under the fixed navbar */
    margin-top: 64px; 
    min-height: calc(100vh - 64px);
    font-family: 'Inter', sans-serif, system-ui;
    background-color: #f1f5f9;
  }

  /* SIDEBAR STYLES */
  .sidebar {
    width: 260px;
    background-color: #0f172a; /* Slate 900 */
    color: #ffffff;
    padding: 40px 24px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;

    /* FULL HEIGHT LOGIC */
    position: sticky;
    top: 64px; /* Sticks exactly below the navbar */
    height: calc(100vh - 64px); /* Takes up the remaining screen height */
    box-sizing: border-box;
  }

  .sidebar-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 40px;
    color: #f8fafc;
    letter-spacing: -0.025em;
    padding-left: 16px;
  }

  .nav-button {
    display: block;
    width: 100%;
    padding: 12px 16px;
    margin-bottom: 8px;
    text-align: left;
    background: transparent;
    border: none;
    color: #94a3b8;
    font-size: 14px;
    font-weight: 500;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .nav-button:hover {
    background-color: #1e293b;
    color: #ffffff;
  }

  .logout-button {
    margin-top: auto; /* Pushes button to the very bottom of the sidebar */
    padding: 16px;
    text-align: left;
    background: transparent;
    border: none;
    color: #f87171;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    border-top: 1px solid #1e293b;
    transition: background 0.2s;
  }

  .logout-button:hover {
    background-color: rgba(248, 113, 113, 0.05);
  }

  /* MAIN CONTENT AREA */
  .main-content {
    flex: 1;
    padding: 40px;
    background-color: #f1f5f9;
    /* Allows the content to scroll independently if it's long */
    min-height: calc(100vh - 64px);
  }

  @media (max-width: 768px) {
    .admin-layout {
      flex-direction: column;
      margin-top: 60px; 
    }
    .sidebar {
      width: 100%;
      height: auto;
      position: relative;
      top: 0;
    }
  }
`}</style>
      <div className="admin-layout">
        {/* Sidebar */}
        <div className="sidebar">
          <h2 className="sidebar-title">Admin Panel</h2>

          <button
            onClick={() => navigate("/admin/dashboard")}
            className="nav-button"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/admin/enquiries")}
            className="nav-button"
          >
            Enquiries
          </button>
          <button
            onClick={() => navigate("/admin/applications")}
            className="nav-button"
          >
            Applications
          </button>

          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>

        {/* Content */}
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
