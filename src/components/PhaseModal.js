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

// Architecture layers data - generic functional terms (not specific implementations)
const architectureLayers = [
  {
    name: 'Cloud / External',
    type: 'single',
    isOutsideROS: true,
    items: [
      { name: 'Fleet Management', experienced: true },
      { name: 'Database', experienced: true },
      { name: 'Building API', experienced: true },
    ]
  },
  {
    name: 'Application',
    type: 'single',
    isOutsideROS: true,
    items: [
      { name: 'User Interface', experienced: true },
      { name: 'REST API', experienced: true },
      { name: 'Message Bridge', experienced: true },
    ]
  },
  // ROS Framework starts here
  {
    name: 'Behavior / Orchestration',
    type: 'single',
    isROS: true,
    items: [
      { name: 'State Machine', experienced: true },
      { name: 'Behavior Tree', experienced: true },
      { name: 'Task Sequencer', experienced: true },
      { name: 'Recovery Logic', experienced: true },
    ]
  },
  {
    name: 'Domain Stacks',
    type: 'horizontal',
    isROS: true,
    groups: [
      {
        name: 'Navigation',
        items: [
          { name: 'Localization', experienced: true },
          { name: 'Costmap', experienced: true },
          { name: 'Global Planning', experienced: true },
          { name: 'Local Planning', experienced: true },
          { name: 'Path Execution', experienced: true },
        ]
      },
      {
        name: 'Manipulation',
        items: [
          { name: 'Motion Planning', experienced: true },
          { name: 'Kinematics', experienced: true },
          { name: 'Trajectory Control', experienced: true },
          { name: 'Gripper Control', experienced: true },
        ]
      },
      {
        name: 'Perception',
        items: [
          { name: 'Mapping (SLAM)', experienced: false },
          { name: 'Object Detection', experienced: false },
          { name: 'Sensor Fusion', experienced: false },
          { name: 'Point Cloud', experienced: false },
        ]
      },
    ]
  },
  {
    name: 'ROS Communication',
    type: 'single',
    isROS: true,
    items: [
      { name: 'Topic (Pub/Sub)', experienced: true },
      { name: 'Service', experienced: true },
      { name: 'Action', experienced: true },
      { name: 'TF', experienced: true },
      { name: 'Parameter', experienced: true },
    ]
  },
  {
    name: 'Hardware Interface',
    type: 'single',
    isROS: true,
    items: [
      { name: 'Controller Manager', experienced: true },
      { name: 'Joint Controllers', experienced: true },
      { name: 'Sensor Interface', experienced: true },
      { name: 'Actuator Interface', experienced: true },
    ]
  },
  // ROS Framework ends here
  {
    name: 'Runtime Environment',
    type: 'runtime',
    items: [
      { name: 'Docker', experienced: true },
      { name: 'Ubuntu 20.04', experienced: true },
      { name: 'ROS Noetic', experienced: true },
    ]
  },
  {
    name: 'Device Drivers',
    type: 'single',
    items: [
      { name: 'LiDAR Driver', experienced: true },
      { name: 'Camera Driver', experienced: true },
      { name: 'Motor Driver', experienced: true },
      { name: 'IMU Driver', experienced: true },
    ]
  },
  {
    name: 'OS / Kernel',
    type: 'single',
    items: [
      { name: 'SocketCAN', experienced: true },
      { name: 'TTY/Serial', experienced: true },
      { name: 'V4L2', experienced: true },
      { name: 'USB', experienced: true },
      { name: 'Network', experienced: true },
    ]
  },
  {
    name: 'Firmware / MCU',
    type: 'single',
    items: [
      { name: 'Motor Controller', experienced: true },
      { name: 'Sensor Board', experienced: true },
      { name: 'Power Management', experienced: true },
    ]
  },
  {
    name: 'Physical',
    type: 'horizontal',
    groups: [
      {
        name: 'Actuators',
        items: [
          { name: 'Wheel Motors', experienced: true },
          { name: 'Arm Motors', experienced: true },
          { name: 'Gripper', experienced: true },
        ]
      },
      {
        name: 'Sensors',
        items: [
          { name: 'LiDAR', experienced: true },
          { name: 'Camera', experienced: true },
          { name: 'IMU', experienced: true },
          { name: 'Encoder', experienced: true },
        ]
      },
      {
        name: 'Power',
        items: [
          { name: 'Battery', experienced: true },
          { name: 'BMS', experienced: true },
          { name: 'PDU', experienced: true },
        ]
      },
    ]
  },
];

function ArchitectureView({ onClose, phase }) {
  // Calculate totals including horizontal groups
  const countItems = (layer) => {
    if (layer.type === 'horizontal') {
      return layer.groups.reduce((acc, g) => acc + g.items.length, 0);
    }
    if (layer.type === 'runtime') {
      return layer.items.length;
    }
    return layer.items.length;
  };
  const countExperienced = (layer) => {
    if (layer.type === 'horizontal') {
      return layer.groups.reduce((acc, g) => acc + g.items.filter(i => i.experienced).length, 0);
    }
    return layer.items.filter(i => i.experienced).length;
  };

  const totalItems = architectureLayers.reduce((acc, layer) => acc + countItems(layer), 0);
  const experiencedItems = architectureLayers.reduce((acc, layer) => acc + countExperienced(layer), 0);

  // Separate ROS and non-ROS layers
  const rosLayers = architectureLayers.filter(l => l.isROS);
  const outsideROSLayers = architectureLayers.filter(l => l.isOutsideROS);
  const otherLayers = architectureLayers.filter(l => !l.isROS && !l.isOutsideROS);

  const renderLayer = (layer, idx, showConnector = true, totalLength = 1) => (
    <div key={idx} className="arch-layer-wrapper">
      {layer.type === 'horizontal' ? (
        <div className="arch-layer horizontal">
          <div className="arch-layer-label">{layer.name}</div>
          <div className="arch-horizontal-groups">
            {layer.groups.map((group, gIdx) => (
              <div key={gIdx} className="arch-group">
                <div className="arch-group-label">{group.name}</div>
                <div className="arch-group-nodes">
                  {group.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className={`arch-node ${item.experienced ? 'exp' : ''}`}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : layer.type === 'runtime' ? (
        <div className="arch-layer runtime">
          <div className="arch-layer-label">{layer.name}</div>
          <div className="arch-runtime-stack">
            {layer.items.map((item, itemIdx) => (
              <div
                key={itemIdx}
                className={`arch-runtime-item ${item.experienced ? 'exp' : ''}`}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="arch-layer">
          <div className="arch-layer-label">{layer.name}</div>
          <div className="arch-layer-nodes">
            {layer.items.map((item, itemIdx) => (
              <div
                key={itemIdx}
                className={`arch-node ${item.experienced ? 'exp' : ''}`}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
      {showConnector && idx < totalLength - 1 && (
        <div className="arch-connector">
          <div className="connector-line"></div>
        </div>
      )}
    </div>
  );

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
          <h2 className="phase-modal-title">System Architecture</h2>
          <p className="phase-modal-description">
            {experiencedItems}/{totalItems} components experienced
          </p>
        </div>

        <div className="arch-diagram">
          {/* Outside ROS layers (Cloud, Application) */}
          {outsideROSLayers.map((layer, idx) => renderLayer(layer, idx, true, outsideROSLayers.length))}

          {/* Connector to ROS Framework */}
          <div className="arch-connector">
            <div className="connector-line"></div>
          </div>

          {/* ROS Framework Container */}
          <div className="ros-framework-container">
            <div className="ros-framework-label">ROS Framework</div>
            <div className="ros-framework-content">
              {rosLayers.map((layer, idx) => renderLayer(layer, idx, true, rosLayers.length))}
            </div>
          </div>

          {/* Other layers (Runtime, OS, Physical) */}
          {otherLayers.map((layer, idx) => (
            <React.Fragment key={idx}>
              <div className="arch-connector">
                <div className="connector-line"></div>
              </div>
              {renderLayer(layer, idx, idx < otherLayers.length - 1, otherLayers.length)}
            </React.Fragment>
          ))}
        </div>

        <div className="arch-legend">
          <div className="legend-item">
            <span className="legend-dot exp">●</span>
            <span>경험</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot">○</span>
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

  if (details.isArchitecture) {
    return <ArchitectureView phase={phase} onClose={onClose} />;
  }

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

        <div className="phase-diagram">
          <div className="phase-layer">
            <div className="phase-layer-label">{phase.title}</div>
            <div className="phase-layer-nodes">
              {details.layers.map((layer, idx) => (
                <div
                  key={idx}
                  className={`phase-node ${layer.experienced ? 'exp' : ''}`}
                  title={layer.description}
                >
                  {layer.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="arch-legend">
          <div className="legend-item">
            <span className="legend-dot exp">●</span>
            <span>경험 ({experiencedCount})</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot">○</span>
            <span>미경험 ({totalCount - experiencedCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhaseModal;
