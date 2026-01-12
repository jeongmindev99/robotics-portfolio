import React from 'react';
import './PhaseModal.css';

const phaseDetails = {
  design: {
    description: '로봇 시스템의 기초를 설계하는 단계',
    layers: [
      { name: '기구 설계', description: '로봇의 물리적 구조와 움직임 설계', experienced: false },
      { name: '배선 설계', description: '케이블 라우팅 및 커넥터 배치 설계', experienced: false },
      { name: '회로/PCB 설계', description: '전자 회로 및 PCB 레이아웃 설계', experienced: false },
      { name: '응력 분석', description: '기계적 응력 및 피로도 분석 (FEA)', experienced: false },
      { name: '열 분석', description: '발열 부품의 방열 설계 및 검증', experienced: false },
      { name: 'EMC 분석', description: '전자기 적합성 및 간섭 분석', experienced: false },
      { name: '3D 모델링', description: '부품 및 어셈블리 3D CAD 모델링', experienced: false },
      { name: 'SW 아키텍처', description: '소프트웨어 구조 및 모듈 설계', experienced: true },
      { name: 'BOM 관리', description: '부품 목록 작성 및 원가 관리', experienced: false },
      { name: '설계 검토', description: '설계 완료 전 다분야 리뷰', experienced: false },
    ]
  },
  inspection: {
    description: '조립 전 부품 및 전장품의 품질을 검증하는 단계',
    layers: [
      { name: '외관 검사', description: '부품 손상, 이물질, 마킹 확인', experienced: true },
      { name: '치수 검사', description: '기구 부품 공차 및 치수 확인', experienced: false },
      { name: 'PCB 검사', description: 'PCB 납땜 상태 및 패턴 검사', experienced: true },
      { name: '전기 테스트', description: '절연 저항, 도통, 전압 측정', experienced: true },
      { name: 'CAN 통신 테스트', description: '모터 드라이버, 센서 CAN 통신 검증', experienced: true },
      { name: '모터 테스트', description: '정/역방향 회전, 토크, 전류 테스트', experienced: true },
      { name: '센서 테스트', description: 'LiDAR, 카메라, IMU 데이터 검증', experienced: true },
      { name: '전원 테스트', description: '배터리 전압, 전류, 충방전 테스트', experienced: true },
      { name: '기능 테스트', description: '부품별 기능 동작 확인', experienced: true },
      { name: '품질 기록', description: '검사 결과 문서화 및 이력 관리', experienced: true },
    ]
  },
  assembly: {
    description: '검증된 부품들을 조립하고 캘리브레이션하는 단계',
    layers: [
      { name: '프레임 조립', description: '로봇 본체 프레임 및 샤시 조립', experienced: false },
      { name: '모터 장착', description: '휠/암 모터 및 감속기 장착', experienced: true },
      { name: '센서 장착', description: 'LiDAR, 카메라, 초음파 센서 마운팅', experienced: true },
      { name: '와이어 하네스', description: '전원/신호 케이블 번들 제작', experienced: true },
      { name: '케이블 라우팅', description: '케이블 배선 및 고정', experienced: true },
      { name: '커넥터 결선', description: '커넥터 핀 배열 및 압착/납땜', experienced: true },
      { name: '전자부 통합', description: '컨트롤러, 드라이버 보드 장착', experienced: true },
      { name: '접지 처리', description: '접지 연결 및 본딩', experienced: true },
      { name: '조인트 캘리브레이션', description: '조인트 영점 및 엔코더 정렬', experienced: true },
      { name: '센서 캘리브레이션', description: '카메라 내외부 파라미터 보정', experienced: true },
      { name: '통합 테스트', description: '조립 완료 후 전체 동작 확인', experienced: true },
    ]
  },
  development: {
    description: '로봇 소프트웨어 시스템을 개발하는 핵심 단계',
    isArchitecture: true,
  },
  setup: {
    description: '실제 현장에서 로봇을 세팅하고 시나리오를 구성하는 단계',
    layers: [
      { name: '현장 평가', description: '바닥 상태, 네트워크, 장애물 사전 조사', experienced: true },
      { name: '지도 생성', description: 'SLAM으로 현장 지도 생성 및 편집', experienced: true },
      { name: '존/구역 설정', description: '엘리베이터, 출입문, 금지 구역 설정', experienced: true },
      { name: '포즈 등록', description: '대기, 충전, 배송 위치 좌표 등록', experienced: true },
      { name: '경로 최적화', description: '이동 경로 및 대기 전략 최적화', experienced: true },
      { name: '시나리오 개발', description: '배송 플로우 및 예외 처리 구현', experienced: true },
      { name: '이미지 학습', description: '버튼, 도어 인식 모델 현장 학습', experienced: true },
      { name: '안전 설정', description: '비상정지, 속도 제한, 안전 구역 설정', experienced: true },
      { name: '통합 시험', description: '전체 시나리오 반복 테스트', experienced: true },
      { name: '인수 테스트', description: '고객 입회 하 최종 검증', experienced: true },
    ]
  },
  operation: {
    description: '배포된 로봇을 모니터링하고 유지보수하는 단계',
    layers: [
      { name: '실시간 모니터링', description: '로봇 상태, 위치, 배터리 실시간 확인', experienced: true },
      { name: '플릿 관리', description: '다중 로봇 작업 배분 및 스케줄링', experienced: true },
      { name: '알림/경보', description: '이상 상황 즉시 알림 (SMS, Slack 등)', experienced: true },
      { name: '장애 대응', description: '현장 이슈 원격/현장 대응', experienced: true },
      { name: '로그 분석', description: '시스템 로그 분석으로 원인 파악', experienced: true },
      { name: '성능 분석', description: '가동률, 배송 성공률 등 KPI 분석', experienced: true },
      { name: '원격 지원', description: 'SSH, VPN으로 원격 디버깅', experienced: true },
      { name: '예방 정비', description: '정기 점검 및 소모품 교체', experienced: true },
      { name: '예측 정비', description: '데이터 기반 고장 예측 및 선제 조치', experienced: false },
      { name: '리포팅', description: '운영 현황 보고서 작성', experienced: true },
    ]
  },
  cicd: {
    description: '소프트웨어 배포 및 버전 관리를 자동화하는 단계',
    layers: [
      { name: '버전 관리', description: 'Git 브랜치 전략 및 태깅', experienced: true },
      { name: '코드 리뷰', description: 'PR 기반 코드 리뷰 프로세스', experienced: true },
      { name: '자동 빌드', description: '코드 변경 시 자동 빌드 트리거', experienced: false },
      { name: '자동 테스트', description: 'Unit/Integration 테스트 자동화', experienced: false },
      { name: '컨테이너화', description: '애플리케이션 컨테이너 이미지 생성', experienced: true },
      { name: '설정 관리', description: '환경별 설정 파일 관리', experienced: true },
      { name: '배포 자동화', description: '스테이징/프로덕션 자동 배포', experienced: false },
      { name: '롤백', description: '이전 버전으로 신속하게 복구', experienced: true },
      { name: '릴리스 관리', description: '릴리스 노트 및 변경 이력 관리', experienced: true },
      { name: '모니터링 연동', description: '배포 후 헬스체크 및 알림 연동', experienced: false },
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
