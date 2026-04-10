import React from "react";
import { Check } from "lucide-react";
import "./ProgressCard.css";

export default function ProgressCard() {
  const progress = 75;
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (progress / 100) * circumference;

  const stages = [
    { name: "Coursework", status: "completed" },
    { name: "Proposal Defense", status: "completed" },
    { name: "Thesis Writing", status: "in-progress" },
    { name: "Viva Voce", status: "pending" },
  ];

  // Get status text for screen readers
  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress - Current Stage";
      case "pending":
        return "Pending";
      default:
        return status;
    }
  };

  return (
    <div className="card progress-card">
      <div className="card-header">
        <h3 id="progress-heading">Degree Progress</h3>
        <span
          className="badge status-in-progress"
          aria-label="Degree status: In Progress"
        >
          In Progress
        </span>
      </div>

      {/* Screen reader accessible description */}
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        Your degree is {progress}% complete.
        {stages.filter((s) => s.status === "completed").length} of{" "}
        {stages.length} stages completed. Current stage:{" "}
        {stages.find((s) => s.status === "in-progress")?.name}.
      </div>

      <div
        className="progress-ring-container"
        aria-labelledby="progress-heading"
      >
        <div
          className="progress-ring"
          role="img"
          aria-label={`Circular progress indicator showing ${progress}% complete`}
        >
          <svg
            viewBox="0 0 120 120"
            className="progress-ring-svg"
            aria-hidden="true"
          >
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#7B1F3A"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 1s ease" }}
              role="presentation"
            />
          </svg>
          <div className="progress-text" aria-hidden="true">
            <span className="progress-percent">{progress}%</span>
            <span className="progress-label">Complete</span>
          </div>
        </div>
      </div>

      <div className="progress-details" role="list" aria-label="Degree stages">
        {stages.map((stage, index) => (
          <div
            key={index}
            className="progress-item"
            role="listitem"
            aria-label={`${stage.name}: ${getStatusText(stage.status)}`}
          >
            <span className={`progress-stage ${stage.status}`}>
              {stage.name}
            </span>
            {stage.status === "completed" ? (
              <Check size={16} className="check-icon" aria-hidden="true" />
            ) : (
              <span
                className="stage-status"
                aria-label={getStatusText(stage.status)}
              >
                {stage.status === "in-progress" ? "Current" : "Pending"}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
