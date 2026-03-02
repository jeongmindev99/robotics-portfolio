/**
 * learningData.js — What I'm Learning 섹션 데이터
 *
 * 각 항목 구조:
 *   skill       {string}  기술/주제명
 *   category    {string}  '로보틱스 직무' | 'AI' | '자기개발'
 *   status      {string}  '학습 중' | '학습 예정' | '관심'
 *   description {string}  상세 설명
 */
export const learningItems = [
  {
    skill: 'C++',
    category: '로보틱스 직무',
    status: '학습 중',
    description: '로보틱스 핵심 언어, 기초 문법과 STL 학습 중',
  },
  {
    skill: 'ROS2',
    category: '로보틱스 직무',
    status: '학습 예정',
    description: 'ROS1 경험 기반 ROS2 마이그레이션 준비',
  },
  {
    skill: 'Realtime Systems',
    category: '로보틱스 직무',
    status: '관심',
    description: 'RTOS, PREEMPT_RT 등 실시간 시스템',
  },
];
