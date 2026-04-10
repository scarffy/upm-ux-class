import React, { useState, useEffect, useRef } from "react";
import { X, Check, ArrowRight } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";
import "./WorkflowModal.css";

interface Props {
  workflow: string;
  onClose: () => void;
}

interface WorkflowStep {
  title: string;
  description: string;
  actions: { label: string; type: "primary" | "secondary" }[];
}

const workflows: Record<string, { title: string; steps: WorkflowStep[] }> = {
  thesis: {
    title: "Thesis Submission",
    steps: [
      {
        title: "Prepare Documents",
        description:
          "Ensure your thesis is formatted according to UPM guidelines",
        actions: [
          { label: "Download Template", type: "secondary" },
          { label: "Continue", type: "primary" },
        ],
      },
      {
        title: "Supervisor Approval",
        description: "Get your supervisor to review and approve your thesis",
        actions: [{ label: "Request Review", type: "primary" }],
      },
      {
        title: "Upload Thesis",
        description: "Submit your final thesis document to the portal",
        actions: [{ label: "Upload Document", type: "primary" }],
      },
      {
        title: "Payment",
        description: "Pay the thesis submission fee",
        actions: [{ label: "Pay Now", type: "primary" }],
      },
      {
        title: "Confirmation",
        description: "Receive confirmation of your submission",
        actions: [{ label: "Finish", type: "primary" }],
      },
    ],
  },
  payment: {
    title: "Fee Payment",
    steps: [
      {
        title: "Select Fee Type",
        description: "Choose the type of fee you want to pay",
        actions: [
          { label: "Semester Fee", type: "primary" },
          { label: "Thesis Fee", type: "secondary" },
        ],
      },
      {
        title: "Review Amount",
        description: "Verify the payment amount and details",
        actions: [{ label: "Continue to Payment", type: "primary" }],
      },
      {
        title: "Make Payment",
        description: "Complete payment using your preferred method",
        actions: [{ label: "Pay with FPX", type: "primary" }],
      },
      {
        title: "Download Receipt",
        description: "Get your payment receipt for records",
        actions: [{ label: "Download", type: "primary" }],
      },
    ],
  },
  extension: {
    title: "Extension Request",
    steps: [
      {
        title: "Check Eligibility",
        description: "Review extension policies and requirements",
        actions: [{ label: "Continue", type: "primary" }],
      },
      {
        title: "Fill Application",
        description: "Complete the extension request form",
        actions: [{ label: "Start Form", type: "primary" }],
      },
      {
        title: "Supervisor Endorsement",
        description: "Get your supervisor to endorse your request",
        actions: [{ label: "Send Request", type: "primary" }],
      },
      {
        title: "Submit to SGS",
        description: "Submit your completed application to SGS",
        actions: [{ label: "Submit", type: "primary" }],
      },
      {
        title: "Await Decision",
        description: "Track your application status",
        actions: [{ label: "Finish", type: "primary" }],
      },
    ],
  },
  graduation: {
    title: "Graduation Application",
    steps: [
      {
        title: "Check Requirements",
        description: "Verify you meet all graduation requirements",
        actions: [{ label: "Continue", type: "primary" }],
      },
      {
        title: "Clearance",
        description: "Complete all departmental clearances",
        actions: [
          { label: "View Checklist", type: "secondary" },
          { label: "Continue", type: "primary" },
        ],
      },
      {
        title: "Submit Application",
        description: "Submit your graduation application",
        actions: [{ label: "Apply Now", type: "primary" }],
      },
      {
        title: "Convocation",
        description: "Register for convocation ceremony",
        actions: [{ label: "Register", type: "primary" }],
      },
    ],
  },
};

export default function WorkflowModal({ workflow, onClose }: Props) {
  const { showNotification } = useNotification();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<Element | null>(null);

  const workflowData = workflows[workflow] || workflows["thesis"];

  // Store the previously focused element and focus the close button on mount
  useEffect(() => {
    previousActiveElement.current = document.activeElement;
    closeButtonRef.current?.focus();

    // Prevent body scroll
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      // Restore focus when modal closes
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    };
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
      // Trap focus within modal
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleAction = () => {
    if (currentStep < workflowData.steps.length - 1) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
      showNotification(`Step ${currentStep + 1} completed!`, "success");
    } else {
      showNotification(`${workflowData.title} completed!`, "success");
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="presentation"
      aria-hidden="true"
    >
      <div
        ref={modalRef}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="modal-header">
          <h2 id="modal-title">{workflowData.title}</h2>
          <button
            ref={closeButtonRef}
            className="modal-close"
            onClick={onClose}
            aria-label="Close workflow modal"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>
        <p id="modal-description" className="sr-only">
          Step {currentStep + 1} of {workflowData.steps.length}:{" "}
          {workflowData.steps[currentStep].title}. Use Tab to navigate between
          buttons. Press Escape to close.
        </p>
        <div className="modal-body">
          <div className="workflow-steps">
            {workflowData.steps.map((step, index) => (
              <div
                key={index}
                className={`workflow-step ${
                  index === currentStep ? "active" : ""
                } ${completedSteps.includes(index) ? "completed" : ""} ${
                  index < currentStep ? "past" : ""
                }`}
                aria-current={index === currentStep ? "step" : undefined}
              >
                <div className="step-indicator" aria-hidden="true">
                  <div className="step-number">
                    {completedSteps.includes(index) ? (
                      <Check size={16} />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < workflowData.steps.length - 1 && (
                    <div className="step-line" />
                  )}
                </div>
                <div className="step-content">
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                  {index === currentStep && (
                    <div
                      className="step-actions"
                      role="group"
                      aria-label="Available actions"
                    >
                      {step.actions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          className={`btn ${
                            action.type === "primary"
                              ? "btn-primary"
                              : "btn-secondary"
                          }`}
                          onClick={handleAction}
                          aria-label={action.label}
                        >
                          {action.label}
                          {action.type === "primary" && (
                            <ArrowRight size={16} aria-hidden="true" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
