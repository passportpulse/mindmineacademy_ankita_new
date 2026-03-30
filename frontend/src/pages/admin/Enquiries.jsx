import { useEffect, useState } from "react";
import { API_BASE_URL, getAdminHeaders } from "../../config/api";

const Enquiries = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchEnquiries = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/enquiries`, {
        headers: getAdminHeaders(),
      });
      const result = await res.json();
      console.log(result);
      setData(result || []);
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ CONNECTED TO YOUR BACKEND ROUTE: /api/enquiries/:id/status
  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/enquiries/${id}/status`, {
        method: "PATCH",
        headers: { ...getAdminHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setData(prev => prev.map(item => item._id === id ? { ...item, status: newStatus } : item));
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const filteredData = filterStatus === "All" 
    ? data 
    : data.filter(item => item.status === filterStatus);

  const getStatusStyles = (status) => {
    switch (status) {
      case "Connected": return { bg: "#f0fdf4", text: "#166534", border: "#bbf7d0" };
      case "Follow-up": return { bg: "#fffbeb", text: "#854d0e", border: "#fef3c7" };
      case "Admission Confirm": return { bg: "#f5f3ff", text: "#5b21b6", border: "#ddd6fe" };
      case "Junk Lead": return { bg: "#fef2f2", text: "#991b1b", border: "#fecaca" };
      default: return { bg: "#eff6ff", text: "#1e40af", border: "#dbeafe" }; // "New"
    }
  };

  return (
    <>
      <style>{`
        .enquiry-container { padding: 30px 40px; background-color: #f8fafc; min-height: 100vh; font-family: 'Inter', system-ui, sans-serif; }
        .header-section { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0; }
        .enquiry-title { font-size: 24px; font-weight: 800; color: #0f172a; margin: 0; }
        
        .filter-wrapper { display: flex; align-items: center; gap: 12px; min-width: 350px; justify-content: flex-end; }
        .filter-label { font-size: 13px; color: #64748b; font-weight: 700; white-space: nowrap; }
        
        .styled-select { 
          padding: 8px 14px; border-radius: 8px; border: 1px solid #cbd5e1; 
          font-size: 13px; font-weight: 600; cursor: pointer; outline: none; transition: all 0.2s;
        }

        .table-card { background: white; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.04); overflow: hidden; }
        .enquiry-table { width: 100%; border-collapse: collapse; }
        .enquiry-table th { background: #f8fafc; padding: 14px 20px; font-size: 11px; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.05em; border-bottom: 1px solid #e2e8f0; text-align: left; }
        .enquiry-table td { padding: 16px 20px; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #334155; }
        
        .student-name { font-weight: 700; color: #1e293b; display: block; font-size: 15px; }
        .sub-text { font-size: 12px; color: #94a3b8; margin-top: 3px; display: block; }
        .course-chip { background: #f1f5f9; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; color: #475569; display: inline-block; }
      `}</style>

      <div className="enquiry-container">
        <div className="header-section">
          <h2 className="enquiry-title">Enquiries</h2>
          
          <div className="filter-wrapper">
            <span className="filter-label">Filter By Status:</span>
            <select 
              className="styled-select" 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                backgroundColor: getStatusStyles(filterStatus).bg,
                color: getStatusStyles(filterStatus).text,
                borderColor: getStatusStyles(filterStatus).border
              }}
            >
              <option value="All" style={{ background: "#fff", color: "#000" }}>All Records</option>
              <option value="New" style={{ background: "#eff6ff", color: "#1e40af" }}>New Leads</option>
              <option value="Connected" style={{ background: "#f0fdf4", color: "#166534" }}>Connected</option>
              <option value="Follow-up" style={{ background: "#fffbeb", color: "#854d0e" }}>Follow-up</option>
              <option value="Admission Confirm" style={{ background: "#f5f3ff", color: "#5b21b6" }}>Admission Confirm</option>
              <option value="Junk Lead" style={{ background: "#fef2f2", color: "#991b1b" }}>Junk Lead</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: "60px", textAlign: "center", color: "#64748b" }}>Fetching Records...</div>
        ) : (
          <div className="table-card">
            <table className="enquiry-table">
              <thead>
                <tr>
                  <th>Student Info</th>
                  <th>Course</th>
                  <th>Message</th>
                  <th style={{ textAlign: "right" }}>Update Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => {
                  const colors = getStatusStyles(item.status);
                  return (
                    <tr key={item._id}>
                      <td>
                        <span className="student-name">{item.fullName}</span>
                        <span className="sub-text">📞 {item.phone}</span>
                        <span className="sub-text">📧 {item.email}</span>
                      </td>
                      <td><span className="course-chip">{item.courseCategory}</span></td>
                      <td style={{ color: "#64748b", maxWidth: "280px", fontSize: "13px" }}>
                        {item.message || "—"}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <select 
                          className="styled-select"
                          style={{ backgroundColor: colors.bg, color: colors.text, borderColor: colors.border }}
                          value={item.status || "New"}
                          onChange={(e) => updateStatus(item._id, e.target.value)}
                        >
                          <option value="New" style={{ background: "#eff6ff", color: "#1e40af" }}>New</option>
                          <option value="Connected" style={{ background: "#f0fdf4", color: "#166534" }}>Connected</option>
                          <option value="Follow-up" style={{ background: "#fffbeb", color: "#854d0e" }}>Follow-up</option>
                          <option value="Admission Confirm" style={{ background: "#f5f3ff", color: "#5b21b6" }}>Admission</option>
                          <option value="Junk Lead" style={{ background: "#fef2f2", color: "#991b1b" }}>Junk</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Enquiries;