import React, { useState } from 'react';
import './LifecycleSection.css';
import PhaseModal from './PhaseModal';

const phases = [
  {
    id: 'design',
    number: '01',
    title: '설계',
    titleEn: 'Design',
    icon: '📐',
    experienced: false,
  },
  {
    id: 'inspection',
    number: '02',
    title: '검사',
    titleEn: 'Inspection',
    icon: '🔍',
    experienced: true,
  },
  {
    id: 'assembly',
    number: '03',
    title: '조립',
    titleEn: 'Assembly',
    icon: '🔧',
    experienced: true,
  },
  {
    id: 'development',
    number: '04',
    title: 'SW 개발',
    titleEn: 'Development',
    icon: '💻',
    experienced: true,
    isHighlight: true,
  },
  {
    id: 'setup',
    number: '05',
    title: '세팅',
    titleEn: 'Site Setup',
    icon: '📍',
    experienced: true,
  },
  {
    id: 'operation',
    number: '06',
    title: '운영',
    titleEn: 'Operation',
    icon: '🚀',
    experienced: true,
  },
  {
    id: 'cicd',
    number: '07',
    title: 'CI/CD',
    titleEn: 'CI/CD',
    icon: '🔄',
    experienced: false,
  },
];

function LifecycleSection() {
  const [selectedPhase, setSelectedPhase] = useState(null);

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
                  className={`flow-node ${phase.experienced ? 'experienced' : ''} ${phase.isHighlight ? 'highlight' : ''}`}
                  onClick={() => setSelectedPhase(phase)}
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
          onClose={() => setSelectedPhase(null)}
        />
      )}
    </section>
  );
}

export default LifecycleSection;
