import React, { useEffect, useState } from "react";
import "../../styles/student-zone/notices.css";

const API = "";

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [openId, setOpenId] = useState(null);

  // Fetch notices (PUBLIC)
  useEffect(() => {
    async function fetchNotices() {
      try {
        const res = await fetch(`${API}/api/notice/all`); // public endpoint
        const data = await res.json();
        if (data.success) setNotices(data.notices);
      } catch (err) {
        console.error(err);
      }
    }
    fetchNotices();
  }, []);

  const toggleNotice = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="notices-section blackboard">
      <h2 className="notice-heading">Latest Notices</h2>

      {notices.length === 0 && <p>No notices available.</p>}

      <div className="notice-list">
        {notices.map((notice) => (
          <div key={notice._id} className="notice-item">
            <div
              className="notice-title"
              onClick={() => toggleNotice(notice._id)}
            >
              <span className="date">
                {new Date(notice.createdAt).toLocaleDateString()}
              </span>
              <strong>{notice.title}</strong>
            </div>

            {openId === notice._id && (
              <div className="notice-description">
                {notice.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
