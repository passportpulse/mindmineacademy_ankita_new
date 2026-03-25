import { useEffect, useState } from "react";
import { API_BASE_URL, getAdminHeaders } from "../../config/api";
import { useNavigate } from "react-router-dom";

const branches = [
  {
    name: "Moulali Campus",
    key: "moulali",
    accentColor: "#ec4899", // pink-500
    badgeClass: "badge-pink",
  },
  {
    name: "Thakurpukur Campus",
    key: "thakurpukur",
    accentColor: "#6366f1", // indigo-500
    badgeClass: "badge-indigo",
  },
];

const Dashboard = () => {
  const [branchStats, setBranchStats] = useState({});
  const [enquiryCount, setEnquiryCount] = useState(0);

  const navigate = useNavigate();
  const calculateStats = (apps) => {
    const stats = {};

    branches.forEach((branch) => {
      const filtered = apps.filter(
        (a) => a.campus === branch.name.replace(" Campus", ""),
      );

      stats[branch.key] = {
        total: filtered.length,
        approved: filtered.filter((a) => a.status === "approved").length,
        pending: filtered.filter((a) => a.status === "pending").length,
        rejected: filtered.filter((a) => a.status === "rejected").length,
      };
    });

    setBranchStats(stats);
  };

  const fetchData = async () => {
    try {
      const cachedApps = localStorage.getItem("applications");
      if (cachedApps) {
        calculateStats(JSON.parse(cachedApps));
      }

      const cachedEnq = localStorage.getItem("enquiries");
      if (cachedEnq) {
        setEnquiryCount(JSON.parse(cachedEnq).length);
      }

      const [res, enqRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/applications`, {
          headers: getAdminHeaders(),
        }),
        fetch(`${API_BASE_URL}/api/enquiries`, {
          headers: getAdminHeaders(),
        }),
      ]);

      const data = await res.json();
      console.log("API RESPONSE:", data);
      const apps = data.data || [];
      const enqData = await enqRes.json();

      localStorage.setItem("applications", JSON.stringify(apps));
      localStorage.setItem("enquiries", JSON.stringify(enqData));

      calculateStats(apps);
      setEnquiryCount(enqData.length || 0);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (branchName) => {
    navigate(`/admin/applications?branch=${encodeURIComponent(branchName)}`);
  };
  const handleEnquiryClick = () => {
    navigate("/admin/enquiries");
  };

  return (
    <>
      <style>{`
        .dashboard-container {
          padding: 40px;
          background-color: #f8fafc;
          min-height: 100vh;
          font-family: sans-serif;
        }

        .dashboard-header {
          margin-bottom: 40px;
        }

        .dashboard-header h2 {
          font-size: 30px;
          font-weight: bold;
          color: #1e293b;
          margin: 0;
        }

        .dashboard-header p {
          color: #64748b;
          margin-top: 4px;
        }

        .grid-container {
          display: grid;
          gap: 24px;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }

        .card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-left-width: 4px;
          border-radius: 16px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .card:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          transform: translateY(-4px);
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .card-top h3 {
          font-size: 18px;
          font-weight: 600;
          color: #334155;
          margin: 0;
        }

        .badge {
          font-size: 12px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 9999px;
        }

        .badge-indigo { background: #eef2ff; color: #4f46e5; }
        .badge-pink { background: #fdf2f8; color: #db2777; }
        .badge-emerald { background: #ecfdf5; color: #059669; }
        .badge-blue { background: #eff6ff; color: #2563eb; }

        .total-section {
          margin-bottom: 24px;
        }

        .label-text {
          font-size: 14px;
          color: #94a3b8;
          margin: 0;
        }

        .total-number {
          font-size: 30px;
          font-weight: bold;
          color: #0f172a;
          margin: 8px 0 0 0;
        }

        .status-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          text-align: center;
        }

        .status-box {
          padding: 12px;
          border-radius: 12px;
        }

        .bg-approved { background-color: #f0fdf4; }
        .bg-pending { background-color: #fefce8; }
        .bg-rejected { background-color: #fef2f2; }

        .status-box p:first-child {
          font-size: 12px;
          color: #64748b;
          margin: 0;
        }

        .status-box p:last-child {
          font-weight: 600;
          margin: 4px 0 0 0;
        }

        .text-approved { color: #16a34a; }
        .text-pending { color: #ca8a04; }
        .text-rejected { color: #dc2626; }

        .card-footer {
          margin-top: 20px;
          text-align: right;
        }

        .view-details {
          font-size: 12px;
          color: #4f46e5;
          font-weight: 600;
        }

        .enquiry-wrapper {
          margin-top: 40px;
        }

        .enquiry-card {
          max-width: 384px;
          border-left-color: #3b82f6;
        }

        @media (max-width: 768px) {
          .dashboard-container { padding: 24px; }
          .grid-container { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>Admissions Dashboard</h2>
          <p>Branch-wise application overview</p>
        </div>

        <div className="grid-container">
          {branches.map((branch) => {
            const stats = branchStats[branch.key] || {
              total: 0,
              approved: 0,
              pending: 0,
              rejected: 0,
            };

            return (
              <div
                key={branch.key}
                onClick={() => handleClick(branch.name)}
                className="card"
                style={{ borderLeftColor: branch.accentColor }}
              >
                <div className="card-top">
                  <h3>{branch.name}</h3>
                  <span className={`badge ${branch.badgeClass}`}>Active</span>
                </div>

                <div className="total-section">
                  <p className="label-text">Total Applications</p>
                  <p className="total-number">{stats.total}</p>
                </div>

                <div className="status-grid">
                  <div className="status-box bg-approved">
                    <p>Approved</p>
                    <p className="text-approved">{stats.approved}</p>
                  </div>

                  <div className="status-box bg-pending">
                    <p>Pending</p>
                    <p className="text-pending">{stats.pending}</p>
                  </div>

                  <div className="status-box bg-rejected">
                    <p>Rejected</p>
                    <p className="text-rejected">{stats.rejected}</p>
                  </div>
                </div>

                <div className="card-footer">
                  <span className="view-details">View Details →</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="enquiry-wrapper">
          <div onClick={handleEnquiryClick} className="card enquiry-card">
            <div className="card-top">
              <h3>Enquiries</h3>
              <span className="badge badge-blue">Active</span>
            </div>

            <p className="label-text">Total Enquiries</p>
            <p className="total-number" style={{ marginTop: "8px" }}>
              {enquiryCount}
            </p>

            <div className="card-footer">
              <span className="view-details">View Details →</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
