import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNotification } from "../../context/NotificationContext";
import Header from "../common/Header";
import WorkflowModal from "./WorkflowModal";
import ProgressCard from "./ProgressCard";
import TasksCard from "./TasksCard";
import QuickActionsCard from "./QuickActionsCard";
import DeadlinesCard from "./DeadlinesCard";
import ActivityCard from "./ActivityCard";
import { AlertCircle, X } from "lucide-react";
import "./StudentDashboard.css";

export default function StudentDashboard() {
  const { user } = useUser();
  const { showNotification } = useNotification();
  const [showAlert, setShowAlert] = useState(true);
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null);

  const handleWorkflowStart = (workflow: string) => {
    setActiveWorkflow(workflow);
  };

  return (
    <div className="dashboard-layout">
      {/* Skip to content link for keyboard users */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <Header />

      <main id="main-content" className="main-content" tabIndex={-1}>
        <div className="content-container">
          {/* Welcome */}
          <div className="welcome-section">
            <h1>Welcome back, {user?.name?.split(" ")[0] || "Student"}</h1>
            <p className="welcome-subtitle">
              Here's your academic progress overview
            </p>
          </div>

          {/* Alert Banner */}
          {showAlert && (
            <div className="alert-banner">
              <div className="alert-content">
                <div className="alert-icon">
                  <AlertCircle size={24} />
                </div>
                <div className="alert-text">
                  <strong>Action Required:</strong> Your thesis submission
                  deadline is in 2 days. <a href="#">Complete now →</a>
                </div>
                <button
                  className="alert-close"
                  onClick={() => setShowAlert(false)}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Dashboard Grid */}
          <div className="dashboard-grid">
            {/* Progress Card */}
            <div className="col-span-6">
              <ProgressCard />
            </div>

            {/* Tasks Card */}
            <div className="col-span-6">
              <TasksCard />
            </div>

            {/* Quick Actions */}
            <div className="col-span-4">
              <QuickActionsCard onActionClick={handleWorkflowStart} />
            </div>

            {/* Deadlines */}
            <div className="col-span-4">
              <DeadlinesCard />
            </div>

            {/* Recent Activity */}
            <div className="col-span-4">
              <ActivityCard />
            </div>
          </div>

          {/* Workflow Section */}
          <div className="workflow-section">
            <div className="section-header">
              <h2 id="workflow-heading">Common Tasks</h2>
              <p>
                Step-by-step guides to help you complete important procedures
              </p>
            </div>
            <div
              className="workflow-cards"
              role="list"
              aria-labelledby="workflow-heading"
            >
              <button
                className="workflow-card"
                onClick={() => handleWorkflowStart("thesis")}
                role="listitem"
                aria-label="Start Thesis Submission workflow"
              >
                <div className="workflow-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    width="32"
                    height="32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <h3>Thesis Submission</h3>
                <p>Submit your thesis with step-by-step guidance</p>
                <span className="btn btn-secondary">Start Process</span>
              </button>

              <button
                className="workflow-card"
                onClick={() => handleWorkflowStart("payment")}
                role="listitem"
                aria-label="Start Fee Payment workflow"
              >
                <div className="workflow-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    width="32"
                    height="32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="6" x2="12" y2="12" />
                    <line x1="12" y1="12" x2="16" y2="16" />
                  </svg>
                </div>
                <h3>Fee Payment</h3>
                <p>Pay semester fees and download receipts</p>
                <span className="btn btn-secondary">Pay Now</span>
              </button>

              <button
                className="workflow-card"
                onClick={() => handleWorkflowStart("extension")}
                role="listitem"
                aria-label="Start Extension Request workflow"
              >
                <div className="workflow-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    width="32"
                    height="32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <h3>Extension Request</h3>
                <p>Request deadline extensions when needed</p>
                <span className="btn btn-secondary">Request</span>
              </button>

              <button
                className="workflow-card"
                onClick={() => handleWorkflowStart("graduation")}
                role="listitem"
                aria-label="Start Graduation Application workflow"
              >
                <div className="workflow-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    width="32"
                    height="32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <h3>Graduation Application</h3>
                <p>Apply for graduation and track clearance</p>
                <span className="btn btn-secondary">Apply</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Workflow Modal */}
      {activeWorkflow && (
        <WorkflowModal
          workflow={activeWorkflow}
          onClose={() => setActiveWorkflow(null)}
        />
      )}
    </div>
  );
}
