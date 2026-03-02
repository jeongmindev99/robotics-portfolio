/**
 * deploymentData.js — Where I Deployed 섹션 데이터
 *
 * 각 항목 구조:
 *   id         {number}  고유 ID
 *   startDate  {string}  배포 시작 (YYYY.MM)
 *   endDate    {string}  배포 종료 (YYYY.MM 또는 '현재')
 *   name       {string}  사이트명
 *   robot      {string}  로봇 종류
 *   role       {string}  담당 역할
 *   notionLink {string}  노션 상세 링크
 *   youtubeLink {string} YouTube 영상 링크 (선택사항)
 */
export const sites = [
  { id: 1, startDate: '2024.05', endDate: '2024.07', name: '판교 테크원',    robot: '배송로봇', role: '세팅 및 운영',    notionLink: 'https://notion.so/3c6b0938612e4b6fae25658379f92686', youtubeLink: '' },
  { id: 2, startDate: '2024.06', endDate: '2024.08', name: '서초 래미안',    robot: '배송로봇', role: '세팅 지원',       notionLink: 'https://notion.so/6b1d0a6b3e8b4c5cb1b660ff54110025', youtubeLink: '' },
  { id: 3, startDate: '2024.08', endDate: '2024.09', name: '대치',           robot: '배송로봇', role: '세팅 지원',       notionLink: 'https://notion.so/5ab4a78d084d46a186ed3f03a56b22e9', youtubeLink: '' },
  { id: 4, startDate: '2024.10', endDate: '2025.02', name: '부산 호반/수자인', robot: '물류로봇', role: '세팅 및 운영',  notionLink: 'https://notion.so/214afb16c41c40a89ff9f680e82dc180', youtubeLink: '' },
  { id: 5, startDate: '2025.03', endDate: '현재', name: '지웰홈즈',       robot: '배송로봇', role: '세팅 및 운영',   notionLink: 'https://notion.so/6fca25e5dfe345539ec7d4c2373433be', youtubeLink: '' },
  { id: 6, startDate: '2025.07', endDate: '2025.09', name: '일본 팜코트',    robot: '물류로봇', role: '해외 단독 세팅', notionLink: 'https://notion.so/79aecb639ce549f1a43ec6a93a219e85', youtubeLink: '' },
  { id: 7, startDate: '2025.08', endDate: '현재', name: '일본 캐널코트',  robot: '물류로봇', role: '해외 단독 세팅', notionLink: 'https://notion.so/be8a5bedad524d9393e8f40dab7859cf', youtubeLink: '' },
];
