import React, { useState } from 'react';
import './LifecycleSection.css';
import ArchitectureModal from './ArchitectureModal';
import PhaseModal from './PhaseModal';

const phases = [
  {
    id: 'design',
    number: '01',
    title: '설계',
    titleEn: 'Design',
    experienced: false,
    items: [
      { name: '기구 설계', experienced: false },
      { name: '전장 설계', experienced: false },
      { name: '회로 설계', experienced: false },
      { name: 'SW 아키텍처 설계', experienced: false },
    ]
  },
  {
    id: 'inspection',
    number: '02',
    title: '전장부 검사',
    titleEn: 'Electrical Inspection',
    experienced: true,
    items: [
      { name: 'CAN 통신 테스트', experienced: true },
      { name: '모터 동작 테스트', experienced: true },
      { name: '센서 동작 테스트', experienced: true },
      { name: '전원 테스트', experienced: true },
    ]
  },
  {
    id: 'assembly',
    number: '03',
    title: '조립',
    titleEn: 'Assembly',
    experienced: true,
    items: [
      { name: '프레임 조립', experienced: false },
      { name: '배선', experienced: true },
      { name: '센서 장착', experienced: true },
      { name: '캘리브레이션', experienced: true },
    ]
  },
  {
    id: 'development',
    number: '04',
    title: 'SW 개발',
    titleEn: 'Development',
    experienced: true,
    hasArchitecture: true,
    items: [
      { name: 'ROS 시스템', experienced: true },
      { name: '미들웨어', experienced: true },
      { name: '어플리케이션', experienced: true },
      { name: '통신 연동', experienced: true },
    ]
  },
  {
    id: 'setup',
    number: '05',
    title: '사이트 세팅',
    titleEn: 'Site Setup',
    experienced: true,
    items: [
      { name: '지도 세팅', experienced: true },
      { name: '층/존 세팅', experienced: true },
      { name: '포즈 세팅', experienced: true },
      { name: '시나리오 개발', experienced: true },
      { name: '이미지 학습', experienced: true },
      { name: '테스트', experienced: true },
    ]
  },
  {
    id: 'operation',
    number: '06',
    title: '운영',
    titleEn: 'Operation',
    experienced: true,
    items: [
      { name: '모니터링', experienced: true },
      { name: '장애 대응', experienced: true },
      { name: '로그 분석', experienced: true },
      { name: '유지보수', experienced: true },
      { name: '원격 지원', experienced: true },
    ]
  },
  {
    id: 'cicd',
    number: '07',
    title: 'CI/CD',
    titleEn: 'CI/CD',
    experienced: false,
    items: [
      { name: '자동 배포', experienced: false },
      { name: '테스트 자동화', experienced: false },
      { name: '버전 관리', experienced: true },
      { name: '롤백', experienced: false },
    ]
  },
];

function LifecycleSection() {
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [showArchitecture, setShowArchitecture] = useState(false);

  const experiencedCount = phases.filter(p => p.experienced).length;

  const handlePhaseClick = (phase) => {
    setSelectedPhase(phase);
  };

  const handleArchitectureClick = () => {
    setShowArchitecture(true);
  };

  return (
    <section id="lifecycle" className="lifecycle-section section">
      <div className="container">
        <div className="section-header">
          <span className="section-number">01</span>
          <h2 className="section-title">What I Build</h2>
          <p className="section-subtitle">
            로봇 엔지니어 업무의 전체 사이클. 클릭하여 각 Phase의 세부 영역을 확인하세요.
          </p>
        </div>

        <div className="lifecycle-container">
          <div className="lifecycle-summary">
            <span className="summary-text">
              <strong>{experiencedCount}</strong> / {phases.length} Phase 경험
            </span>
          </div>

          <div className="lifecycle-timeline">
            {phases.map((phase, index) => (
              <div
                key={phase.id}
                className={`phase-card ${phase.experienced ? 'experienced' : 'not-experienced'}`}
                onClick={() => handlePhaseClick(phase)}
              >
                <div className="phase-header">
                  <span className="phase-number">{phase.number}</span>
                  <div className="phase-titles">
                    <h3 className="phase-title">{phase.title}</h3>
                    <span className="phase-title-en">{phase.titleEn}</span>
                  </div>
                  <div className={`phase-indicator ${phase.experienced ? 'active' : ''}`}></div>
                </div>

                <div className="phase-preview">
                  <div className="preview-items">
                    {phase.items.slice(0, 3).map((item, idx) => (
                      <span
                        key={idx}
                        className={`preview-item ${item.experienced ? 'experienced' : ''}`}
                      >
                        {item.name}
                      </span>
                    ))}
                    {phase.items.length > 3 && (
                      <span className="preview-more">+{phase.items.length - 3}</span>
                    )}
                  </div>
                </div>

                <div className="phase-cta">
                  <span>상세 보기</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <div className="lifecycle-legend">
            <div className="legend-item">
              <span className="legend-dot active"></span>
              <span>경험한 영역</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot"></span>
              <span>미경험 영역</span>
            </div>
          </div>
        </div>
      </div>

      {selectedPhase && (
        <PhaseModal
          phase={selectedPhase}
          onClose={() => setSelectedPhase(null)}
          onArchitectureClick={handleArchitectureClick}
        />
      )}

      {showArchitecture && (
        <ArchitectureModal onClose={() => setShowArchitecture(false)} />
      )}
    </section>
  );
}

export default LifecycleSection;
