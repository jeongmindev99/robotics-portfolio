import React from 'react';
import './HeroSection.css';

function HeroSection() {
  return (
    <section id="hero" className="hero-section section">
      <div className="hero-background">
        <div className="grid-lines"></div>
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>
      
      <div className="container hero-content">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          <span>Robotics Software Engineer</span>
        </div>
        
        <h1 className="hero-title">
          <span className="title-line">로봇이 만들어지고</span>
          <span className="title-line highlight">현장에 배포되어 운영되기까지</span>
          <span className="title-line">전 과정을 경험한 엔지니어</span>
        </h1>

        <p className="hero-subtitle">
          문제를 해결하다 보니, 어느새 소프트웨어 잡부가 되어버린 나의 여정
        </p>
        
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">2024</span>
            <span className="stat-label">.05 ~ 현재</span>
            <span className="stat-desc">성장 기간</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">9</span>
            <span className="stat-label">사이트</span>
            <span className="stat-desc">현장 배포</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">4</span>
            <span className="stat-label">모델</span>
            <span className="stat-desc">로봇 경험</span>
          </div>
        </div>
        
        <div className="hero-cta">
          <a href="#lifecycle" className="cta-button primary">
            <span>나의 여정 보기</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#contact" className="cta-button secondary">
            <span>연락하기</span>
          </a>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
}

export default HeroSection;
