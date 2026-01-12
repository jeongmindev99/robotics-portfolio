import React from 'react';
import './GrowthSection.css';

const milestones = [
  {
    date: '2024.03',
    title: 'ROS 제로에서 시작',
    description: 'WATT Robotics 입사. ROS가 뭔지도 몰랐던 상태에서 로보틱스 세계에 첫 발을 내딛다.',
    type: 'start',
  },
  {
    date: '2024.10',
    title: '"감으로 디버깅" → 체계적 접근',
    description: '문제를 체계적으로 분석하고 기록하기 시작. 디버깅 과정을 습관화하고 문서화.',
    type: 'turning-point',
  },
  {
    date: '2025.07',
    title: '해외 사이트 단독 세팅',
    description: '일본 팜코트 사이트에서 처음으로 해외 현장을 단독으로 세팅. 언어와 환경의 장벽을 넘다.',
    type: 'achievement',
  },
  {
    date: '2025.11',
    title: '전 과정 독립 수행',
    description: '로봇 시스템의 세팅부터 운영까지 전 과정을 혼자서 완료할 수 있게 되다.',
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
            22개월간의 성장 여정. 전환점이 된 순간들.
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
            "빠르게 배우고, 체계적으로 기록하고, 끊임없이 개선한다."
          </blockquote>
        </div>
      </div>
    </section>
  );
}

export default GrowthSection;
