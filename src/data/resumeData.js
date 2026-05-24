/**
 * resumeData.js — 이력서 데이터
 *
 * 섹션: profile, summary, experience, skills,
 *        education, certifications, publications, languages
 *
 * 빈 섹션은 ResumePage에서 자동으로 숨겨집니다.
 *
 * experience 항목 옵션:
 *   - achievements: 평면 bullet 배열 (학부 연구생 같은 단순 경력)
 *   - projects: 시기별 작업 그룹 ({ title, period, bullets })
 *   둘 중 하나만 채우거나 함께 사용 가능.
 *
 * education 항목 옵션:
 *   - thesis: 졸업논문 한 줄 설명
 */
export const resumeData = {
  profile: {
    name: '최정민',
    nameEn: 'Jeongmin Choi',
    title: 'Robotics Software Engineer',
    email: 'jeongmin.dev.99@gmail.com',
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
      role: '소프트웨어 개발자 (Robotics Software Engineer)',
      period: '2024.05 ~ 재직 중',
      summary: '실내 택배 배송 로봇과 택배 보관·배출 스테이션의 소프트웨어 개발 · 다현장 배포 · 운영 · 개선',
      projects: [
        {
          title: 'ROS1 → ROS2 Migration & System Refactoring',
          period: '2026.01 ~ 현재',
          bullets: [
            'Nav2, Behavior Tree, Gazebo 등 기존 ROS1 소프트웨어 스택을 ROS2 환경으로 전면 포팅 및 개선',
            '로봇의 작업 목표 달성과 단가 절감을 위한 센서 테스트 및 구성 최적화',
          ],
        },
        {
          title: 'Full-Cycle SW 아키텍처 및 운영 표준 구축',
          period: '2024.09 ~ 2025.12',
          bullets: [
            '한국·일본 총 9개 사이트(국내 7, 일본 2)에서 서비스 가능하도록 하드웨어 세팅, 사이트별 현장 배포 및 시나리오 구축, 운영, 안정화',
            '현장 운영에 필수적인 모듈 개발 및 시스템 인프라를 통합하여, 실제 상용 서비스 환경에 호환되도록 고도화',
            '하드웨어·사이트 변동에 강건한 구조로 SW를 리팩토링하고, 자체 배포 툴과 매뉴얼을 도입해 현장 셋업 소요 리소스 개선',
          ],
        },
        {
          title: 'CARAVEL East Asia 서빙로봇 시스템 통신 및 이기종 모터 제어 인프라 구축',
          period: '2025.04 ~ 2025.06',
          bullets: [
            '외부 POS 메인 서버와 내부 로봇 제어 서버 간의 비동기 제어를 위한 브릿지 개발',
            '모터 오픈소스 SDK의 한계 우회 및 공식 프로토콜 명세 참고하여 CAN 통신 추가 구현, 제어권 확장',
            'Arduino OPTA 실무 도입을 위한 하드웨어 제어 및 서버 연동 통신(PoC) 검증 및 시스템 연동을 위한 통합 환경 구축',
          ],
        },
        {
          title: '물류 로봇 스테이션용 택배 인식 파이프라인 개발',
          period: '2024.05 ~ 2024.07',
          bullets: [
            '제한된 연산 환경에서 데이터 처리 로직을 로우레벨 단계부터 최적화하고, 데이터 수집과 분석 프로세스를 병렬화하여 속도 단축',
            '현장 네트워크 지연이나 인식 실패 시 운영자의 수동 개입으로 자연스럽게 전환되는 Fallback 아키텍처 설계',
            '개발자의 코드 수정 없이도 현장 작업자가 직접 인식 환경을 튜닝할 수 있는 자체 운영 툴과 데이터 로깅 파이프라인 구축',
          ],
        },
      ],
      achievements: [],
    },
    {
      id: 2,
      company: '한국공학대학교 멀티로봇시스템 연구실',
      role: '학부 연구생',
      period: '2023.01 ~ 2023.12 (1년)',
      summary: '멀티로봇 시스템 및 모바일 로봇 연구실에서 강화학습 기반 충돌 회피 알고리즘 연구 수행',
      achievements: [
        'ICROS 학회 1저자 발표 (2023)',
        'IEEE Access 1저자 논문 게재 (2024)',
        'ICRA 2저자 논문 채택',
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
      period: '2018.03 ~ 2024.08',
      note: '학점 4.08 / 4.50',
      thesis:
        '유한요소 기반 시뮬레이션 데이터를 활용한 타이어 트레드 마모량 예측 알고리즘 개발 — ' +
        '1D-CNN 병목 구조로 가속도 신호 특징 추출, 차량·TPMS 데이터와 결합하여 조합별 성능 비교, ' +
        '최적 조합에서 약 0.21mm 오차의 예측 성능 달성',
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
    {
      id: 3,
      title: '(ICRA 2저자 논문 — 제목 / 연도 / 게재처 확정 후 갱신 예정)',
      authors: '(공저자 정보 추가 예정), J. Choi',
      journal: 'IEEE International Conference on Robotics and Automation (ICRA)',
      link: '',
    },
  ],
  certifications: [
    { id: 1, name: '컴퓨터활용능력 1급', issuer: '대한상공회의소', date: '2020.01' },
  ],
  languages: [
    { language: '한국어', level: '모국어' },
    { language: 'English', level: '업무 가능' },
  ],
};
