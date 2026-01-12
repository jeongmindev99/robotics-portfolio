import React from 'react';
import './DeploymentSection.css';

const sites = [
  {
    id: 1,
    name: '래미안 원베일리',
    location: '서울',
    type: '아파트 배송',
    period: '2024.04',
    role: '세팅 보조',
    highlight: false,
  },
  {
    id: 2,
    name: '부산 포터',
    location: '부산',
    type: '물류 배송',
    period: '2024.08',
    role: '단독 세팅',
    highlight: true,
  },
  {
    id: 3,
    name: '판교 스타필드',
    location: '경기',
    type: '쇼핑몰 배송',
    period: '2024.10',
    role: '세팅 지원',
    highlight: false,
  },
  {
    id: 4,
    name: '일본 팜코트',
    location: '일본 🇯🇵',
    type: '물류 배송',
    period: '2025.07',
    role: '해외 단독 세팅',
    highlight: true,
  },
  {
    id: 5,
    name: '일본 사이트 B',
    location: '일본 🇯🇵',
    type: '물류 배송',
    period: '2025.08',
    role: '해외 단독 세팅',
    highlight: true,
  },
  {
    id: 6,
    name: '국내 사이트 E',
    location: '서울',
    type: '배송 서비스',
    period: '2025.10',
    role: '세팅 및 운영',
    highlight: false,
  },
  {
    id: 7,
    name: '국내 사이트 F',
    location: '경기',
    type: '배송 서비스',
    period: '2025.11',
    role: '전 과정 독립 수행',
    highlight: true,
  },
];

function DeploymentSection() {
  const domesticSites = sites.filter(s => !s.location.includes('일본'));
  const internationalSites = sites.filter(s => s.location.includes('일본'));

  return (
    <section id="deployment" className="deployment-section section">
      <div className="container">
        <div className="section-header">
          <span className="section-number">03</span>
          <h2 className="section-title">Where I Deployed</h2>
          <p className="section-subtitle">
            국내 5개, 해외 2개 사이트에서 로봇 시스템을 세팅하고 운영한 경험
          </p>
        </div>
        
        <div className="deployment-stats">
          <div className="stat-card">
            <span className="stat-value">5</span>
            <span className="stat-label">국내 사이트</span>
          </div>
          <div className="stat-card international">
            <span className="stat-value">2</span>
            <span className="stat-label">해외 사이트</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">22</span>
            <span className="stat-label">개월 경험</span>
          </div>
        </div>
        
        <div className="sites-container">
          <div className="sites-group">
            <h3 className="group-title">
              <span className="flag">🇰🇷</span>
              국내 사이트
            </h3>
            <div className="sites-list">
              {domesticSites.map((site) => (
                <div 
                  key={site.id} 
                  className={`site-card ${site.highlight ? 'highlight' : ''}`}
                >
                  <div className="site-header">
                    <span className="site-period">{site.period}</span>
                    <span className={`site-role ${site.highlight ? 'highlight' : ''}`}>
                      {site.role}
                    </span>
                  </div>
                  <h4 className="site-name">{site.name}</h4>
                  <div className="site-meta">
                    <span className="site-location">{site.location}</span>
                    <span className="site-type">{site.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="sites-group international">
            <h3 className="group-title">
              <span className="flag">🇯🇵</span>
              해외 사이트
            </h3>
            <div className="sites-list">
              {internationalSites.map((site) => (
                <div 
                  key={site.id} 
                  className={`site-card ${site.highlight ? 'highlight' : ''}`}
                >
                  <div className="site-header">
                    <span className="site-period">{site.period}</span>
                    <span className={`site-role ${site.highlight ? 'highlight' : ''}`}>
                      {site.role}
                    </span>
                  </div>
                  <h4 className="site-name">{site.name}</h4>
                  <div className="site-meta">
                    <span className="site-location">{site.location}</span>
                    <span className="site-type">{site.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DeploymentSection;
