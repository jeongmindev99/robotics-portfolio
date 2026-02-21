/**
 * phaseData.js — Phase 모달 데이터
 *
 * 각 Phase의 layers 필드 구조:
 *   name        {string}  표시 이름
 *   description {string}  툴팁 설명
 *   experienced {boolean} 경험 여부 (직접 또는 간접)
 *   indirect    {boolean} true면 간접 경험 (시각적으로 구분)
 *   stage       {number}  같은 숫자끼리 병렬 배치, 번호 순으로 위→아래 표시
 *
 * 관리자 페이지 연동 시 이 파일의 데이터를 API로 교체하면 됩니다.
 */

export const phaseDetails = {
  design: {
    description: '로봇 시스템의 기초를 설계하는 단계',
    layers: [
      // Stage 1: 하드웨어 선정 (간접 경험, 병렬 진행)
      { name: '구동계 선정',       description: '모터, 감속기, 모터 드라이버 사양 선정',                  experienced: true,  indirect: true,  stage: 1 },
      { name: '센서 선정',         description: 'LiDAR, 카메라, IMU 등 센서 스펙 및 공급업체 선정',      experienced: true,  indirect: true,  stage: 1 },
      { name: '하드웨어 통신 선정', description: 'CAN, RS-232, USB 등 인터페이스 방식 결정',             experienced: true,  indirect: true,  stage: 1 },
      { name: '컴퓨팅 플랫폼 선정', description: '메인 컴퓨터, MCU, 임베디드 보드 선정',                 experienced: false, indirect: false, stage: 1 },
      // Stage 2: 독립적 설계 (병렬 진행 가능)
      { name: '기구 설계',  description: '로봇의 물리적 구조와 움직임 설계', experienced: false, indirect: false, stage: 2 },
      { name: 'SW 아키텍처', description: '소프트웨어 구조 및 모듈 설계',   experienced: true,  indirect: false, stage: 2 },
      // Stage 3: 상세 설계 (병렬 진행 가능)
      { name: '3D 모델링',    description: '부품 및 어셈블리 3D CAD 모델링',    experienced: false, indirect: false, stage: 3 },
      { name: '배선 설계',    description: '케이블 라우팅 및 커넥터 배치 설계', experienced: false, indirect: false, stage: 3 },
      { name: '회로/PCB 설계', description: '전자 회로 및 PCB 레이아웃 설계',  experienced: false, indirect: false, stage: 3 },
      // Stage 4: 설계 검증 분석 (병렬 진행)
      { name: '응력 분석', description: '기계적 응력 및 피로도 분석 (FEA)', experienced: false, indirect: false, stage: 4 },
      { name: '열 분석',   description: '발열 부품의 방열 설계 및 검증',   experienced: false, indirect: false, stage: 4 },
      { name: 'EMC 분석',  description: '전자기 적합성 및 간섭 분석',      experienced: false, indirect: false, stage: 4 },
      // Stage 5: 마무리 (순차)
      { name: 'BOM 관리', description: '부품 목록 작성 및 원가 관리', experienced: false, indirect: false, stage: 5 },
      { name: '설계 검토', description: '설계 완료 전 다분야 리뷰',  experienced: false, indirect: false, stage: 6 },
    ]
  },

  inspection: {
    description: '조립 전 부품 및 전장품의 품질을 검증하는 단계',
    layers: [
      // Stage 1: 외관 검사 (순차 첫 번째)
      { name: '외관·치수 검사', description: '부품 손상, 이물질, 마킹 및 기구 공차 확인', experienced: false, stage: 1 },
      // Stage 2: 전기/기능 검증 (병렬)
      { name: 'PCB 검사',      description: 'PCB 납땜 상태 및 패턴 검사',            experienced: false, stage: 2 },
      { name: '전기 테스트',   description: '절연 저항, 도통, 전압 측정',            experienced: false, stage: 2 },
      { name: 'CAN 통신 테스트', description: '모터 드라이버, 센서 CAN 통신 검증',  experienced: true,  stage: 2 },
      { name: '모터 테스트',   description: '정/역방향 회전, 토크, 전류 테스트',     experienced: true,  stage: 2 },
      { name: '센서 테스트',   description: 'LiDAR, 카메라, IMU 데이터 검증',       experienced: true,  stage: 2 },
      { name: '전원 테스트',   description: '배터리 전압, 전류, 충방전 테스트',      experienced: false, stage: 2 },
      // Stage 3: 환경 시험 (병렬)
      { name: '낙하·진동 시험',  description: '기계적 충격 및 진동 내구성 테스트',    experienced: false, stage: 3 },
      { name: '방수·방진 테스트', description: 'IP 등급 기준 침수 및 먼지 차단 테스트', experienced: false, stage: 3 },
      { name: 'EMC 테스트',     description: '전자기 적합성 및 외부 간섭 테스트',     experienced: false, stage: 3 },
      // Stage 4: 기록 (순차 마지막)
      { name: '품질 기록', description: '검사 결과 문서화 및 이력 관리', experienced: false, stage: 4 },
    ]
  },

  assembly: {
    description: '검증된 부품들을 조립하고 캘리브레이션하는 단계',
    layers: [
      // Stage 1: 골격 (순차)
      { name: '프레임 조립', description: '로봇 본체 프레임 및 샤시 조립', experienced: false, stage: 1 },
      // Stage 2: 부품 장착 (병렬)
      { name: '모터 장착',   description: '휠/암 모터 및 감속기 장착',               experienced: false, stage: 2 },
      { name: '센서 장착',   description: 'LiDAR, 카메라, 초음파 센서 마운팅',       experienced: false, stage: 2 },
      { name: '전자부 통합', description: '컨트롤러, 드라이버 보드 장착',             experienced: false, stage: 2 },
      // Stage 3: 배선 (순차)
      { name: '케이블 배선 및 결선', description: '와이어 하네스 제작, 케이블 라우팅, 커넥터 압착/납땜', experienced: false, stage: 3 },
      { name: '접지 처리',          description: '접지 연결 및 본딩',                                   experienced: false, stage: 3 },
      // Stage 4: 외장 마감 (병렬)
      { name: '도장·마감',  description: '표면 처리 및 외장 마감 작업',   experienced: false, stage: 4 },
      { name: '방수 씰링',  description: '커넥터 및 개구부 방수 처리',    experienced: false, stage: 4 },
      // Stage 5: 품질 확인 (순차)
      { name: '무게중심 측정', description: '조립 완료 후 중량 및 무게중심 밸런스 확인', experienced: false, stage: 5 },
      // Stage 6: 캘리브레이션 (병렬)
      { name: '조인트 캘리브레이션', description: '조인트 영점 및 엔코더 정렬',    experienced: true,  stage: 6 },
      { name: '센서 캘리브레이션',   description: '카메라 내외부 파라미터 보정',  experienced: true,  stage: 6 },
      // Stage 7: 통합 검증 (순차 마지막)
      { name: '통합 테스트', description: '조립 완료 후 전체 동작 확인', experienced: false, stage: 7 },
    ]
  },

  development: {
    description: '로봇 소프트웨어 시스템을 개발하는 핵심 단계',
    isArchitecture: true,
  },

  setup: {
    description: '실제 현장에서 로봇을 세팅하고 시나리오를 구성하는 단계',
    layers: [
      // Stage 1: 현장 진입 (순차)
      { name: '현장 평가',          description: '바닥 상태, 네트워크, 장애물 사전 조사',  experienced: true,  stage: 1 },
      // Stage 2: 인프라 구축 (순차)
      { name: '네트워크 인프라 설치', description: 'WiFi AP 설치, 엘리베이터 IO·도어 제어 연동', experienced: false, stage: 2 },
      // Stage 3: 지도 생성 (순차)
      { name: '지도 생성', description: 'SLAM으로 현장 지도 생성 및 편집', experienced: true, stage: 3 },
      // Stage 4: 공간 설정 (병렬)
      { name: '존·구역 설정', description: '엘리베이터, 출입문, 금지 구역 설정', experienced: true, stage: 4 },
      { name: '포즈 등록',    description: '대기, 충전, 배송 위치 좌표 등록',  experienced: true, stage: 4 },
      // Stage 5: 시나리오 구성 (병렬)
      { name: '경로 최적화',   description: '이동 경로 및 대기 전략 최적화',       experienced: false, stage: 5 },
      { name: '시나리오 개발', description: '배송 플로우 및 예외 처리 구현',       experienced: false, stage: 5 },
      { name: '이미지 학습',   description: '버튼, 도어 인식 모델 현장 학습',     experienced: false, stage: 5 },
      { name: '안전 설정',     description: '비상정지, 속도 제한, 안전 구역 설정', experienced: false, stage: 5 },
      // Stage 6: 최종 검증 및 인계 (병렬)
      { name: '통합 시험·인수 테스트', description: '전체 시나리오 반복 테스트 및 고객 입회 최종 검증', experienced: false, stage: 6 },
      { name: '운영 교육',             description: '현장 담당자 교육 및 비상 시 대응 절차 수립',     experienced: false, stage: 6 },
    ]
  },

  operation: {
    description: '배포된 로봇을 모니터링하고 유지보수하는 단계',
    layers: [
      // Stage 1: 실시간 모니터링 (병렬, 상시)
      { name: '실시간 모니터링', description: '로봇 상태, 위치, 배터리 실시간 확인', experienced: true,  stage: 1 },
      { name: '플릿 관리',       description: '다중 로봇 작업 배분 및 스케줄링',    experienced: true,  stage: 1 },
      { name: '알림/경보',       description: '이상 상황 즉시 알림 (SMS, Slack 등)', experienced: true,  stage: 1 },
      // Stage 2: 장애 대응 (병렬, 발생 시)
      { name: '장애 대응', description: '현장 이슈 원격/현장 대응',        experienced: true, stage: 2 },
      { name: '로그 분석', description: '시스템 로그 분석으로 원인 파악',  experienced: true, stage: 2 },
      { name: '원격 지원', description: 'SSH, VPN으로 원격 디버깅',        experienced: true, stage: 2 },
      // Stage 3: 성과 분석 (병렬, 주기적)
      { name: '성능 분석', description: '가동률, 배송 성공률 등 KPI 분석', experienced: true, stage: 3 },
      { name: '리포팅',    description: '운영 현황 보고서 작성',            experienced: true, stage: 3 },
      // Stage 4: 정비 (병렬, 계획적)
      { name: '예방 정비', description: '정기 점검 및 소모품 교체',              experienced: true,  stage: 4 },
      { name: '예측 정비', description: '데이터 기반 고장 예측 및 선제 조치',    experienced: false, stage: 4 },
    ]
  },

  cicd: {
    description: '소프트웨어 배포 및 버전 관리를 자동화하는 단계',
    layers: [
      // Stage 1: 개발 관리 (병렬, 상시)
      { name: '버전 관리', description: 'Git 브랜치 전략 및 태깅',   experienced: true, stage: 1 },
      { name: '코드 리뷰', description: 'PR 기반 코드 리뷰 프로세스', experienced: true, stage: 1 },
      // Stage 2: 자동화 검증 (병렬)
      { name: '자동 빌드', description: '코드 변경 시 자동 빌드 트리거',        experienced: false, stage: 2 },
      { name: '자동 테스트', description: 'Unit/Integration 테스트 자동화',     experienced: false, stage: 2 },
      // Stage 3: 패키징 (병렬)
      { name: '컨테이너화', description: '애플리케이션 컨테이너 이미지 생성', experienced: true, stage: 3 },
      { name: '설정 관리',  description: '환경별 설정 파일 관리',             experienced: true, stage: 3 },
      // Stage 4: 배포 (병렬)
      { name: '배포 자동화', description: '스테이징/프로덕션 자동 배포',       experienced: false, stage: 4 },
      { name: '롤백',        description: '이전 버전으로 신속하게 복구',        experienced: true,  stage: 4 },
      // Stage 5: 릴리스 관리 (병렬)
      { name: '릴리스 관리',   description: '릴리스 노트 및 변경 이력 관리',       experienced: true,  stage: 5 },
      { name: '모니터링 연동', description: '배포 후 헬스체크 및 알림 연동',       experienced: false, stage: 5 },
    ]
  }
};

/**
 * architectureLayers — SW 개발 Phase (아키텍처 뷰) 데이터
 *
 * 레이어 구조:
 *   name         {string}  레이어 이름
 *   type         {string}  'single' | 'horizontal' | 'runtime'
 *   isROS        {boolean} ROS Framework 영역
 *   isOutsideROS {boolean} ROS 외부 상위 레이어
 *   items        {Array}   type이 single/runtime일 때 사용
 *   groups       {Array}   type이 horizontal일 때 사용
 */
export const architectureLayers = [
  {
    name: 'Cloud / External', type: 'single', isOutsideROS: true,
    items: [
      { name: 'Fleet Management', experienced: true },
      { name: 'Database',         experienced: true },
      { name: 'Building API',     experienced: true },
    ]
  },
  {
    name: 'Application', type: 'single', isOutsideROS: true,
    items: [
      { name: 'User Interface',  experienced: true },
      { name: 'REST API',        experienced: true },
      { name: 'Message Bridge',  experienced: true },
    ]
  },
  {
    name: 'Behavior / Orchestration', type: 'single', isROS: true,
    items: [
      { name: 'State Machine',  experienced: true },
      { name: 'Behavior Tree',  experienced: true },
      { name: 'Task Sequencer', experienced: true },
      { name: 'Recovery Logic', experienced: true },
    ]
  },
  {
    name: 'Domain Stacks', type: 'horizontal', isROS: true,
    groups: [
      {
        name: 'Navigation',
        items: [
          { name: 'Localization',    experienced: true },
          { name: 'Costmap',         experienced: true },
          { name: 'Global Planning', experienced: true },
          { name: 'Local Planning',  experienced: true },
          { name: 'Path Execution',  experienced: true },
        ]
      },
      {
        name: 'Manipulation',
        items: [
          { name: 'Motion Planning',     experienced: true },
          { name: 'Kinematics',          experienced: true },
          { name: 'Trajectory Control',  experienced: true },
          { name: 'Gripper Control',     experienced: true },
        ]
      },
      {
        name: 'Perception',
        items: [
          { name: 'Mapping (SLAM)',   experienced: false },
          { name: 'Object Detection', experienced: false },
          { name: 'Sensor Fusion',    experienced: false },
          { name: 'Point Cloud',      experienced: false },
        ]
      },
    ]
  },
  {
    name: 'ROS Communication', type: 'single', isROS: true,
    items: [
      { name: 'Topic (Pub/Sub)', experienced: true },
      { name: 'Service',         experienced: true },
      { name: 'Action',          experienced: true },
      { name: 'TF',              experienced: true },
      { name: 'Parameter',       experienced: true },
    ]
  },
  {
    name: 'Hardware Interface', type: 'single', isROS: true,
    items: [
      { name: 'Controller Manager', experienced: true },
      { name: 'Joint Controllers',  experienced: true },
      { name: 'Sensor Interface',   experienced: true },
      { name: 'Actuator Interface', experienced: true },
    ]
  },
  {
    name: 'Runtime Environment', type: 'runtime',
    items: [
      { name: 'Docker',       experienced: true },
      { name: 'Ubuntu 20.04', experienced: true },
      { name: 'ROS Noetic',   experienced: true },
    ]
  },
  {
    name: 'Device Drivers', type: 'single',
    items: [
      { name: 'LiDAR Driver',  experienced: true },
      { name: 'Camera Driver', experienced: true },
      { name: 'Motor Driver',  experienced: true },
      { name: 'IMU Driver',    experienced: true },
    ]
  },
  {
    name: 'OS / Kernel', type: 'single',
    items: [
      { name: 'SocketCAN', experienced: true },
      { name: 'TTY/Serial', experienced: true },
      { name: 'V4L2',       experienced: true },
      { name: 'USB',        experienced: true },
      { name: 'Network',    experienced: true },
    ]
  },
  {
    name: 'Firmware / MCU', type: 'single',
    items: [
      { name: 'Motor Controller', experienced: true },
      { name: 'Sensor Board',     experienced: true },
      { name: 'Power Management', experienced: true },
    ]
  },
  {
    name: 'Physical', type: 'horizontal',
    groups: [
      {
        name: 'Actuators',
        items: [
          { name: 'Wheel Motors', experienced: true },
          { name: 'Arm Motors',   experienced: true },
          { name: 'Gripper',      experienced: true },
        ]
      },
      {
        name: 'Sensors',
        items: [
          { name: 'LiDAR',   experienced: true },
          { name: 'Camera',  experienced: true },
          { name: 'IMU',     experienced: true },
          { name: 'Encoder', experienced: true },
        ]
      },
      {
        name: 'Power',
        items: [
          { name: 'Battery', experienced: true },
          { name: 'BMS',     experienced: true },
          { name: 'PDU',     experienced: true },
        ]
      },
    ]
  },
];
