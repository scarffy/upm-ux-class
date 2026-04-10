import React from 'react';
import { Upload, DollarSign, Calendar, HelpCircle } from 'lucide-react';
import './QuickActionsCard.css';

interface Props {
  onActionClick: (workflow: string) => void;
}

const actions = [
  { id: 'thesis', icon: Upload, label: 'Submit Thesis' },
  { id: 'payment', icon: DollarSign, label: 'Pay Fees' },
  { id: 'extension', icon: Calendar, label: 'Request Extension' },
  { id: 'support', icon: HelpCircle, label: 'Contact Support' },
];

export default function QuickActionsCard({ onActionClick }: Props) {
  return (
    <div className="card quick-actions-card">
      <div className="card-header">
        <h3>Quick Actions</h3>
      </div>
      <div className="quick-actions-grid">
        {actions.map((action) => (
          <button
            key={action.id}
            className="quick-action"
            onClick={() => onActionClick(action.id)}
          >
            <div className="quick-action-icon">
              <action.icon size={24} />
            </div>
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
