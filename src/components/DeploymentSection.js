import React from 'react';
import './DeploymentSection.css';

const sites = [
  { id: 1, period: '2024.05', name: '판교 테크원', robot: '배송로봇', role: '세팅 및 운영', notionLink: 'https://notion.so/3c6b0938612e4b6fae25658379f92686' },
  { id: 2, period: '2024.06', name: '서초 래미안', robot: '배송로봇', role: '세팅 지원', notionLink: 'https://notion.so/6b1d0a6b3e8b4c5cb1b660ff54110025' },
  { id: 3, period: '2024.08', name: '대치', robot: '배송로봇', role: '세팅 지원', notionLink: 'https://notion.so/5ab4a78d084d46a186ed3f03a56b22e9' },
  { id: 4, period: '2024.10', name: '부산 호반/수자인', robot: '물류로봇', role: '세팅 및 운영', notionLink: 'https://notion.so/214afb16c41c40a89ff9f680e82dc180' },
  { id: 5, period: '2025.03', name: '지웰홈즈', robot: '배송로봇', role: '세팅 및 운영', notionLink: 'https://notion.so/6fca25e5dfe345539ec7d4c2373433be' },
  { id: 6, period: '2025.07', name: '일본 팜코트', robot: '물류로봇', role: '해외 단독 세팅', notionLink: 'https://notion.so/79aecb639ce549f1a43ec6a93a219e85' },
  { id: 7, period: '2025.08', name: '일본 캐널코트', robot: '물류로봇', role: '해외 단독 세팅', notionLink: 'https://notion.so/be8a5bedad524d9393e8f40dab7859cf' },
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

        <div className="sites-table">
          <div className="table-header">
            <span>기간</span>
            <span>사이트</span>
            <span>로봇</span>
            <span>역할</span>
            <span></span>
          </div>
          {sites.map((site) => (
            <div key={site.id} className="table-row">
              <span className="cell-period">{site.period}</span>
              <span className="cell-name">{site.name}</span>
              <span className="cell-robot">{site.robot}</span>
              <span className="cell-role">{site.role}</span>
              <span className="cell-link">
                {site.notionLink && (
                  <a href={site.notionLink} target="_blank" rel="noopener noreferrer" className="site-notion-link">
                    상세
                  </a>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DeploymentSection;
