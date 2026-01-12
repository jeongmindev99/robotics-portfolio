import React from 'react';
import './LearningSection.css';

const learningItems = [
  {
    skill: 'C++',
    status: '학습 중',
    progress: 30,
    description: '로보틱스 핵심 언어. 현재 기초 문법과 STL 학습 중.',
  },
  {
    skill: 'ROS2',
    status: '학습 예정',
    progress: 10,
    description: 'ROS1 경험을 바탕으로 ROS2 마이그레이션 준비 중.',
  },
  {
    skill: 'Realtime Linux',
    status: '관심',
    progress: 5,
    description: 'RTOS, PREEMPT_RT 등 실시간 시스템 학습 계획.',
  },
];

function LearningSection() {
  return (
    <section id="learning" className="learning-section section">
      <div className="container">
        <div className="section-header">
          <span className="section-number">05</span>
          <h2 className="section-title">What I'm Building</h2>
          <p className="section-subtitle">
            부족한 점을 인정하고, 꾸준히 배우고 있습니다.
          </p>
        </div>
        
        <div className="learning-intro">
          <div className="intro-card">
            <div className="intro-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <h3>정직한 자기 평가</h3>
            <p>
              C++, ROS2, Realtime 시스템 경험이 부족합니다.<br/>
              하지만 빠르게 배우고 있으며, 꾸준히 성장하고 있습니다.
            </p>
          </div>
        </div>
        
        <div className="learning-grid">
          {learningItems.map((item, index) => (
            <div key={index} className="learning-card">
              <div className="learning-header">
                <h4 className="learning-skill">{item.skill}</h4>
                <span className="learning-status">{item.status}</span>
              </div>
              
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
              
              <p className="learning-description">{item.description}</p>
            </div>
          ))}
        </div>
        
        <div className="learning-cta">
          <a href="#" className="learning-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
            <span>학습 기록 보기</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default LearningSection;
