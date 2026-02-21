/**
 * growthData.js — How I Grew 섹션 타임라인 데이터
 *
 * 각 항목 구조:
 *   date        {string}  날짜 (YYYY.MM)
 *   title       {string}  마일스톤 제목
 *   description {string}  설명
 *   type        {string}  'start' | 'growth' | 'achievement' | 'milestone'
 *                         → CSS 클래스로 사용 (timeline-item.{type})
 */
export const milestones = [
  {
    date: '2024.03',
    title: '로보틱스 입문',
    description: 'ROS를 전혀 몰랐던 상태에서 로보틱스 세계에 첫 발을 내딛다',
    type: 'start',
  },
  {
    date: '2024.10',
    title: '체계적 문제 해결',
    description: '감으로 하던 디버깅에서 체계적 분석과 문서화로 전환',
    type: 'growth',
  },
  {
    date: '2025.07',
    title: '해외 현장 단독 세팅',
    description: '일본 사이트에서 처음으로 해외 현장을 단독 수행',
    type: 'achievement',
  },
  {
    date: '2025.11',
    title: '전 과정 독립 수행',
    description: '세팅부터 운영까지 로봇 시스템 전체를 혼자 담당',
    type: 'milestone',
  },
];
