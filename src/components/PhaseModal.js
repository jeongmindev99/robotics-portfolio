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
    description: '로봇 소프트웨어 시스템을 개발하는 핵심 단계',
    isArchitecture: true,
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

// Architecture visualization component
function ArchitectureView({ onClose, phase }) {
  return (
    <div className="phase-modal-overlay" onClick={onClose}>
      <div className="phase-modal-content architecture-view" onClick={(e) => e.stopPropagation()}>
        <button className="phase-modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <div className="phase-modal-header">
          <div className="phase-modal-badge">
            <span className="badge-indicator active"></span>
            <span>Phase {phase.number} - {phase.title}</span>
          </div>
          <h2 className="phase-modal-title">시스템 아키텍처</h2>
          <p className="phase-modal-description">Mobile Manipulator Robot System</p>
        </div>

        <div className="arch-stack">
          {/* External Layer */}
          <div className="arch-layer-group external">
            <div className="layer-label">External</div>
            <div className="layer-boxes">
              <div className="arch-box experienced">관제 시스템</div>
              <div className="arch-box experienced">실시간 DB</div>
              <div className="arch-box experienced">빌딩 API</div>
            </div>
          </div>

          <div className="arch-connector">
            <div className="connector-line"></div>
            <span className="connector-label">REST / MQTT / WebSocket</span>
          </div>

          {/* Application Layer */}
          <div className="arch-layer-group application">
            <div className="layer-label">Application</div>
            <div className="layer-boxes">
              <div className="arch-box experienced">로봇 UI</div>
              <div className="arch-box experienced">API Gateway</div>
            </div>
          </div>

          <div className="arch-connector">
            <div className="connector-line"></div>
          </div>

          {/* ROS Middleware */}
          <div className="arch-layer-group ros-mid">
            <div className="layer-label">ROS Middleware</div>
            <div className="layer-boxes">
              <div className="arch-box experienced">상태 머신</div>
              <div className="arch-box experienced">미션 시퀀싱</div>
              <div className="arch-box experienced">에러 복구</div>
            </div>
          </div>

          <div className="arch-connector">
            <div className="connector-line"></div>
            <span className="connector-label">Topic / Service / Action</span>
          </div>

          {/* ROS Domain */}
          <div className="arch-layer-group ros-domain">
            <div className="layer-label">ROS Domain</div>
            <div className="layer-boxes horizontal">
              <div className="domain-stack">
                <div className="arch-box experienced">Navigation</div>
                <div className="arch-box-sub">move_base, costmap</div>
              </div>
              <div className="domain-stack">
                <div className="arch-box experienced">Manipulation</div>
                <div className="arch-box-sub">MoveIt, planning</div>
              </div>
              <div className="domain-stack">
                <div className="arch-box">Perception</div>
                <div className="arch-box-sub">vision, detection</div>
              </div>
            </div>
          </div>

          <div className="arch-connector">
            <div className="connector-line"></div>
          </div>

          {/* HAL */}
          <div className="arch-layer-group hal">
            <div className="layer-label">Hardware Abstraction</div>
            <div className="layer-boxes">
              <div className="arch-box experienced">ros_control</div>
              <div className="arch-box experienced">CAN Node</div>
              <div className="arch-box experienced">Serial Node</div>
            </div>
          </div>

          <div className="arch-connector">
            <div className="connector-line"></div>
            <span className="connector-label">SocketCAN / TTY / USB</span>
          </div>

          {/* Physical */}
          <div className="arch-layer-group physical">
            <div className="layer-label">Physical</div>
            <div className="layer-boxes">
              <div className="arch-box experienced hw">Motors</div>
              <div className="arch-box experienced hw">LiDAR</div>
              <div className="arch-box experienced hw">Camera</div>
              <div className="arch-box experienced hw">IMU</div>
            </div>
          </div>
        </div>

        <div className="arch-legend">
          <div className="legend-item">
            <span className="legend-box experienced"></span>
            <span>직접 개발/수정</span>
          </div>
          <div className="legend-item">
            <span className="legend-box"></span>
            <span>미경험</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhaseModal({ phase, onClose }) {
  if (!phase) return null;

  const details = phaseDetails[phase.id];

  // Architecture view for development phase
  if (details.isArchitecture) {
    return <ArchitectureView phase={phase} onClose={onClose} />;
  }

  // Regular phase view
  const experiencedCount = details.layers.filter(l => l.experienced).length;
  const totalCount = details.layers.length;

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
        </div>

        <div className="phase-modal-layers">
          {details.layers.map((layer, idx) => (
            <div
              key={idx}
              className={`layer-item ${layer.experienced ? 'experienced' : ''}`}
            >
              <div className="layer-item-header">
                <span className={`layer-indicator ${layer.experienced ? 'active' : ''}`}></span>
                <span className="layer-name">{layer.name}</span>
                {layer.experienced && <span className="layer-badge">경험</span>}
              </div>
              <p className="layer-description">{layer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PhaseModal;
