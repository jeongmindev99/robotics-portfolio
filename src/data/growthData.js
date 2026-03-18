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
    date: '2026.02',
    title: '노드 개발에서 시스템 통합 설계로',
    description: '노드 및 모듈 개발을 넘어, 시나리오 구성 및 전체 시스템 설계로 개발 역량 확장',
    type: 'achievement',
  },
];
