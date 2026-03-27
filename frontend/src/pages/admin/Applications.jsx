import { useEffect, useState } from "react";
import { API_BASE_URL, getAdminHeaders } from "../../config/api";
import { useSearchParams } from "react-router-dom";
import ApplicationCard from "../../components/admin/ApplicationCard";

const Applications = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedIds, setExpandedIds] = useState([]);
  const [feeInputId, setFeeInputId] = useState(null);
  const [feeValue, setFeeValue] = useState("");
  const [applicationIdValue, setApplicationIdValue] = useState("");

  const [searchParams] = useSearchParams();
  const branch = searchParams.get("branch");

  const fetchApps = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/applications`, {
        headers: getAdminHeaders(),
      });
      const data = await res.json();
      console.log(data);
      setApps(data.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };
  const onUpdateEmi = async (id, emis) => {
  try {
    await fetch(`${API_BASE_URL}/api/applications/${id}/emi`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...getAdminHeaders(),
      },
      body: JSON.stringify({ emis }),
    });

    // refresh list
    fetchApps();
  } catch (err) {
    console.error(err);
  }
};



  useEffect(() => {
    fetchApps();
  }, [branch]);

  const normalizedBranch = branch?.replace(" Campus", "");
  const filteredApps = normalizedBranch
    ? apps.filter((app) => app.campus === normalizedBranch)
    : apps;

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const updateStatus = async (id, status) => {
    if (status === "approved") {
      setFeeInputId(id);
      return;
    }
    try {
      await fetch(`${API_BASE_URL}/api/applications/${id}`, {
        method: "PATCH",
        headers: getAdminHeaders(),
        body: JSON.stringify({ status }),
      });
      fetchApps();
    } catch (err) {
      console.error(err);
    }
  };

  const submitFees = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/api/applications/${id}`, {
        method: "PATCH",
        headers: getAdminHeaders(),
        body: JSON.stringify({
          status: "approved",
          fees: Number(feeValue),
          applicationId: applicationIdValue,
        }),
      });
      setFeeInputId(null);
      setFeeValue("");
      setApplicationIdValue("");
      fetchApps();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusClass = (status) => {
    if (status === "approved") return "status-approved";
    if (status === "rejected") return "status-rejected";
    return "status-pending";
  };

  return (
    <div className="app-container">
      <style>{`
  /* Container & Layout */
  .app-container { 
    padding: 32px 16px; 
    max-width: 1280px; 
    margin: 0 auto; 
    background-color: #f8fafc; 
    min-height: 100vh; 
    font-family: 'Inter', sans-serif; 
  }

  .header-flex { 
    display: flex; 
    flex-direction: column; 
    gap: 24px; 
    margin-bottom: 32px; 
  }

  @media (min-width: 768px) { 
    .header-flex { flex-direction: row; justify-content: space-between; align-items: center; } 
  }

  .header-left h2 { font-size: 30px; font-weight: 900; color: #1e293b; margin: 0; }
  .header-left .sub-text { color: #64748b; font-size: 14px; margin: 4px 0 8px 0; }

  .branch-info h3 { font-size: 18px; font-weight: 700; color: #334155; margin: 0; }

  .total-count { text-align: right; }
  .total-count span { 
    display: block; 
    font-size: 30px; 
    font-weight: 800; 
    color: #4f46e5; 
    line-height: 1; 
  }
  .total-count p { 
    font-size: 10px; 
    text-transform: uppercase; 
    letter-spacing: 0.1em; 
    font-weight: 700; 
    color: #94a3b8; 
    margin: 4px 0 0 0; 
  }

  /* Application Card Design */
  .app-list { display: flex; flex-direction: column; gap: 24px; }

  .app-card { 
    background: #ffffff; 
    box-shadow: 0 1px 3px rgba(0,0,0,0.05); 
    border: 1px solid #e2e8f0; 
    border-radius: 24px; 
    overflow: hidden; 
    transition: transform 0.2s ease;
  }

  .card-summary { 
    padding: 20px; 
    display: flex; 
    flex-direction: column; 
    gap: 16px; 
  }

  @media (min-width: 768px) { 
    .card-summary { flex-direction: row; justify-content: space-between; align-items: center; } 
  }

  .student-name h3 { font-weight: 700; font-size: 18px; color: #0f172a; margin: 0; }
  .course-tag { color: #4f46e5; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-top: 4px; }
  .tracking-id { font-size: 10px; font-family: monospace; color: #94a3b8; margin: 4px 0 0 0; }

  /* Status Badges */
  .status-badges { display: flex; gap: 8px; flex-wrap: wrap; }
  .badge-base { 
    padding: 4px 12px; 
    border-radius: 9999px; 
    border: 1px solid; 
    font-size: 10px; 
    font-weight: 900; 
    text-transform: uppercase; 
  }

  .status-approved { background: #f0fdf4; color: #15803d; border-color: #bbf7d0; }
  .status-rejected { background: #fef2f2; color: #b91c1c; border-color: #fecaca; }
  .status-pending { background: #fefce8; color: #a16207; border-color: #fef08a; }

  .review-btn { 
    background: #f1f5f9; 
    color: #475569; 
    padding: 8px 16px; 
    border-radius: 12px; 
    font-size: 12px; 
    font-weight: 700; 
    border: none; 
    cursor: pointer; 
  }

  /* Detail Pane (Expanded Content) */
  .detail-pane { 
    padding: 24px; 
    border-top: 1px solid #f8fafc; 
    background-color: #fcfcfd; 
  }

  .detail-grid { 
    display: grid; 
    grid-template-columns: 1fr; 
    gap: 32px; 
    padding: 12px 0; 
  }

  @media (min-width: 768px) { 
    .detail-grid { grid-template-columns: repeat(3, 1fr); } 
  }

  .detail-section h4 { 
    font-size: 10px; 
    font-weight: 900; 
    text-transform: uppercase; 
    color: #94a3b8; 
    letter-spacing: 0.2em; 
    display: flex; 
    align-items: center; 
    gap: 8px; 
    margin-bottom: 16px; 
  }

  .section-number { 
    width: 16px; 
    height: 16px; 
    background: #1e293b; 
    color: white; 
    border-radius: 50%; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    font-size: 8px; 
  }

  .info-box { background: #f8fafc; padding: 12px; border-radius: 16px; font-size: 14px; border: 1px solid #f1f5f9; }
  .parent-box { padding: 10px; border-radius: 12px; margin-bottom: 12px; }
  .bg-father { background: rgba(239, 246, 255, 0.5); }
  .bg-mother { background: rgba(253, 242, 248, 0.5); }

  /* COMPACT FEE OVERLAY (Updated) */
  .fee-overlay {
    padding: 16px 24px;
    background: #f8fafc; /* Sober light background */
    border-top: 2px solid #eef2ff;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .fee-header {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .fee-header p { color: #1e293b; font-size: 14px; font-weight: 700; margin: 0; }

  .fee-inputs { 
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    gap: 12px; 
  }

  .input-group label { 
    font-size: 10px; 
    text-transform: uppercase; 
    color: #64748b; 
    font-weight: 800; 
    margin-bottom: 4px;
    display: block;
  }

  .fee-inputs input {
    padding: 8px 12px;
    border-radius: 10px;
    border: 1px solid #cbd5e1;
    background: #ffffff;
    color: #1e293b;
    width: 100%;
    font-size: 13px;
    box-sizing: border-box;
    transition: all 0.2s;
  }

  .fee-inputs input:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  /* Action Buttons & Footer */
  .action-bar { 
    margin-top: 16px; 
    padding-top: 20px; 
    border-top: 1px solid #f1f5f9; 
    display: flex; 
    gap: 12px; 
  }

  .btn-approve { background: #0f172a; color: white; padding: 10px 24px; border-radius: 12px; font-weight: 700; border: none; cursor: pointer; }
  .btn-reject { background: #fef2f2; color: #dc2626; padding: 10px 24px; border-radius: 12px; font-weight: 700; border: none; cursor: pointer; }

  .fee-actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
  }

  .confirm-btn-primary { 
    background: #4f46e5; 
    color: white; 
    border: none; 
    padding: 8px 20px; 
    border-radius: 10px; 
    font-weight: 700; 
    font-size: 13px;
    cursor: pointer; 
    transition: opacity 0.2s;
  }

  .confirm-btn-primary:hover { opacity: 0.9; }

  .cancel-link { 
    background: transparent; 
    color: #94a3b8; 
    border: none; 
    cursor: pointer; 
    font-weight: 600; 
    font-size: 13px;
  }
`}</style>

      <div className="header-flex">
        <div className="header-left">
          <h2>Admin Panel</h2>
          <p className="sub-text">Review student enrollment applications</p>
          <div className="branch-info">
            <h3>{branch ? `${branch} Applications` : "All Applications"}</h3>
          </div>
        </div>
        <div className="header-right">
          <div className="total-count">
            <span>{filteredApps.length}</span>
            <p>Total</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">Loading Data...</div>
      ) : (
        <div className="app-list">
          {filteredApps.map((app) => (
            <ApplicationCard
              key={app._id}
              app={app}
              isExpanded={expandedIds.includes(app._id)}
              onToggle={toggleExpand}
              onUpdateStatus={updateStatus}
              feeInputId={feeInputId}
              setFeeInputId={setFeeInputId}
              feeValue={feeValue}
              setFeeValue={setFeeValue}
              applicationIdValue={applicationIdValue}
              setApplicationIdValue={setApplicationIdValue}
              onSubmitFees={submitFees}
              getStatusClass={getStatusClass}
              onUpdateEmi={onUpdateEmi}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
