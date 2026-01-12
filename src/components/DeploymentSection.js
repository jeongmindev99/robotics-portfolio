import React from 'react';
import './DeploymentSection.css';

const sites = [
  { id: 1, period: '2024.04', name: '래미안 원베일리', robot: '배송로봇', role: '세팅 보조' },
  { id: 2, period: '2024.08', name: '부산 포터', robot: '물류로봇', role: '세팅 및 운영' },
  { id: 3, period: '2024.10', name: '판교 스타필드', robot: '배송로봇', role: '세팅 지원' },
  { id: 4, period: '2025.07', name: '일본 팜코트', robot: '물류로봇', role: '현장 세팅' },
  { id: 5, period: '2025.08', name: '일본 사이트 B', robot: '물류로봇', role: '현장 세팅' },
  { id: 6, period: '2025.10', name: '국내 사이트 E', robot: '배송로봇', role: '세팅 및 운영' },
  { id: 7, period: '2025.11', name: '국내 사이트 F', robot: '서빙로봇', role: '전 과정 수행' },
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
          </div>
          {sites.map((site) => (
            <div key={site.id} className="table-row">
              <span className="cell-period">{site.period}</span>
              <span className="cell-name">{site.name}</span>
              <span className="cell-robot">{site.robot}</span>
              <span className="cell-role">{site.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DeploymentSection;
