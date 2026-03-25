import { useEffect, useState } from "react";
import { API_BASE_URL, getAdminHeaders } from "../../config/api";

const Enquiries = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/enquiries`, {
        headers: getAdminHeaders(),
      });

      const result = await res.json();
      console.log(result);
      setData(result.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  return (
    <>
      <style>{`
        .enquiry-container {
          padding: 24px;
          background-color: #f8fafc;
          min-height: 100vh;
          font-family: sans-serif;
        }

        .enquiry-title {
          font-size: 24px;
          font-weight: bold;
          color: #1e293b;
          margin-bottom: 24px;
        }

        .loading-text, .empty-text {
          color: #64748b;
          font-weight: 500;
        }

        .table-wrapper {
          overflow-x: auto;
          background-color: #ffffff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .enquiry-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 14px;
        }

        .enquiry-table thead {
          background-color: #f1f5f9;
        }

        .enquiry-table th {
          padding: 12px 16px;
          font-weight: 600;
          color: #475569;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 0.025em;
        }

        .enquiry-table td {
          padding: 16px;
          color: #334155;
          border-top: 1px solid #e2e8f0;
          vertical-align: top;
        }

        .enquiry-table tr:hover {
          background-color: #f8fafc;
        }

        .message-cell {
          max-width: 250px;
          line-height: 1.5;
        }

        .date-cell {
          white-space: nowrap;
          color: #64748b;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .enquiry-container {
            padding: 16px;
          }
        }
      `}</style>

      <div className="enquiry-container">
        <h2 className="enquiry-title">Enquiries</h2>

        {loading ? (
          <p className="loading-text">Loading enquiries...</p>
        ) : data.length === 0 ? (
          <p className="empty-text">No enquiries found</p>
        ) : (
          <div className="table-wrapper">
            <table className="enquiry-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Course</th>
                  <th>Message</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item) => (
                  <tr key={item._id}>
                    <td><strong>{item.fullName}</strong></td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.courseCategory}</td>
                    <td className="message-cell">{item.message}</td>
                    <td className="date-cell">
                      {new Date(item.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Enquiries;