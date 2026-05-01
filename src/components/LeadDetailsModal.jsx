import { X, UserPlus, Phone, Lightbulb, Calendar, User, Clock } from 'lucide-react';
import './LeadDetailsModal.css';

export default function LeadDetailsModal({ lead, onClose }) {
  if (!lead) return null;

  const timeline = lead.timeline || [];

  const getActionIcon = (action) => {
    if (action.includes('Created')) return <UserPlus size={16} color="#10b981" />;
    if (action.includes('Contacted')) return <Phone size={16} color="#fbbf24" />;
    if (action.includes('Interested')) return <Lightbulb size={16} color="#34d399" />;
    if (action.includes('Visit')) return <Calendar size={16} color="#c084fc" />;
    if (action.includes('Assigned')) return <User size={16} color="#6366f1" />;
    return <Clock size={16} color="#949ab0" />;
  };

  const getActionColor = (action) => {
    if (action.includes('Created')) return 'bg-success-light';
    if (action.includes('Contacted')) return 'bg-warning-light';
    if (action.includes('Interested')) return 'bg-success-light';
    if (action.includes('Visit')) return 'bg-purple-light';
    if (action.includes('Assigned')) return 'bg-accent-light';
    return 'bg-secondary-light';
  };

  // Sort timeline newest first
  const sortedTimeline = [...timeline].sort((a, b) => new Date(b.time) - new Date(a.time));

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content glass-panel animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <div className="lead-avatar-large">{lead.name.charAt(0)}</div>
          <div className="lead-header-info">
            <h2>{lead.name}</h2>
            <div className={`status-badge status-${lead.status.toLowerCase().replace(' ', '-')}`}>
              {lead.status}
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="lead-details-card glass-panel">
            <h3>Contact Information</h3>
            <div className="detail-row">
              <span className="detail-label">Phone:</span>
              <span className="detail-value">{lead.phone}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{lead.email || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Assigned To:</span>
              <span className="detail-value">{lead.assignedTo || 'Unassigned'}</span>
            </div>
            {lead.visitDate && (
              <div className="detail-row">
                <span className="detail-label">Visit Date:</span>
                <span className="detail-value">{new Date(lead.visitDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          <div className="activity-timeline-section">
            <h3>Activity Timeline</h3>
            {sortedTimeline.length === 0 ? (
              <p className="no-timeline">No activity recorded yet.</p>
            ) : (
              <div className="timeline-container">
                {sortedTimeline.map((event, index) => (
                  <div key={index} className="timeline-item">
                    {/* Don't show line for the very last item */}
                    {index !== sortedTimeline.length - 1 && <div className="timeline-line"></div>}
                    <div className={`timeline-icon ${getActionColor(event.action)}`}>
                      {getActionIcon(event.action)}
                    </div>
                    <div className="timeline-content">
                      <p className="timeline-action">{event.action}</p>
                      <span className="timeline-time">{formatTime(event.time)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
