import { TrendingUp } from "lucide-react";
import "./Dashboard.css";

export default function Dashboard({ leads }) {
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const closedLeads = leads.filter((l) => l.status === "Closed").length;
  const upcomingVisits = leads.filter(
    (l) => new Date(l.visitDate) >= new Date(),
  ).length;

  const stats = [
    { title: "Total Leads", value: totalLeads },
    { title: "New Leads", value: newLeads },
    { title: "Closed Deals", value: closedLeads },
    { title: "Upcoming Visits", value: upcomingVisits },
  ];

  const recentLeads = [...leads].reverse().slice(0, 5);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Dashboard Overview</h1>
      </div>

      <div className="stats-grid">
        {stats.map((stat, idx) => {
          return (
            <div key={idx} className="stat-card glass-panel">
              <div className="stat-details">
                <span className="stat-value">{stat.value}</span>
                <p className="stat-title">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-content">
        <div className="recent-leads-section glass-panel">
          <h3>Recent Leads</h3>
          <div className="recent-leads-list">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="recent-lead-item">
                <div className="lead-main-info">
                  <span className="lead-name">{lead.name}</span>
                  <span className="lead-email">{lead.email}</span>
                </div>
                <div
                  className={`status-badge status-${lead.status.toLowerCase().replace(" ", "-")}`}
                >
                  {lead.status}
                </div>
              </div>
            ))}
            {recentLeads.length === 0 && (
              <p className="no-data">No leads available.</p>
            )}
          </div>
        </div>

        <div className="leads-chart-placeholder glass-panel">
          <h3>Conversion Overview</h3>
          <div className="chart-empty-state">
            <TrendingUp size={48} color="var(--text-secondary)" opacity={0.5} />
            <p>Connect to Firebase to view analytics data</p>
          </div>
        </div>
      </div>
    </div>
  );
}
