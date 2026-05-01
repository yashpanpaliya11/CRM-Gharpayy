import { useState } from 'react';
import LeadDetailsModal from '../components/LeadDetailsModal';
import './LeadsList.css';

export default function LeadsList({ leads, onUpdateLead, onDeleteLead }) {
  const [selectedLead, setSelectedLead] = useState(null);
  const statuses = ['New', 'Contacted', 'Interested', 'Visit Scheduled', 'Closed'];

  const handleExport = () => {
    const headers = "Name,Phone,Email,Status,Assigned To,Visit Date\n";
    const csvContent = "data:text/csv;charset=utf-8," + headers + leads.map(l => 
      `${l.name || ''},${l.phone || ''},${l.email || ''},${l.status || ''},${l.assignedTo || ''},${l.visitDate || ''}`
    ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "leads_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">All Leads</h1>
        <div className="header-actions" style={{display: 'flex', gap: '1rem'}}>
          <button className="btn btn-secondary" onClick={handleExport}>Export CSV</button>
        </div>
      </div>

      <div className="table-container glass-panel">
        <table className="leads-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Visit Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <tr key={lead.id}>
                <td>
                  <div className="td-name">
                    <div className="lead-avatar-small">{lead.name.charAt(0)}</div>
                    <div>
                      <div className="td-title">{lead.name}</div>
                      <div className="td-subtitle">{lead.email}</div>
                    </div>
                  </div>
                </td>
                <td>{lead.phone}</td>
                <td>
                  <select 
                    className={`status-select status-${lead.status.toLowerCase().replace(' ', '-')}`}
                    value={lead.status}
                    onChange={(e) => onUpdateLead(lead.id, { status: e.target.value })}
                  >
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td>
                  <input 
                    type="text" 
                    className="editable-input" 
                    value={lead.assignedTo}
                    onChange={(e) => onUpdateLead(lead.id, { assignedTo: e.target.value })}
                    placeholder="Unassigned"
                  />
                </td>
                <td>
                  <input 
                    type="date" 
                    className="editable-input"
                    value={lead.visitDate}
                    onChange={(e) => onUpdateLead(lead.id, { visitDate: e.target.value })}
                  />
                </td>
                <td>
                  <div className="actions-cell">
                    <button className="action-btn" title="View Details" onClick={() => setSelectedLead(lead)}>View</button>
                    <button className="action-btn text-danger" onClick={() => onDeleteLead(lead.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads.length === 0 && (
          <div className="empty-state">
            <p>No leads found. Add some leads to get started.</p>
          </div>
        )}
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
