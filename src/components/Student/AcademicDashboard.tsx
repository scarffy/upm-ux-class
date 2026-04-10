import React from 'react';
import Header from '../common/Header';
import './AcademicDashboard.css';

const AcademicDashboard: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <Header />
      <main className="main-content">
        <div className="content-container">
          <div className="welcome-section">
            <h1>Academic</h1>
            <p className="welcome-subtitle">Manage your academic progress and submissions</p>
          </div>

          <div className="academic-grid">
            <div className="academic-card">
              <div className="academic-icon">
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                </svg>
              </div>
              <h3>Thesis Submission</h3>
              <p>Submit your thesis, track review status, and access examiner reports.</p>
              <div className="status-list">
                <div className="status-item">
                  <span className="status-label">Status</span>
                  <span className="status-value">In Review</span>
                </div>
                <div className="status-item">
                  <span className="status-label">Submitted</span>
                  <span className="status-value">Jan 10, 2025</span>
                </div>
              </div>
              <button className="btn btn-primary">View Details</button>
            </div>

            <div className="academic-card">
              <div className="academic-icon">
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
                </svg>
              </div>
              <h3>Viva Schedule</h3>
              <p>View your viva voce examination schedule and panel information.</p>
              <div className="status-list">
                <div className="status-item">
                  <span className="status-label">Status</span>
                  <span className="status-value">Scheduled</span>
                </div>
                <div className="status-item">
                  <span className="status-label">Date</span>
                  <span className="status-value">Feb 15, 2025</span>
                </div>
              </div>
              <button className="btn btn-primary">View Schedule</button>
            </div>

            <div className="academic-card">
              <div className="academic-icon">
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"/>
                </svg>
              </div>
              <h3>Progress Reports</h3>
              <p>Submit semester progress reports and track supervisor feedback.</p>
              <div className="document-list">
                <div className="document-item">
                  <div className="document-icon">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6z"/>
                    </svg>
                  </div>
                  <div className="document-info">
                    <p className="document-name">Semester 1 2024/2025</p>
                    <p className="document-meta">Submitted on Jan 5, 2025</p>
                  </div>
                </div>
              </div>
              <button className="btn btn-secondary">Submit New Report</button>
            </div>

            <div className="academic-card">
              <div className="academic-icon">
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
              </div>
              <h3>Extensions</h3>
              <p>Apply for thesis submission deadline extensions when needed.</p>
              <div className="status-list">
                <div className="status-item">
                  <span className="status-label">Active Request</span>
                  <span className="status-value">None</span>
                </div>
                <div className="status-item">
                  <span className="status-label">History</span>
                  <span className="status-value">2 Approved</span>
                </div>
              </div>
              <button className="btn btn-secondary">Request Extension</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AcademicDashboard;
