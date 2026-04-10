import React from "react";
import { useUser } from "../../context/UserContext";
import { useNotification } from "../../context/NotificationContext";
import { Link } from "react-router-dom";
import Header from "../common/Header";
import {
  Users,
  Calendar,
  ClipboardList,
  CheckCircle,
  MessageCircle,
  FileText,
  Video,
  Clock,
} from "lucide-react";
import "./SupervisorDashboard.css";

const overviewStats = [
  { icon: Users, label: "My Students", value: "8", color: "#7B1F3A" },
  {
    icon: ClipboardList,
    label: "Pending Reviews",
    value: "3",
    color: "#F59E0B",
  },
  { icon: Calendar, label: "Upcoming Meetings", value: "5", color: "#10B981" },
];

const students = [
  {
    name: "Ahmad Syafiq",
    id: "GS12345",
    program: "PhD Computer Science",
    year: "Year 3",
    type: "Full-time",
    progress: 75,
  },
  {
    name: "Nurul Ain",
    id: "GS12346",
    program: "PhD Biotechnology",
    year: "Year 2",
    type: "Full-time",
    progress: 45,
  },
  {
    name: "Mohd Faizal",
    id: "GS12347",
    program: "PhD Engineering",
    year: "Year 4",
    type: "Part-time",
    progress: 90,
  },
];

const meetings = [
  {
    day: "10",
    month: "APR",
    title: "Thesis Review - Ahmad Syafiq",
    time: "2:00 PM • Online (Zoom)",
    type: "online",
  },
  {
    day: "12",
    month: "APR",
    title: "Progress Review - Nurul Ain",
    time: "10:00 AM • SGS Meeting Room",
    type: "in-person",
  },
  {
    day: "15",
    month: "APR",
    title: "Viva Preparation - Mohd Faizal",
    time: "3:00 PM • Online (Teams)",
    type: "online",
  },
];

const pendingReviews = [
  {
    title: "Chapter 3 - Methodology",
    from: "Ahmad Syafiq",
    submitted: "2 days ago",
  },
  {
    title: "Extension Request Letter",
    from: "Nurul Ain",
    submitted: "yesterday",
  },
  { title: "Progress Report Q1 2026", from: "Mohd Faizal", submitted: "today" },
];

export default function SupervisorDashboard() {
  const { user } = useUser();
  const { showNotification } = useNotification();

  const handleReview = (doc: string) => {
    showNotification(`Opening ${doc} for review...`, "info");
  };

  const handleStudentAction = (action: string, student: string) => {
    showNotification(`${action} - ${student}`, "info");
  };

  return (
    <div className="dashboard-layout">
      <Header />

      <main className="main-content">
        <div className="content-container">
          <div className="welcome-section">
            <h1>Supervisor Dashboard</h1>
            <p className="welcome-subtitle">
              Manage your postgraduate students and track their progress
            </p>
          </div>

          {/* Overview Stats */}
          <div className="overview-grid">
            {overviewStats.map((stat, index) => (
              <div key={index} className="overview-card">
                <div
                  className="overview-icon"
                  style={{ backgroundColor: stat.color }}
                >
                  <stat.icon size={28} color="white" />
                </div>
                <div className="overview-content">
                  <h4>{stat.value}</h4>
                  <p>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Students Grid */}
          <div className="section-container">
            <h2 className="section-title">My Students</h2>
            <div className="students-grid">
              {students.map((student, index) => (
                <div key={index} className="student-card-supervisor">
                  <div className="student-header-supervisor">
                    <div className="student-avatar-supervisor">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="student-info-supervisor">
                      <h4>{student.name}</h4>
                      <p>
                        {student.id} • {student.program}
                      </p>
                      <span className="student-program-tag">
                        {student.year} • {student.type}
                      </span>
                    </div>
                  </div>
                  <div className="student-progress-supervisor">
                    <div className="progress-header-supervisor">
                      <span>Thesis Progress</span>
                      <span className="progress-value-supervisor">
                        {student.progress}%
                      </span>
                    </div>
                    <div className="progress-bar-supervisor">
                      <div
                        className="progress-fill-supervisor"
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="student-actions-supervisor">
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleStudentAction("View Profile", student.name)
                      }
                    >
                      View Profile
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() =>
                        handleStudentAction("Message", student.name)
                      }
                    >
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="two-column-layout">
            {/* Upcoming Meetings */}
            <div className="card">
              <div className="card-header">
                <h3>Upcoming Meetings</h3>
                <button className="btn btn-secondary">Schedule New</button>
              </div>
              <div className="meetings-list-supervisor">
                {meetings.map((meeting, index) => (
                  <div key={index} className="meeting-item-supervisor">
                    <div className="meeting-date-supervisor">
                      <span className="day">{meeting.day}</span>
                      <span className="month">{meeting.month}</span>
                    </div>
                    <div className="meeting-details-supervisor">
                      <h5>{meeting.title}</h5>
                      <p>{meeting.time}</p>
                    </div>
                    <div className="meeting-actions-supervisor">
                      <button
                        className="icon-btn-supervisor"
                        title="Join Meeting"
                      >
                        {meeting.type === "online" ? (
                          <Video size={16} />
                        ) : (
                          <Users size={16} />
                        )}
                      </button>
                      <button
                        className="icon-btn-supervisor"
                        title="Reschedule"
                      >
                        <Clock size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Reviews */}
            <div className="card">
              <div className="card-header">
                <h3>Pending Reviews</h3>
                <Link to="/supervisor/reviews" className="view-all-link">
                  View All
                </Link>
              </div>
              <div className="reviews-list-supervisor">
                {pendingReviews.map((review, index) => (
                  <div key={index} className="review-item-supervisor">
                    <div className="review-left">
                      <div className="review-icon-supervisor">
                        <FileText size={20} />
                      </div>
                      <div className="review-info-supervisor">
                        <p className="review-title">{review.title}</p>
                        <span className="review-meta">
                          From {review.from} • Submitted {review.submitted}
                        </span>
                      </div>
                    </div>
                    <button
                      className="btn btn-primary btn-small"
                      onClick={() => handleReview(review.title)}
                    >
                      Review
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
