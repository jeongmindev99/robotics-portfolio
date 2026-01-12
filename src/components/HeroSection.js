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
          <span className="title-line">ROS를 몰랐던 내가</span>
          <span className="title-line highlight">22개월 만에</span>
          <span className="title-line">7개 사이트를 혼자 세팅할 수 있게 되기까지</span>
        </h1>
        
        <p className="hero-subtitle">
          로봇 시스템의 처음부터 끝까지를 경험한 엔지니어
        </p>
        
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">22</span>
            <span className="stat-label">개월</span>
            <span className="stat-desc">성장 기간</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">7</span>
            <span className="stat-label">사이트</span>
            <span className="stat-desc">현장 배포</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">5+</span>
            <span className="stat-label">프로토콜</span>
            <span className="stat-desc">통신 경험</span>
          </div>
        </div>
        
        <div className="hero-cta">
          <a href="#lifecycle" className="cta-button primary">
            <span>업무 영역 보기</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
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
