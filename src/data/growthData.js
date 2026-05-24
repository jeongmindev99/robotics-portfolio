/**
 * growthData.js — How I Grew 섹션 타임라인 데이터
 *
 * 각 항목 구조:
 *   date        {string}  날짜 (YYYY.MM)
 *   title       {string}  마일스톤 제목
 *   description {string}  설명
 *   type        {string}  'start' | 'growth' | 'achievement' | 'milestone'
 */
export const milestones = [
  {
    date: '2024.03',
    title: '로보틱스 입문',
    description: 'ROS 기초 학습 및 로보틱스 분야 입문',
    type: 'achievement',
  },
  {
    date: '2024.08',
    title: '투자 유치 PoC 시연 성공',
    description: '소프트뱅크 로보틱스·야마토 본사 PoC 시연 완수. 협로 주행, 카드 태깅, Pose Saver, STVL costmap 등 핵심 모듈을 단기간에 개발·검증',
    type: 'achievement',
  },
  {
    date: '2024.11',
    title: '로봇 시스템 현장 단독 배포',
    description: '특정 사이트 내 로봇 시스템 단독 배포 (환경 구축, 시나리오 구성, 테스트 및 시연 등 전체 프로세스 주도)',
    type: 'achievement',
  },
  {
    date: '2025.03',
    title: '통합 시스템 관점의 트러블슈팅 역량 확보',
    description: '전체 시스템 레이어 관점의 트러블슈팅 역량 확보 및 변수 통제를 통한 문제 원인 분석 체계화',
    type: 'achievement',
  },
  {
    date: '2025.07',
    title: '일본 첫 사이트 배포, 매니퓰레이션 통합',
    description: '일본 팜코트(7월~10월) / 캐널코트(9월~10월) 연속 배포. 로봇팔로 카드 태깅·자동문 통과·엘리베이터 버튼 누르기까지 통합 시나리오 완성',
    type: 'achievement',
  },
  {
    date: '2025.11',
    title: '사이트 단독 기획·수행',
    description: '부산 에코델타 호반써밋 / 수자인 — 일정 계획부터 세팅·연동·운영까지 단독으로 기한 내 완수',
    type: 'achievement',
  },
  {
    date: '2026.01',
    title: 'ROS2 양산 마이그레이션 주도',
    description: 'JamesW1.6 양산 대비 ROS2 / DDS 기반 고가용성 아키텍처 마이그레이션 시작 (가제보 시뮬·실물 HW 포팅·StationXZ 연동·자동화 배포)',
    type: 'achievement',
  },
  {
    date: '2026.02',
    title: '노드 개발에서 시스템 통합 설계로',
    description: '노드 및 모듈 개발을 넘어, 시나리오 구성 및 전체 시스템 설계로 개발 역량 확장',
    type: 'achievement',
  },
];
