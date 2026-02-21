import React from 'react';
import './GrowthSection.css';
import { milestones } from '../data/growthData';
function GrowthSection() {
  return (
    <section id="growth" className="growth-section section">
      <div className="container">
        <div className="section-header">
          <span className="section-number">04</span>
          <h2 className="section-title">How I Grew</h2>
          <p className="section-subtitle">
            성장의 전환점이 된 순간들
          </p>
        </div>
        
        <div className="timeline">
          {milestones.map((milestone, index) => (
            <div 
              key={index} 
              className={`timeline-item ${milestone.type}`}
            >
              <div className="timeline-marker">
                <div className="marker-dot"></div>
                {index < milestones.length - 1 && <div className="marker-line"></div>}
              </div>
              
              <div className="timeline-content">
                <span className="timeline-date">{milestone.date}</span>
                <h3 className="timeline-title">{milestone.title}</h3>
                <p className="timeline-description">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="growth-quote">
          <blockquote>
            "모르는 것을 인정하고, 빠르게 배우고, 체계적으로 기록한다"
          </blockquote>
        </div>
      </div>
    </section>
  );
}

export default GrowthSection;
