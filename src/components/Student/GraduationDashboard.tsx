import React from 'react';
import Header from '../common/Header';
import './GraduationDashboard.css';

const GraduationDashboard: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <Header />
      <main className="main-content">
        <div className="content-container">
          <div className="welcome-section">
            <h1>Graduation</h1>
            <p className="welcome-subtitle">Complete your graduation requirements and ceremony registration</p>
          </div>

          <div className="graduation-progress">
            <div className="progress-step">
              <div className="step-circle completed">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <span className="step-label">Thesis Approved</span>
              <span className="step-status">Jan 15, 2025</span>
            </div>
            <div className="progress-connector completed"></div>
            <div className="progress-step">
              <div className="step-circle completed">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <span className="step-label">Viva Passed</span>
              <span className="step-status">Jan 20, 2025</span>
            </div>
            <div className="progress-connector"></div>
            <div className="progress-step">
              <div className="step-circle active">3</div>
              <span className="step-label">Clearance</span>
              <span className="step-status">In Progress</span>
            </div>
            <div className="progress-connector"></div>
            <div className="progress-step">
              <div className="step-circle pending">4</div>
              <span className="step-label">Convocation</span>
              <span className="step-status">Pending</span>
            </div>
          </div>

          <div className="graduation-grid">
            <div className="graduation-card">
              <div className="graduation-icon primary">
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3>Graduation Application</h3>
              <p>Submit your graduation application form for Senate approval.</p>
              <div className="status-list">
                <div className="status-item">
                  <span className="status-label">Application Status</span>
                  <span className="status-value" style={{ color: '#10B981' }}>Submitted</span>
                </div>
                <div className="status-item">
                  <span className="status-label">Submitted On</span>
                  <span className="status-value">Jan 22, 2025</span>
                </div>
              </div>
              <button className="btn btn-secondary">View Application</button>
            </div>

            <div className="graduation-card">
              <div className="graduation-icon warning">
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3>Clearance Status</h3>
              <p>Clear all departments to proceed with graduation.</p>
              <div className="clearance-list">
                <div className="clearance-item cleared">
                  <div className="clearance-icon cleared">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <div className="clearance-info">
                    <p className="clearance-dept">School of Graduate Studies</p>
                    <p className="clearance-status">Cleared on Jan 23, 2025</p>
                  </div>
                </div>
                <div className="clearance-item pending">
                  <div className="clearance-icon pending">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2z"/>
                    </svg>
                  </div>
                  <div className="clearance-info">
                    <p className="clearance-dept">Bursary</p>
                    <p className="clearance-status">Pending - Outstanding fees</p>
                  </div>
                </div>
              </div>
              <button className="btn btn-primary">Pay Outstanding Fees</button>
            </div>

            <div className="graduation-card">
              <div className="graduation-icon success">
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                </svg>
              </div>
              <h3>Convocation Registration</h3>
              <p>Register for the 47th Convocation Ceremony.</p>
              <div className="convocation-details">
                <div className="detail-item">
                  <div className="detail-value">47th</div>
                  <div className="detail-label">Convocation</div>
                </div>
                <div className="detail-item">
                  <div className="detail-value">Oct</div>
                  <div className="detail-label">2025</div>
                </div>
              </div>
              <button className="btn btn-secondary">Register Now</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GraduationDashboard;
