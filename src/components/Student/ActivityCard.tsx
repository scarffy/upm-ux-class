import React from 'react';
import { CheckCircle, MessageCircle, AlertTriangle, FileText } from 'lucide-react';
import './ActivityCard.css';

interface Activity {
  id: number;
  icon: React.ReactNode;
  iconBg: string;
  text: string;
  time: string;
}

const activities: Activity[] = [
  { 
    id: 1, 
    icon: <CheckCircle size={16} />, 
    iconBg: '#10B981', 
    text: 'Payment confirmed for <strong>Semester Fee</strong>', 
    time: 'Today, 10:30 AM' 
  },
  { 
    id: 2, 
    icon: <MessageCircle size={16} />, 
    iconBg: '#3B82F6', 
    text: 'Supervisor commented on <strong>Thesis Chapter 3</strong>', 
    time: 'Yesterday' 
  },
  { 
    id: 3, 
    icon: <AlertTriangle size={16} />, 
    iconBg: '#F59E0B', 
    text: 'Reminder: <strong>Thesis deadline</strong> approaching', 
    time: '2 days ago' 
  },
  { 
    id: 4, 
    icon: <FileText size={16} />, 
    iconBg: '#10B981', 
    text: 'Submitted <strong>Progress Report Q1</strong>', 
    time: '3 days ago' 
  },
];

export default function ActivityCard() {
  return (
    <div className="card activity-card">
      <div className="card-header">
        <h3>Recent Activity</h3>
      </div>
      <div className="activity-list">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <div 
              className="activity-icon"
              style={{ backgroundColor: activity.iconBg }}
            >
              {activity.icon}
            </div>
            <div className="activity-content">
              <p 
                className="activity-text"
                dangerouslySetInnerHTML={{ __html: activity.text }}
              />
              <p className="activity-time">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
