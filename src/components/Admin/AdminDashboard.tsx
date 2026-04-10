import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNotification } from "../../context/NotificationContext";
import Header from "../common/Header";
import {
  Users,
  FileText,
  CheckCircle,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Bell,
  AlertTriangle,
  Clock,
  BarChart3,
  Search,
  Filter,
  Download,
  MoreVertical,
  ChevronRight,
  GraduationCap,
  Building2,
  Mail,
  Phone,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import "./AdminDashboard.css";

const stats = [
  {
    icon: Users,
    label: "Total Students",
    value: "2,845",
    trend: "+12%",
    trendUp: true,
    color: "#7B1F3A",
    subtitle: "Active postgraduate students",
  },
  {
    icon: FileText,
    label: "Pending Applications",
    value: "127",
    trend: "+8%",
    trendUp: true,
    color: "#F59E0B",
    subtitle: "Require admin action",
  },
  {
    icon: CheckCircle,
    label: "Approved This Month",
    value: "456",
    trend: "+23%",
    trendUp: true,
    color: "#10B981",
    subtitle: "Applications processed",
  },
  {
    icon: DollarSign,
    label: "Fees Collected",
    value: "RM 1.2M",
    trend: "-5%",
    trendUp: false,
    color: "#3B82F6",
    subtitle: "Total revenue this month",
  },
];

const quickActions = [
  {
    icon: FileText,
    label: "Review Applications",
    count: 12,
    color: "#F59E0B",
    path: "#applications",
  },
  {
    icon: Bell,
    label: "Send Reminders",
    count: 8,
    color: "#7B1F3A",
    path: "#reminders",
  },
  {
    icon: GraduationCap,
    label: "Process Graduation",
    count: 45,
    color: "#10B981",
    path: "#graduation",
  },
  {
    icon: Building2,
    label: "Department Reports",
    count: 6,
    color: "#3B82F6",
    path: "#reports",
  },
];

const departmentSummary = [
  { name: "Computer Science", students: 456, pending: 23, color: "#7B1F3A" },
  { name: "Engineering", students: 389, pending: 18, color: "#3B82F6" },
  { name: "Biotechnology", students: 234, pending: 12, color: "#10B981" },
  { name: "Business", students: 567, pending: 31, color: "#F59E0B" },
  { name: "Medicine", students: 198, pending: 8, color: "#8B5CF6" },
];

const pendingTasks = [
  {
    id: 1,
    title: "Approve thesis extensions for 5 students",
    priority: "high",
    deadline: "Today, 5:00 PM",
    type: "approval",
  },
  {
    id: 2,
    title: "Review viva committee assignments",
    priority: "medium",
    deadline: "Tomorrow, 10:00 AM",
    type: "review",
  },
  {
    id: 3,
    title: "Process graduation clearance batch",
    priority: "high",
    deadline: "Apr 15, 2026",
    type: "process",
  },
  {
    id: 4,
    title: "Update fee structure for new intake",
    priority: "low",
    deadline: "Apr 20, 2026",
    type: "update",
  },
];

const applications = [
  {
    student: "Ahmad Syafiq",
    id: "GS12345",
    type: "Thesis Submission",
    date: "Apr 8, 2026",
    status: "Payment Pending",
    urgent: true,
  },
  {
    student: "Nurul Ain",
    id: "GS12346",
    type: "Extension Request",
    date: "Apr 7, 2026",
    status: "Supervisor Review",
    urgent: false,
  },
  {
    student: "Mohd Faizal",
    id: "GS12347",
    type: "Graduation Application",
    date: "Apr 6, 2026",
    status: "Clearance Pending",
    urgent: true,
  },
  {
    student: "Siti Fatimah",
    id: "GS12348",
    type: "Thesis Submission",
    date: "Apr 5, 2026",
    status: "Approved",
    urgent: false,
  },
  {
    student: "Wei Ling",
    id: "GS12349",
    type: "Extension Request",
    date: "Apr 4, 2026",
    status: "Pending Review",
    urgent: false,
  },
];

const activities = [
  {
    text: "Approved thesis submission for <strong>Siti Fatimah</strong>",
    time: "Today, 11:30 AM",
    type: "success",
  },
  {
    text: "Requested additional documents from <strong>Nurul Ain</strong>",
    time: "Today, 10:15 AM",
    type: "info",
  },
  {
    text: "Payment received from <strong>Ahmad Syafiq</strong> - RM 850.00",
    time: "Yesterday, 4:45 PM",
    type: "warning",
  },
  {
    text: "Extension approved for <strong>Wei Ling</strong>",
    time: "Yesterday, 2:30 PM",
    type: "success",
  },
];

export default function AdminDashboard() {
  const { user } = useUser();
  const { showNotification } = useNotification();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All Types");
  const [filterStatus, setFilterStatus] = useState("All Status");

  const handleReview = (student: string) => {
    showNotification(`Opening application for ${student}...`, "info");
  };

  const handleQuickAction = (action: string) => {
    showNotification(`Navigating to ${action}...`, "info");
  };

  const getStatusBadgeClass = (status: string, urgent: boolean) => {
    if (urgent) return "status-urgent";
    switch (status) {
      case "Approved":
        return "status-approved";
      case "Payment Pending":
        return "status-payment";
      case "Supervisor Review":
        return "status-review";
      default:
        return "status-pending";
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "All Types" || app.type === filterType;
    const matchesStatus =
      filterStatus === "All Status" || app.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="dashboard-layout admin-layout">
      <Header />

      <main className="main-content">
        <div className="content-container">
          {/* Header Section */}
          <div className="admin-header">
            <div className="admin-header-left">
              <h1>Admin Dashboard</h1>
              <p className="welcome-subtitle">
                Welcome back, {user?.name || "Admin"}. Here's what's happening
                today.
              </p>
            </div>
            <div className="admin-header-actions">
              <button className="btn btn-secondary">
                <Download size={18} />
                Export Report
              </button>
              <button className="btn btn-primary">
                <Bell size={18} />
                <span className="notification-dot"></span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid-admin">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card-admin">
                <div
                  className="stat-icon-admin"
                  style={{ backgroundColor: stat.color }}
                >
                  <stat.icon size={24} color="white" />
                </div>
                <div className="stat-content-admin">
                  <div className="stat-value-row">
                    <span className="stat-value-admin">{stat.value}</span>
                    <span
                      className={`stat-trend-admin ${stat.trendUp ? "up" : "down"}`}
                    >
                      {stat.trendUp ? (
                        <ArrowUpRight size={16} />
                      ) : (
                        <ArrowDownRight size={16} />
                      )}
                      {stat.trend}
                    </span>
                  </div>
                  <div className="stat-label-admin">{stat.label}</div>
                  <div className="stat-subtitle">{stat.subtitle}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="quick-actions-section">
            <h2>Quick Actions</h2>
            <div className="quick-actions-grid">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="quick-action-card-admin"
                  onClick={() => handleQuickAction(action.label)}
                >
                  <div
                    className="quick-action-icon"
                    style={{ backgroundColor: action.color }}
                  >
                    <action.icon size={24} color="white" />
                  </div>
                  <div className="quick-action-content">
                    <span className="quick-action-count">{action.count}</span>
                    <span className="quick-action-label">{action.label}</span>
                  </div>
                  <ChevronRight size={20} className="quick-action-arrow" />
                </button>
              ))}
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="admin-two-column">
            {/* Left Column - Applications */}
            <div className="admin-left-column">
              <div className="card applications-card-admin">
                <div className="card-header-admin">
                  <div className="card-header-left">
                    <h3>Pending Applications</h3>
                    <span className="card-badge">
                      {filteredApplications.length} items
                    </span>
                  </div>
                  <button className="btn btn-secondary btn-sm">
                    <Download size={16} />
                    Export
                  </button>
                </div>

                <div className="filter-bar-admin">
                  <div className="search-input-wrapper">
                    <Search size={16} className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search student or ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option>All Types</option>
                    <option>Thesis Submission</option>
                    <option>Extension Request</option>
                    <option>Graduation Application</option>
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option>All Status</option>
                    <option>Pending Review</option>
                    <option>Supervisor Review</option>
                    <option>Payment Pending</option>
                    <option>Approved</option>
                  </select>
                </div>

                <div className="applications-list">
                  {filteredApplications.length > 0 ? (
                    filteredApplications.map((app, index) => (
                      <div
                        key={index}
                        className={`application-item ${app.urgent ? "urgent" : ""}`}
                      >
                        <div className="application-student">
                          <div className="student-avatar-admin">
                            {app.student
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div className="student-info">
                            <strong>{app.student}</strong>
                            <small>{app.id}</small>
                          </div>
                        </div>
                        <div className="application-type">
                          <FileText size={16} />
                          {app.type}
                        </div>
                        <div className="application-date">
                          <Calendar size={14} />
                          {app.date}
                        </div>
                        <div className="application-status">
                          <span
                            className={getStatusBadgeClass(
                              app.status,
                              app.urgent,
                            )}
                          >
                            {app.urgent && <AlertTriangle size={12} />}
                            {app.status}
                          </span>
                        </div>
                        <div className="application-actions">
                          <button
                            className="btn-review"
                            onClick={() => handleReview(app.student)}
                          >
                            Review
                          </button>
                          <button className="btn-more">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-results">
                      <Search size={48} />
                      <p>No applications found matching your criteria</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Department Summary */}
              <div className="card department-card">
                <div className="card-header-admin">
                  <h3>Department Overview</h3>
                  <button className="btn-text">View All</button>
                </div>
                <div className="department-list">
                  {departmentSummary.map((dept, index) => (
                    <div key={index} className="department-item">
                      <div className="dept-info">
                        <div
                          className="dept-color"
                          style={{ backgroundColor: dept.color }}
                        ></div>
                        <span className="dept-name">{dept.name}</span>
                      </div>
                      <div className="dept-stats">
                        <div className="dept-stat">
                          <Users size={14} />
                          <span>{dept.students}</span>
                        </div>
                        <div className="dept-stat pending">
                          <Clock size={14} />
                          <span>{dept.pending} pending</span>
                        </div>
                      </div>
                      <div className="dept-progress">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${(dept.pending / dept.students) * 100}%`,
                              backgroundColor: dept.color,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Tasks & Activity */}
            <div className="admin-right-column">
              {/* Pending Tasks */}
              <div className="card tasks-card">
                <div className="card-header-admin">
                  <h3>Your Tasks</h3>
                  <span className="task-count">{pendingTasks.length}</span>
                </div>
                <div className="tasks-list">
                  {pendingTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`task-item priority-${task.priority}`}
                    >
                      <div className="task-priority-indicator"></div>
                      <div className="task-content">
                        <p className="task-title">{task.title}</p>
                        <div className="task-meta">
                          <span
                            className={`task-priority-badge ${task.priority}`}
                          >
                            {task.priority}
                          </span>
                          <span className="task-deadline">
                            <Clock size={12} />
                            {task.deadline}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="btn-view-all">View All Tasks</button>
              </div>

              {/* Recent Activity */}
              <div className="card activity-card-admin">
                <div className="card-header-admin">
                  <h3>Recent Activity</h3>
                  <button className="btn-text">View All</button>
                </div>
                <div className="activity-list-admin">
                  {activities.map((activity, index) => (
                    <div key={index} className="activity-item-admin">
                      <div className={`activity-icon-admin ${activity.type}`}>
                        {activity.type === "success" && (
                          <CheckCircle size={16} />
                        )}
                        {activity.type === "info" && <FileText size={16} />}
                        {activity.type === "warning" && (
                          <DollarSign size={16} />
                        )}
                      </div>
                      <div className="activity-content-admin">
                        <p
                          dangerouslySetInnerHTML={{ __html: activity.text }}
                        />
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Status */}
              <div className="card system-card">
                <div className="card-header-admin">
                  <h3>System Status</h3>
                  <span className="status-indicator online">Operational</span>
                </div>
                <div className="system-stats">
                  <div className="system-stat">
                    <BarChart3 size={20} />
                    <div>
                      <span className="system-value">99.9%</span>
                      <span className="system-label">Uptime</span>
                    </div>
                  </div>
                  <div className="system-stat">
                    <Users size={20} />
                    <div>
                      <span className="system-value">156</span>
                      <span className="system-label">Active Now</span>
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
}
