import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

export default function Layout({ children, searchQuery, onSearchChange }) {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/leads', label: 'All Leads' },
    { path: '/pipeline', label: 'Pipeline' },
    { path: '/add-lead', label: 'Add Lead' },
  ];

  return (
    <div className="layout top-nav-layout">
      <header className="navbar">
        <div className="nav-left">
          <nav className="nav-menu">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path} className={`nav-item ${isActive ? 'active' : ''}`}>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="nav-right">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="form-input search-input" 
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="content-area">
          {children}
        </div>
      </main>
    </div>
  );
}
