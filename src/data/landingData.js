/**
 * landingData.js — 랜딩 페이지 데이터
 *
 * pages 배열에 항목을 추가하면 랜딩 페이지에 카드가 자동 생성됩니다.
 *
 * 각 항목 구조:
 *   id       {string}  고유 식별자
 *   title    {string}  카드 제목
 *   desc     {string}  카드 설명 (HTML <br/> 사용 가능)
 *   icon     {string}  SVG path (viewBox 0 0 24 24 기준)
 *   path     {string}  라우트 경로 (예: '/portfolio')
 *   ready    {boolean} true면 링크 활성화, false면 '준비 중' 표시
 *   ctaText  {string}  CTA 버튼 텍스트 (ready일 때 표시)
 */

export const landingMeta = {
  terminalLines: [
    { prompt: '$ whoami', delay: 0 },
    { output: '최정민 — Robotics Software Engineer', delay: 800, highlight: '최정민' },
    { prompt: '$ cat README.md', delay: 2000 },
    { output: '로봇이 만들어지고 현장에 배포되어 운영되기까지,', delay: 2800 },
    { output: '그 모든 과정을 경험한 엔지니어', delay: 3200 },
    { prompt: '$ uptime --summary', delay: 4200 },
  ],
};

export const pages = [
  {
    id: 'portfolio',
    title: '포트폴리오',
    desc: '프로젝트, 배포 현황, 기술 스택 등\n경험의 전체 여정을 확인하세요',
    icon: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    path: '/portfolio',
    ready: true,
    ctaText: '살펴보기',
  },
  {
    id: 'resume',
    title: '이력서',
    desc: '경력, 학력, 기술 요약 등\n간결한 이력서를 확인하세요',
    icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>',
    path: '/resume',
    ready: false,
    ctaText: '확인하기',
  },
];
