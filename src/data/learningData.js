/**
 * learningData.js — What I'm Learning 섹션 데이터
 *
 * 각 항목 구조:
 *   skill       {string}  기술/주제명
 *   status      {string}  '학습 중' | '학습 예정' | '관심'
 *   description {string}  상세 설명
 */
export const learningItems = [
  {
    skill: 'C++ Optimization',
    category: '로보틱스 직무',
    status: '학습 중',
    description: 'Modern C++ (14/17) 패러다임 적용. 스마트 포인터를 활용한 메모리 안전성 확보, 멀티스레딩(Concurrency) 및 성능 최적화 심화 학습 중',
  },
  {
    skill: 'ROS2 Architecture',
    category: '로보틱스 직무',
    status: '학습 중',
    description: 'ROS1 to ROS2 마이그레이션 주도 및 DDS(Data Distribution Service) QoS 튜닝을 통한 노드 간 실시간 통신 최적화',
  },
  {
    skill: 'Real-time Systems (RTOS)',
    category: '로보틱스 직무',
    status: '관심',
    description: 'PREEMPT_RT 커널 패치 등 Linux 환경의 실시간성(Determinism) 확보 및 제어 주기가 보장되는 시스템 아키텍처 연구',
  },
  {
    skill: 'AI-Assisted Engineering',
    category: 'AI',
    status: '학습 중',
    description: 'Claude Code 등 AI 툴을 활용한 Spec-driven 개발 파이프라인 구축. 요구사항 정의부터 코드 생성, 리팩토링까지 AI 페어 프로그래밍을 통한 개발 생산성 극대화',
  },
  {
    skill: 'Robotics DevOps / CI·CD',
    category: '로보틱스 직무',
    status: '학습 중',
    description: 'Docker 기반의 로봇 소프트웨어 컨테이너화. GitHub Actions를 활용한 빌드/테스트 자동화 파이프라인 구축으로 배포 안정성 확보',
  },
  {
    skill: 'Simulation & Digital Twin',
    category: '로보틱스 직무',
    status: '관심',
    description: 'Gazebo 또는 NVIDIA Isaac Sim을 활용한 고정밀 물리 시뮬레이션 환경 구축. 실제(Real)와 가상(Sim) 환경의 갭을 줄이는 테스트 베드 고도화',
  },
];
