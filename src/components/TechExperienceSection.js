import React, { useState } from 'react';
import './TechExperienceSection.css';

const techCategories = [
  {
    id: 'navigation',
    name: 'Navigation & SLAM',
    items: [
      { id: 'stvl', title: 'STVL (Spatio Temporal Voxel Layer)', description: '동적 장애물 환경에서의 costmap layer', details: ['센서 FOV 밖 장애물도 시간 기반 유지', '세 대의 Astra 카메라 테스트', '기존 hz 유지하면서 충돌 회피 성능 향상'], tags: ['ROS', 'Navigation'] },
      { id: 'localization', title: 'Localization Fail Safe', description: 'AMCL 기반 위치 추정 안정성 판단', details: ['Alpha, Weight 값 활용한 안정성 판단', '위치 틀어짐 시 자동 정지', 'threshold 최적화'], tags: ['AMCL', 'Safety'] },
      { id: 'amcl-understanding', title: 'AMCL 위치 추정 이해', description: 'Monte Carlo Localization 알고리즘', details: ['KLD 샘플링을 통한 동적 파티클 수 조절', 'Alpha/Weight 값으로 위치 추정 안정성 판단', '재위치화 (relocalization) 로직 구현'], tags: ['AMCL', 'Localization'] },
      { id: 'emcl2', title: 'EMCL2 위치 추정', description: 'Enhanced Monte Carlo Localization', details: ['AMCL 대비 개선된 위치 추정 알고리즘', '초기 위치 설정 및 재위치화 파라미터 최적화', '다양한 환경에서 scan_topic, initial_pose 설정'], tags: ['EMCL2', 'Localization'] },
      { id: 'cartographer', title: 'Cartographer SLAM', description: '넓은 공간, 긴 복도 환경 지도 작성', details: ['Gmapping 대비 투명 유리 환경에서 월등한 품질', 'Loop Closing으로 긴 복도 휘어짐 자동 보정', '각속도 0.215 rad/s, 선속도 0.274 m/s 최적화'], tags: ['SLAM', 'Cartographer'] },
      { id: 'gmapping', title: 'SLAM (Gmapping) 지도 작성', description: '2D 점유 격자 지도 작성', details: ['파티클 필터 기반 위치 추정 및 지도 생성', '루프 클로징을 통한 누적 오차 보정', '적절한 주행 속도와 파티클 수 설정 노하우'], tags: ['SLAM', 'Gmapping'] },
      { id: 'costmap-layer', title: 'Costmap Layer 구성', description: '네비게이션 비용 맵 레이어 관리', details: ['Static Layer: map_server 정적 지도 로드', 'Obstacle Layer: 센서 기반 동적 장애물 반영', 'Inflation Layer: 장애물 주변 안전 거리 설정'], tags: ['Navigation', 'Costmap'] },
      { id: 'recovery-behavior', title: 'Recovery Behavior 개선', description: '네비게이션 실패 시 복구 로직', details: ['custom recovery behavior 구현', 'rotate recovery 개선', 'clear costmap 전략'], tags: ['Navigation', 'Recovery'] },
      { id: 'global-planner', title: 'Global/Local Planner 이해', description: 'A*, Dijkstra 기반 경로 계획', details: ['global_planner/GlobalPlanner 활용', 'costmap 기반 경로 계획 원리 이해', 'planner_frequency, controller_frequency 최적화'], tags: ['Planning', 'A*'] },
      { id: 'dwa-planner', title: 'DWA Local Planner 튜닝', description: 'Dynamic Window Approach 최적화', details: ['가속도/속도 제한, Trajectory Scoring 조정', 'path_distance_bias, goal_distance_bias 최적화', '좁은 통로 및 곡선 주행 시 부드러운 경로 생성'], tags: ['DWA', 'Planning'] },
      { id: 'teb-planner', title: 'TEB Local Planner 상세 튜닝', description: 'Timed Elastic Band 플래너', details: ['weight_kinematics, weight_obstacle 최적화', 'min_obstacle_dist, inflation_dist 세부 튜닝', '상황별 파라미터 세트 (narrow, door, elevator) 관리'], tags: ['TEB', 'Planning'] },
      { id: 'move-base-flex', title: 'Move Base Flex 경험', description: '유연한 네비게이션 시스템', details: ['mbf_costmap_nav 패키지 기반 시스템 구축', '기존 move_base 대비 유연한 플래너/컨트롤러 전환', 'Recovery Behavior 커스터마이징'], tags: ['MBF', 'Navigation'] },
      { id: 'map-server', title: 'Map Server 활용', description: '다중 맵 관리 및 전환 시스템', details: ['map_server로 정적 지도 로드', 'map_saver로 SLAM 지도 저장', 'virtual_map_server로 가상벽 지도 관리'], tags: ['Map', 'ROS'] },
      { id: 'zone-virtualwall', title: '존(Zone) 및 가상벽 세팅', description: '네비게이션 영역 구분 관리', details: ['virtual_costmap_layer로 가상벽 설정', 'watt_rviz_tool 플러그인으로 시각적 존 편집', '다층 건물 층별 존 설정 및 관리'], tags: ['Zone', 'Navigation'] },
      { id: 'costmap-check', title: 'Costmap 장애물 체크', description: '장애물 셀 수 계산 모듈', details: ['Global/Local Costmap에서 장애물 밀도 판단', '특정 영역의 장애물 분석으로 경로 결정 지원', 'Inflation Layer 이해 및 파라미터 튜닝'], tags: ['Costmap', 'Analysis'] },
    ],
  },
  {
    id: 'perception',
    name: 'Perception & Vision',
    items: [
      { id: 'pointcloud-processing', title: 'PointCloud 처리', description: '3D 포인트클라우드 기반 인식', details: ['박스 크기 추정 알고리즘', 'plane segmentation', 'clustering 및 필터링'], tags: ['PCL', '3D Vision'] },
      { id: 'gpt4o-ocr', title: 'GPT-4o OCR 연동', description: 'Vision LLM 기반 송장 인식', details: ['GPT-4o API 연동', '송장 템플릿 처리', '정확도 50%→90% 개선'], tags: ['GPT-4o', 'OCR'] },
      { id: 'nodelet-optimization', title: 'Nodelet 기반 최적화', description: '인식 모듈 처리 속도 개선', details: ['zero-copy 데이터 전송', 'TCP/IP 직렬화 없이 메모리 직접 참조', '2초→0.5초 단축'], tags: ['Nodelet', 'Optimization'] },
      { id: 'camera-calibration', title: '카메라 캘리브레이션', description: '다중 카메라 캘리브레이션', details: ['intrinsic/extrinsic 캘리브레이션', 'hand-eye calibration', 'depth-rgb 정합'], tags: ['Calibration', 'Camera'] },
      { id: 'tf-calibration', title: '카메라 TF 캘리브레이션', description: 'Astra 카메라 TF 튜닝', details: ['watt_tf_tuner 패키지로 TF 튜닝', '라이다 기준으로 PointCloud-LaserScan 정렬', 'rqt_reconfigure로 실시간 조정'], tags: ['TF', 'Calibration'] },
      { id: 'yolov8', title: 'YOLOv8 객체 탐지', description: '실시간 객체 탐지 모델 적용', details: ['순찰로봇용 사람/물체 탐지', 'custom 모델 학습', 'inference 최적화'], tags: ['YOLOv8', 'Deep Learning'] },
      { id: 'darknet-ros', title: '엘리베이터 버튼 인식 (Darknet ROS)', description: 'YOLOv3 기반 버튼 검출', details: ['3D 법선 벡터 추정으로 버튼 위치 파악', 'StatisticalOutlierRemoval로 노이즈 제거', 'D405 카메라 반사 오인 문제 해결'], tags: ['YOLO', 'Detection'] },
      { id: 'opencv', title: 'OpenCV 이미지 처리', description: '송장 이미지 크롭 및 전처리', details: ['Edge Detection, 임계처리, 템플릿 매칭', 'v4l2 기반 카메라 제어', '다양한 조명 환경 대응 전처리 로직'], tags: ['OpenCV', 'Image Processing'] },
      { id: 'box-estimation', title: '박스 크기 추정', description: '3D 카메라 기반 크기 추정', details: ['RealSense 기반 박스 크기 추정 모듈', 'PointCloud2 데이터 처리 및 평면 감지', '판교/잠실 시연 성공'], tags: ['3D Vision', 'Estimation'] },
      { id: 'depth-camera', title: 'Depth 카메라 활용', description: 'Astra/RealSense 깊이 카메라', details: ['depth image 처리', 'point cloud 생성', '거리 측정 정확도 개선'], tags: ['Depth', 'Camera'] },
      { id: 'depth-noise', title: 'Depth 카메라 노이즈 대응', description: '깊이 카메라 노이즈 문제 해결', details: ['RealSense, Orbbec Astra 다양한 경험', 'statistical filtering으로 노이즈 제거', '반사 재질 depth 오인 문제 해결'], tags: ['Depth', 'Filtering'] },
      { id: 'pcl-filtering', title: 'PCL 필터링', description: 'Point Cloud Library 필터 적용', details: ['Voxel Grid 필터로 다운샘플링', 'Statistical Outlier Removal로 노이즈 제거', 'RANSAC 평면 모델로 바닥면 필터링'], tags: ['PCL', 'Filtering'] },
      { id: 'ground-filter', title: 'Ground Filter 구현', description: 'TF2 기반 바닥면 필터링', details: ['base_footprint 기준 바닥면 거리 계산', 'ground_plane_slope 파라미터 설정', '실시간 필터링 콜백 구현'], tags: ['PCL', 'Ground'] },
      { id: 'pc-to-laserscan', title: 'PointCloud to LaserScan', description: '3D→2D 데이터 변환', details: ['depthimage_to_laserscan으로 변환', 'pointcloud_to_laserscan 활용', '네비게이션용 통합 스캔 데이터 생성'], tags: ['Conversion', 'LaserScan'] },
      { id: 'multi-camera', title: '다중 카메라 관리', description: '4대 카메라 동시 운용', details: ['카메라 동기화', 'bandwidth 관리', 'USB hub 안정화'], tags: ['Camera', 'System'] },
    ],
  },
  {
    id: 'communication',
    name: 'Communication & Protocol',
    items: [
      { id: 'mqtt', title: 'MQTT 통신 시스템', description: '관제-로봇 간 실시간 통신', details: ['QoS 레벨 최적화', 'reconnection 로직', '메시지 손실률 0.1% 이하'], tags: ['MQTT', 'Protocol'] },
      { id: 'inorbit', title: 'InOrbit 관제 연동', description: '로봇 관제 시스템 연동', details: ['실시간 데이터 시각화', '4개 카메라 스트리밍', '원격 네비게이션 제어'], tags: ['Fleet Management', 'Real-time'] },
      { id: 'telegram-bot', title: 'Telegram Bot 연동', description: '메신저 기반 로봇 제어', details: ['명령어 기반 제어', '상태 알림 전송', '이미지 실시간 전송'], tags: ['Telegram', 'Bot'] },
      { id: 'rosbridge', title: 'ROSBridge WebSocket', description: 'Web 기반 ROS 통신', details: ['웹 대시보드 연동', 'JSON 메시지 변환', '실시간 토픽 모니터링'], tags: ['ROSBridge', 'WebSocket'] },
      { id: 'rest-api', title: 'REST API 연동', description: '외부 서비스 API 연동', details: ['Firestore 실시간 데이터베이스 연동', 'Microsoft Teams API 연동 (알림/모니터링)', 'OneDrive API 연동 (파일 업로드/다운로드)'], tags: ['REST', 'API'] },
      { id: 'serial-comm', title: '시리얼 통신', description: 'MCU-PC 시리얼 통신', details: ['pyserial 기반 통신', '프로토콜 정의', '에러 핸들링'], tags: ['Serial', 'Communication'] },
      { id: 'uart-serial', title: 'UART 시리얼 통신', description: '비동기식 직렬 통신', details: ['비동기식 직렬 통신 원리 이해 (Tx/Rx, 시작/정지 비트)', 'pyserial로 마이크로컨트롤러-ROS 노드 간 통신 구현', 'Baud Rate 설정 (9600, 115200bps 등) 및 프레임 구성', 'ESP32, Arduino와 ROS 간 데이터 교환 경험', '패리티 비트를 통한 오류 검출 개념 이해'], tags: ['UART', 'Serial', 'Communication'] },
      { id: 'can-protocol', title: 'CAN 통신', description: '모터 드라이버 CAN 통신', details: ['CAN 프로토콜 분석', 'socketcan 활용', '모터 상태 모니터링'], tags: ['CAN', 'Protocol'] },
      { id: 'myactuator-can', title: 'MyActuator CAN 통신', description: 'CAN 프로토콜 직접 구현', details: ['GitHub 오픈소스 한계로 직접 구현', 'RMD-X8-P20-120 모터 CAN 제어', '시스템 라이브러리로 사용 가능하도록 정리'], tags: ['MyActuator', 'CAN'] },
      { id: 'elevator-api', title: '엘리베이터 API 연동', description: '엘리베이터 호출 시스템', details: ['API 프로토콜 분석', '호출/도착 상태 관리', '타임아웃 처리'], tags: ['Elevator', 'Integration'] },
      { id: 'building-infra', title: '빌딩 인프라 연동', description: '엘리베이터/자동문 통합 제어', details: ['엘리베이터 API 기반 호출 및 탑승/하차 연동', '자동문 열림/닫힘 상태 확인 및 제어', '멀티 엘리베이터 대응 로직 구현'], tags: ['Building', 'Integration'] },
      { id: 'ros-comm-patterns', title: 'ROS 통신 패턴', description: 'Topic/Service/Action 활용', details: ['토픽: 비동기 발행/구독 통신', '서비스: 동기 요청/응답 통신', '액션: 장기 작업 + 피드백'], tags: ['ROS', 'Communication'] },
      { id: 'network-setup', title: '네트워크 설정 경험', description: '로봇 네트워크 환경 구축', details: ['로봇 PC 고정 IP 설정 및 서브넷 구성', 'NTP 시간 동기화 설정', 'SSH 원격 접속 환경 구축'], tags: ['Network', 'Setup'] },
    ],
  },
  {
    id: 'architecture',
    name: 'System & Architecture',
    items: [
      { id: 'import-manager', title: 'Import Manager 리팩토링', description: '코드 통합 및 동시성 해결', details: ['흩어진 코드 통합', '동시성 문제 해결', '스레드 기반 처리'], tags: ['Python', 'Refactoring'] },
      { id: 'flexbe', title: 'FlexBE 상태 머신', description: '배송 시나리오 상태 관리', details: ['시각적 상태 머신 설계', '모듈화된 behavior 개발', '시나리오 수정 시간 70% 단축'], tags: ['FlexBE', 'State Machine'] },
      { id: 'diagnostics', title: 'ROS Diagnostics 적용', description: '시스템 상태 모니터링', details: ['Localization, 비상정지, 모터, 배터리 상태 모니터링', 'InOrbit 관제에 시각화 연동', '계층적 상태 구조화 (센서, 모터 등)'], tags: ['Diagnostics', 'Monitoring'] },
      { id: 'launch-system', title: 'Launch 파일 구성 경험', description: '복잡한 launch 파일 구조화', details: ['arg, param, rosparam, include 태그 활용', '조건부 실행 (if/unless) 및 remap 설정', '다중 카메라, 센서, 네비게이션 통합 런치'], tags: ['Launch', 'ROS'] },
      { id: 'auto-start', title: '로봇 자동 실행 (systemd)', description: '부팅 시 자동 시작', details: ['systemd 서비스 파일 작성 및 관리', '.desktop 파일로 GUI 세션 자동 실행', '컨테이너 상태 확인 및 자동 백업 스크립트'], tags: ['Systemd', 'DevOps'] },
      { id: 'config-management', title: '설정 관리 시스템', description: '사이트별 설정 관리', details: ['yaml 기반 설정', '환경 변수 활용', '설정 검증 로직'], tags: ['Config', 'Management'] },
      { id: 'dynamic-reconfigure', title: 'Dynamic Reconfigure 활용', description: '런타임 파라미터 동적 변경', details: ['TEB Local Planner 파라미터 동적 변경', 'YAML 파일로 파라미터 저장/로드', '서비스 인터페이스로 상황별 파라미터 전환'], tags: ['Dynamic', 'Reconfigure'] },
      { id: 'logging-system', title: '로깅 시스템', description: '디버깅용 로그 관리', details: ['로그 레벨 관리', '파일 로테이션', '원격 로그 수집'], tags: ['Logging', 'Debug'] },
      { id: 'error-handling', title: '에러 처리 체계', description: '시스템 에러 처리 표준화', details: ['예외 처리 패턴', '에러 복구 로직', '알림 시스템 연동'], tags: ['Error Handling', 'Reliability'] },
      { id: 'ros-control', title: 'ros_control 프레임워크', description: 'Hardware Interface 구현', details: ['Hardware Interface (read/write) 구현', 'Controller Manager로 컨트롤러 관리', '실시간 제어 루프 구조 이해'], tags: ['ros_control', 'Framework'] },
      { id: 'urdf-xacro', title: 'URDF/Xacro 통합', description: '로봇 모델 정의 파일 관리', details: ['Xarm6 로봇팔 xacro를 모바일 베이스에 통합', 'robot_state_publisher, joint_state_publisher 연동', 'TF 구성 커스터마이징'], tags: ['URDF', 'Xacro'] },
      { id: 'problem-solving', title: '체계적 문제 해결 방법론', description: '감에서 체계로 전환', details: ['문제 정의 → 분해 → 가설 수립 → 검증', '현상과 문제 분리, "왜?"를 5번 물어 근본 원인 파악', 'MECE 기반 문제 분해 및 우선순위 설정'], tags: ['Problem Solving', 'Methodology'] },
      { id: 'watt-metrics', title: '로봇 운영 지표 (와트 지표)', description: '운영 품질 모니터링 시스템', details: ['배송 성공률, 이동 시간, 장애물 회피 횟수 수집', '운영 로그 분석 및 실시간 패치 역량 확보', '서비스 품질 모니터링 자동화'], tags: ['Metrics', 'Monitoring'] },
      { id: 'emergency-stop', title: '비상정지 시스템 구현', description: 'HW/SW 비상정지 시스템', details: ['하드웨어 비상정지: 릴레이 기반 물리적 전원 차단', '소프트웨어 비상정지: cmd_vel zero 발행 + 모터 제어 정지', 'Diagnostics 연동으로 비상정지 상태 모니터링', '비상정지 해제 서비스 인터페이스 구현', '로봇팔 safety 모드 강제 활성화 로직'], tags: ['Safety', 'Emergency Stop'] },
      { id: 'kinematics', title: '기구학 (Kinematics) 이해', description: '로봇 관절/바퀴 운동학', details: ['Forward Kinematics: 관절 각도 → 말단 위치 계산', 'Inverse Kinematics: 목표 위치 → 관절 각도 계산', 'MoveIt에서 IK solver 활용 (Xarm6 로봇팔)', 'Differential Drive 기구학 이해 (cmd_vel → 바퀴 속도)', 'Swerve Drive 기구학 (4바퀴 독립 조향/구동)'], tags: ['Kinematics', 'MoveIt', 'IK'] },
    ],
  },
  {
    id: 'hardware',
    name: 'Hardware & Integration',
    items: [
      { id: 'arduino-opta', title: 'Arduino Opta', description: 'PLC 대체 솔루션', details: ['Opta 기능 테스트', '제어 코드 개발', 'PLC 대체 적용'], tags: ['Arduino', 'PLC'] },
      { id: 'esp32-motor', title: 'ESP32 모터 제어', description: 'ESP32 기반 모터 제어', details: ['Waveshare ESP32 기반 펌웨어 개발', 'Serial, GPIO, MQTT 통신 실험 및 적용', '임베디드-ROS 연계 기반 확보'], tags: ['ESP32', 'Motor'] },
      { id: 'myactuator', title: 'Myactuator 모터', description: '산업용 액추에이터 제어', details: ['CAN 프로토콜 분석', '위치/속도 제어', '토크 제한 설정'], tags: ['Actuator', 'CAN'] },
      { id: 'lidar-setup', title: 'LiDAR 셋업', description: 'SICK/Velodyne LiDAR 설정', details: ['IP 설정 및 연결', '스캔 데이터 변환', '노이즈 필터링'], tags: ['LiDAR', 'Sensor'] },
      { id: 'laser-filter', title: 'Laser Scan Filter', description: '스캔 데이터 필터링', details: ['laser_filters 패키지로 필터링', 'scan_filtered 토픽으로 노이즈 제거', '각도 범위, 거리 제한 필터 설정'], tags: ['LaserScan', 'Filter'] },
      { id: 'imu-setup', title: 'IMU 세팅 및 TF 구성', description: 'IMU 센서 보정 및 설정', details: ['IMU 센서의 TF 좌표계 설정', '오도메트리 계산을 위한 IMU 방향 세팅', 'robot_localization 연동'], tags: ['IMU', 'Calibration'] },
      { id: 'battery-monitoring', title: '배터리 모니터링', description: '배터리 상태 모니터링', details: ['와트 지표 개발', 'SOC 추정', '충전 상태 관리'], tags: ['Battery', 'Monitoring'] },
      { id: 'door-control', title: '도어 제어', description: '자동문 개폐 제어', details: ['GPIO 신호 제어', '타이밍 관리', '안전 인터락'], tags: ['Door', 'GPIO'] },
      { id: 'charging-dock', title: '충전 도킹', description: '자동 충전 시스템', details: ['도킹 alignment', 'contact 감지', '충전 상태 모니터링'], tags: ['Charging', 'Docking'] },
      { id: 'lidar-docking', title: 'LiDAR 기반 도킹 시스템', description: 'V자 도킹부 인식 및 위치 추정', details: ['두 선분 추정으로 도킹부 접점 TF 계산', 'offset_dock, offset_pre_dock 파라미터 튜닝', 'first_look 파라미터로 동적/정적 도킹 선택'], tags: ['LiDAR', 'Docking'] },
      { id: 'mobile-manipulator', title: 'Mobile Manipulator 세팅', description: 'Xarm6 + Swerve 드라이브 통합', details: ['MoveIt 연동으로 로봇팔 모션 플래닝', 'Position Controller 기반 Joint 제어', '네비게이션 + 로봇팔 동시 제어 환경 구축'], tags: ['Manipulator', 'MoveIt'] },
      { id: 'swerve-drive', title: 'Swerve Drive 컨트롤러', description: '4바퀴 독립 조향/구동 제어', details: ['swerve_controller로 제어', 'cmd_vel → 각 바퀴별 속도/각도 변환', 'ros_control 프레임워크 기반 구현'], tags: ['Swerve', 'Controller'] },
      { id: 'udev', title: 'udev 장치 관리', description: 'USB 장치 관리', details: ['USB 장치 정보 확인 (udevadm info)', 'udev rules로 장치 고정 경로 설정', '라이다, 카메라 등 다중 USB 장치 관리'], tags: ['udev', 'Device'] },
      { id: 'barometer-floor', title: '기압계 기반 층 감지 시스템', description: 'Kalman 필터 기반 고도 추정', details: ['Kalman 필터로 기압계 데이터 기반 고도(/kalman_h) 추정', '각 층별 절대 고도값 샘플링 후 층고 계산 스크립트 개발', 'floor_calculator.yaml로 층 리스트, 층고, 엘리베이터 속도 설정', '다층 건물 엘리베이터 연동 시 정확한 층 판단', '온도 변화에 따른 값 드리프트 대응 노하우'], tags: ['Barometer', 'Kalman Filter', 'Floor Detection'] },
      { id: 'pwm-control', title: 'PWM (Pulse Width Modulation) 제어', description: '듀티 사이클 기반 제어', details: ['듀티 사이클 조절로 LED 밝기, 모터 속도 제어', 'Arduino/ESP32 analogWrite로 PWM 신호 생성', '고속 스위칭 + 잔상 효과 원리 이해', '전류 제한 회로 설계 (Ohm\'s Law 기반 저항값 계산)', '로봇 상태등, 모터 제어에 적용'], tags: ['PWM', 'Arduino', 'Motor Control'] },
      { id: 'encoder-odometry', title: '엔코더 기반 오도메트리', description: '바퀴 회전 기반 위치 추정', details: ['A/B 위상 엔코더로 바퀴 회전 방향/속도 측정', 'tick_to_rad 변환으로 joint state 갱신', 'diff_drive_controller와 연동한 오도메트리 계산', 'wheel_radius, track(wheel separation) 파라미터 설정', '/odom 토픽으로 로봇 위치/방향 추정'], tags: ['Encoder', 'Odometry', 'Wheel'] },
      { id: 'battery-management', title: '배터리 관리 시스템', description: '자동 충전/배송 전환', details: ['배터리 잔량 기반 충전/배송 자동 전환 로직', 'threshold 설정 (20% 이하 충전, 80% 이상 배송 시작)', 'FlexBE와 연동한 충전 시나리오 구현', '충전 실패 시 재시도 정책 구현', 'Diagnostics로 배터리 상태 모니터링'], tags: ['Battery', 'Charging', 'FlexBE'] },
    ],
  },
  {
    id: 'devops',
    name: 'Tools & DevOps',
    items: [
      { id: 'git-workflow', title: 'Git 워크플로우', description: '팀 협업용 Git 관리', details: ['브랜치 전략', 'PR 리뷰 프로세스', '충돌 해결'], tags: ['Git', 'Collaboration'] },
      { id: 'docker', title: 'Docker 컨테이너 운영', description: 'ROS 환경 컨테이너화', details: ['일본 사이트 Docker 기반 ROS 시스템 운영', '시간 기반 컨테이너 자동 시작/중지', 'systemd 서비스로 컨테이너 상태 모니터링'], tags: ['Docker', 'DevOps'] },
      { id: 'ssh-remote', title: 'SSH 원격 개발', description: '현장 로봇 원격 접속', details: ['SSH 터널링', 'VSCode Remote', '파일 동기화'], tags: ['SSH', 'Remote'] },
      { id: 'rosbag', title: 'Rosbag 활용', description: '데이터 기록 및 재생', details: ['토픽 필터링 기록', '재생 속도 조절', '데이터 분석'], tags: ['Rosbag', 'Debug'] },
      { id: 'rosbag-recorder', title: 'Rosbag Recorder Node', description: '커스텀 rosbag 노드 개발', details: ['서비스 인터페이스로 배송/복귀 플로우별 자동 기록', '일정 기간 후 자동 삭제 기능', '특정 토픽만 선택적 기록하여 용량 최적화'], tags: ['Rosbag', 'Node'] },
      { id: 'rviz-config', title: 'RViz 설정', description: '시각화 환경 구성', details: ['커스텀 config 작성', 'marker 시각화', '디버깅 뷰 구성'], tags: ['RViz', 'Visualization'] },
      { id: 'rqt-tools', title: 'rqt 도구 활용', description: 'ROS GUI 도구 활용', details: ['rqt_graph 분석', 'rqt_plot 모니터링', 'rqt_console 로깅'], tags: ['rqt', 'Tools'] },
      { id: 'ros-debug', title: 'ROS 디버깅 도구 활용', description: '종합 디버깅 환경', details: ['rostopic echo/hz/bw로 토픽 데이터 분석', 'rosservice call로 서비스 테스트', 'rqt_reconfigure로 파라미터 실시간 조정'], tags: ['Debug', 'Tools'] },
      { id: 'shell-script', title: 'Shell Script 자동화', description: '반복 작업 자동화', details: ['SSH 키 기반 원격 접속 자동화', '부팅 시 네트워크 상태 확인 후 ROS 실행', '환경 변수 기반 자동 실행 제어'], tags: ['Shell', 'Automation'] },
      { id: 'automation-script', title: '자동화 스크립트', description: '시스템 자동화', details: ['로봇 부팅 시 핵심 노드 자동 실행', 'Docker 컨테이너 자동 실행 및 상태 체크', '세팅 간편화를 위한 셸 스크립트 제작'], tags: ['Automation', 'Script'] },
      { id: 'documentation', title: '기술 문서화', description: '시스템 문서 작성', details: ['세팅 매뉴얼', 'API 문서', '트러블슈팅 가이드'], tags: ['Documentation', 'Manual'] },
      { id: 'catkin-build', title: 'catkin 빌드 시스템', description: 'ROS 워크스페이스 빌드', details: ['catkin_make, catkin build로 ROS 워크스페이스 빌드', 'CMakeLists.txt에서 의존성, 실행 파일, 라이브러리 정의', 'package.xml로 패키지 메타데이터 및 의존성 관리', 'catkin → CMake → make 호출 구조 이해', '여러 패키지 동시 빌드 및 의존성 순서 해결'], tags: ['catkin', 'CMake', 'Build'] },
      { id: 'gazebo-simulation', title: 'Gazebo 시뮬레이션 환경', description: 'ROS-Gazebo 연동 시뮬레이션', details: ['gazebo_ros로 ROS-Gazebo 연동 시뮬레이션 환경 구축', 'SDF(Simulation Description Format) world 파일 작성', 'ODE 물리 엔진 파라미터 조정 (gravity, step_size, solver)', 'URDF 로봇 모델 Gazebo spawn 및 테스트', 'use_sim_time 파라미터로 시뮬레이션 시간 동기화'], tags: ['Gazebo', 'Simulation', 'SDF'] },
      { id: 'python-testing', title: 'Python 테스트 프레임워크', description: '단위 테스트 및 통합 테스트', details: ['unittest로 단위 테스트 작성 및 실행', 'pytest로 간결한 테스트 코드 작성', 'unittest.mock으로 외부 의존성 모킹', 'doctest로 docstring 기반 테스트', '함수 단위 테스트 및 통합 테스트 경험'], tags: ['Python', 'Testing', 'pytest'] },
    ],
  },
  {
    id: 'ros-dev',
    name: 'ROS Development',
    items: [
      { id: 'ros-python', title: 'ROS Python 노드 개발', description: 'rospy 기반 노드 개발', details: ['Publisher/Subscriber 노드 개발', 'Service Server/Client 구현', 'cv_bridge로 OpenCV-ROS 이미지 변환'], tags: ['rospy', 'Python'] },
      { id: 'ros-cpp', title: 'ROS C++ 노드 개발', description: 'roscpp 기반 노드 개발', details: ['NodeHandle 및 콜백 기반 아키텍처', 'PCL-ROS 통합 (pcl_ros, pcl_conversions)', 'CMakeLists.txt, package.xml 설정'], tags: ['roscpp', 'C++'] },
      { id: 'tf-coordinate', title: 'TF (Transform) 좌표계', description: '다중 좌표계 관리', details: ['다중 카메라 TF 구성 및 캘리브레이션', 'static_transform_publisher로 센서 좌표계 설정', 'tf2_ros Buffer/Listener 활용'], tags: ['TF', 'Coordinate'] },
      { id: 'cmd-vel-mux', title: 'cmd_vel_mux 속도 명령 관리', description: '속도 명령 우선순위 관리', details: ['topic_tools/mux를 활용한 우선순위 관리', '네비게이션/텔레옵/비상정지 간 cmd_vel 전환', 'emergency_stopper 노드로 안전 정지'], tags: ['cmd_vel', 'mux'] },
      { id: 'teleop', title: 'Teleop 키보드 제어', description: '로봇 수동 조작', details: ['teleop_twist_keyboard로 로봇 조작', 'twist 메시지 (linear.x, angular.z) 제어', 'Mobile Manipulator 텔레옵 테스트'], tags: ['Teleop', 'Control'] },
      { id: 'assisted-teleop', title: 'Assisted Teleop 구현', description: '장애물 회피 기반 텔레옵', details: ['원격 조종 시 자동 장애물 회피', 'input cmd_vel → output cmd_vel 변환', '안전한 원격 제어 구현'], tags: ['Teleop', 'Assisted'] },
      { id: 'python-threading', title: 'Python 멀티스레딩/비동기', description: '병렬 처리 및 비동기 통신', details: ['threading 모듈로 병렬 처리 구현 (Import Manager)', 'asyncio/aiohttp 기반 비동기 HTTP 통신', 'ROS 콜백과 비동기 반복문 통합', '동시성 문제 해결 경험 (Lock, Event 활용)'], tags: ['Python', 'Threading', 'Async'] },
      { id: 'custom-msg-srv', title: 'Custom 메시지/서비스 정의', description: '사용자 정의 ROS 인터페이스', details: ['.msg 파일로 사용자 정의 메시지 타입 생성', '.srv 파일로 Request/Response 서비스 정의', '.action 파일로 Goal/Feedback/Result 액션 정의', 'CMakeLists.txt에 add_message_files, generate_messages 설정', '패키지 의존성 message_generation, message_runtime 관리'], tags: ['ROS', 'Message', 'Service'] },
      { id: 'ros-namespace', title: 'ROS 네임스페이스/리맵', description: '토픽/서비스 충돌 방지', details: ['노드 네임스페이스로 토픽/서비스 충돌 방지', 'launch 파일 remap 태그로 토픽명 동적 변경', 'tf_prefix로 TF 트리 분리 및 다중 로봇 환경 지원', 'rospy.get_namespace()로 동적 네임스페이스 처리', '다중 로봇 운영 시 네임스페이스 기반 분리'], tags: ['ROS', 'Namespace', 'Remap'] },
    ],
  },
  {
    id: 'debugging',
    name: 'Debugging & Troubleshooting',
    items: [
      { id: 'network-debug', title: '네트워크 디버깅', description: '통신 문제 해결', details: ['wireshark 분석', 'ping/traceroute', '방화벽 설정'], tags: ['Network', 'Debug'] },
      { id: 'tf-debug', title: 'TF 디버깅', description: 'Transform 문제 해결', details: ['tf tree 분석', 'static transform 설정', '시간 동기화'], tags: ['TF', 'Debug'] },
      { id: 'memory-leak', title: '메모리 누수 분석', description: '메모리 문제 진단', details: ['valgrind 분석', 'Python memory profiler', 'top/htop 모니터링'], tags: ['Memory', 'Profiling'] },
      { id: 'cpu-profiling', title: 'CPU 프로파일링', description: 'CPU 사용량 최적화', details: ['cProfile 분석', '병목 구간 식별', '멀티프로세싱 적용'], tags: ['CPU', 'Profiling'] },
      { id: 'sensor-debug', title: '센서 디버깅', description: '센서 데이터 문제 해결', details: ['raw 데이터 분석', '노이즈 필터링', '캘리브레이션 확인'], tags: ['Sensor', 'Debug'] },
      { id: 'motor-debug', title: '모터 디버깅', description: '모터 제어 문제 해결', details: ['엔코더 데이터 확인', 'PID 튜닝', '전류 모니터링'], tags: ['Motor', 'Debug'] },
      { id: 'nav-debug', title: '네비게이션 디버깅', description: '주행 문제 해결', details: ['costmap 시각화', 'path 분석', '속도 프로파일 확인'], tags: ['Navigation', 'Debug'] },
      { id: 'field-debug', title: '현장 디버깅', description: '현장 문제 즉시 해결', details: ['원격 접속 디버깅', '로그 실시간 분석', '긴급 패치 배포'], tags: ['Field', 'Troubleshooting'] },
    ],
  },
];

function TechExperienceSection() {
  const [expandedId, setExpandedId] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState('navigation');

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const totalCount = techCategories.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <section id="tech-experience" className="tech-experience-section section">
      <div className="container">
        <div className="section-header">
          <span className="section-number">05</span>
          <h2 className="section-title">Technical Deep Dive</h2>
          <p className="section-subtitle">
            프로젝트 외 추가 기술 경험 ({totalCount}개)
          </p>
        </div>

        <div className="category-tabs">
          {techCategories.map((category) => (
            <button
              key={category.id}
              className={`category-tab ${expandedCategory === category.id ? 'active' : ''}`}
              onClick={() => setExpandedCategory(category.id)}
            >
              {category.name}
              <span className="category-count">{category.items.length}</span>
            </button>
          ))}
        </div>

        <div className="tech-grid">
          {techCategories
            .find((cat) => cat.id === expandedCategory)
            ?.items.map((tech) => (
              <div
                key={tech.id}
                className={`tech-card ${expandedId === tech.id ? 'expanded' : ''}`}
              >
                <div
                  className="tech-header"
                  onClick={() => toggleExpand(tech.id)}
                >
                  <div className="tech-info">
                    <h3 className="tech-title">{tech.title}</h3>
                    <p className="tech-description">{tech.description}</p>
                  </div>
                  <button className="expand-btn">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{
                        transform: expandedId === tech.id ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s'
                      }}
                    >
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                </div>

                {expandedId === tech.id && (
                  <div className="tech-details">
                    <ul className="detail-list">
                      {tech.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                    <div className="tech-tags">
                      {tech.tags.map((tag, idx) => (
                        <span key={idx} className="tech-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default TechExperienceSection;
