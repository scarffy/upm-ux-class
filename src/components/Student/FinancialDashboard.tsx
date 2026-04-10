import React from "react";
import Header from "../common/Header";
import "./FinancialDashboard.css";

const FinancialDashboard: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <Header />
      <main className="main-content">
        <div className="content-container">
          <div className="welcome-section">
            <h1>Financial</h1>
            <p className="welcome-subtitle">
              Manage your fees, payments, and financial records
            </p>
          </div>

          <div className="financial-grid">
            <div className="financial-card">
              <div className="financial-icon warning">
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                </svg>
              </div>
              <h3>Outstanding Balance</h3>
              <div className="amount-display">RM 2,450.00</div>
              <p className="amount-label">Due by January 31, 2025</p>
              <button className="btn btn-primary">Pay Now</button>
            </div>

            <div className="financial-card">
              <div className="financial-icon success">
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
              <h3>Total Paid (2024/2025)</h3>
              <div className="amount-display">RM 12,800.00</div>
              <p className="amount-label">Across 4 payments</p>
              <button className="btn btn-secondary">View Receipts</button>
            </div>

            <div className="financial-card">
              <div className="financial-icon primary">
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                </svg>
              </div>
              <h3>MyGraduate Scholarship</h3>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#10B981",
                  marginBottom: "0.25rem",
                }}
              >
                Active
              </div>
              <p className="amount-label">Valid until December 2025</p>
              <button className="btn btn-secondary">View Details</button>
            </div>
          </div>

          <div className="card" style={{ marginTop: "1.5rem" }}>
            <div className="card-header">
              <h3>Semester Fees - 2024/2025 Session 1</h3>
            </div>
            <div className="card-body">
              <table className="fee-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Program Fee (PhD)</td>
                    <td className="amount">RM 1,800.00</td>
                  </tr>
                  <tr>
                    <td>Library Fee</td>
                    <td className="amount">RM 100.00</td>
                  </tr>
                  <tr>
                    <td>Activity &amp; Recreation Fee</td>
                    <td className="amount">RM 150.00</td>
                  </tr>
                  <tr>
                    <td>Health Insurance</td>
                    <td className="amount">RM 250.00</td>
                  </tr>
                  <tr style={{ background: "#f9fafb" }}>
                    <td style={{ fontWeight: 700 }}>Outstanding Balance</td>
                    <td
                      className="amount"
                      style={{ fontWeight: 700, color: "#DC2626" }}
                    >
                      RM 400.00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FinancialDashboard;
