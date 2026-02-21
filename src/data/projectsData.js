/**
 * projectsData.js — How I Solved 섹션 프로젝트 데이터
 *
 * 각 항목 구조:
 *   id         {number}  고유 ID
 *   title      {string}  프로젝트명
 *   problem    {string}  해결한 문제
 *   action     {string}  취한 행동
 *   result     {string}  결과 (highlight 표시)
 *   tags       {Array}   기술 태그
 *   notionLink {string}  노션 상세 링크
 */
export const projects = [
  {
    id: 1,
    title: 'Import Manager 리팩토링',
    problem: '여러 파일에 흩어진 코드로 유지보수 어려움, 동시성 문제 발생',
    action: 'Manager 패턴으로 코드 통합 및 상태 관리 중앙화',
    result: '동시성 문제 해결, 유지보수 시간 50% 단축',
    tags: ['ROS', 'Python', 'Architecture'],
    notionLink: 'https://notion.so/f204a48cf6324f6da88d24b2fbdaca29',
  },
  {
    id: 2,
    title: 'FlexBE 배송 시나리오',
    problem: '하드코딩된 배송 로직으로 수정 및 확장 어려움',
    action: 'FlexBE 상태 머신으로 배송 플로우 시각화 및 모듈화',
    result: '시나리오 수정 시간 70% 단축, 신규 사이트 적용 용이',
    tags: ['FlexBE', 'State Machine', 'ROS'],
    notionLink: 'https://notion.so/151f41ce743c4491ba05b5d622184f76',
  },
  {
    id: 3,
    title: 'MQTT 통신 시스템',
    problem: '관제 서버-로봇 간 실시간 통신 불안정',
    action: 'MQTT 프로토콜 기반 통신 레이어 재설계',
    result: '통신 안정성 확보, 메시지 손실률 0.1% 이하',
    tags: ['MQTT', 'Protocol', 'Python'],
    notionLink: 'https://notion.so/88adae13663341238cca3c8e9626846c',
  },
  {
    id: 4,
    title: 'STVL 3D 장애물 회피',
    problem: '동적 장애물 환경에서 costmap 업데이트 지연, 센서 FOV 밖 장애물 즉시 소멸',
    action: 'Spatio-Temporal Voxel Layer 적용, 3대 Astra 카메라 통합',
    result: '기존 hz 유지하면서 충돌 회피 성능 향상',
    tags: ['ROS', 'Navigation', 'Costmap'],
    notionLink: 'https://notion.so/e9117075bfcd4737ab8754d48a616857',
  },
  {
    id: 5,
    title: 'Localization Fail Safe',
    problem: 'AMCL 위치 추정 실패 시 로봇이 잘못된 위치로 주행',
    action: 'AMCL Alpha/Weight 기반 위치 추정 신뢰도 판단 로직 구현',
    result: '위치 추정 실패 시 자동 정지, 안전성 확보',
    tags: ['ROS', 'AMCL', 'Safety'],
    notionLink: 'https://notion.so/ec55da63773a4b63943315e986c68973',
  },
  {
    id: 6,
    title: 'OCR 송장 인식 시스템',
    problem: '다양한 송장 형식, 조명 환경에서 인식률 저하',
    action: 'GPT-4o API 연동, 멀티스레딩 처리, 오토포커싱 적용',
    result: '일본 야마토/팜코트 시연 성공, 인식률 향상',
    tags: ['OpenCV', 'GPT-4', 'Python'],
    notionLink: 'https://notion.so/18bd8a0a7b5a80a5aac8c5a22a4ad491',
  },
];
