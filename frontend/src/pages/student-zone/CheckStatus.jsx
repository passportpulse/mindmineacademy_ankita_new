import React, { useState } from "react";
import "../../styles/student-zone/check-status.css";
import { API_BASE_URL } from "../../config/api";

export default function CheckStatus() {
  const [trackingId, setTrackingId] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!trackingId) return;

    setLoading(true);
    setStatus(null);
    setError("");

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/applications/status/${trackingId}`,
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid Tracking ID");
      } else {
        setStatus(data.data.status);
      }
    } catch (err) {
      console.error("Check status error", err);
      setError("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="status-section">
        <div className="status-card">
          <h2>Check Application Status</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Tracking ID (eg: TRK-XYZ123)"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Checking..." : "Check Status"}
            </button>
          </form>

          {status && (
            <div className="status-result success">
              <p>Status:</p>
              <strong>{status}</strong>
            </div>
          )}

          {error && <div className="status-result error">{error}</div>}
        </div>
      </section>
    </>
  );
}
