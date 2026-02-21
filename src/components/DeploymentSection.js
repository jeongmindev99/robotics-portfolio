import React from 'react';
import './DeploymentSection.css';
import { sites } from '../data/deploymentData';

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
