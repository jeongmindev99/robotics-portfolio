import React, { useState } from 'react';
import './ArchitectureModal.css';

const architectureLayers = [
  {
    id: 'external',
    name: 'External Systems',
    nameKr: '외부 시스템',
    color: '#ff6b35',
    items: [
      { name: 'Fleet Management', nameKr: '관제 시스템', experienced: true, link: '#' },
      { name: 'Realtime Database', nameKr: '실시간 DB', experienced: true, link: '#' },
      { name: 'Building API', nameKr: '빌딩 API (엘리베이터)', experienced: true, link: '#' },
      { name: 'Other Robots', nameKr: '다른 로봇 통신', experienced: false, link: '#' },
    ]
  },
  {
    id: 'application',
    name: 'Application Layer',
    nameKr: '어플리케이션 레이어',
    color: '#ffd700',
    items: [
      { name: 'Robot Screen UI', nameKr: '로봇 화면 UI', experienced: true, link: '#' },
      { name: 'API Gateway', nameKr: 'API 게이트웨이', experienced: true, link: '#' },
    ]
  },
  {
    id: 'ros-behavior',
    name: 'ROS - Behavior Orchestration',
    nameKr: 'ROS - 행동 오케스트레이션',
    color: '#00d4aa',
    items: [
      { name: 'State Machine / BT', nameKr: '상태 머신 / 행동 트리', experienced: true, link: '#' },
      { name: 'Mission Sequencing', nameKr: '미션 시퀀싱', experienced: true, link: '#' },
      { name: 'Error Recovery', nameKr: '에러 복구', experienced: true, link: '#' },
    ]
  },
  {
    id: 'ros-domain',
    name: 'ROS - Domain Stacks',
    nameKr: 'ROS - 도메인 스택',
    color: '#0099ff',
    items: [
      { name: 'Navigation Stack', nameKr: '네비게이션 스택', experienced: true, link: '#' },
      { name: 'Manipulation Stack', nameKr: '매니퓰레이션 스택', experienced: true, link: '#' },
      { name: 'Perception Stack', nameKr: '퍼셉션 스택', experienced: false, link: '#' },
    ]
  },
  {
    id: 'ros-comm',
    name: 'ROS - Communication',
    nameKr: 'ROS - 통신 레이어',
    color: '#00d4aa',
    items: [
      { name: 'TCPROS / XMLRPC', nameKr: 'TCPROS / XMLRPC', experienced: true, link: '#' },
      { name: 'Topic / Service / Action', nameKr: '토픽 / 서비스 / 액션', experienced: true, link: '#' },
    ]
  },
  {
    id: 'hal',
    name: 'Hardware Abstraction Layer',
    nameKr: '하드웨어 추상화 레이어',
    color: '#9b59b6',
    items: [
      { name: 'ROS Control Framework', nameKr: 'ROS 컨트롤 프레임워크', experienced: true, link: '#' },
      { name: 'Diff Drive Controller', nameKr: '차동 구동 컨트롤러', experienced: true, link: '#' },
      { name: 'Joint State Controller', nameKr: '조인트 상태 컨트롤러', experienced: true, link: '#' },
      { name: 'CAN Node', nameKr: 'CAN 노드', experienced: true, link: '#' },
      { name: 'Serial Node', nameKr: '시리얼 노드', experienced: true, link: '#' },
      { name: 'USB Node', nameKr: 'USB 노드', experienced: true, link: '#' },
    ]
  },
  {
    id: 'os-driver',
    name: 'OS / Kernel Driver Layer',
    nameKr: 'OS / 커널 드라이버 레이어',
    color: '#e74c3c',
    items: [
      { name: 'SocketCAN Subsystem', nameKr: 'SocketCAN 서브시스템', experienced: true, link: '#' },
      { name: 'TTY/Serial Subsystem', nameKr: 'TTY/시리얼 서브시스템', experienced: true, link: '#' },
      { name: 'V4L2/USB Subsystem', nameKr: 'V4L2/USB 서브시스템', experienced: true, link: '#' },
      { name: 'Network Stack', nameKr: '네트워크 스택', experienced: true, link: '#' },
    ]
  },
  {
    id: 'hardware',
    name: 'Physical Layer',
    nameKr: '물리 레이어',
    color: '#95a5a6',
    items: [
      { name: 'Motors (Wheel, Arm)', nameKr: '모터 (휠, 팔)', experienced: true, link: '#' },
      { name: 'Sensors (LiDAR, Camera)', nameKr: '센서 (라이다, 카메라)', experienced: true, link: '#' },
      { name: 'Embedded Controller', nameKr: '임베디드 컨트롤러', experienced: true, link: '#' },
      { name: 'Network Devices', nameKr: '네트워크 장치', experienced: true, link: '#' },
      { name: 'CAN Bus / USB / Serial', nameKr: 'CAN 버스 / USB / 시리얼', experienced: true, link: '#' },
    ]
  },
];

function ArchitectureModal({ onClose }) {
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
        
        <div className="modal-header">
          <h2>시스템 아키텍처</h2>
          <p>Mobile Manipulator Robot System Architecture</p>
          <a
            href="https://notion.so/6f704e03f3734c9b9b2ee5a82e3a0224"
            target="_blank"
            rel="noopener noreferrer"
            className="architecture-notion-link"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466l1.823 1.447zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.166V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.934z"/>
            </svg>
            노션에서 상세 보기
          </a>
        </div>
        
        <div className="architecture-container">
          <div className="architecture-diagram">
            {architectureLayers.map((layer, index) => (
              <div 
                key={layer.id}
                className={`architecture-layer ${selectedLayer === layer.id ? 'selected' : ''}`}
                style={{ '--layer-color': layer.color }}
                onClick={() => setSelectedLayer(selectedLayer === layer.id ? null : layer.id)}
              >
                <div className="layer-header">
                  <span className="layer-name">{layer.name}</span>
                  <span className="layer-name-kr">{layer.nameKr}</span>
                </div>
                
                <div className="layer-items">
                  {layer.items.map((item, idx) => (
                    <div 
                      key={idx}
                      className={`layer-item ${item.experienced ? 'experienced' : ''}`}
                      onMouseEnter={() => setHoveredItem(`${layer.id}-${idx}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <span className="item-indicator"></span>
                      <span className="item-label">{item.nameKr}</span>
                      {hoveredItem === `${layer.id}-${idx}` && item.experienced && (
                        <span className="item-link-hint">클릭하여 상세 보기</span>
                      )}
                    </div>
                  ))}
                </div>
                
                {index < architectureLayers.length - 1 && (
                  <div className="layer-connector">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12l7 7 7-7"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="architecture-legend">
            <div className="legend-item">
              <span className="legend-indicator experienced"></span>
              <span>직접 개발/수정</span>
            </div>
            <div className="legend-item">
              <span className="legend-indicator"></span>
              <span>사용/설정</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArchitectureModal;
