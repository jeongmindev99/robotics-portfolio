import React from 'react';
import './ContactSection.css';

function ContactSection() {
  return (
    <section id="contact" className="contact-section section">
      <div className="container">
        <div className="contact-content">
          <div className="section-header">
            <span className="section-number">06</span>
            <h2 className="section-title">Contact</h2>
            <p className="section-subtitle">
              함께 일하고 싶으시다면 연락주세요
            </p>
          </div>
          
          <div className="contact-links">
            <a href="mailto:your.email@example.com" className="contact-link email">
              <div className="link-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className="link-content">
                <span className="link-label">Email</span>
                <span className="link-value">your.email@example.com</span>
              </div>
            </a>
            
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="contact-link github">
              <div className="link-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
              </div>
              <div className="link-content">
                <span className="link-label">GitHub</span>
                <span className="link-value">github.com/yourusername</span>
              </div>
            </a>
            
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="contact-link linkedin">
              <div className="link-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </div>
              <div className="link-content">
                <span className="link-label">LinkedIn</span>
                <span className="link-value">linkedin.com/in/yourusername</span>
              </div>
            </a>
            
            <a href="#" className="contact-link notion">
              <div className="link-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466l1.823 1.447zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.166V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.934zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.22.186c-.094-.187 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933l3.222-.187z"/>
                </svg>
              </div>
              <div className="link-content">
                <span className="link-label">Notion</span>
                <span className="link-value">포트폴리오 상세</span>
              </div>
            </a>
          </div>
        </div>
        
        <footer className="footer">
          <p>© 2025 Jeongmin. Built with React.</p>
        </footer>
      </div>
    </section>
  );
}

export default ContactSection;
