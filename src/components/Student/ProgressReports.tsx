import React from 'react';
import Header from '../common/Header';
import './ProgressReports.css';

const ProgressReports: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <Header />
      <main className="main-content">
        <div className="content-container">
          <div className="welcome-section">
            <h1>Progress Reports</h1>
            <p className="welcome-subtitle">Submit semester progress reports and track supervisor feedback</p>
          </div>

          <div className="deadline-alert">
            <div className="deadline-icon">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
              </svg>
            </div>
            <div className="deadline-content">
              <h4>Current Semester Deadline: January 31, 2025</h4>
              <p>14 days remaining to submit your Semester 1 2024/2025 progress report</p>
            </div>
          </div>

          <div className="semester-tabs">
            <button className="semester-tab active">2024/2025 S1</button>
            <button className="semester-tab">2023/2024 S2</button>
            <button className="semester-tab">2023/2024 S1</button>
          </div>

          <div className="report-status-card">
            <div className="status-metric">
              <div className="value">85%</div>
              <div className="label">Progress</div>
            </div>
            <div className="status-metric">
              <div className="value">8/10</div>
              <div className="label">Chapters</div>
            </div>
            <div className="status-metric">
              <div className="value">3</div>
              <div className="label">Publications</div>
            </div>
            <div className="status-metric">
              <div className="value">2</div>
              <div className="label">Conferences</div>
            </div>
          </div>

          <div className="dashboard-columns">
            <div className="column-left">
              <div className="submit-report-card">
                <h3>Submit Progress Report</h3>
                <p>Upload your semester progress report in PDF format.</p>
                <button className="btn" style={{ backgroundColor: 'white', color: '#7B1F3A', fontWeight: 600 }}>
                  Submit Report
                </button>
              </div>
            </div>

            <div className="column-right">
              <div className="card">
                <div className="card-header">
                  <h3>Report History</h3>
                </div>
                <div className="card-body">
                  <div className="report-timeline">
                    <div className="timeline-item">
                      <div className="timeline-header">
                        <div>
                          <p className="timeline-title">Semester 1 2024/2025</p>
                          <p className="timeline-date">Submitted on Jan 5, 2025</p>
                        </div>
                        <span className="badge status-completed">Approved</span>
                      </div>
                      <div className="timeline-content">
                        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.75rem' }}>
                          Completed data collection and analysis for Chapter 5-6
                        </p>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProgressReports;
