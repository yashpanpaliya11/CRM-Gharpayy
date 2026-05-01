import { useState } from 'react';
import LeadDetailsModal from '../components/LeadDetailsModal';
import './Pipeline.css';

export default function Pipeline({ leads, onUpdateLead }) {
  const [selectedLead, setSelectedLead] = useState(null);
  const columns = ['New', 'Contacted', 'Interested', 'Visit Scheduled', 'Closed'];

  // Optional: implement drag and drop later. For now, it just displays in columns.

  return (
    <div className="page-container pipeline-page">
      <div className="page-header">
        <h1 className="page-title">Sales Pipeline</h1>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={() => alert("Pipeline settings coming soon!")}>Settings</button>
        </div>
      </div>

      <div className="kanban-board">
        {columns.map(status => {
          const columnLeads = leads.filter(l => l.status === status);
          
          return (
            <div key={status} className="kanban-column glass-panel">
              <div className="column-header">
                <h3>{status}</h3>
                <span className="lead-count">{columnLeads.length}</span>
              </div>
              
              <div className="column-content">
                {columnLeads.map(lead => (
                  <div key={lead.id} className="kanban-card" onClick={() => setSelectedLead(lead)}>
                    <div className="card-header">
                      <h4>{lead.name}</h4>
                      <div className="lead-avatar-micro">{lead.name.charAt(0)}</div>
                    </div>
                    <div className="card-body">
                      <p className="lead-email">{lead.email}</p>
                      <p className="lead-phone">{lead.phone}</p>
                    </div>
                    <div className="card-footer">
                      <span className="assigned-tag">{lead.assignedTo || 'Unassigned'}</span>
                      {lead.visitDate && (
                        <span className="date-tag">{new Date(lead.visitDate).toLocaleDateString()}</span>
                      )}
                    </div>
                    
                    {/* Quick status move */}
                    <div className="quick-move">
                      <select 
                        className="move-select"
                        value={lead.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          onUpdateLead(lead.id, { status: e.target.value });
                        }}
                      >
                        {columns.map(c => <option key={c} value={c}>Move to {c}</option>)}
                      </select>
                    </div>
                  </div>
                ))}
                {columnLeads.length === 0 && (
                  <div className="empty-column">No leads</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedLead && (
        <LeadDetailsModal 
          lead={selectedLead} 
          onClose={() => setSelectedLead(null)} 
        />
      )}
    </div>
  );
}
