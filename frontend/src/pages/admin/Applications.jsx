import { useEffect, useState } from "react";
import { API_BASE_URL, getAdminHeaders } from "../../config/api";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Applications = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedIds, setExpandedIds] = useState([]);
  const [feeInputId, setFeeInputId] = useState(null);
  const [feeValue, setFeeValue] = useState("");
  const [applicationIdValue, setApplicationIdValue] = useState("");

  const [searchParams] = useSearchParams();
  const branch = searchParams.get("branch");

  const navigate = useNavigate();

  const fetchApps = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/applications`, {
        headers: getAdminHeaders(),
      });
      const data = await res.json();
      setApps(data.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, [branch]);

  const filteredApps = branch
    ? apps.filter((app) => app.campusInfo.campus === branch)
    : apps;

  const toggleExpand = (id) => {
    setExpandedIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((extId) => extId !== id)
        : [...prevIds, id],
    );
  };

  const updateStatus = async (id, status) => {
    if (status === "approved") {
      setFeeInputId(id);
      return;
    }
    try {
      await fetch(`${API_BASE_URL}/applications/${id}`, {
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
      await fetch(`${API_BASE_URL}/applications/${id}`, {
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
    switch (status) {
      case "approved": return "status-approved";
      case "rejected": return "status-rejected";
      default: return "status-pending";
    }
  };

  return (
    <>
      <style>{`
        .app-container {
          padding: 32px 16px;
          max-width: 1280px;
          margin: 0 auto;
          background-color: #f8fafc;
          min-height: 100vh;
          font-family: sans-serif;
        }

        .header-flex {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 32px;
        }

        @media (min-width: 768px) {
          .header-flex {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }

        .header-left h2 {
          font-size: 30px;
          font-weight: 900;
          color: #1e293b;
          margin: 0;
        }

        .header-left .sub-text {
          color: #64748b;
          font-size: 14px;
          margin: 4px 0 8px 0;
        }

        .branch-info h3 {
          font-size: 18px;
          font-weight: 700;
          color: #334155;
          margin: 0;
        }

        .branch-info p {
          font-size: 12px;
          color: #6b7280;
          margin: 0;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .clear-btn {
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 700;
          background-color: #eef2ff;
          color: #4f46e5;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          white-space: nowrap;
        }

        .total-count {
          text-align: right;
        }

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

        .loading-state {
          display: flex;
          justify-content: center;
          padding: 80px;
          color: #94a3b8;
          font-weight: 700;
        }

        .app-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .app-card {
          background: #ffffff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          overflow: hidden;
        }

        .card-summary {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        @media (min-width: 768px) {
          .card-summary {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }

        .student-profile {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .profile-img-box {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          background: #eef2ff;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border: 1px solid #e0e7ff;
        }

        .profile-img-box img {
          width: 100%;
          height: 100%;
          object-cover: cover;
        }

        .student-name h3 {
          font-weight: 700;
          font-size: 18px;
          color: #0f172a;
          margin: 0;
        }

        .course-tag {
          color: #4f46e5;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          margin-top: 4px;
        }

        .tracking-id {
          font-size: 10px;
          font-family: monospace;
          color: #94a3b8;
          margin: 4px 0 0 0;
        }

        .status-badges {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

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

        .detail-pane {
          padding: 24px;
          border-top: 1px solid #f8fafc;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          padding: 24px 0;
        }

        @media (min-width: 768px) { .detail-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .detail-grid { grid-template-columns: repeat(4, 1fr); } }

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

        .info-box {
          background: #f8fafc;
          padding: 12px;
          border-radius: 16px;
          font-size: 14px;
        }

        .info-box p, .detail-section p { margin: 4px 0; }

        .parent-box {
          padding: 8px;
          border-radius: 12px;
          margin-bottom: 12px;
        }

        .bg-father { background: rgba(239, 246, 255, 0.5); }
        .bg-mother { background: rgba(253, 242, 248, 0.5); }

        .doc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .doc-item {
          text-decoration: none;
          border: 1px solid #f1f5f9;
          border-radius: 12px;
          padding: 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: white;
        }

        .doc-preview {
          width: 100%;
          aspect-ratio: 1/1;
          background: #f1f5f9;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 4px;
        }

        .doc-preview img { width: 100%; height: 100%; object-fit: cover; }

        .doc-label {
          font-size: 8px;
          font-weight: 900;
          color: #94a3b8;
          text-transform: uppercase;
        }

        .action-bar {
          margin-top: 16px;
          padding-top: 20px;
          border-top: 1px solid #f1f5f9;
          display: flex;
          gap: 12px;
        }

        .btn-approve {
          background: #0f172a;
          color: white;
          padding: 10px 24px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 700;
          border: none;
          cursor: pointer;
        }

        .btn-reject {
          background: #fef2f2;
          color: #dc2626;
          padding: 10px 24px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 700;
          border: none;
          cursor: pointer;
        }

        .fee-overlay {
          padding: 24px;
          background: #0f172a;
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
        }

        @media (min-width: 768px) { .fee-overlay { flex-direction: row; } }

        .fee-overlay p { color: white; font-size: 14px; font-weight: 700; flex: 1; margin: 0; }

        .fee-inputs { display: flex; align-items: center; gap: 12px; width: 100%; }

        .fee-inputs input {
          padding: 6px 12px;
          border-radius: 10px;
          border: none;
          font-size: 14px;
        }

        .confirm-btn { background: transparent; color: #94a3b8; border: none; font-size: 12px; font-weight: 700; cursor: pointer; padding: 0 12px; }
      `}</style>

      <div className="app-container">
        <div className="header-flex">
          <div className="header-left">
            <h2>Admin Panel</h2>
            <p className="sub-text">Review student enrollment applications</p>
            <div className="branch-info">
              <h3>{branch ? `${branch} Applications` : "All Applications"}</h3>
              <p>{branch ? "Showing applications for selected branch" : "Showing all applications"}</p>
            </div>
          </div>

          <div className="header-right">
            {branch && (
              <button className="clear-btn" onClick={() => navigate("/admin/applications")}>
                Clear Filter
              </button>
            )}
            <div className="total-count">
              <span>{filteredApps.length}</span>
              <p>Total Applications</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">Loading Data...</div>
        ) : (
          <div className="app-list">
            {filteredApps.map((app) => (
              <div key={app._id} className="app-card">
                <div className="card-summary">
                  <div className="student-profile">
                    <div className="profile-img-box">
                      {app.documents?.photo ? (
                        <img src={`${API_BASE_URL.replace("/api", "")}/uploads/${app.documents.photo}`} alt="" />
                      ) : (
                        <span style={{ color: "#a5b4fc", fontWeight: "bold" }}>?</span>
                      )}
                    </div>
                    <div className="student-name">
                      <h3>{app.studentDetails.fullName}</h3>
                      <p className="course-tag">{app.campusInfo.course}</p>
                      <p className="tracking-id">{app.trackingId}</p>
                    </div>
                  </div>

                  <div className="status-badges">
                    <div className={`badge-base ${getStatusClass(app.status)}`}>
                      {app.status}
                    </div>
                    {app.status === "approved" && app.applicationId && (
                      <div className="badge-base status-approved">ID: {app.applicationId}</div>
                    )}
                    {app.status === "approved" && app.fees && (
                      <div className="badge-base" style={{ background: "#eef2ff", color: "#4338ca", borderColor: "#c7d2fe" }}>
                        ₹ {app.fees}
                      </div>
                    )}
                  </div>

                  <button className="review-btn" onClick={() => toggleExpand(app._id)}>
                    {expandedIds.includes(app._id) ? "Collapse" : "Full Review"}
                  </button>
                </div>

                {expandedIds.includes(app._id) && (
                  <div className="detail-pane">
                    <div className="detail-grid">
                      <div className="detail-section">
                        <h4><span className="section-number">1</span> Campus Info</h4>
                        <div className="info-box">
                          <p><b>Campus:</b> {app.campusInfo.campus}</p>
                          <p><b>Course:</b> {app.campusInfo.course}</p>
                          <p><b>Duration:</b> {app.campusInfo.duration}</p>
                        </div>
                      </div>

                      <div className="detail-section">
                        <h4><span className="section-number">2</span> Student Details</h4>
                        <div style={{ fontSize: "14px" }}>
                          <p><b>DOB:</b> {app.studentDetails.dob ? app.studentDetails.dob.split("T")[0].split("-").reverse().join("-") : "N/A"}</p>
                          <p><b>Gender:</b> {app.studentDetails.gender}</p>
                          <p><b>Caste:</b> {app.studentDetails.caste}</p>
                          <p><b>Aadhaar:</b> {app.studentDetails.aadhaar}</p>
                          <p><b>Contact:</b> {app.studentDetails.contact}</p>
                          <p><b>Email:</b> {app.studentDetails.email}</p>
                        </div>
                      </div>

                      <div className="detail-section">
                        <h4><span className="section-number">3</span> Parent Details</h4>
                        <div className="parent-box bg-father">
                          <p style={{ fontWeight: "bold", fontSize: "12px" }}>{app.parentDetails.fatherName}</p>
                          <p style={{ fontSize: "10px", color: "#64748b" }}>{app.parentDetails.fatherOccupation || "N/A"}</p>
                          <p style={{ fontSize: "12px", color: "#1d4ed8", fontWeight: "bold" }}>{app.parentDetails.fatherPhone}</p>
                        </div>
                        <div className="parent-box bg-mother">
                          <p style={{ fontWeight: "bold", fontSize: "12px" }}>{app.parentDetails.motherName}</p>
                          <p style={{ fontSize: "10px", color: "#64748b" }}>{app.parentDetails.motherOccupation || "N/A"}</p>
                          <p style={{ fontSize: "12px", color: "#be185d", fontWeight: "bold" }}>{app.parentDetails.motherPhone}</p>
                        </div>
                      </div>

                      <div className="detail-section">
                        <h4><span className="section-number">4</span> Documents</h4>
                        <div className="doc-grid">
                          {[
                            { label: "Photo", key: "photo" },
                            { label: "Aadhaar", key: "aadhaarFile" },
                            { label: "10th", key: "tenthMarksheet" },
                            { label: "12th", key: "twelfthMarksheet" },
                            { label: "UG", key: "graduation" },
                            { label: "PG", key: "postGraduation" },
                          ].map((doc) => app.documents[doc.key] && (
                            <a key={doc.key} className="doc-item" href={`${API_BASE_URL.replace("/api", "")}/uploads/${app.documents[doc.key]}`} target="_blank" rel="noreferrer">
                              <div className="doc-preview">
                                <img src={`${API_BASE_URL.replace("/api", "")}/uploads/${app.documents[doc.key]}`} alt="" />
                              </div>
                              <span className="doc-label">{doc.label}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="action-bar">
                      <button className="btn-approve" onClick={() => updateStatus(app._id, "approved")}>Approve & Set Fees</button>
                      <button className="btn-reject" onClick={() => updateStatus(app._id, "rejected")}>Reject</button>
                    </div>
                  </div>
                )}

                {feeInputId === app._id && (
                  <div className="fee-overlay">
                    <p>Set the admission fee for this student to finalize approval:</p>
                    <div className="fee-inputs">
                      <input type="number" placeholder="Fees" value={feeValue} onChange={(e) => setFeeValue(e.target.value)} style={{ width: "100px" }} />
                      <input type="text" placeholder="Application ID" value={applicationIdValue} onChange={(e) => setApplicationIdValue(e.target.value)} style={{ width: "150px" }} />
                      <button className="confirm-btn" onClick={() => setFeeInputId(null)}>Cancel</button>
                      <button className="confirm-btn" style={{ color: "white" }} onClick={() => submitFees(app._id)}>Confirm</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Applications;