import React from 'react';
import './LearningSection.css';
import { learningItems } from '../data/learningData';

function LearningSection() {
  return (
    <section id="learning" className="learning-section section">
      <div className="container">
        <div className="section-header">
          <span className="section-number">05</span>
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
