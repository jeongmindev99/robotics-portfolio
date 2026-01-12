import React from 'react';
import './DeploymentSection.css';

const sites = [
  { id: 1, name: '래미안 원베일리', location: '서울', period: '2024.04', solo: false },
  { id: 2, name: '부산 포터', location: '부산', period: '2024.08', solo: true },
  { id: 3, name: '판교 스타필드', location: '경기', period: '2024.10', solo: false },
  { id: 4, name: '일본 팜코트', location: '일본', period: '2025.07', solo: true },
  { id: 5, name: '일본 사이트 B', location: '일본', period: '2025.08', solo: true },
  { id: 6, name: '국내 사이트 E', location: '서울', period: '2025.10', solo: false },
  { id: 7, name: '국내 사이트 F', location: '경기', period: '2025.11', solo: true },
];

function DeploymentSection() {
  return (
    <section id="deployment" className="deployment-section section">
      <div className="container">
        <div className="section-header">
          <span className="section-number">03</span>
          <h2 className="section-title">Where I Deployed</h2>
          <p className="section-subtitle">
            실제 현장에서 로봇을 세팅하고 운영한 경험
          </p>
        </div>

        <div className="sites-timeline">
          {sites.map((site) => (
            <div key={site.id} className={`site-item ${site.solo ? 'solo' : ''}`}>
              <span className="site-period">{site.period}</span>
              <div className="site-info">
                <span className="site-name">{site.name}</span>
                <span className="site-location">{site.location}</span>
              </div>
              {site.solo && <span className="solo-badge">단독</span>}
            </div>
          ))}
        </div>

        <div className="deployment-summary">
          <span className="summary-item">총 <strong>7</strong>개 사이트</span>
          <span className="summary-divider">·</span>
          <span className="summary-item">단독 세팅 <strong>4</strong>회</span>
          <span className="summary-divider">·</span>
          <span className="summary-item">해외 <strong>2</strong>개</span>
        </div>
      </div>
    </section>
  );
}

export default DeploymentSection;
