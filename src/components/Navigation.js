import React from 'react';
import './Navigation.css';

const navItems = [
  { id: 'hero', label: 'Home', labelKr: '홈' },
  { id: 'lifecycle', label: 'What I Build', labelKr: '역할' },
  { id: 'projects', label: 'How I Solved', labelKr: '프로젝트' },
  { id: 'deployment', label: 'Where I Deployed', labelKr: '현장' },
  { id: 'growth', label: 'How I Grew', labelKr: '성장' },
  { id: 'learning', label: 'What I\'m Learning', labelKr: '학습' },
  { id: 'contact', label: 'Contact', labelKr: '연락' },
];

function Navigation({ activeSection, onNavigate }) {
  return (
    <nav className="navigation">
      <div className="nav-logo" onClick={() => onNavigate('hero')}>
        <span className="logo-text">JC</span>
        <span className="logo-dot"></span>
      </div>
      
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.id} className="nav-item">
            <button
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="nav-indicator"></span>
              <span className="nav-label">{item.labelKr}</span>
            </button>
          </li>
        ))}
      </ul>
      
      <div className="nav-footer">
        <span className="nav-year">{new Date().getFullYear()}</span>
      </div>
    </nav>
  );
}

export default Navigation;
