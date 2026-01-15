import React from 'react';
import './LearningSection.css';

const learningItems = [
  {
    skill: 'C++',
    status: '학습 중',
    description: '로보틱스 핵심 언어, 기초 문법과 STL 학습 중',
  },
  {
    skill: 'ROS2',
    status: '학습 예정',
    description: 'ROS1 경험 기반 ROS2 마이그레이션 준비',
  },
  {
    skill: 'Realtime Systems',
    status: '관심',
    description: 'RTOS, PREEMPT_RT 등 실시간 시스템',
  },
];

function LearningSection() {
  return (
    <section id="learning" className="learning-section section">
      <div className="container">
        <div className="section-header">
          <span className="section-number">06</span>
          <h2 className="section-title">What I'm Learning</h2>
          <p className="section-subtitle">
            부족한 점을 인정하고 꾸준히 학습 중
          </p>
        </div>
        
        <div className="learning-grid">
          {learningItems.map((item, index) => (
            <div key={index} className="learning-card">
              <div className="learning-header">
                <h4 className="learning-skill">{item.skill}</h4>
                <span className="learning-status">{item.status}</span>
              </div>
              <p className="learning-description">{item.description}</p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

export default LearningSection;
