import React from "react";

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
}) => {
  return (
    <div className="app-card">
      <style>{`
        /* Scoped Styles for ApplicationCard */
        .app-card { 
          background: #ffffff; 
          box-shadow: 0 1px 3px rgba(0,0,0,0.05); 
          border: 1px solid #e2e8f0; 
          border-radius: 24px; 
          overflow: hidden; 
          margin-bottom: 20px;
          font-family: 'Inter', sans-serif;
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

        .status-badges { display: flex; gap: 8px; flex-wrap: wrap; }
        .badge-base { padding: 4px 12px; border-radius: 9999px; border: 1px solid; font-size: 10px; font-weight: 900; text-transform: uppercase; }
        
        .status-approved { background: #f0fdf4; color: #15803d; border-color: #bbf7d0; }
        .status-rejected { background: #fef2f2; color: #b91c1c; border-color: #fecaca; }
        .status-pending { background: #fefce8; color: #a16207; border-color: #fef08a; }

        .review-btn { background: #f1f5f9; color: #475569; padding: 8px 16px; border-radius: 12px; font-size: 12px; font-weight: 700; border: none; cursor: pointer; transition: 0.2s; }
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

      <div className="card-summary">
        <div className="student-profile">
          <div className="student-name">
            <h3>{app.fullName}</h3>
            <p className="course-tag">{app.course}</p>
            <p className="tracking-id">{app.trackingId}</p>
          </div>
        </div>

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
              style={{ background: "#eef2ff", color: "#4338ca", borderColor: "#c7d2fe" }}
            >
              ₹ {app.fees}
            </div>
          )}
        </div>

        <button className="review-btn" onClick={() => onToggle(app._id)}>
          {isExpanded ? "Collapse" : "Full Review"}
        </button>
      </div>

      {isExpanded && (
        <div className="detail-pane">
          <div className="detail-grid">
            {/* Section 1: Personal & Contact */}
            <div className="detail-section">
              <h4><span className="section-number">1</span> Personal & Contact</h4>
              <div className="info-box">
                <p><b>Campus:</b> {app.campus}</p>
                <p><b>Aadhaar:</b> {app.aadhaar}</p>
                <p><b>Phone:</b> {app.phone}</p>
                <p><b>Email:</b> {app.email}</p>
                <p><b>DOB:</b> {app.dob ? new Date(app.dob).toLocaleDateString("en-GB") : "N/A"}</p>
                <p><b>Gender:</b> <span style={{textTransform: 'capitalize'}}>{app.gender}</span></p>
                <p><b>Caste:</b> {app.caste}</p>
                <p style={{ marginTop: "8px", fontSize: "12px", color: "#64748b", borderTop: "1px solid #e2e8f0", paddingTop: "4px" }}>
                  <b>Address:</b> {app.address}, {app.city}, {app.state} - {app.pin}
                </p>
              </div>
            </div>

            {/* Section 2: Academic Background */}
            <div className="detail-section">
              <h4><span className="section-number">2</span> Academic</h4>
              <div className="info-box" style={{ background: 'transparent', border: 'none', padding: '0' }}>
                <p><b>Last Qualification:</b> {app.lastQualification}</p>
                <p><b>Previous Course:</b> {app.previousCourse}</p>
                <p><b>Institute:</b> {app.previousInstitute}</p>
                <p><b>Passing Year:</b> {app.passingYear}</p>
                <p><b>Percentage:</b> {app.percentage}%</p>
              </div>
            </div>

            {/* Section 3: Family Details */}
            <div className="detail-section">
              <h4><span className="section-number">3</span> Family</h4>
              <div className="parent-box bg-father">
                <p style={{ fontWeight: "bold", fontSize: "12px", marginBottom: '2px' }}>{app.fatherName} (Father)</p>
                <p style={{ fontSize: "11px", color: "#64748b" }}>{app.fatherOccupation}</p>
                <p style={{ fontSize: "12px", color: "#1d4ed8", fontWeight: "bold" }}>{app.fatherPhone}</p>
              </div>
              <div className="parent-box bg-mother">
                <p style={{ fontWeight: "bold", fontSize: "12px", marginBottom: '2px' }}>{app.motherName} (Mother)</p>
                <p style={{ fontSize: "11px", color: "#64748b" }}>{app.motherOccupation}</p>
                <p style={{ fontSize: "12px", color: "#be185d", fontWeight: "bold" }}>{app.motherPhone}</p>
              </div>
              
              {app.guardianName && (
                <div className="parent-box" style={{ background: "#f1f5f9" }}>
                  <p style={{ fontWeight: "bold", fontSize: "12px", marginBottom: '2px' }}>{app.guardianName} ({app.guardianRelation})</p>
                  <p style={{ fontSize: "12px", color: "#475569", fontWeight: "bold" }}>{app.guardianPhone}</p>
                </div>
              )}
            </div>
          </div>

          <div className="action-bar">
            <button className="btn-approve" onClick={() => onUpdateStatus(app._id, "approved")}>
              Approve & Set Fees
            </button>
            <button className="btn-reject" onClick={() => onUpdateStatus(app._id, "rejected")}>
              Reject
            </button>
          </div>
        </div>
      )}

      {/* Fee Overlay */}
      {feeInputId === app._id && (
        <div className="fee-overlay">
          <div className="fee-header">
            <div className="section-number" style={{ background: "#4f46e5" }}>✓</div>
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
            <button className="cancel-link" onClick={() => setFeeInputId(null)}>Cancel</button>
            <button className="confirm-btn-primary" onClick={() => onSubmitFees(app._id)}>
              Confirm & Approve
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationCard;