import React, { useState } from 'react';
import { useNotification } from '../../context/NotificationContext';
import './TasksCard.css';

interface Task {
  id: number;
  title: string;
  due: string;
  completed: boolean;
  urgent?: boolean;
  action?: string;
}

export default function TasksCard() {
  const { showNotification } = useNotification();
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Submit final thesis', due: 'Due in 2 days', completed: false, urgent: true, action: 'Start' },
    { id: 2, title: 'Pay semester fees', due: 'Due in 5 days', completed: false, action: 'Pay' },
    { id: 3, title: 'Update supervisor meeting log', due: 'Due in 1 week', completed: false, action: 'Update' },
    { id: 4, title: 'Submit progress report Q1', due: 'Completed yesterday', completed: true },
  ]);

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    
    const task = tasks.find(t => t.id === id);
    if (task && !task.completed) {
      showNotification('Task marked as complete!', 'success');
    }
  };

  const pendingCount = tasks.filter(t => !t.completed).length;

  return (
    <div className="card tasks-card">
      <div className="card-header">
        <h3>Pending Tasks</h3>
        <span className="badge badge-count">{pendingCount}</span>
      </div>

      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''} ${task.urgent ? 'urgent' : ''}`}>
            <div className="task-checkbox">
              <input
                type="checkbox"
                id={`task-${task.id}`}
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <label htmlFor={`task-${task.id}`}></label>
            </div>
            <div className="task-content">
              <p className="task-title">{task.title}</p>
              <p className={`task-due ${task.urgent ? 'urgent-text' : ''}`}>{task.due}</p>
            </div>
            {task.action && !task.completed && (
              <a href="#" className="task-action">{task.action} →</a>
            )}
          </div>
        ))}
      </div>

      <a href="#" className="view-all-btn">View all tasks</a>
    </div>
  );
}
