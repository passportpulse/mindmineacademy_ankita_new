import React, { useState, useEffect } from "react";
import { API_BASE_URL, getAdminHeaders } from "../../config/api";
import "../../styles/admin/FeesSummaryModal.css";

const FeesSummaryModal = ({ app, onClose, refreshApp }) => {
  const totalFees = app.fees || [];

  // ✅ LOCAL STATE (IMPORTANT)
  const [paymentList, setPaymentList] = useState(app.payments || []);
  const [emiList, setEmiList] = useState(app.emis || []);

  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("cash");
  const [txnId, setTxnId] = useState("");

  const [activeEmiIndex, setActiveEmiIndex] = useState(null);
  const [emiMode, setEmiMode] = useState("cash");
  const [emiTxn, setEmiTxn] = useState("");

  const today = new Date();

  // ✅ sync when app changes
  useEffect(() => {
    setPaymentList(app.payments || []);
    setEmiList(app.emis || []);
  }, [app]);

  const getStatus = (emi) => {
    if (emi.status === "paid") return "paid";
    if (emi.dueDate && new Date(emi.dueDate) < today) return "overdue";
    return "pending";
  };

  const paidAmount = paymentList.reduce(
    (sum, p) => sum + Number(p.amount || 0),
    0
  );

  const dueAmount = totalFees - paidAmount;

  //////////////////////////////////////////////////////
  // ✅ ADD PAYMENT (INSTANT UI)
  //////////////////////////////////////////////////////
  const handleAddPayment = async () => {
    if (!amount || amount <= 0) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/applications/${app._id}/payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...getAdminHeaders(),
          },
          body: JSON.stringify({
            amount,
            method,
            txnId: method !== "cash" ? txnId : "",
          }),
        }
      );

      const data = await res.json();

      const newPayment = data?.payment || {
        amount,
        method,
        txnId,
        date: new Date(),
      };

      // ✅ instant update
      setPaymentList((prev) => [newPayment, ...prev]);

      setAmount("");
      setTxnId("");

      refreshApp(); // optional sync
    } catch (err) {
      console.error(err);
    }
  };

  //////////////////////////////////////////////////////
  // ✅ EMI PAYMENT (INSTANT UI)
  //////////////////////////////////////////////////////
  const handleEmiPayment = async (emi, index) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/applications/${app._id}/payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...getAdminHeaders(),
          },
          body: JSON.stringify({
            amount: emi.amount,
            type: "emi",
            method: emiMode,
            txnId: emiMode !== "cash" ? emiTxn : "",
            emiIndex: index,
          }),
        }
      );

      const data = await res.json();

      const newPayment = data?.payment || {
        amount: emi.amount,
        method: emiMode,
        txnId: emiTxn,
        date: new Date(),
        type: "emi",
      };

      // ✅ add payment instantly
      setPaymentList((prev) => [newPayment, ...prev]);

      // ✅ update EMI status instantly
      setEmiList((prev) =>
        prev.map((e, i) =>
          i === index ? { ...e, status: "paid" } : e
        )
      );

      setActiveEmiIndex(null);
      setEmiTxn("");

      refreshApp();
    } catch (err) {
      console.error(err);
    }
  };

  //////////////////////////////////////////////////////
  // ✅ DELETE PAYMENT
  //////////////////////////////////////////////////////
  const handleDeletePayment = async (paymentId) => {
    try {
      await fetch(
        `${API_BASE_URL}/api/applications/${app._id}/payment/${paymentId}`,
        {
          method: "DELETE",
          headers: getAdminHeaders(),
        }
      );

      // ✅ instant UI update
      setPaymentList((prev) =>
        prev.filter((p) => p._id !== paymentId)
      );

      refreshApp();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="premium-modal-overlay">
      <div className="premium-modal-container">
        {/* HEADER */}
        <div className="modal-header">
          <div className="header-info">
            <h3>Fees Summary</h3>
            <p className="subtitle">Manage payments and installments</p>
          </div>
          <button className="close-circle-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <label>Total Fees</label>
            <div className="value">₹{totalFees.toLocaleString()}</div>
          </div>
          <div className="stat-card paid-accent">
            <label>Amount Paid</label>
            <div className="value text-emerald">
              ₹{paidAmount.toLocaleString()}
            </div>
          </div>
          <div className="stat-card due-accent">
            <label>Current Due</label>
            <div className="value text-rose">
              ₹{dueAmount.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="modal-content-split">
          {/* LEFT */}
          <div className="content-left">
            <div className="section-card">
              <h4>Record New Payment</h4>

              <div className="input-group">
                <input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <option value="cash">Cash</option>
                  <option value="upi">UPI</option>
                  <option value="bank">Bank</option>
                </select>
              </div>

              {method !== "cash" && (
                <input
                  className="txn-input"
                  placeholder="Transaction ID"
                  value={txnId}
                  onChange={(e) => setTxnId(e.target.value)}
                />
              )}

              <button
                className="primary-submit-btn"
                onClick={handleAddPayment}
              >
                Confirm Payment
              </button>
            </div>

            {emiList.length > 0 && (
              <div className="section-card">
                <h4>EMI Schedule</h4>

                <div className="emi-list">
                  {emiList.map((emi, i) => {
                    const status = getStatus(emi);

                    return (
                      <div key={i} className="emi-card">
                        <div className="emi-top">
                          <span className="emi-date">
                            {new Date(emi.dueDate).toLocaleDateString("en-GB")}
                          </span>
                          <span className="emi-val">₹{emi.amount}</span>
                          <span className={`emi-status status-${status}`}>
                            {status}
                          </span>
                        </div>

                        {status !== "paid" && (
                          <div className="emi-actions">
                            {activeEmiIndex === i ? (
                              <div className="emi-payment-box">
                                <div className="input-group mini">
                                  <select
                                    value={emiMode}
                                    onChange={(e) =>
                                      setEmiMode(e.target.value)
                                    }
                                  >
                                    <option value="cash">Cash</option>
                                    <option value="upi">UPI</option>
                                    <option value="bank">Bank</option>
                                  </select>

                                  {emiMode !== "cash" && (
                                    <input
                                      placeholder="Txn ID"
                                      value={emiTxn}
                                      onChange={(e) =>
                                        setEmiTxn(e.target.value)
                                      }
                                    />
                                  )}
                                </div>

                                <div className="action-row">
                                  <button
                                    className="confirm-btn"
                                    onClick={() =>
                                      handleEmiPayment(emi, i)
                                    }
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    className="cancel-btn"
                                    onClick={() =>
                                      setActiveEmiIndex(null)
                                    }
                                  >
                                    Cancel
                                  </button>
                                </div>
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

          {/* RIGHT */}
          <div className="content-right">
            <div className="section-card h-full">
              <h4>Transaction History</h4>

              <div className="history-list">
                {paymentList.length === 0 ? (
                  <div className="empty-msg">No transactions yet</div>
                ) : (
                  paymentList.map((p) => (
                    <div key={p._id} className="history-card">
                      <div className="h-top">
                        <span className="h-amt">₹{p.amount}</span>
                        <span className={`tag-${p.method}`}>
                          {p.method}
                        </span>
                      </div>

                      <div className="h-bottom">
                        <span className="h-txn">
                          {p.txnId || "Cash Payment"}
                        </span>
                        <span>
                          {new Date(p.date).toLocaleDateString("en-GB")}
                        </span>
                      </div>

                      {/* ✅ DELETE */}
                      <button
                        className="delete-btn"
                        onClick={() => handleDeletePayment(p._id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="footer-close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeesSummaryModal;
