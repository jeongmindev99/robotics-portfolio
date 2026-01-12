import React from 'react';
import './PhaseModal.css';

const phaseDetails = {
  design: {
    description: '로봇 시스템의 기초를 설계하는 단계',
    layers: [
      { name: '기구 설계', description: '로봇의 물리적 구조와 움직임 설계', experienced: false },
      { name: '전장 설계', description: '전기 회로 배치 및 연결 설계', experienced: false },
      { name: '회로 설계', description: '전자 회로 및 PCB 설계', experienced: false },
      { name: 'SW 아키텍처 설계', description: '소프트웨어 구조 및 모듈 설계', experienced: false },
    ]
  },
  inspection: {
    description: '조립 전 전장부품의 정상 동작을 검증하는 단계',
    layers: [
      { name: 'CAN 통신 테스트', description: '모터 드라이버, 센서와의 CAN 통신 검증', experienced: true },
      { name: '모터 동작 테스트', description: '휠/암 모터의 정방향/역방향 회전 테스트', experienced: true },
      { name: '센서 동작 테스트', description: 'LiDAR, 카메라, IMU 등 센서 데이터 수신 확인', experienced: true },
      { name: '전원 테스트', description: '배터리 전압, 전류 안정성 검사', experienced: true },
    ]
  },
  assembly: {
    description: '검증된 부품들을 조립하고 캘리브레이션하는 단계',
    layers: [
      { name: '프레임 조립', description: '로봇 본체 프레임 조립', experienced: false },
      { name: '배선', description: '전원/신호 케이블 연결 및 정리', experienced: true },
      { name: '센서 장착', description: 'LiDAR, 카메라, 초음파 센서 마운팅', experienced: true },
      { name: '캘리브레이션', description: '센서 위치, 휠 오도메트리 보정', experienced: true },
    ]
  },
  development: {
    description: '로봇 소프트웨어 시스템을 개발하는 단계',
    layers: [
      { name: 'ROS 시스템', description: 'ROS 노드 개발, 런치 파일 구성', experienced: true },
      { name: '미들웨어', description: '상태 머신, 행동 트리, 미션 관리', experienced: true },
      { name: '어플리케이션', description: '로봇 UI, API 게이트웨이 개발', experienced: true },
      { name: '통신 연동', description: 'MQTT, REST API, WebSocket 연동', experienced: true },
    ],
    hasArchitecture: true
  },
  setup: {
    description: '실제 현장에서 로봇을 세팅하고 시나리오를 구성하는 단계',
    layers: [
      { name: '지도 세팅', description: 'SLAM으로 현장 지도 생성 및 편집', experienced: true },
      { name: '층/존 세팅', description: '엘리베이터, 출입문 등 구역 설정', experienced: true },
      { name: '포즈 세팅', description: '대기 위치, 충전 위치, 배송 위치 등록', experienced: true },
      { name: '시나리오 개발', description: '배송 플로우, 예외 처리 로직 구현', experienced: true },
      { name: '이미지 학습', description: '엘리베이터 버튼, 도어 인식 모델 학습', experienced: true },
      { name: '테스트', description: '전체 시나리오 반복 테스트 및 최적화', experienced: true },
    ]
  },
  operation: {
    description: '배포된 로봇을 모니터링하고 유지보수하는 단계',
    layers: [
      { name: '모니터링', description: '관제 시스템으로 로봇 상태 실시간 확인', experienced: true },
      { name: '장애 대응', description: '현장 이슈 원격/현장 대응', experienced: true },
      { name: '로그 분석', description: 'ROS 로그, 시스템 로그 분석으로 원인 파악', experienced: true },
      { name: '유지보수', description: '정기 점검, 부품 교체, 펌웨어 업데이트', experienced: true },
      { name: '원격 지원', description: 'SSH, VPN으로 원격 디버깅 및 수정', experienced: true },
    ]
  },
  cicd: {
    description: '소프트웨어 배포 및 버전 관리를 자동화하는 단계',
    layers: [
      { name: '자동 배포', description: 'Docker, Ansible 등으로 자동 배포', experienced: false },
      { name: '테스트 자동화', description: 'Unit/Integration 테스트 자동화', experienced: false },
      { name: '버전 관리', description: 'Git 브랜치 전략, 태깅', experienced: true },
      { name: '롤백', description: '이전 버전으로 신속하게 복구', experienced: false },
    ]
  }
};

function PhaseModal({ phase, onClose, onArchitectureClick }) {
  if (!phase) return null;

  const details = phaseDetails[phase.id];
  const experiencedCount = details.layers.filter(l => l.experienced).length;
  const totalCount = details.layers.length;
  const experienceRate = Math.round((experiencedCount / totalCount) * 100);

  return (
    <div className="phase-modal-overlay" onClick={onClose}>
      <div className="phase-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="phase-modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <div className="phase-modal-header">
          <div className="phase-modal-badge">
            <span className={`badge-indicator ${phase.experienced ? 'active' : ''}`}></span>
            <span>Phase {phase.number}</span>
          </div>
          <h2 className="phase-modal-title">{phase.title}</h2>
          <span className="phase-modal-title-en">{phase.titleEn}</span>
          <p className="phase-modal-description">{details.description}</p>
        </div>

        <div className="phase-modal-stats">
          <div className="phase-stat">
            <span className="phase-stat-value">{experiencedCount}/{totalCount}</span>
            <span className="phase-stat-label">경험 영역</span>
          </div>
          <div className="phase-stat">
            <span className="phase-stat-value">{experienceRate}%</span>
            <span className="phase-stat-label">커버리지</span>
          </div>
        </div>

        <div className="phase-modal-layers">
          <h3 className="layers-title">세부 영역</h3>
          <div className="layers-grid">
            {details.layers.map((layer, idx) => (
              <div
                key={idx}
                className={`layer-card ${layer.experienced ? 'experienced' : ''}`}
              >
                <div className="layer-card-header">
                  <span className={`layer-indicator ${layer.experienced ? 'active' : ''}`}></span>
                  <span className="layer-name">{layer.name}</span>
                </div>
                <p className="layer-description">{layer.description}</p>
                {layer.experienced && (
                  <span className="layer-badge">경험</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {details.hasArchitecture && (
          <div className="phase-modal-actions">
            <button
              className="architecture-detail-button"
              onClick={() => {
                onClose();
                onArchitectureClick();
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
              </svg>
              <span>시스템 아키텍처 상세 보기</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PhaseModal;
