import React, { useState, useEffect, useRef } from 'react';
import './LifecycleSection.css';
import PhaseModal from './PhaseModal';
import { phaseDetails } from '../data/phaseData';
import { useAdmin } from '../context/AdminContext';

// B-1: auto-calculate experienced from phaseDetails layers data
const isPhaseExperienced = (phaseId, detailsOverride) => {
  const details = detailsOverride || phaseDetails;
  const detail = details[phaseId];
  if (!detail) return false;
  if (detail.isArchitecture) return true;
  return detail.layers.some(l => l.experienced);
};

const BASE_PHASES = [
  { id: 'design',      number: '01', title: '설계',   titleEn: 'Design',      icon: '📐' },
  { id: 'inspection',  number: '02', title: '검사',   titleEn: 'Inspection',  icon: '🔍' },
  { id: 'assembly',    number: '03', title: '조립',   titleEn: 'Assembly',    icon: '🔧' },
  { id: 'development', number: '04', title: 'SW 개발', titleEn: 'Development', icon: '💻', isHighlight: true },
  { id: 'setup',       number: '05', title: '세팅',   titleEn: 'Site Setup',  icon: '📍' },
  { id: 'operation',   number: '06', title: '운영',   titleEn: 'Operation',   icon: '🚀' },
  { id: 'cicd',        number: '07', title: 'CI/CD',  titleEn: 'CI/CD',       icon: '🔄' },
];

function LifecycleSection() {
  const { isAdmin, isAuthed, data } = useAdmin();
  const adminActive = isAdmin && isAuthed;
  const activePhaseDetails = adminActive ? data.phaseDetails : phaseDetails;

  const phases = BASE_PHASES.map(phase => ({
    ...phase,
    experienced: isPhaseExperienced(phase.id, activePhaseDetails),
  }));

  const [selectedPhase, setSelectedPhase] = useState(null);
  const [adminMode, setAdminMode] = useState(false);
  const scrollPosRef = useRef(0);

  // B-2: lock body scroll when modal is open
  useEffect(() => {
    if (selectedPhase) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPhase]);

  const openModal = (phase, opts = {}) => {
    scrollPosRef.current = window.scrollY;
    setAdminMode(Boolean(opts.adminMode));
    setSelectedPhase(phase);
  };

  const closeModal = () => {
    setSelectedPhase(null);
    setAdminMode(false);
    window.scrollTo({ top: scrollPosRef.current, behavior: 'instant' });
  };

  const experiencedCount = phases.filter(p => p.experienced).length;

  return (
    <section id="lifecycle" className="lifecycle-section section">
      <div className="container">
        <div className="section-header">
          <span className="section-number">01</span>
          <h2 className="section-title">What I Build</h2>
          <p className="section-subtitle">
            로봇이 만들어지고 운영되기까지의 전체 과정
          </p>
        </div>

        <div className="lifecycle-flow">
          <div className="flow-track">
            {phases.map((phase, index) => (
              <React.Fragment key={phase.id}>
                <div
                  className={`flow-node ${phase.experienced ? 'experienced' : ''} ${phase.isHighlight ? 'highlight' : ''} admin-item-wrapper`}
                  onClick={() => openModal(phase)}
                >
                  <div className="node-icon">{phase.icon}</div>
                  <div className="node-content">
                    <span className="node-number">{phase.number}</span>
                    <h3 className="node-title">{phase.title}</h3>
                    <span className="node-subtitle">{phase.titleEn}</span>
                  </div>
                  {phase.experienced && (
                    <div className="node-badge">경험</div>
                  )}
                  {adminActive && (
                    <div className="admin-card-controls">
                      <button
                        className="admin-btn admin-btn-edit"
                        onClick={(e) => { e.stopPropagation(); openModal(phase, { adminMode: true }); }}
                        title="Phase 항목 편집"
                      >✏️</button>
                    </div>
                  )}
                </div>
                {index < phases.length - 1 && (
                  <div className={`flow-connector ${phase.experienced && phases[index + 1].experienced ? 'active' : ''}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="lifecycle-summary">
          <div className="summary-card">
            <div className="summary-stat">
              <span className="summary-value">{experiencedCount}</span>
              <span className="summary-divider">/</span>
              <span className="summary-total">{phases.length}</span>
            </div>
            <span className="summary-label">Phase 경험</span>
          </div>
          <p className="summary-description">
            각 단계를 클릭하면 세부 경험을 확인할 수 있습니다
          </p>
        </div>
      </div>

      {selectedPhase && (
        <PhaseModal
          phase={selectedPhase}
          onClose={closeModal}
          isAdminMode={adminMode}
        />
      )}
    </section>
  );
}

export default LifecycleSection;
