import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  return (
    <>
      <style>{`
        .admin-page-container {
          display: flex;
          margin-top: 68px; 
          min-height: calc(100vh - 68px);
          background-color: #f1f5f9;
        }

        .admin-sidebar {
          width: 260px;
          background-color: #0f172a;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 68px; 
          height: calc(100vh - 68px);
          flex-shrink: 0;
          z-index: 90;
        }

        .admin-sidebar-header {
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        /* LOGO FIX START */
        .admin-side-logo {
          width: 32px; /* Explicit width */
          height: 32px; /* Explicit height */
          display: block;
        }
        /* LOGO FIX END */

        .admin-nav {
          flex: 1;
          padding: 20px 14px;
        }

        .admin-nav-item {
          display: block;
          padding: 12px 16px;
          margin-bottom: 4px;
          color: #94a3b8;
          text-decoration: none !important;
          font-size: 14px;
          font-weight: 500;
          border-radius: 10px;
          transition: all 0.2s;
        }

        .admin-nav-item:hover {
          background-color: rgba(255, 255, 255, 0.05);
          color: #ffffff;
        }

        .admin-nav-item.active {
          background-color: #4f46e5;
          color: #ffffff;
        }

        .admin-sidebar-footer {
          padding: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .admin-logout-btn {
          width: 100%;
          padding: 10px;
          background: transparent;
          border: 1px solid rgba(248, 113, 113, 0.3);
          color: #f87171;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .admin-main-content {
          flex: 1;
          padding: 40px;
          min-width: 0;
          background-color: #f8fafc;
        }

        @media (max-width: 991px) {
          .admin-page-container { flex-direction: column; }
          .admin-sidebar { width: 100%; height: auto; position: relative; top: 0; }
        }
      `}</style>

      <div className="admin-page-container">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-header">
            {/* Added a fallback alt text check */}
            <img src={logo} alt="Mindmine Admin Logo" className="admin-side-logo" />
            <span className="text-sm font-bold text-white">Admin</span>
          </div>

          <nav className="admin-nav">
            <NavLink to="/admin/dashboard" className="admin-nav-item">Dashboard</NavLink>
            <NavLink to="/admin/enquiries" className="admin-nav-item">Enquiries</NavLink>
            <NavLink to="/admin/applications" className="admin-nav-item">Applications</NavLink>
          </nav>

          <div className="admin-sidebar-footer">
            <button onClick={handleLogout} className="admin-logout-btn">Logout</button>
          </div>
        </aside>

        <main className="admin-main-content">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;