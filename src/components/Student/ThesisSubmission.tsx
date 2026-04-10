import React from 'react';
import Header from '../common/Header';
import './ThesisSubmission.css';

const ThesisSubmission: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <Header />
      <main className="main-content">
        <div className="content-container">
          <div className="welcome-section">
            <h1>Thesis Submission</h1>
            <p className="welcome-subtitle">Submit your thesis for examination and track the review process</p>
          </div>

          <div className="submission-steps">
            <div className="step">
              <div className="step-circle completed">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <span className="step-label">Upload Thesis</span>
            </div>
            <div className="step-connector completed"></div>
            <div className="step">
              <div className="step-circle completed">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <span className="step-label">Plagiarism Check</span>
            </div>
            <div className="step-connector completed"></div>
            <div className="step">
              <div className="step-circle active">3</div>
              <span className="step-label">Supervisor Review</span>
            </div>
            <div className="step-connector"></div>
            <div className="step">
              <div className="step-circle pending">4</div>
              <span className="step-label">SGS Approval</span>
            </div>
          </div>

          <div className="dashboard-columns">
            <div className="column-left">
              <div className="card">
                <div className="card-header">
                  <h3>Upload Your Thesis</h3>
                  <span className="badge status-in-progress">Step 3 of 4</span>
                </div>
                <div className="card-body">
                  <div className="upload-area">
                    <div className="upload-icon">
                      <svg viewBox="0 0 24 24" width="32" height="32">
                        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
                      </svg>
                    </div>
                    <h3>Drag & Drop your thesis here</h3>
                    <p>or click to browse files (PDF, max 50MB)</p>
                    <button className="btn btn-secondary">Select File</button>
                  </div>

                  <div className="file-list">
                    <div className="file-item">
                      <div className="file-icon">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6z"/>
                        </svg>
                      </div>
                      <div className="file-info">
                        <p className="file-name">Thesis_Final_Draft_v3.pdf</p>
                        <p className="file-meta">28.5 MB • Uploaded on Jan 10, 2025</p>
                      </div>
                      <span className="file-status uploaded">Uploaded</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="column-right">
              <div className="card">
                <div className="card-header">
                  <h3>Submission Guidelines</h3>
                </div>
                <div className="card-body">
                  <div className="guidelines-list">
                    <div className="guideline-item">
                      <div className="guideline-icon">
                        <svg viewBox="0 0 24 24" width="14" height="14">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </div>
                      <p className="guideline-text">Thesis must be in PDF format</p>
                    </div>
                    <div className="guideline-item">
                      <div className="guideline-icon">
                        <svg viewBox="0 0 24 24" width="14" height="14">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </div>
                      <p className="guideline-text">Maximum file size: 50MB</p>
                    </div>
                    <div className="guideline-item">
                      <div className="guideline-icon">
                        <svg viewBox="0 0 24 24" width="14" height="14">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </div>
                      <p className="guideline-text">Include all chapters and references</p>
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

export default ThesisSubmission;
