import React from 'react';
import './DeadlinesCard.css';

interface Deadline {
  day: string;
  month: string;
  title: string;
  time: string;
  daysRemaining: string;
  urgent?: boolean;
}

const deadlines: Deadline[] = [
  { day: '12', month: 'APR', title: 'Thesis Submission Deadline', time: '11:59 PM', daysRemaining: '2 days', urgent: true },
  { day: '15', month: 'APR', title: 'Semester Fee Payment', time: '5:00 PM', daysRemaining: '5 days' },
  { day: '22', month: 'APR', title: 'Supervisor Meeting', time: '2:00 PM', daysRemaining: '12 days' },
  { day: '30', month: 'APR', title: 'Progress Report Due', time: '11:59 PM', daysRemaining: '20 days' },
];

export default function DeadlinesCard() {
  return (
    <div className="card deadlines-card">
      <div className="card-header">
        <h3>Upcoming Deadlines</h3>
        <a href="#" className="view-calendar">Full Calendar →</a>
      </div>
      <div className="deadline-list">
        {deadlines.map((deadline, index) => (
          <div key={index} className="deadline-item">
            <div className="deadline-date">
              <span className="day">{deadline.day}</span>
              <span className="month">{deadline.month}</span>
            </div>
            <div className="deadline-info">
              <p className="deadline-title">{deadline.title}</p>
              <p className="deadline-time">{deadline.time}</p>
            </div>
            <span className={`deadline-badge ${deadline.urgent ? 'urgent' : ''}`}>
              {deadline.daysRemaining}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
