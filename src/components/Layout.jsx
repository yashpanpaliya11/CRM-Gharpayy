import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

export default function Layout({ children, searchQuery, onSearchChange }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/leads', label: 'All Leads' },
    { path: '/pipeline', label: 'Pipeline' },
    { path: '/add-lead', label: 'Add Lead' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

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

        <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="form-input search-input" 
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          {currentUser && (
            <button onClick={handleLogout} className="btn-secondary" style={{ padding: '8px 12px', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
              Log Out
            </button>
          )}
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
