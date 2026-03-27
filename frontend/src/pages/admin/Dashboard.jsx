import { useEffect, useState } from "react";
import { API_BASE_URL, getAdminHeaders } from "../../config/api";
import { useNavigate } from "react-router-dom";
import ApplicationCard from "../../components/admin/ApplicationCard";

const branches = [
  { name: "Moulali Campus", key: "moulali", accentColor: "#ec4899" },
  { name: "Thakurpukur Campus", key: "thakurpukur", accentColor: "#6366f1" },
];

const Dashboard = () => {
  const [branchStats, setBranchStats] = useState({});
  const [searchType, setSearchType] = useState("tracking");
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // Card Logic States
  const [expandedIds, setExpandedIds] = useState([]);
  const [feeInputId, setFeeInputId] = useState(null);
  const [feeValue, setFeeValue] = useState("");
  const [applicationIdValue, setApplicationIdValue] = useState("");

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/applications`, { headers: getAdminHeaders() });
      const data = await res.json();
      const apps = data.data || [];
      calculateStats(apps);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const calculateStats = (apps) => {
    const stats = {};
    branches.forEach((branch) => {
      const filtered = apps.filter(a => a.campus === branch.name.replace(" Campus", ""));
      stats[branch.key] = {
        total: filtered.length,
        approved: filtered.filter(a => a.status === "approved").length,
        pending: filtered.filter(a => a.status === "pending").length,
        rejected: filtered.filter(a => a.status === "rejected").length,
      };
    });
    setBranchStats(stats);
  };

  const handleSearch = async () => {
    if (!searchValue) return;
    setSearchLoading(true);
    try {
      const url = searchType === "tracking" 
        ? `${API_BASE_URL}/api/applications/status/${searchValue.trim()}`
        : `${API_BASE_URL}/api/applications/phone/${searchValue.trim()}`;

      const res = await fetch(url, { headers: getAdminHeaders() });
      const data = await res.json();
      setSearchResults(data.data ? (Array.isArray(data.data) ? data.data : [data.data]) : []);
    } catch (err) { setSearchResults([]); } 
    finally { setSearchLoading(false); }
  };

  // Card Support Functions
  const toggleExpand = (id) => {
    setExpandedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const updateStatus = async (id, status) => {
    if (status === "approved") { setFeeInputId(id); return; }
    try {
      await fetch(`${API_BASE_URL}/api/applications/${id}`, {
        method: "PATCH",
        headers: getAdminHeaders(),
        body: JSON.stringify({ status }),
      });
      fetchData();
      handleSearch();
    } catch (err) { console.error(err); }
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
      fetchData();
      handleSearch();
    } catch (err) { console.error(err); }
  };

  const getStatusClass = (status) => {
    if (status === "approved") return "status-approved";
    if (status === "rejected") return "status-rejected";
    return "status-pending";
  };

  return (
    <div className="dash-container">
      <style>{`
        .dash-container { padding: 32px 16px; max-width: 1280px; margin: 0 auto; background-color: #f8fafc; min-height: 100vh; font-family: 'Inter', sans-serif; }
        .header-flex { margin-bottom: 32px; }
        .header-flex h2 { font-size: 30px; font-weight: 900; color: #1e293b; margin: 0; }
        .sub-text { color: #64748b; font-size: 14px; margin-top: 4px; }

        /* Dashboard Search Box */
        .search-box-wrap { background: #fff; padding: 24px; border-radius: 24px; border: 1px solid #e2e8f0; margin-bottom: 32px; }
        .search-input-group { display: flex; gap: 12px; }
        .dash-select { width: 140px; padding: 10px; border-radius: 12px; border: 1px solid #cbd5e1; font-weight: 600; cursor: pointer; }
        .dash-input { flex: 1; padding: 10px; border-radius: 12px; border: 1px solid #cbd5e1; outline: none; }
        .dash-search-btn { background: #4f46e5; color: white; border: none; padding: 10px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; }

        /* Dashboard Stats Grid */
        .dashboard-grid { display: grid; gap: 24px; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
        .dash-card { background: #fff; border: 1px solid #e2e8f0; border-left-width: 4px; border-radius: 24px; padding: 24px; cursor: pointer; transition: 0.2s; }
        .dash-card:hover { transform: translateY(-4px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); }
        .total-number { font-size: 32px; font-weight: 800; color: #0f172a; margin: 12px 0; }
        
        .stat-mini-pill { padding: 8px; border-radius: 12px; textAlign: center; flex: 1; }
      `}</style>

      <div className="header-flex">
        <h2>Admissions Dashboard</h2>
        <p className="sub-text">Overview of branches and quick application lookup</p>
      </div>

      <div className="search-box-wrap">
        <h4 style={{ marginBottom: '16px', fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.1em' }}>QUICK SEARCH</h4>
        <div className="search-input-group">
          <select className="dash-select" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="tracking">Tracking ID</option>
            <option value="phone">Phone No</option>
          </select>
          <input 
            className="dash-input" 
            placeholder={searchType === "tracking" ? "e.g. TRK12345" : "e.g. 9876543210"}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="dash-search-btn" onClick={handleSearch}>
            {searchLoading ? "..." : "Search"}
          </button>
        </div>

        {/* Search Results Rendered using ApplicationCard */}
        {searchResults.length > 0 && (
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {searchResults.map((app) => (
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
              />
            ))}
          </div>
        )}
      </div>

      <div className="dashboard-grid">
        {branches.map((branch) => {
          const stats = branchStats[branch.key] || { total: 0, approved: 0, pending: 0, rejected: 0 };
          return (
            <div key={branch.key} className="dash-card" style={{ borderLeftColor: branch.accentColor }} onClick={() => navigate(`/admin/applications?branch=${branch.name.replace(" Campus", "")}`)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700' }}>{branch.name}</h3>
                <span style={{ fontSize: '10px', fontWeight: '800', padding: '4px 10px', borderRadius: '99px', background: '#f1f5f9' }}>MANAGE</span>
              </div>
              <p className="total-number">{stats.total}</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div className="stat-mini-pill" style={{ background: '#f0fdf4' }}>
                  <span style={{ fontSize: '10px', color: '#16a34a', fontWeight: '700' }}>Approved: {stats.approved}</span>
                </div>
                <div className="stat-mini-pill" style={{ background: '#fefce8' }}>
                  <span style={{ fontSize: '10px', color: '#ca8a04', fontWeight: '700' }}>Pending: {stats.pending}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;