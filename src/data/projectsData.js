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
    title: '택배 상자 인식 파이프라인 최적화',
    problem: '택배 상자의 크기와 송장을 정확하게 인식',
    action: '인식 파이프라인 재설계, 알고리즘 최적화, 센서 변경',
    result: '1초 내에 상자 크기 1cm 오차, 글자 인식률 개선',
    tags: [
      'ROS',
      'Python',
      'Architecture',
    ],
    notionLink: '',
  },
  {
    id: 3,
    title: '캐러밸 한남 레일 시스템 개발',
    problem: '관제 서버-레일 간 실시간 통신 구축\n레일 모터 제어\n문 제어',
    action: '실시간 통신 프로토콜 리서치 \n모터 선정 및 테스트\n제어기 선정 및 테스트',
    result: 'MQTT 통신 레이어 구축\ncan 프로토콜 참고하여 sdk 에 기능 추가 및 ros 화\n제어기 기능 테스트 및 코드 묶음',
    tags: [
      'MQTT',
      'Protocol',
      'Python',
      'Arduino',
    ],
    notionLink: '',
  },
  {
    id: 4,
    title: 'ROS -> ROS2 마이그레이션, 생산성 극대화',
    problem: '유지보수 종료에 따른 기술 리스크\n중앙 집중 구조(ROS Master)로 인한 단일 장애점\n통신 QoS(Quality of Service) 제어 부족\n보안(Security) 기능 부재\n기획부터 실제 로봇에서의 테스트까지의 너무 오랜 시간이 걸림',
    action: 'ROS2 패키지 리서치 및 테스트\n기존 SW 아키텍처 문제점 분석\nAI 리서치 및 테스트\n',
    result: 'ROS1 패키지 -> ROS2 패키지로 마이그레이션\n아키텍처의 구조적 문제점 리펙토링\nAI 로 스펙 드리븐 설계 및 프로세스 자동화',
    tags: [
      'ROS',
      'ROS2',
      'Claude Code',
    ],
    notionLink: '',
  },
  {
    id: 5,
    title: '7개의 사이트에 로봇 베포',
    problem: '정리되어있지 않은 코드와 레거시로 인해 반복적인 버그 발생\n세팅, 개발, 시연, 테스트, 운영을 병렬로 처리해야하는 리소스적 한계\n물리적 인터렉션과정에서 오는 다양한 이슈\n서비스 로봇으로서의 고객의 불만 해결',
    action: '레거시 정리, 문서화, 개발을 병렬로 수행\n버그가 생기면 임시 해결과 근본 해결을 모두 적용\n""\n고객의 피드백을 수용하고 그에 맞춰서 소프트웨어 수정',
    result: '새로운 사이트에 도입 시 세팅 시간 감소, 안정성 증가, 운영 인력이 없어도 스스로 작업을 수행할 수 있게 되었음\n""\n고객 만족도 증가',
    tags: [
      'ROS',
      'Python',
      'C++',
    ],
    notionLink: '',
  },
];
