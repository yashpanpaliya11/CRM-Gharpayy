import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import './AddLead.css';

export default function AddLead({ onAddLead }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    status: 'New',
    assignedTo: '',
    visitDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    
    try {
      await onAddLead(formData);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/leads');
      }, 1500);
    } catch (error) {
      console.error("Failed to add lead:", error);
      setErrorMsg(error.message || "Failed to save lead. Please check permissions.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="page-container success-container">
        <div className="success-message glass-panel animate-slide-up">
          <CheckCircle2 size={64} color="var(--success-color)" />
          <h2>Lead Added Successfully!</h2>
          <p>Redirecting to leads list...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container flex-center">
      <div className="form-container glass-panel animate-slide-up">
        <div className="form-header">
          <h2>Capture New Lead</h2>
          <p>Enter the details of the prospective client.</p>
        </div>

        {errorMsg && (
          <div className="error-alert" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.3)', fontSize: '0.9rem' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="lead-form">
          <div className="form-section">
            <h3 className="section-title">Personal Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  className="form-input" 
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

          <div className="form-row split-row">
            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input 
                type="tel" 
                name="phone" 
                className="form-input" 
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                name="email" 
                className="form-input" 
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          </div>

          <div className="form-divider"></div>

          <div className="form-section">
            <h3 className="section-title">Lead Information</h3>
            <div className="form-row split-row">
            <div className="form-group">
              <label className="form-label">Initial Status</label>
              <select 
                name="status" 
                className="form-input" 
                value={formData.status}
                onChange={handleChange}
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Interested">Interested</option>
                <option value="Visit Scheduled">Visit Scheduled</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Assigned To</label>
              <input 
                type="text" 
                name="assignedTo" 
                className="form-input" 
                placeholder="Sales Rep Name"
                value={formData.assignedTo}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Scheduled Visit Date</label>
              <input 
                type="date" 
                name="visitDate" 
                className="form-input date-input"
                value={formData.visitDate}
                onChange={handleChange}
              />
            </div>
          </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => navigate('/leads')}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving Lead...' : 'Save Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
