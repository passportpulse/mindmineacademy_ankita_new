import { useState } from "react";

const FeesSummaryModal = ({ app, onClose, refreshApp }) => {
  const totalFees = app.fees || 0;
  const payments = app.payments || [];
  const emis = app.emis || [];

  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("cash");
  const [txnId, setTxnId] = useState("");
  const today = new Date();

  const getStatus = (emi) => {
    if (emi.status === "paid") return "paid";
    if (emi.dueDate && new Date(emi.dueDate) < today) return "overdue";
    return "pending";
  };

  const [activeEmiIndex, setActiveEmiIndex] = useState(null);
  const [emiMode, setEmiMode] = useState("cash");
  const [emiTxn, setEmiTxn] = useState("");

  const paidAmount = payments.reduce(
    (sum, p) => sum + Number(p.amount || 0),
    0,
  );
  const dueAmount = totalFees - paidAmount;

  const handleAddPayment = async () => {
    if (!amount) return;
    try {
      await fetch(`/api/applications/${app._id}/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          method,
          txnId: method !== "cash" ? txnId : "",
        }),
      });
      refreshApp();
      setAmount("");
      setTxnId("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="premium-modal-overlay">
      <div className="premium-modal-container">
        {/* Header */}
        <div className="modal-header">
          <div>
            <h3>Fees Summary</h3>
            <p className="subtitle">Manage payments and installments</p>
          </div>
          <button className="close-circle-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <label>Total Fees</label>
            <div className="value">₹{totalFees.toLocaleString()}</div>
          </div>
          <div className="stat-card paid-border">
            <label>Amount Paid</label>
            <div className="value text-emerald">
              ₹{paidAmount.toLocaleString()}
            </div>
          </div>
          <div className="stat-card due-border">
            <label>Current Due</label>
            <div className="value text-rose">₹{dueAmount.toLocaleString()}</div>
          </div>
        </div>

        <div className="modal-content-split">
          {/* Left Column: Form */}
          <div className="content-left">
            <div className="section-card payment-form">
              <h4>Record New Payment</h4>
              <div className="input-group">
                <input
                  type="number"
                  placeholder="Amount (e.g. 5000)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <option value="cash">Cash</option>
                  <option value="upi">UPI / Scanner</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>

              {method !== "cash" && (
                <input
                  className="txn-input"
                  type="text"
                  placeholder="Reference/Transaction ID"
                  value={txnId}
                  onChange={(e) => setTxnId(e.target.value)}
                />
              )}

              <button className="primary-submit-btn" onClick={handleAddPayment}>
                Confirm Payment
              </button>
            </div>

            {emis.length > 0 && (
              <div className="section-card emi-section">
                <h4>Upcoming EMI Schedule</h4>

                <div className="emi-list">
                  {emis.map((emi, i) => {
                    const status = getStatus(emi);

                    return (
                      <div key={i} className="emi-card">
                        <div className="emi-top">
                          <span className="emi-date">
                            {new Date(emi.dueDate).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>

                          <span className="emi-amt">₹{emi.amount}</span>

                          <span className={`emi-status status-${status}`}>
                            {status}
                          </span>
                        </div>

                        {/* ACTION */}
                        {status !== "paid" && (
                          <div className="emi-actions">
                            {activeEmiIndex === i ? (
                              <div className="emi-payment-box">
                                <select
                                  value={emiMode}
                                  onChange={(e) => setEmiMode(e.target.value)}
                                >
                                  <option value="cash">Cash</option>
                                  <option value="upi">UPI</option>
                                  <option value="bank">Bank Transfer</option>
                                </select>

                                {emiMode !== "cash" && (
                                  <input
                                    type="text"
                                    placeholder="Transaction ID"
                                    value={emiTxn}
                                    onChange={(e) => setEmiTxn(e.target.value)}
                                  />
                                )}

                                <button
                                  className="confirm-btn"
                                  onClick={async () => {
                                    try {
                                      await fetch(
                                        `/api/applications/${app._id}/payment`,
                                        {
                                          method: "POST",
                                          headers: {
                                            "Content-Type": "application/json",
                                          },
                                          body: JSON.stringify({
                                            amount: emi.amount,
                                            type: "emi",
                                            paymentMode: emiMode,
                                            txnId:
                                              emiMode !== "cash" ? emiTxn : "",
                                            emiIndex: i,
                                          }),
                                        },
                                      );

                                      setActiveEmiIndex(null);
                                      setEmiTxn("");
                                      refreshApp();
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                >
                                  Confirm
                                </button>

                                <button
                                  className="cancel-btn"
                                  onClick={() => setActiveEmiIndex(null)}
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                className="mark-paid-btn"
                                onClick={() => setActiveEmiIndex(i)}
                              >
                                Mark Paid
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: History */}
          <div className="content-right">
            <div className="section-card history-section">
              <h4>Transaction History</h4>
              <div className="history-list">
                {payments.length === 0 ? (
                  <div className="empty-state">
                    No transactions recorded yet.
                  </div>
                ) : (
                  payments.map((p, i) => (
                    <div key={i} className="history-card">
                      <div className="h-top">
                        <span className="h-amount">₹{p.amount}</span>
                        <span className={`h-method tag-${p.method}`}>
                          {p.method}
                        </span>
                      </div>
                      <div className="h-bottom">
                        <span className="h-txn">
                          {p.txnId || "Cash Payment"}
                        </span>
                        <span className="h-date">
                          {new Date(p.date).toLocaleDateString("en-GB")}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <button className="footer-close-btn" onClick={onClose}>
          Dismiss
        </button>
      </div>

      <style>{`
        .premium-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .premium-modal-container {
          background: #ffffff;
          width: 100%;
          max-width: 850px;
          max-height: 95vh;
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          overflow-y: auto;
          font-family: 'Inter', system-ui, sans-serif;
        }

        /* Header */
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 28px;
        }
        .modal-header h3 { margin: 0; font-size: 24px; color: #1e293b; font-weight: 800; }
        .subtitle { color: #64748b; font-size: 14px; margin: 4px 0 0 0; }
        .close-circle-btn {
          background: #f1f5f9;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          transition: 0.2s;
        }
        .close-circle-btn:hover { background: #e2e8f0; color: #ef4444; }

        /* Stats */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }
        .stat-card {
          padding: 16px;
          background: #f8fafc;
          border-radius: 16px;
          border: 1px solid #f1f5f9;
        }
        .stat-card label { font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
        .stat-card .value { font-size: 22px; font-weight: 800; margin-top: 4px; color: #0f172a; }
        .text-emerald { color: #059669; }
        .text-rose { color: #e11d48; }
        .paid-border { border-left: 4px solid #10b981; }
        .due-border { border-left: 4px solid #f43f5e; }

        /* Split Layout */
        .modal-content-split {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 24px;
        }

        .section-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .section-card h4 {
          font-size: 13px;
          margin: 0 0 16px 0;
          color: #475569;
          font-weight: 700;
          text-transform: uppercase;
        }

        /* Form Elements */
        .input-group { display: flex; gap: 12px; margin-bottom: 12px; }
        input, select {
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          background: #fdfdfd;
          font-size: 14px;
          transition: 0.2s;
        }
        input:focus, select:focus { border-color: #6366f1; outline: none; box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1); }
        .txn-input { width: 100%; box-sizing: border-box; margin-bottom: 12px; }
        .primary-submit-btn {
          width: 100%;
          padding: 12px;
          background: #4f46e5;
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
        }
        .primary-submit-btn:hover { background: #4338ca; transform: translateY(-1px); }

        /* History & EMI Lists */
        .history-list, .emi-list { display: flex; flex-direction: column; gap: 10px; max-height: 300px; overflow-y: auto; }
        .history-card {
          padding: 12px;
          background: #f8fafc;
          border-radius: 12px;
          border: 1px solid #f1f5f9;
        }
        .h-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
        .h-amount { font-weight: 700; color: #1e293b; }
        .h-method { font-size: 10px; font-weight: 700; text-transform: uppercase; padding: 2px 8px; border-radius: 99px; }
        .tag-cash { background: #fef3c7; color: #92400e; }
        .tag-upi { background: #dcfce7; color: #166534; }
        .tag-bank { background: #dbeafe; color: #1e40af; }
        .h-bottom { display: flex; justify-content: space-between; font-size: 11px; color: #94a3b8; }

        .emi-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px dashed #e2e8f0;
        }
        .emi-date { font-size: 13px; color: #475569; }
        .emi-amt { font-weight: 600; color: #1e293b; }

        .footer-close-btn {
          margin-top: 10px;
          width: 100%;
          background: #f1f5f9;
          color: #475569;
          border: none;
          padding: 12px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
        }
        .footer-close-btn:hover { background: #e2e8f0; }
        .empty-state { text-align: center; color: #94a3b8; font-size: 13px; padding: 20px; }
        .emi-card {
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
}

.emi-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.emi-status {
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 999px;
  font-weight: 700;
  text-transform: uppercase;
}

.status-paid {
  background: #dcfce7;
  color: #166534;
}

.status-overdue {
  background: #fee2e2;
  color: #991b1b;
}

.status-pending {
  background: #fef3c7;
  color: #92400e;
}

.mark-paid-btn {
  margin-top: 8px;
  background: #16a34a;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 11px;
  cursor: pointer;
}

.emi-payment-box {
  margin-top: 10px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  background: #fff;
  padding: 8px;
  border-radius: 10px;
}

.confirm-btn {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 11px;
  cursor: pointer;
}

.cancel-btn {
  background: transparent;
  border: none;
  color: #64748b;
  font-size: 11px;
  cursor: pointer;
}

      `}</style>
    </div>
  );
};

export default FeesSummaryModal;
