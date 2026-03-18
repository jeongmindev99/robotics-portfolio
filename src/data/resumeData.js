/**
 * resumeData.js — 이력서 데이터
 *
 * 섹션: profile, summary, experience, skills,
 *        education, certifications, publications, languages
 *
 * 빈 섹션은 ResumePage에서 자동으로 숨겨집니다.
 */
export const resumeData = {
  profile: {
    name: '최정민',
    nameEn: 'Jeongmin Choi',
    title: 'Robotics Software Engineer',
    email: 'jeongmin.dev99@gmail.com',
    phone: '010-4814-0756',
    github: 'https://github.com/wntdev99',
    linkedin: 'https://www.linkedin.com/in/정민-최-01579b281',
    location: '서울, 대한민국',
  },
  summary:
    '로봇이 개발되고 현장에 배포되어 운영되기까지의 전 과정을 경험한 로보틱스 소프트웨어 엔지니어입니다. ' +
    '하나의 모듈을 완성하는 것을 넘어 시스템 전체를 보는 시야를 키워왔으며, ' +
    'AI 기술을 접목해 개발과 운영의 효율을 극대화하고 실제 고객의 문제를 해결하는 프로덕트를 만들고자 합니다.',
  experience: [
    {
      id: 1,
      company: '(주)와트 — WATT',
      role: 'Robotics Software Engineer',
      period: '2024.05 ~ 재직 중',
      achievements: [
        '택배상자 인식 파이프라인 재설계 — 1초 내 크기 측정(1cm 오차), 송장 인식률 개선',
        '캐러밸 한남 레일 시스템 개발 — MQTT 통신 레이어 구축, 모터/제어기 선정 및 ROS 통합',
        'ROS → ROS2 마이그레이션 주도 — 아키텍처 리팩토링, AI 활용 스펙 드리븐 개발 프로세스 도입',
        '9개 사이트 로봇 배포 및 운영 (국내 7, 일본 2) — 세팅 시간 단축, 무인 운영 안정화 달성',
      ],
    },
  ],
  skills: [
    { category: 'Languages', items: ['Python', 'C++', 'Bash'] },
    { category: 'Robotics / Middleware', items: ['ROS', 'ROS2', 'DDS', 'MQTT', 'Zenoh'] },
    { category: 'Hardware', items: ['Lidar', 'Camera', 'Motor', 'ESP32', 'CAN'] },
    { category: 'Tools', items: ['Linux', 'Git', 'Docker', 'Claude Code'] },
    { category: 'Domain', items: ['자율주행', '컴퓨터비전', '로봇 시스템 통합'] },
  ],
  education: [
    {
      id: 1,
      school: '한국공학대학교',
      degree: '학사',
      major: '기계설계공학',
      period: '2018 ~ 2024',
      note: '학점 4.08 / 4.50',
    },
  ],
  publications: [
    {
      id: 1,
      title: 'Feedback-Based Curriculum Learning for Collision Avoidance',
      authors: 'J. Choi, G. Hwang and G. Eoh',
      journal: 'IEEE Access, vol. 12, pp. 56609–56621, 2024 (SCIE)',
      link: 'https://doi.org/10.1109/ACCESS.2024.3391408',
    },
    {
      id: 2,
      title: 'DQN-based Collision Avoidance using Low-cost Proximity Sensors',
      authors: 'J. Choi and G. Eoh',
      journal: '제38회 제어로봇시스템학회 학술대회, 2023, pp. 639–640',
      link: 'https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11480500',
    },
  ],
  certifications: [
    { id: 1, name: '컴퓨터활용능력 1급', issuer: '대한상공회의소', date: '' },
  ],
  languages: [
    { language: '한국어', level: '모국어' },
    { language: 'English', level: '업무 가능' },
  ],
};
