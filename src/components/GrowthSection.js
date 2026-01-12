import React from 'react';
import './GrowthSection.css';

const milestones = [
  {
    date: '2024.03',
    title: '로보틱스 입문',
    description: 'ROS를 전혀 몰랐던 상태에서 로보틱스 세계에 첫 발을 내딛다',
    type: 'start',
  },
  {
    date: '2024.10',
    title: '체계적 문제 해결',
    description: '감으로 하던 디버깅에서 체계적 분석과 문서화로 전환',
    type: 'growth',
  },
  {
    date: '2025.07',
    title: '해외 현장 단독 세팅',
    description: '일본 사이트에서 처음으로 해외 현장을 단독 수행',
    type: 'achievement',
  },
  {
    date: '2025.11',
    title: '전 과정 독립 수행',
    description: '세팅부터 운영까지 로봇 시스템 전체를 혼자 담당',
    type: 'milestone',
  },
];

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
