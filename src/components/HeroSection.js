import React, { useState } from 'react';
import './HeroSection.css';
import { heroContent } from '../data/heroData';
import { sites } from '../data/deploymentData';
import { projects } from '../data/projectsData';
import { useAdmin } from '../context/AdminContext';
import AdminEditModal from './AdminEditModal';

const heroSchema = [
  { key: 'badge',       label: '뱃지 텍스트',  type: 'text' },
  { key: 'titleLines',  label: '제목 줄 (줄바꿈으로 구분)', type: 'textarea' },
  { key: 'subtitle',    label: '부제목',       type: 'textarea' },
  { key: 'growthStart', label: '성장 시작 (YYYY.MM)', type: 'text' },
];

// Calculate duration between growthStart and now
function calcDuration(growthStart) {
  const [year, month] = growthStart.split('.').map(Number);
  const start = new Date(year, month - 1, 1);
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  if (years > 0) {
    return `${years}년 ${months}개월`;
  }
  return `${months}개월`;
}

function HeroSection() {
  const { isAdmin, isAuthed, data, updateHeroContent } = useAdmin();
  const adminActive = isAdmin && isAuthed;
  const [editOpen, setEditOpen] = useState(false);

  const activeHero = adminActive ? data.heroContent : heroContent;
  const activeSites = adminActive ? data.sites : sites;
  const activeProjects = adminActive ? data.projects : projects;

  const growthRange = activeHero.growthStart + ' ~ 현재';
  const growthDuration = calcDuration(activeHero.growthStart);

  const handleSave = (values) => {
    updateHeroContent({
      ...values,
      titleLines: values.titleLines.split('\n').map(l => l.trim()).filter(Boolean),
    });
  };

  return (
    <section id="hero" className="hero-section section">
      <div className="hero-background">
        <div className="grid-lines"></div>
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>

      <div className="container hero-content">
        <div className={`hero-badge ${adminActive ? 'admin-item-wrapper' : ''}`}>
          <span className="badge-dot"></span>
          <span>{activeHero.badge}</span>
          {adminActive && (
            <div className="admin-card-controls">
              <button
                className="admin-btn admin-btn-edit"
                onClick={() => setEditOpen(true)}
                title="Hero 콘텐츠 수정"
              >✏️</button>
            </div>
          )}
        </div>

        <h1 className="hero-title">
          {activeHero.titleLines.map((line, idx) => (
            <span key={idx} className={`title-line${idx === activeHero.highlightLine ? ' highlight' : ''}`}>
              {line}
            </span>
          ))}
        </h1>

        <p className="hero-subtitle">
          {activeHero.subtitle}
        </p>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-range">{growthRange}</span>
            <span className="stat-duration">{growthDuration}</span>
            <span className="stat-desc">성장 기간</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">{activeSites.length}</span>
            <span className="stat-label">사이트</span>
            <span className="stat-desc">현장 배포</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">{activeProjects.length}</span>
            <span className="stat-label">프로젝트</span>
            <span className="stat-desc">경험 사례</span>
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span>커피 한 잔 어때요?</span>
          </a>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <span>Scroll</span>
      </div>

      {editOpen && (
        <AdminEditModal
          title="Hero 콘텐츠 수정"
          schema={heroSchema}
          initialValues={{
            ...activeHero,
            titleLines: activeHero.titleLines.join('\n'),
          }}
          onSave={handleSave}
          onClose={() => setEditOpen(false)}
        />
      )}
    </section>
  );
}

export default HeroSection;
