import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useNotification } from '../../context/NotificationContext';
import Header from '../common/Header';
import {
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  ChevronLeft,
  Download,
  MessageSquare,
  Calendar,
  User,
  ExternalLink
} from 'lucide-react';
import './Reviews.css';

interface ReviewItem {
  id: number;
  title: string;
  type: string;
  from: string;
  studentId: string;
  submitted: string;
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  priority: 'high' | 'medium' | 'low';
  description?: string;
}

const initialReviews: ReviewItem[] = [
  {
    id: 1,
    title: 'Chapter 3 - Methodology',
    type: 'Thesis Chapter',
    from: 'Ahmad Syafiq',
    studentId: 'GS12345',
    submitted: '2 days ago',
    deadline: 'Apr 15, 2026',
    status: 'pending',
    priority: 'high',
    description: 'Please review the methodology chapter focusing on the research design and data collection methods.'
  },
  {
    id: 2,
    title: 'Extension Request Letter',
    type: 'Extension Request',
    from: 'Nurul Ain',
    studentId: 'GS12346',
    submitted: 'yesterday',
    deadline: 'Apr 12, 2026',
    status: 'pending',
    priority: 'high',
    description: 'Student is requesting a 3-month extension due to health reasons. Supporting documents attached.'
  },
  {
    id: 3,
    title: 'Progress Report Q1 2026',
    type: 'Progress Report',
    from: 'Mohd Faizal',
    studentId: 'GS12347',
    submitted: 'today',
    deadline: 'Apr 20, 2026',
    status: 'pending',
    priority: 'medium',
    description: 'Quarterly progress report for Year 4 part-time student.'
  },
  {
    id: 4,
    title: 'Chapter 2 - Literature Review',
    type: 'Thesis Chapter',
    from: 'Siti Fatimah',
    studentId: 'GS12348',
    submitted: '3 days ago',
    deadline: 'Apr 18, 2026',
    status: 'in-progress',
    priority: 'medium',
    description: 'Second draft of literature review chapter. Please provide feedback on the theoretical framework section.'
  },
  {
    id: 5,
    title: 'Conference Paper Submission',
    type: 'Publication',
    from: 'Ahmad Syafiq',
    studentId: 'GS12345',
    submitted: '1 week ago',
    deadline: 'Apr 10, 2026',
    status: 'completed',
    priority: 'low',
    description: 'Paper for ICSE 2026 conference. Already approved for submission.'
  },
];

export default function Reviews() {
  const { user } = useUser();
  const { showNotification } = useNotification();
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || review.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || review.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleApprove = (reviewId: number) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status: 'completed' as const } : r));
    showNotification('Review approved successfully', 'success');
    if (selectedReview?.id === reviewId) {
      setSelectedReview(null);
    }
  };

  const handleReject = (reviewId: number) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status: 'rejected' as const } : r));
    showNotification('Review rejected', 'error');
    if (selectedReview?.id === reviewId) {
      setSelectedReview(null);
    }
  };

  const handleStartReview = (reviewId: number) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status: 'in-progress' as const } : r));
    showNotification('Review started', 'info');
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { class: string; label: string; icon: React.ElementType }> = {
      pending: { class: 'status-pending', label: 'Pending', icon: Clock },
      'in-progress': { class: 'status-progress', label: 'In Progress', icon: FileText },
      completed: { class: 'status-completed', label: 'Approved', icon: CheckCircle },
      rejected: { class: 'status-rejected', label: 'Rejected', icon: XCircle },
    };
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    return (
      <span className={`status-badge ${config.class}`}>
        <Icon size={14} />
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityClass = `priority-${priority}`;
    return <span className={`priority-badge ${priorityClass}`}>{priority.toUpperCase()}</span>;
  };

  return (
    <div className="dashboard-layout">
      <Header />

      <main className="main-content">
        <div className="content-container">
          {/* Header */}
          <div className="reviews-header">
            <div className="reviews-header-left">
              <a href="/supervisor" className="back-link">
                <ChevronLeft size={20} />
                Back to Dashboard
              </a>
              <h1>Document Reviews</h1>
              <p className="welcome-subtitle">Manage and review student submissions</p>
            </div>
            <div className="reviews-stats">
              <div className="stat-item">
                <span className="stat-value">{reviews.filter(r => r.status === 'pending').length}</span>
                <span className="stat-label">Pending</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{reviews.filter(r => r.status === 'in-progress').length}</span>
                <span className="stat-label">In Progress</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{reviews.filter(r => r.status === 'completed').length}</span>
                <span className="stat-label">Completed</span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="reviews-filters">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <Filter size={18} />
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="filter-group">
              <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          </div>

          {/* Reviews List */}
          <div className="reviews-table-container">
            <table className="reviews-table">
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Student</th>
                  <th>Submitted</th>
                  <th>Deadline</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReviews.map((review) => (
                  <tr key={review.id} className={review.status === 'pending' ? 'highlight' : ''}>
                    <td>
                      <div className="review-title-cell">
                        <div className="review-icon">
                          <FileText size={20} />
                        </div>
                        <div>
                          <p className="review-title">{review.title}</p>
                          <span className="review-type">{review.type}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="review-student">
                        <span className="student-name">{review.from}</span>
                        <span className="student-id">{review.studentId}</span>
                      </div>
                    </td>
                    <td>{review.submitted}</td>
                    <td>
                      <span className={`deadline ${review.status === 'pending' && review.priority === 'high' ? 'urgent' : ''}`}>
                        {review.deadline}
                      </span>
                    </td>
                    <td>{getPriorityBadge(review.priority)}</td>
                    <td>{getStatusBadge(review.status)}</td>
                    <td>
                      <div className="review-actions">
                        {review.status === 'pending' && (
                          <>
                            <button
                              className="btn btn-primary btn-small"
                              onClick={() => handleStartReview(review.id)}
                            >
                              Review
                            </button>
                            <button
                              className="btn btn-secondary btn-small"
                              onClick={() => setSelectedReview(review)}
                            >
                              Details
                            </button>
                          </>
                        )}
                        {review.status === 'in-progress' && (
                          <>
                            <button
                              className="btn btn-success btn-small"
                              onClick={() => handleApprove(review.id)}
                            >
                              Approve
                            </button>
                            <button
                              className="btn btn-danger btn-small"
                              onClick={() => handleReject(review.id)}
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {(review.status === 'completed' || review.status === 'rejected') && (
                          <button
                            className="btn btn-secondary btn-small"
                            onClick={() => setSelectedReview(review)}
                          >
                            View
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredReviews.length === 0 && (
              <div className="no-reviews">
                <FileText size={48} />
                <p>No reviews found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Review Detail Modal */}
      {selectedReview && (
        <div className="modal-overlay" onClick={() => setSelectedReview(null)} role="presentation" aria-hidden="true">
          <div className="modal-content review-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="review-modal-title">
            <div className="modal-header">
              <h2 id="review-modal-title">{selectedReview.title}</h2>
              <button className="modal-close" onClick={() => setSelectedReview(null)} aria-label="Close modal">
                ×
              </button>
            </div>
            <div className="review-modal-body">
              <div className="review-modal-info">
                <div className="info-row">
                  <User size={18} />
                  <div>
                    <label>Student</label>
                    <p>{selectedReview.from} ({selectedReview.studentId})</p>
                  </div>
                </div>
                <div className="info-row">
                  <FileText size={18} />
                  <div>
                    <label>Type</label>
                    <p>{selectedReview.type}</p>
                  </div>
                </div>
                <div className="info-row">
                  <Calendar size={18} />
                  <div>
                    <label>Submitted</label>
                    <p>{selectedReview.submitted}</p>
                  </div>
                </div>
                <div className="info-row">
                  <Clock size={18} />
                  <div>
                    <label>Deadline</label>
                    <p className={selectedReview.priority === 'high' ? 'urgent-text' : ''}>{selectedReview.deadline}</p>
                  </div>
                </div>
              </div>

              <div className="review-modal-description">
                <h4>Description</h4>
                <p>{selectedReview.description}</p>
              </div>

              <div className="review-modal-actions">
                <button className="btn btn-secondary">
                  <Download size={18} />
                  Download Document
                </button>
                <button className="btn btn-secondary">
                  <MessageSquare size={18} />
                  Message Student
                </button>
                <button className="btn btn-secondary">
                  <ExternalLink size={18} />
                  Open in New Tab
                </button>
              </div>

              {selectedReview.status === 'pending' && (
                <div className="review-modal-decision">
                  <h4>Decision</h4>
                  <div className="decision-actions">
                    <button
                      className="btn btn-success"
                      onClick={() => handleApprove(selectedReview.id)}
                    >
                      <CheckCircle size={18} />
                      Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleReject(selectedReview.id)}
                    >
                      <XCircle size={18} />
                      Reject
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleStartReview(selectedReview.id)}
                    >
                      <FileText size={18} />
                      Start Review
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
