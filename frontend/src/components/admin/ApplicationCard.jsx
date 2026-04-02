import React, { useEffect, useState } from "react";
import FeesSummaryModal from "./FeesSummaryModal";

const ApplicationCard = ({
  app,
  isExpanded,
  onToggle,
  onUpdateStatus,
  feeInputId,
  setFeeInputId,
  feeValue,
  setFeeValue,
  applicationIdValue,
  setApplicationIdValue,
  onSubmitFees,
  getStatusClass,
  onUpdateEmi,
}) => {
  const [emiInputId, setEmiInputId] = useState(null);
  const [emis, setEmis] = useState(app.emis || []);
  const [emiAmount, setEmiAmount] = useState("");
  const [emiDate, setEmiDate] = useState("");
  const [showFeesModal, setShowFeesModal] = useState(false);

  const handleAddEmi = () => {
    if (!emiAmount || !emiDate) return;
    setEmis([...emis, { amount: emiAmount, dueDate: emiDate }]);
    setEmiAmount("");
    setEmiDate("");
  };

  const handleDeleteEmi = (index) => {
    setEmis(emis.filter((_, i) => i !== index));
  };

  const handleSaveEmi = () => {
    onUpdateEmi(app._id, emis);
    setEmiInputId(null);
  };

  useEffect(() => {
    setEmis(app.emis || []);
  }, [app]);

  return (
    <div className="app-card">
      <style>{`
        .app-card { 
          background: #ffffff; 
          box-shadow: 0 1px 3px rgba(0,0,0,0.05); 
          border: 1px solid #e2e8f0; 
          border-radius: 24px; 
          overflow: hidden; 
          margin-bottom: 20px;
          font-family: 'Inter', sans-serif;
        }
        
        /* Fixed Grid Layout for Header Alignment */
        .card-summary { 
          padding: 20px; 
          display: grid; 
          grid-template-columns: 1fr; /* Stack on mobile */
          gap: 16px; 
          align-items: center;
        }

        @media (min-width: 768px) { 
          .card-summary { 
            grid-template-columns: 2.5fr 2fr 1fr; /* Fixed 3-column lane system */
            gap: 24px;
          } 
        }

        .student-profile { min-width: 0; }
        .student-name h3 { 
          font-weight: 700; 
          font-size: 18px; 
          color: #0f172a; 
          margin: 0; 
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis; /* Prevents long names from breaking alignment */
        }
        .course-tag { color: #4f46e5; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-top: 4px; }
        .tracking-id { font-size: 10px; font-family: monospace; color: #94a3b8; margin: 4px 0 0 0; }

        .status-badges { display: flex; gap: 8px; flex-wrap: wrap; }
        @media (min-width: 768px) { .status-badges { justify-content: center; } } /* Centers badges in middle lane */

        .badge-base { 
          padding: 4px 12px; 
          border-radius: 9999px; 
          border: 1px solid; 
          font-size: 10px; 
          font-weight: 900; 
          text-transform: uppercase; 
          white-space: nowrap;
        }
        
        .status-approved { background: #f0fdf4; color: #15803d; border-color: #bbf7d0; }
        .status-rejected { background: #fef2f2; color: #b91c1c; border-color: #fecaca; }
        .status-pending { background: #fefce8; color: #a16207; border-color: #fef08a; }

        .review-btn-container { display: flex; justify-content: flex-end; } /* Pushes button to far right */
        .review-btn { 
          background: #f1f5f9; 
          color: #475569; 
          padding: 8px 16px; 
          border-radius: 12px; 
          font-size: 12px; 
          font-weight: 700; 
          border: none; 
          cursor: pointer; 
          transition: 0.2s;
          white-space: nowrap;
        }
        .review-btn:hover { background: #e2e8f0; }

        .detail-pane { padding: 24px; border-top: 1px solid #f8fafc; background-color: #fcfcfd; }
        .detail-grid { display: grid; grid-template-columns: 1fr; gap: 32px; padding: 12px 0; }
        @media (min-width: 768px) { .detail-grid { grid-template-columns: repeat(3, 1fr); } }

        .detail-section h4 { font-size: 10px; font-weight: 900; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.2em; display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
        .section-number { width: 16px; height: 16px; background: #1e293b; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 8px; }
        .info-box { background: #f8fafc; padding: 12px; border-radius: 16px; font-size: 14px; border: 1px solid #f1f5f9; line-height: 1.6; }
        .parent-box { padding: 10px; border-radius: 12px; margin-bottom: 12px; border: 1px solid transparent; }
        .bg-father { background: rgba(239, 246, 255, 0.5); border-color: #dbeafe; }
        .bg-mother { background: rgba(253, 242, 248, 0.5); border-color: #fce7f3; }

        .action-bar { margin-top: 16px; padding-top: 20px; border-top: 1px solid #f1f5f9; display: flex; gap: 12px; }
        .btn-approve { background: #0f172a; color: white; padding: 10px 24px; border-radius: 12px; font-weight: 700; border: none; cursor: pointer; }
        .btn-reject { background: #fef2f2; color: #dc2626; padding: 10px 24px; border-radius: 12px; font-weight: 700; border: none; cursor: pointer; }

        .fee-overlay { padding: 16px 24px; background: #f8fafc; border-top: 2px solid #eef2ff; display: flex; flex-direction: column; gap: 14px; }
        .fee-header { display: flex; align-items: center; gap: 10px; font-weight: 700; color: #1e293b; }
        .fee-inputs { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .input-group { display: flex; flex-direction: column; gap: 4px; }
        .input-group label { font-size: 11px; font-weight: 700; color: #64748b; }
        .input-group input { padding: 10px; border-radius: 10px; border: 1px solid #cbd5e1; font-size: 13px; outline: none; }
        .input-group input:focus { border-color: #4f46e5; }
        .fee-actions { display: flex; align-items: center; justify-content: flex-end; gap: 16px; margin-top: 8px; }
        .confirm-btn-primary { background: #4f46e5; color: white; border: none; padding: 10px 24px; border-radius: 10px; font-weight: 700; cursor: pointer; }
        .cancel-link { background: transparent; color: #94a3b8; border: none; cursor: pointer; font-weight: 600; font-size: 13px; }
      `}</style>

      {/* --- ALIGNED HEADER --- */}
      <div className="card-summary">
        {/* Lane 1: Name & ID */}
        <div className="student-profile">
          <div className="student-name">
            <h3>{app.fullName}</h3>
            <p className="course-tag">{app.course}</p>
            <p className="tracking-id">{app.trackingId}</p>
          </div>
        </div>

        {/* Lane 2: Badges (Centered) */}
        <div className="status-badges">
          <div className={`badge-base ${getStatusClass(app.status)}`}>
            {app.status}
          </div>
          {app.status === "approved" && app.applicationId && (
            <div className="badge-base status-approved">
              ID: {app.applicationId}
            </div>
          )}
          {app.status === "approved" && app.fees && (
            <div
              className="badge-base"
              style={{
                background: "#eef2ff",
                color: "#4338ca",
                borderColor: "#c7d2fe",
              }}
            >
              ₹ {app.fees}
            </div>
          )}
        </div>

        {/* Lane 3: Button (Right Aligned) */}
        <div className="review-btn-container">
          <button className="review-btn" onClick={() => onToggle(app._id)}>
            {isExpanded ? "Collapse" : "Full Review"}
          </button>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      {isExpanded && (
        <div className="detail-pane">
          <div className="detail-grid">
            <div className="detail-section">
              <h4>
                <span className="section-number">1</span> Personal & Contact
              </h4>
              <div className="info-box">
                <p>
                  <b>Campus:</b> {app.campus}
                </p>
                <p>
                  <b>Aadhaar:</b> {app.aadhaar}
                </p>
                <p>
                  <b>Phone:</b> {app.phone}
                </p>
                <p>
                  <b>Email:</b> {app.email}
                </p>
                <p>
                  <b>DOB:</b>{" "}
                  {app.dob
                    ? new Date(app.dob).toLocaleDateString("en-GB")
                    : "N/A"}
                </p>
                <p>
                  <b>Gender:</b>{" "}
                  <span style={{ textTransform: "capitalize" }}>
                    {app.gender}
                  </span>
                </p>
                <p>
                  <b>Caste:</b> {app.caste}
                </p>
                <p
                  style={{
                    marginTop: "8px",
                    fontSize: "12px",
                    color: "#64748b",
                    borderTop: "1px solid #e2e8f0",
                    paddingTop: "4px",
                  }}
                >
                  <b>Address:</b> {app.address}, {app.city}, {app.state} -{" "}
                  {app.pin}
                </p>
              </div>
            </div>

            <div className="detail-section">
              <h4>
                <span className="section-number">2</span> Academic
              </h4>
              <div
                className="info-box"
                style={{
                  background: "transparent",
                  border: "none",
                  padding: "0",
                }}
              >
                <p>
                  <b>Last Qualification:</b> {app.lastQualification}
                </p>
                <p>
                  <b>Previous Course:</b> {app.previousCourse}
                </p>
                <p>
                  <b>Institute:</b> {app.previousInstitute}
                </p>
                <p>
                  <b>Passing Year:</b> {app.passingYear}
                </p>
                <p>
                  <b>Percentage:</b> {app.percentage}%
                </p>
              </div>
            </div>

            <div className="detail-section">
              <h4>
                <span className="section-number">3</span> Family
              </h4>
              <div className="parent-box bg-father">
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    marginBottom: "2px",
                  }}
                >
                  {app.fatherName} (Father)
                </p>
                <p style={{ fontSize: "11px", color: "#64748b" }}>
                  {app.fatherOccupation}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#1d4ed8",
                    fontWeight: "bold",
                  }}
                >
                  {app.fatherPhone}
                </p>
              </div>
              <div className="parent-box bg-mother">
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    marginBottom: "2px",
                  }}
                >
                  {app.motherName} (Mother)
                </p>
                <p style={{ fontSize: "11px", color: "#64748b" }}>
                  {app.motherOccupation}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#be185d",
                    fontWeight: "bold",
                  }}
                >
                  {app.motherPhone}
                </p>
              </div>
            </div>
          </div>

          <div className="action-bar">
            <button
              className="btn-approve"
              onClick={() => onUpdateStatus(app._id, "approved")}
            >
              Approve & Set Fees
            </button>
            <button
              className="btn-approve"
              style={{
                background: app.status === "approved" ? "#eef2ff" : "#e5e7eb",
                color: app.status === "approved" ? "#4338ca" : "#9ca3af",
                cursor: app.status === "approved" ? "pointer" : "not-allowed",
                opacity: app.status === "approved" ? 1 : 0.6,
              }}
              disabled={app.status !== "approved"}
              onClick={() => setEmiInputId(app._id)}
            >
              Set EMI
            </button>
            <button
              className="btn-approve"
              style={{
                background: app.status === "approved" ? "#ecfeff" : "#e5e7eb",
                color: app.status === "approved" ? "#0891b2" : "#9ca3af",
                cursor: app.status === "approved" ? "pointer" : "not-allowed",
                opacity: app.status === "approved" ? 1 : 0.6,
              }}
              disabled={app.status !== "approved"}
              onClick={() => setShowFeesModal(true)}
            >
              Fees Summary
            </button>

            <button
              className="btn-reject"
              onClick={() => onUpdateStatus(app._id, "rejected")}
            >
              Reject
            </button>
          </div>

          {app.emis && app.emis.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <h4
                style={{
                  fontSize: "10px",
                  fontWeight: "900",
                  textTransform: "uppercase",
                  color: "#94a3b8",
                  letterSpacing: "0.2em",
                  marginBottom: "10px",
                }}
              >
                EMI Details
              </h4>

              {/* Changed to row style with wrapping */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {app.emis.map((emi, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                      background: "#f8fafc",
                      padding: "8px 14px",
                      borderRadius: "10px",
                      border: "1px solid #e2e8f0",
                      fontSize: "12px",
                    }}
                  >
                    <span style={{ fontWeight: "700", color: "#64748b" }}>
                      Emi {index + 1}
                    </span>
                    <span style={{ fontWeight: "600", color: "#0f172a" }}>
                      ₹{emi.amount}
                    </span>
                    <span style={{ color: "#94a3b8" }}>|</span>
                    <span style={{ color: "#475569" }}>
                      {new Date(emi.dueDate).toLocaleDateString("en-GB")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- OVERLAYS --- */}
      {feeInputId === app._id && (
        <div className="fee-overlay">
          <div className="fee-header">
            <div className="section-number" style={{ background: "#4f46e5" }}>
              ✓
            </div>
            <p>Finalize Admission for {app.fullName}</p>
          </div>
          <div className="fee-inputs">
            <div className="input-group">
              <label>Admission Fees (₹)</label>
              <input
                type="number"
                value={feeValue}
                onChange={(e) => setFeeValue(e.target.value)}
                placeholder="e.g. 5000"
              />
            </div>
            <div className="input-group">
              <label>New Application ID</label>
              <input
                type="text"
                value={applicationIdValue}
                onChange={(e) => setApplicationIdValue(e.target.value)}
                placeholder="MMA/2026/001"
              />
            </div>
          </div>
          <div className="fee-actions">
            <button className="cancel-link" onClick={() => setFeeInputId(null)}>
              Cancel
            </button>
            <button
              className="confirm-btn-primary"
              onClick={() => onSubmitFees(app._id)}
            >
              Confirm & Approve
            </button>
          </div>
        </div>
      )}

      {emiInputId === app._id && (
        <div className="fee-overlay">
          <div className="fee-header">
            <div className="section-number" style={{ background: "#4f46e5" }}>
              ₹
            </div>
            <p>Manage EMI for {app.fullName}</p>
          </div>

          {/* Row-style Inputs */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <div
              className="input-group"
              style={{ flex: "1", minWidth: "150px" }}
            >
              <label>EMI Amount (₹)</label>
              <input
                type="number"
                value={emiAmount}
                onChange={(e) => setEmiAmount(e.target.value)}
              />
            </div>
            <div
              className="input-group"
              style={{ flex: "1", minWidth: "150px" }}
            >
              <label>Due Date</label>
              <input
                type="date"
                value={emiDate}
                onChange={(e) => setEmiDate(e.target.value)}
              />
            </div>
            <button
              className="confirm-btn-primary"
              onClick={handleAddEmi}
              style={{ height: "40px", padding: "0 20px" }}
            >
              + Add
            </button>
          </div>

          {/* Row-style List of added EMIs */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            {emis.map((emi, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "#fff",
                  padding: "6px 12px",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  fontSize: "12px",
                }}
              >
                <span style={{ fontWeight: "600" }}>₹{emi.amount}</span>
                <span style={{ color: "#64748b" }}>|</span>
                <span>{new Date(emi.dueDate).toLocaleDateString()}</span>
                <button
                  onClick={() => handleDeleteEmi(index)}
                  style={{
                    background: "transparent",
                    color: "#dc2626",
                    border: "none",
                    padding: "0",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginLeft: "5px",
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="fee-actions">
            <button className="cancel-link" onClick={() => setEmiInputId(null)}>
              Cancel
            </button>
            <button className="confirm-btn-primary" onClick={handleSaveEmi}>
              Save EMI Plan
            </button>
          </div>
        </div>
      )}
      {showFeesModal && (
        <FeesSummaryModal
          app={app}
          onClose={() => setShowFeesModal(false)}
          refreshApp={() => onUpdateStatus(app._id, app.status)}
        />
      )}
    </div>
  );
};

export default ApplicationCard;
