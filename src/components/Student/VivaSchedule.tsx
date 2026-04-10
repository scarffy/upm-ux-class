import React from 'react';
import Header from '../common/Header';
import './VivaSchedule.css';

const VivaSchedule: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <Header />
      <main className="main-content">
        <div className="content-container">
          <div className="welcome-section">
            <h1>Viva Voce Schedule</h1>
            <p className="welcome-subtitle">Your thesis defence examination details and panel information</p>
          </div>

          <div className="viva-card">
            <div className="viva-header">
              <div className="viva-icon">
                <svg viewBox="0 0 24 24" width="32" height="32">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
                </svg>
              </div>
              <div className="viva-title">
                <h2>PhD Viva Voce Examination</h2>
                <p>Viva ID: VIVA-2025-00342</p>
              </div>
              <span className="badge status-in-progress">Scheduled</span>
            </div>

            <div className="viva-details">
              <div className="detail-box">
                <div className="label">Date</div>
                <div className="value">Feb 15, 2025</div>
              </div>
              <div className="detail-box">
                <div className="label">Time</div>
                <div className="value">10:00 AM</div>
              </div>
              <div className="detail-box">
                <div className="label">Duration</div>
                <div className="value">2-3 Hours</div>
              </div>
              <div className="detail-box">
                <div className="label">Mode</div>
                <div className="value">Hybrid</div>
              </div>
            </div>
          </div>

          <div className="dashboard-columns">
            <div className="column-left">
              <div className="countdown-box">
                <h3>Time Until Your Viva</h3>
                <div className="countdown-timer">
                  <div className="countdown-item">
                    <div className="countdown-value">28</div>
                    <div className="countdown-label">Days</div>
                  </div>
                  <div className="countdown-item">
                    <div className="countdown-value">14</div>
                    <div className="countdown-label">Hours</div>
                  </div>
                  <div className="countdown-item">
                    <div className="countdown-value">35</div>
                    <div className="countdown-label">Minutes</div>
                  </div>
                </div>
              </div>

              <div className="card" style={{ marginTop: '1.5rem' }}>
                <div className="card-header">
                  <h3>Examination Panel</h3>
                </div>
                <div className="card-body">
                  <div className="panel-grid">
                    <div className="panel-member">
                      <div className="panel-avatar">PC</div>
                      <div className="panel-info">
                        <p className="panel-name">Prof. Dr. Ahmad Razlan</p>
                        <p className="panel-role">Chairperson</p>
                        <p className="panel-institution">Universiti Putra Malaysia</p>
                      </div>
                    </div>
                    <div className="panel-member">
                      <div className="panel-avatar">EI</div>
                      <div className="panel-info">
                        <p className="panel-name">Prof. Dr. Sarah Lim</p>
                        <p className="panel-role">External Examiner</p>
                        <p className="panel-institution">National University of Singapore</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="column-right">
              <div className="card">
                <div className="card-header">
                  <h3>Preparation Checklist</h3>
                  <span className="badge badge-count">3/6</span>
                </div>
                <div className="card-body">
                  <div className="preparation-list">
                    <div className="prep-item">
                      <div className="prep-checkbox checked">
                        <svg viewBox="0 0 24 24" width="14" height="14">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </div>
                      <span className="prep-text">Confirm attendance 48 hours before</span>
                    </div>
                    <div className="prep-item">
                      <div className="prep-checkbox"></div>
                      <span className="prep-text">Prepare 15-minute presentation</span>
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

export default VivaSchedule;
