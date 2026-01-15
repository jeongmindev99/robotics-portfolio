# Robotics Portfolio

로보틱스 소프트웨어 엔지니어 포트폴리오 웹사이트.

## 🎯 프로젝트 목적

**핵심 전략**: "넓지만 얕다"는 약점을 "시스템 전체를 본다"는 강점으로 전환

### 타겟
- 위로보틱스 등 로보틱스 스타트업 지원용
- 경력 2년차 로보틱스 소프트웨어 엔지니어

### 차별화 포인트
1. **시스템 전체 경험**: 로봇 엔지니어 업무의 Full Lifecycle을 시각화
2. **성장 서사**: ROS 제로 → 22개월 만에 7개 사이트 단독 세팅
3. **정직한 자기 평가**: 부족한 점(C++, ROS2, Realtime) 인정 + 학습 현황 공개

---

## 🏗️ 전체 구조

### 섹션 구성 (스크롤 순서)

| # | 섹션 ID | 제목 | 역할 |
|---|---------|------|------|
| 1 | `hero` | Hero | 첫인상. 성장 서사 + 정체성 선언 + 핵심 수치 |
| 2 | `lifecycle` | What I Build | 로봇 엔지니어 업무 7개 Phase. 클릭 시 확장 |
| 3 | `projects` | How I Solved | 문제 해결 경험 3개 (PARL 구조) |
| 4 | `deployment` | Where I Deployed | 현장 경험 (국내 5 + 해외 2) |
| 5 | `growth` | How I Grew | 성장 타임라인 (전환점 4개) |
| 6 | `learning` | What I'm Building | 부족한 점 인정 + 학습 현황 |
| 7 | `contact` | Contact | 연락처 (Email, GitHub, LinkedIn, Notion) |

### 핵심 인터랙션

1. **네비게이션 바** (좌측 고정): 클릭 시 해당 섹션으로 스무스 스크롤
2. **스크롤 스냅**: 섹션 단위로 스냅
3. **Phase 클릭** (Lifecycle): 확장되어 하위 항목 표시
4. **Architecture Modal**: SW개발 Phase에서 "시스템 아키텍처 보기" 버튼 클릭 시 모달

---

## 📁 프로젝트 구조

```
robotics-portfolio/
├── package.json
├── README.md                    # 이 파일
├── public/
│   └── index.html               # HTML 템플릿, 폰트 로드
└── src/
    ├── index.js                 # React 엔트리 포인트
    ├── index.css                # CSS 변수, 글로벌 스타일, 애니메이션
    ├── App.js                   # 메인 앱, 섹션 구성, 스크롤 핸들링
    ├── App.css                  # 섹션 공통 스타일
    └── components/
        ├── Navigation.js        # 좌측 네비게이션 바
        ├── Navigation.css
        ├── HeroSection.js       # 히어로 섹션
        ├── HeroSection.css
        ├── LifecycleSection.js  # 7개 Phase (로봇 엔지니어 업무 사이클)
        ├── LifecycleSection.css
        ├── ArchitectureModal.js # 시스템 아키텍처 모달 (SW개발 Phase 상세)
        ├── ArchitectureModal.css
        ├── ProjectsSection.js   # 프로젝트 카드 (PARL 구조)
        ├── ProjectsSection.css
        ├── DeploymentSection.js # 사이트 배포 현황
        ├── DeploymentSection.css
        ├── GrowthSection.js     # 성장 타임라인
        ├── GrowthSection.css
        ├── LearningSection.js   # 학습 현황
        ├── LearningSection.css
        ├── ContactSection.js    # 연락처
        └── ContactSection.css
```

---

## 🔧 데이터 수정 가이드

### 1. Hero 섹션 수정 (HeroSection.js)

```javascript
// 메인 타이틀
<h1 className="hero-title">
  <span className="title-line">ROS를 몰랐던 내가</span>
  <span className="title-line highlight">22개월 만에</span>
  <span className="title-line">7개 사이트를 혼자 세팅할 수 있게 되기까지</span>
</h1>

// 서브 타이틀
<p className="hero-subtitle">
  로봇 시스템의 처음부터 끝까지를 경험한 엔지니어
</p>

// 핵심 수치 (3개)
<div className="hero-stats">
  <div className="stat-item">
    <span className="stat-number">22</span>
    <span className="stat-label">개월</span>
    <span className="stat-desc">성장 기간</span>
  </div>
  // ...
</div>
```

### 2. Phase 수정 (LifecycleSection.js)

로봇 엔지니어 업무의 7개 Phase와 각 하위 항목:

```javascript
const phases = [
  {
    id: 'design',           // 고유 ID
    number: '01',           // 표시 번호
    title: '설계',          // 한글 제목
    titleEn: 'Design',      // 영문 제목
    experienced: false,     // ⭐ Phase 전체 경험 여부 (하이라이트)
    hasArchitecture: false, // SW개발 Phase만 true (아키텍처 모달 버튼 표시)
    items: [
      { name: '기구 설계', experienced: false },      // ⭐ 하위 항목 경험 여부
      { name: '전장 설계', experienced: false },
      { name: '회로 설계', experienced: false },
      { name: 'SW 아키텍처 설계', experienced: false },
    ]
  },
  {
    id: 'inspection',
    number: '02',
    title: '전장부 검사',
    titleEn: 'Electrical Inspection',
    experienced: true,      // ⭐ 경험함
    items: [
      { name: 'CAN 통신 테스트', experienced: true },
      { name: '모터 동작 테스트', experienced: true },
      { name: '센서 동작 테스트', experienced: true },
      { name: '전원 테스트', experienced: true },
    ]
  },
  {
    id: 'assembly',
    number: '03',
    title: '조립',
    titleEn: 'Assembly',
    experienced: true,
    items: [
      { name: '프레임 조립', experienced: false },
      { name: '배선', experienced: true },
      { name: '센서 장착', experienced: true },
      { name: '캘리브레이션', experienced: true },
    ]
  },
  {
    id: 'development',
    number: '04',
    title: 'SW 개발',
    titleEn: 'Development',
    experienced: true,
    hasArchitecture: true,  // ⭐ 아키텍처 모달 버튼 표시
    items: [
      { name: 'ROS 시스템', experienced: true },
      { name: '미들웨어', experienced: true },
      { name: '어플리케이션', experienced: true },
      { name: '통신 연동', experienced: true },
    ]
  },
  {
    id: 'setup',
    number: '05',
    title: '사이트 세팅',
    titleEn: 'Site Setup',
    experienced: true,
    items: [
      { name: '지도 세팅', experienced: true },
      { name: '층/존 세팅', experienced: true },
      { name: '포즈 세팅', experienced: true },
      { name: '시나리오 개발', experienced: true },
      { name: '이미지 학습', experienced: true },
      { name: '테스트', experienced: true },
    ]
  },
  {
    id: 'operation',
    number: '06',
    title: '운영',
    titleEn: 'Operation',
    experienced: true,
    items: [
      { name: '모니터링', experienced: true },
      { name: '장애 대응', experienced: true },
      { name: '로그 분석', experienced: true },
      { name: '유지보수', experienced: true },
      { name: '원격 지원', experienced: true },
    ]
  },
  {
    id: 'cicd',
    number: '07',
    title: 'CI/CD',
    titleEn: 'CI/CD',
    experienced: false,
    items: [
      { name: '자동 배포', experienced: false },
      { name: '테스트 자동화', experienced: false },
      { name: '버전 관리', experienced: true },
      { name: '롤백', experienced: false },
    ]
  },
];
```

### 3. 시스템 아키텍처 수정 (ArchitectureModal.js)

모바일 매니퓰레이터 시스템 아키텍처 8개 레이어:

```javascript
const architectureLayers = [
  {
    id: 'external',
    name: 'External Systems',           // 영문명
    nameKr: '외부 시스템',               // 한글명
    color: '#ff6b35',                   // 레이어 색상 (CSS에서 사용)
    items: [
      { 
        name: 'Fleet Management',       // 영문 항목명
        nameKr: '관제 시스템',           // 한글 항목명
        experienced: true,              // ⭐ 경험 여부 (하이라이트)
        link: '#'                       // 노션 링크 (추후 연결)
      },
      { name: 'Realtime Database', nameKr: '실시간 DB', experienced: true, link: '#' },
      { name: 'Building API', nameKr: '빌딩 API (엘리베이터)', experienced: true, link: '#' },
      { name: 'Other Robots', nameKr: '다른 로봇 통신', experienced: false, link: '#' },
    ]
  },
  {
    id: 'application',
    name: 'Application Layer',
    nameKr: '어플리케이션 레이어',
    color: '#ffd700',
    items: [
      { name: 'Robot Screen UI', nameKr: '로봇 화면 UI', experienced: true, link: '#' },
      { name: 'API Gateway', nameKr: 'API 게이트웨이', experienced: true, link: '#' },
    ]
  },
  {
    id: 'ros-behavior',
    name: 'ROS - Behavior Orchestration',
    nameKr: 'ROS - 행동 오케스트레이션',
    color: '#00d4aa',
    items: [
      { name: 'State Machine / BT', nameKr: '상태 머신 / 행동 트리', experienced: true, link: '#' },
      { name: 'Mission Sequencing', nameKr: '미션 시퀀싱', experienced: true, link: '#' },
      { name: 'Error Recovery', nameKr: '에러 복구', experienced: true, link: '#' },
    ]
  },
  {
    id: 'ros-domain',
    name: 'ROS - Domain Stacks',
    nameKr: 'ROS - 도메인 스택',
    color: '#0099ff',
    items: [
      { name: 'Navigation Stack', nameKr: '네비게이션 스택', experienced: true, link: '#' },
      { name: 'Manipulation Stack', nameKr: '매니퓰레이션 스택', experienced: true, link: '#' },
      { name: 'Perception Stack', nameKr: '퍼셉션 스택', experienced: false, link: '#' },
    ]
  },
  {
    id: 'ros-comm',
    name: 'ROS - Communication',
    nameKr: 'ROS - 통신 레이어',
    color: '#00d4aa',
    items: [
      { name: 'TCPROS / XMLRPC', nameKr: 'TCPROS / XMLRPC', experienced: true, link: '#' },
      { name: 'Topic / Service / Action', nameKr: '토픽 / 서비스 / 액션', experienced: true, link: '#' },
    ]
  },
  {
    id: 'hal',
    name: 'Hardware Abstraction Layer',
    nameKr: '하드웨어 추상화 레이어',
    color: '#9b59b6',
    items: [
      { name: 'ROS Control Framework', nameKr: 'ROS 컨트롤 프레임워크', experienced: true, link: '#' },
      { name: 'Diff Drive Controller', nameKr: '차동 구동 컨트롤러', experienced: true, link: '#' },
      { name: 'Joint State Controller', nameKr: '조인트 상태 컨트롤러', experienced: true, link: '#' },
      { name: 'CAN Node', nameKr: 'CAN 노드', experienced: true, link: '#' },
      { name: 'Serial Node', nameKr: '시리얼 노드', experienced: true, link: '#' },
      { name: 'USB Node', nameKr: 'USB 노드', experienced: true, link: '#' },
    ]
  },
  {
    id: 'os-driver',
    name: 'OS / Kernel Driver Layer',
    nameKr: 'OS / 커널 드라이버 레이어',
    color: '#e74c3c',
    items: [
      { name: 'SocketCAN Subsystem', nameKr: 'SocketCAN 서브시스템', experienced: true, link: '#' },
      { name: 'TTY/Serial Subsystem', nameKr: 'TTY/시리얼 서브시스템', experienced: true, link: '#' },
      { name: 'V4L2/USB Subsystem', nameKr: 'V4L2/USB 서브시스템', experienced: true, link: '#' },
      { name: 'Network Stack', nameKr: '네트워크 스택', experienced: true, link: '#' },
    ]
  },
  {
    id: 'hardware',
    name: 'Physical Layer',
    nameKr: '물리 레이어',
    color: '#95a5a6',
    items: [
      { name: 'Motors (Wheel, Arm)', nameKr: '모터 (휠, 팔)', experienced: true, link: '#' },
      { name: 'Sensors (LiDAR, Camera)', nameKr: '센서 (라이다, 카메라)', experienced: true, link: '#' },
      { name: 'Embedded Controller', nameKr: '임베디드 컨트롤러', experienced: true, link: '#' },
      { name: 'Network Devices', nameKr: '네트워크 장치', experienced: true, link: '#' },
      { name: 'CAN Bus / USB / Serial', nameKr: 'CAN 버스 / USB / 시리얼', experienced: true, link: '#' },
    ]
  },
];
```

**아키텍처 레이어 설계 원칙**:
- 수직 레이어 (Vertical Layers): 추상화 수준에 따른 분리
- 수평 도메인 (Horizontal Domains): Navigation, Manipulation, Perception
- 통신 경로 (Communication Paths): 레이어 간, 외부 시스템 간 데이터 흐름

### 4. 프로젝트 수정 (ProjectsSection.js)

PARL 구조 (Problem → Action → Result → Learning):

```javascript
const projects = [
  {
    id: 1,
    title: 'Import Manager 리팩토링',           // 프로젝트 제목
    titleEn: 'Import Manager Refactoring',     // 영문 제목
    problem: '코드가 여러 파일에 흩어져 있어 유지보수가 어려웠고, 동시성 문제가 발생',
    action: 'Manager 패턴으로 코드를 통합하고 상태 관리를 중앙화',
    result: '동시성 문제 해결, 유지보수 시간 50% 감소',
    tags: ['ROS', 'Python', 'Refactoring'],    // 기술 태그
    notionLink: 'https://notion.so/...',       // ⭐ 노션 상세 페이지 URL
  },
  {
    id: 2,
    title: 'FlexBE 배송 시나리오',
    titleEn: 'FlexBE Delivery Scenario',
    problem: '복잡한 배송 로직을 하드코딩으로 관리하여 수정이 어려웠음',
    action: 'FlexBE 상태 머신으로 전체 배송 플로우를 시각화하고 모듈화',
    result: '시나리오 수정 시간 70% 단축, 새로운 사이트 적용 용이',
    tags: ['FlexBE', 'State Machine', 'ROS'],
    notionLink: 'https://notion.so/...',
  },
  {
    id: 3,
    title: 'MQTT 통신 시스템',
    titleEn: 'MQTT Communication System',
    problem: '관제 서버와 로봇 간 실시간 통신이 불안정했음',
    action: 'MQTT 프로토콜 기반 통신 레이어를 새로 설계하고 구현',
    result: '통신 안정성 향상, 메시지 손실률 0.1% 이하',
    tags: ['MQTT', 'Communication', 'Python'],
    notionLink: 'https://notion.so/...',
  },
];
```

### 5. 사이트 수정 (DeploymentSection.js)

```javascript
const sites = [
  {
    id: 1,
    name: '래미안 원베일리',      // 사이트명
    location: '서울',             // 위치 (일본이면 '일본 🇯🇵')
    type: '아파트 배송',          // 로봇 용도
    period: '2024.04',           // 참여 시기
    role: '세팅 보조',            // 역할
    highlight: false,            // ⭐ 하이라이트 여부 (주요 경험)
  },
  {
    id: 2,
    name: '부산 포터',
    location: '부산',
    type: '물류 배송',
    period: '2024.08',
    role: '단독 세팅',
    highlight: true,             // ⭐ 하이라이트
  },
  // 해외 사이트
  {
    id: 4,
    name: '일본 팜코트',
    location: '일본 🇯🇵',         // 🇯🇵 이모지로 해외 표시
    type: '물류 배송',
    period: '2025.07',
    role: '해외 단독 세팅',
    highlight: true,
  },
  // ...
];
```

### 6. 성장 타임라인 수정 (GrowthSection.js)

```javascript
const milestones = [
  {
    date: '2024.03',                          // 날짜
    title: 'ROS 제로에서 시작',                // 제목
    description: 'WATT Robotics 입사. ROS가 뭔지도 몰랐던 상태에서 로보틱스 세계에 첫 발을 내딛다.',
    type: 'start',                            // 타입 (색상 결정)
    // type 종류:
    // - 'start': 파랑 (시작점)
    // - 'turning-point': 주황 (전환점)
    // - 'achievement': 민트 (성취)
    // - 'milestone': 골드 + 글로우 (마일스톤)
  },
  {
    date: '2024.10',
    title: '"감으로 디버깅" → 체계적 접근',
    description: '문제를 체계적으로 분석하고 기록하기 시작. 디버깅 과정을 습관화하고 문서화.',
    type: 'turning-point',
  },
  {
    date: '2025.07',
    title: '해외 사이트 단독 세팅',
    description: '일본 팜코트 사이트에서 처음으로 해외 현장을 단독으로 세팅. 언어와 환경의 장벽을 넘다.',
    type: 'achievement',
  },
  {
    date: '2025.11',
    title: '전 과정 독립 수행',
    description: '로봇 시스템의 세팅부터 운영까지 전 과정을 혼자서 완료할 수 있게 되다.',
    type: 'milestone',
  },
];
```

### 7. 학습 현황 수정 (LearningSection.js)

```javascript
const learningItems = [
  {
    skill: 'C++',              // 스킬명
    status: '학습 중',          // 상태
    progress: 30,              // 진행률 (0-100)
    description: '로보틱스 핵심 언어. 현재 기초 문법과 STL 학습 중.',
  },
  {
    skill: 'ROS2',
    status: '학습 예정',
    progress: 10,
    description: 'ROS1 경험을 바탕으로 ROS2 마이그레이션 준비 중.',
  },
  {
    skill: 'Realtime Linux',
    status: '관심',
    progress: 5,
    description: 'RTOS, PREEMPT_RT 등 실시간 시스템 학습 계획.',
  },
];
```

### 8. 연락처 수정 (ContactSection.js)

```javascript
// 이메일
<a href="mailto:your.email@example.com" className="contact-link email">

// GitHub
<a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">

// LinkedIn
<a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">

// Notion
<a href="https://notion.so/yourpage" className="contact-link notion">
```

---

## 🎨 디자인 시스템

### CSS 변수 (index.css)

```css
:root {
  /* 배경색 */
  --bg-primary: #0a0a0a;      /* 메인 배경 */
  --bg-secondary: #111111;    /* 섹션 배경 (교차) */
  --bg-tertiary: #1a1a1a;     /* 카드 내부 */
  --bg-card: #151515;         /* 카드 배경 */
  --bg-hover: #1f1f1f;        /* 호버 상태 */
  
  /* 텍스트 */
  --text-primary: #f5f5f5;    /* 주요 텍스트 */
  --text-secondary: #a0a0a0;  /* 보조 텍스트 */
  --text-muted: #666666;      /* 흐린 텍스트 */
  
  /* 강조색 */
  --accent-primary: #00d4aa;   /* 민트 - 경험한 부분, 주요 강조 */
  --accent-secondary: #0099ff; /* 블루 - 해외, 특별한 항목 */
  --accent-warning: #ff6b35;   /* 오렌지 - 전환점, 주의 */
  --accent-highlight: #ffd700; /* 골드 - 마일스톤, 최고 성취 */
  
  /* 테두리 */
  --border-color: #2a2a2a;
  --border-highlight: #3a3a3a;
  
  /* 폰트 */
  --font-display: 'Outfit', 'Noto Sans KR', sans-serif;  /* 제목용 */
  --font-body: 'Noto Sans KR', 'Outfit', sans-serif;     /* 본문용 */
  --font-mono: 'JetBrains Mono', monospace;              /* 코드/숫자 */
  
  /* 효과 */
  --glow-primary: 0 0 20px rgba(0, 212, 170, 0.3);   /* 민트 글로우 */
  --glow-secondary: 0 0 20px rgba(0, 153, 255, 0.3); /* 블루 글로우 */
}
```

### 색상 사용 규칙

| 색상 | 용도 |
|------|------|
| `--accent-primary` (민트) | 경험한 영역, 주요 버튼, 링크 |
| `--accent-secondary` (블루) | 해외 사이트, 특별한 항목 |
| `--accent-warning` (오렌지) | 전환점, 외부 시스템 레이어 |
| `--accent-highlight` (골드) | 마일스톤, 최고 성취 |

### 하이라이트 규칙

```css
/* 경험한 항목 */
.experienced {
  border-color: var(--accent-primary);
  background: linear-gradient(135deg, rgba(0, 212, 170, 0.05) 0%, var(--bg-card) 100%);
}

/* 경험한 항목 호버 */
.experienced:hover {
  box-shadow: var(--glow-primary);
}
```

---

## 📋 TODO

### 작업 우선순위 가이드

| 우선순위 | Phase | 설명 | 의존성 |
|---------|-------|------|--------|
| **최우선** | Phase 13 | 버그 수정, 코드 정리 | 없음 |
| **높음** | Phase 0-2 | 콘텐츠 정리 및 연동 | 순차적 |
| **높음** | Phase 4 | 코드 리팩토링 | 없음 |
| **중간** | Phase 5 | 접근성 개선 | Phase 4 권장 |
| **중간** | Phase 6 | 반응형 강화 | 없음 |
| **중간** | Phase 7 | SEO/메타데이터 | 없음 |
| **낮음** | Phase 3, 10 | UI/UX, 시각적 개선 | Phase 4 권장 |
| **낮음** | Phase 8-9 | 성능/테스트 | Phase 4 이후 |
| **낮음** | Phase 16 | 코드 품질/에러 핸들링 | Phase 4 이후 |
| **선택** | Phase 11-12 | 문구 다듬기, 추가 기능 | Phase 0-2 이후 |
| **선택** | Phase 17 | UX 세부 개선 | Phase 3, 10 이후 |
| **추천** | Phase 18 | 포트폴리오 임팩트 강화 | Phase 10 이후 |

**병렬 작업 가능:**
- Phase 4 (코드 리팩토링)와 Phase 7 (SEO)는 동시 진행 가능
- Phase 5 (접근성)와 Phase 6 (반응형)은 동시 진행 가능
- Phase 13 (버그 수정)은 가장 먼저, 독립적으로 진행 가능
- Phase 16 (코드 품질)은 Phase 4와 연계하거나 독립 진행 가능

---

### Phase 0: 노션 포트폴리오 콘텐츠 정리 (선행 작업)

> 웹사이트 데이터 업데이트 전, 노션에서 포트폴리오 콘텐츠를 먼저 정리해야 함

#### 0-1. 노션 기존 자료 수집
- [x] 회사 재직 기간 동안 작성한 모든 노션 페이지 검토
- [x] 프로젝트별 작업 내용 수집 (Import Manager, FlexBE, MQTT 등)
- [x] 사이트별 세팅/운영 기록 수집
- [x] 기술 스택별 경험 내용 수집 (ROS, Python, 통신 등)
- [x] 문제 해결 사례 수집 (디버깅, 트러블슈팅)

#### 0-2. 포트폴리오 루트 페이지 구성
- [x] 포트폴리오 루트 페이지 생성 (https://notion.so/2e9d8a0a7b5a81c5a57ed22576f1cb0c)
- [x] 프로젝트 상세 페이지 (PARL 구조로 정리)
  - [x] Import Manager 리팩토링
  - [x] FlexBE 배송 시나리오
  - [x] MQTT 통신 시스템
- [x] 사이트별 경험 페이지
  - [x] 판교 테크원
  - [x] 서초 래미안
  - [x] 대치
  - [x] 부산 호반/수자인
  - [x] 지웰홈즈
  - [x] 일본 팜코트
  - [x] 일본 캐널코트
- [x] 시스템 아키텍처 상세 페이지
  - [x] 각 레이어별 경험 내용 정리
  - [x] 기술 스택별 상세 설명

---

### Phase 1: 웹사이트 데이터 업데이트

> Phase 0 완료 후, 노션 콘텐츠 기반으로 웹사이트 데이터 수정

- [ ] Phase별 하위 항목 정확하게 업데이트 (LifecycleSection.js)
- [x] Architecture 레이어 경험 여부 업데이트 + 노션 링크 연결 (ArchitectureModal.js)
- [x] 프로젝트 3개 선정 및 상세 내용 작성 + 노션 링크 연결 (ProjectsSection.js)
- [x] 사이트 정보 정확하게 업데이트 + 노션 링크 연결 (DeploymentSection.js)
- [x] 성장 타임라인 전환점 확정 (GrowthSection.js)
- [x] 연락처 정보 업데이트 (ContactSection.js)

---

### Phase 2: 노션 연동 및 기능 개발

> Phase 0에서 만든 노션 페이지를 웹사이트와 연결

- [ ] 실제 사용되는 PhaseModal.js의 ArchitectureView에 노션 링크 연결 (시스템 아키텍처 상세 페이지) - **⚠️ ArchitectureModal.js에는 추가되었으나 이 파일은 사용되지 않음**
- [ ] 프로젝트 카드에 노션 상세 페이지 링크 추가 (notionLink 필드) - ⚠️ CSS만 준비됨
- [x] 사이트 항목 클릭 시 노션 상세 페이지 연결
- [x] Contact 섹션 노션 링크 연결
- [ ] 프로젝트 상세 모달 (선택적)
- [ ] 사이트별 상세 정보 모달 (선택적)

---

### Phase 3: UI/UX 개선

- [ ] 다크/라이트 모드 토글
- [ ] 애니메이션 개선 (framer-motion 도입 검토)
- [ ] 모바일 반응형 개선
- [ ] 스크롤 스냅 모바일에서 비활성화 확인

---

### Phase 4: 코드 리팩토링 및 가독성

> 유지보수성과 코드 품질 향상

#### 4-1. 파일 분리
- [ ] PhaseModal.js에서 데이터(phaseDetails, architectureLayers)를 `src/data/` 폴더로 분리
- [ ] phases 데이터를 `src/data/phases.js`로 분리 (LifecycleSection.js)
- [ ] projects 데이터를 `src/data/projects.js`로 분리 (ProjectsSection.js)
- [ ] sites 데이터를 `src/data/sites.js`로 분리 (DeploymentSection.js)
- [ ] milestones 데이터를 `src/data/milestones.js`로 분리 (GrowthSection.js)
- [ ] learningItems 데이터를 `src/data/learning.js`로 분리 (LearningSection.js)

#### 4-2. 공통 컴포넌트 추출
- [ ] SectionHeader 컴포넌트 추출 (section-number, section-title, section-subtitle 패턴)
- [ ] Modal 컴포넌트 추출 (overlay, close 버튼 공통 패턴)

#### 4-3. 상수 정리
- [ ] 연락처 정보를 `src/constants/contact.js`로 분리 (현재 하드코딩)
- [ ] navItems를 `src/constants/navigation.js`로 분리
- [ ] Navigation.js의 연도(2025)를 동적으로 처리 (`new Date().getFullYear()`)
- [ ] App.js의 sections 배열(line 17)을 navItems와 통합 또는 `src/constants/sections.js`로 분리

#### 4-4. 코드 품질
- [ ] ESLint 설정 추가 (airbnb 또는 react-app 확장)
- [ ] Prettier 설정 추가 (.prettierrc)
- [ ] PropTypes 추가 또는 TypeScript 마이그레이션 검토

---

### Phase 5: 접근성(A11y) 및 키보드 네비게이션

> 모든 사용자가 사용할 수 있는 포트폴리오

- [ ] 모달에 `aria-modal="true"`, `role="dialog"` 추가
- [ ] 모달 ESC 키로 닫기 기능 추가 (현재 미구현)
- [ ] 포커스 트랩 구현 (모달 열렸을 때 포커스가 모달 내에만 이동)
- [ ] 네비게이션 항목에 `aria-label` 추가
- [ ] 클릭 가능한 요소들에 `role="button"`, `tabIndex` 추가
- [ ] 색상 대비 검사 및 개선 (WCAG AA 기준)
- [ ] 스크린 리더 테스트

---

### Phase 6: 반응형 디자인 강화

> 모든 디바이스에서 최적화된 경험

#### 6-1. 브레이크포인트 확장
- [ ] 태블릿 브레이크포인트 추가 (768px ~ 1024px)
- [ ] 대형 화면 브레이크포인트 추가 (1400px+)
- [ ] 초소형 화면 대응 (360px 이하)

#### 6-2. 컴포넌트별 반응형 개선
- [ ] DeploymentSection: 모바일에서 테이블 → 카드 형태로 변경
- [ ] LifecycleSection: 모바일에서 가로 스크롤 또는 세로 레이아웃 검토
- [ ] ProjectsSection: 모바일에서 카드 레이아웃 최적화
- [ ] PhaseModal: 모바일에서 Architecture View 스크롤 가능하게 개선

---

### Phase 7: SEO 및 메타데이터

> 검색 엔진 최적화 및 소셜 공유

#### 7-1. 기본 메타데이터
- [ ] public/index.html description 개선 (현재: "Robotics Software Engineer Portfolio" → 더 구체적으로)
- [ ] canonical URL 추가
- [ ] robots meta 태그 추가

#### 7-2. 소셜 미디어 공유
- [ ] Open Graph 태그 추가 (og:title, og:description, og:image, og:url, og:type)
- [ ] Twitter Card 태그 추가 (twitter:card, twitter:title, twitter:description)
- [ ] 소셜 공유용 이미지 준비 (1200x630px 권장)

#### 7-3. 아이콘 및 PWA
- [ ] favicon 추가 (현재 React 기본 로고) - 16x16, 32x32
- [ ] apple-touch-icon 추가 (180x180)
- [ ] manifest.json 추가 (PWA 지원)

#### 7-4. 검색 엔진
- [ ] robots.txt 검토
- [ ] sitemap.xml 생성 (정적 사이트이므로 간단)

---

### Phase 8: 성능 최적화

> 빠른 로딩과 부드러운 인터랙션

- [ ] Lighthouse 성능 측정 및 점수 기록
- [ ] React.lazy와 Suspense로 코드 스플리팅 검토
- [ ] 이미지 최적화 준비 (향후 이미지 추가 시 대비)
- [ ] CSS 번들 크기 최적화
- [ ] font-display: swap 확인 (FOUT 방지)
- [ ] 애니메이션 성능 최적화 (will-change, transform 사용)

---

### Phase 9: 테스트

> 안정적인 배포를 위한 테스트 환경

- [ ] Jest + React Testing Library 설정
- [ ] 주요 컴포넌트 단위 테스트 작성
- [ ] 네비게이션 클릭 시 스크롤 동작 테스트
- [ ] 모달 열기/닫기 테스트
- [ ] 반응형 레이아웃 테스트 (snapshot)
- [ ] CI/CD에 테스트 연동 (GitHub Actions)

---

### Phase 10: 시각적 디자인 개선

> 더 세련되고 전문적인 디자인

#### 10-1. 섹션 구분
- [ ] 섹션별 배경색 미묘한 차이 추가 (홀수/짝수 섹션)
- [ ] 섹션 간 구분선 디자인 개선

#### 10-2. 컴포넌트 디자인
- [ ] LearningSection: progress 필드를 활용한 진행률 바 추가
- [ ] GrowthSection: type별 아이콘/색상 적용 (start, growth, achievement, milestone)
- [ ] GrowthSection: 'start' type 시각적 강조 개선 (현재 muted 색상으로 너무 흐림)
- [ ] DeploymentSection: 일본 사이트 등 하이라이트 표시 추가 (해외 경험 강조 필요)
- [ ] DeploymentSection: 해외 사이트에 국기 이모지나 배지 추가 (🇯🇵)
- [ ] ProjectsSection: Result 영역 정량적 성과 강조 스타일 (50%, 70% 등 수치 하이라이트)

#### 10-3. 인터랙션
- [ ] 스크롤 진행률 표시기 추가 (상단 프로그레스 바)
- [ ] "맨 위로" 버튼 추가 (스크롤 시 표시)
- [ ] 프로젝트 카드 호버 시 더 풍부한 애니메이션

---

### Phase 11: 문구 및 가독성

> 명확하고 설득력 있는 콘텐츠

- [ ] 영문/한글 표기 일관성 검토 (섹션 제목은 영문, 내용은 한글로 통일 여부)
- [ ] 히어로 섹션 메인 메시지 검토 및 다듬기
- [ ] CTA 버튼 문구 개선 ("경험 살펴보기" → 더 행동 유도적으로)
- [ ] 각 섹션 서브타이틀 문구 다듬기
- [x] ContactSection placeholder(your.email@example.com) 실제 정보로 교체 ✓
- [ ] 프로젝트 PARL 문구 간결하게 다듬기

---

### Phase 12: 추가 기능 (선택)

> 차별화를 위한 추가 기능

- [ ] 언어 토글 (한국어/영어)
- [ ] 인쇄/PDF 내보내기 기능
- [ ] 공유 버튼 (LinkedIn, Twitter, 링크 복사)
- [ ] 방문자 분석 (Google Analytics 또는 간단한 카운터)

---

### Phase 13: 버그 수정 및 코드/문서 일치

> 발견된 불일치 및 버그 수정

#### 13-1. 코드-문서 불일치 해결
- [ ] LearningSection: README에 있는 progress 필드 실제 구현 추가
- [ ] DeploymentSection: README에 있는 highlight 필드 실제 구현 추가
- [ ] LearningSection.css: 모바일 반응형 CSS 불일치 수정 (flex 사용 중인데 grid-template-columns 사용)
- [ ] **PhaseModal.js에 노션 링크 추가 필요** - 실제 사용되는 아키텍처 뷰(PhaseModal.js)에는 노션 링크가 없음. ArchitectureModal.js에는 추가되었으나 이 파일은 사용되지 않음
- [ ] README.md Phase 수정 가이드 업데이트 - 실제 구조 반영:
  - LifecycleSection.js: phases 배열 (id, number, title, titleEn, icon, experienced, isHighlight)
    - README 예시에서 `hasArchitecture`, `items` 필드 제거 필요 (실제로 없음)
    - `icon` 필드 추가 필요 (이모지 사용)
  - PhaseModal.js: phaseDetails 객체 (description, layers[], isArchitecture)
    - README 예시에서 `items` → `layers` 필드명 수정 필요
- [ ] README.md의 sites 구조 수정 필요:
  - 실제: (id, period, name, robot, role, notionLink)
  - README 예시: (id, name, location, type, period, role, highlight)
  - `type` → `robot` 필드명 수정, `location`/`highlight` 제거, `notionLink` 추가 필요
- [x] README.md의 milestones 구조 검증 완료 - 구조 일치 (type 값만 Phase 13-5에서 수정 필요)

#### 13-2. 접근성 및 표준 준수
- [ ] favicon 추가 (link rel="icon") - 현재 누락
- [ ] apple-touch-icon 추가
- [ ] manifest.json 추가 (PWA 지원 준비)

#### 13-3. 코드 정리
- [ ] ArchitectureModal.js 파일이 더 이상 사용되지 않음 → 삭제 필요 (PhaseModal.js로 통합됨)
- [ ] ArchitectureModal.css 파일도 함께 삭제
- [ ] 사용되지 않는 CSS 클래스 정리
- [ ] ProjectsSection.css: `.project-title` 중복 정의 수정 (line 69-75, 77-79) - 두 번째 정의가 첫 번째를 덮어씀
- [ ] ContactSection.js: footer 연도(2025) 하드코딩 → 동적 처리 필요 (`new Date().getFullYear()`) (line 72)
- [ ] Navigation.js: nav-footer 연도(2025) 하드코딩 → 동적 처리 필요 (line 37)
- [ ] LearningSection.css: 모바일 반응형에서 `grid-template-columns` 사용 오류 (line 57-60) - 부모가 `display: flex`인데 grid 속성 사용 중

#### 13-4. CSS 일관성
- [ ] 반응형 브레이크포인트 통일:
  - **768px 사용 중**: Navigation, GrowthSection, HeroSection, ContactSection, PhaseModal, LearningSection, App, index
  - **600px 사용 중**: DeploymentSection ⚠️
  - **900px 사용 중**: LifecycleSection ⚠️
  - **480px 사용 중**: LifecycleSection ⚠️
  - **400px 사용 중**: PhaseModal ⚠️
  - 권장: 480px (모바일), 768px (태블릿), 1024px (데스크톱), 1400px (대형)
- [ ] 공통 hover 효과를 CSS 변수 또는 mixin으로 추출

#### 13-5. 문서 일관성
- [ ] CLAUDE.md Architecture 섹션에서 ArchitectureModal.js 참조 제거 (더 이상 사용 안 함)
- [ ] CLAUDE.md Architecture 섹션에 PhaseModal.js가 ArchitectureView를 포함한다고 명시
- [ ] CLAUDE.md와 README.md 간 구조 설명 동기화
- [ ] README.md GrowthSection 예시에서 type 'turning-point' → 'growth'로 수정 (실제 코드와 일치시키기)

#### 13-7. 완료 항목 검증 (⚠️ 불일치 발견)
- [ ] ProjectsSection.js에 notionLink 필드 구현 필요 (CSS만 준비되어 있음, 데이터/JSX 미구현)
- [ ] README.md projects 예시에서 `titleEn` 필드 제거 필요 (실제 코드에 없음) 또는 코드에 추가
- [x] 완료 항목 목록의 "Phase 2: 프로젝트 카드에 노션 링크 기능 추가" 상태 수정 완료

#### 13-6. 코드 중복 제거
- [ ] 반복되는 SVG 아이콘 (Notion 아이콘 등)을 별도 컴포넌트로 추출
- [ ] ContactSection, ProjectsSection, DeploymentSection에서 동일한 Notion SVG 사용 중
- [ ] `src/components/icons/NotionIcon.js` 생성 고려

---

### Phase 14: 빌드 및 배포 안정성

> CI/CD 및 빌드 프로세스 개선

#### 14-1. CI/CD
- [ ] GitHub Actions 워크플로우 추가 (빌드 테스트 자동화)
- [ ] PR 생성 시 자동 프리뷰 배포

#### 14-2. 빌드 최적화
- [ ] 빌드 경고(warnings) 제거
- [ ] bundle analyzer로 번들 크기 분석 (`npm run analyze` 스크립트 추가)
- [ ] source map 설정 검토 (프로덕션에서 제거 여부)

#### 14-3. package.json 개선
- [ ] `test` 스크립트 추가 (현재 없음)
- [ ] `lint` 스크립트 추가 (ESLint 설정 후)
- [ ] `analyze` 스크립트 추가 (source-map-explorer 또는 webpack-bundle-analyzer)

---

### Phase 15: 콘텐츠 품질 점검

> 포트폴리오 콘텐츠 검토

- [x] 사이트 데이터 실제 정보로 검증 (가명 → 실제 사이트명으로 변경 완료)
- [ ] 프로젝트 성과 수치 검증 (50%, 70% 등 근거 확인)
- [ ] 기간 정보 정확성 검증 (22개월 등)
- [ ] 모든 링크 동작 확인 (# 링크 실제 연결)
- [ ] 스크린샷/이미지 추가 검토

---

### Phase 16: 코드 품질 및 에러 핸들링

> 안정성과 유지보수성 향상

#### 16-1. 에러 핸들링
- [ ] React Error Boundary 추가 (섹션별 에러 격리)
- [ ] 외부 링크 클릭 시 연결 실패 대응 (fallback UI)
- [ ] 이미지 로드 실패 시 placeholder 표시 (향후 이미지 추가 대비)

#### 16-2. 성능 최적화
- [ ] React.memo 적용하여 불필요한 re-render 방지 (Navigation, 각 Section)
- [ ] useMemo/useCallback 적용 (데이터 배열, 이벤트 핸들러)
- [ ] App.js: 스크롤 이벤트 핸들러에 throttle 적용 (현재 모든 스크롤에서 실행)
- [ ] console.log 정리 (프로덕션 빌드에서 제거)

#### 16-3. 타입 안전성
- [ ] PropTypes 추가 (Navigation, PhaseModal 등 props 받는 컴포넌트)
- [ ] JSDoc 주석 추가 (주요 함수, 컴포넌트에 용도 설명)

---

### Phase 17: 사용자 경험 세부 개선

> 더 세련된 인터랙션과 피드백

#### 17-1. 테마 및 시스템 설정
- [ ] prefers-color-scheme 감지하여 시스템 테마 따라가기 (다크 모드 기본)
- [ ] prefers-reduced-motion 존중 (애니메이션 최소화 옵션)

#### 17-2. 로딩 및 상태 표시
- [ ] 노션 링크 클릭 시 로딩 인디케이터 (새 탭 열리는 중)
- [ ] 섹션 lazy loading 시 Skeleton UI 적용 검토

#### 17-3. 인터랙션 피드백
- [ ] 버튼 클릭 시 ripple 효과 추가
- [ ] 링크 호버 시 tooltip으로 목적지 미리보기
- [ ] 키보드 단축키 추가 (1-7 숫자키로 섹션 이동)

---

### Phase 18: 포트폴리오 임팩트 강화 (신규)

> 채용 담당자에게 더 강한 인상을 남기기 위한 개선

#### 18-1. 핵심 성과 강조
- [ ] HeroSection: 핵심 수치(22개월, 7사이트, 5+프로토콜)에 애니메이션 카운터 효과 추가
- [ ] ProjectsSection: Result 수치(50%, 70%, 0.1%)를 색상/크기로 강조 표시
- [ ] DeploymentSection: "해외 단독 세팅" 역할에 특별 배지/스타일 추가

#### 18-2. 차별화 요소 부각
- [ ] LifecycleSection: 경험한 Phase 비율(5/7)을 더 눈에 띄게 표시
- [ ] 전체 페이지에 경험 요약 섹션 추가 검토 (기술 스택별 경험 레벨 차트)
- [ ] PhaseModal의 ArchitectureView: 경험 비율(60/70+ components) 시각화 개선

#### 18-3. 신뢰도 강화
- [ ] 각 프로젝트에 구체적인 기간 정보 추가
- [ ] 사이트별 배포 로봇 대수 정보 추가 (가능 시)
- [ ] 기술 스택별 사용 기간 표시 (예: ROS 22개월)

#### 18-4. CTA 개선
- [ ] ContactSection 진입 전 스크롤 시 CTA 버튼 플로팅 표시 검토
- [ ] 이력서/CV PDF 다운로드 링크 추가 검토
- [ ] "함께 일하기" 버튼 문구 개선

---

### 완료된 항목
- [x] GitHub Pages 배포 설정 (gh-pages, homepage URL)
- [x] Phase 1: 사이트 정보 업데이트 (DeploymentSection.js) - 실제 사이트명으로 변경
- [x] Phase 1: 연락처 정보 업데이트 (ContactSection.js) - Email, GitHub, LinkedIn 실제 정보로 변경
- [ ] Phase 1: 프로젝트 추가 검토 (STVL 3D 장애물 회피, Localization Fail Safe, OCR 송장 인식 등) - 현재 3개
- [ ] Phase 2: 프로젝트 카드에 노션 링크 기능 추가 (ProjectsSection.js) - ⚠️ CSS만 추가됨, 데이터/JSX 미구현
- [x] Phase 2: 사이트 항목에 노션 링크 기능 추가 (DeploymentSection.js)
- [x] Phase 2: Contact 섹션 노션 링크 실제 URL로 변경 (ContactSection.js)
- [x] Phase 2: ArchitectureModal에 노션 링크 추가 (단, 이 컴포넌트는 현재 사용되지 않음 - Phase 13에서 삭제 예정)
- [ ] Phase 2: ProjectsSection 하단 CTA 노션 링크 실제 URL로 변경 - ⚠️ 여전히 href="#"

---

## 🚀 실행 방법

### 개발 서버
```bash
npm install
npm start
```
→ http://localhost:3000

### 빌드
```bash
npm run build
```
→ `build/` 폴더에 정적 파일 생성

### GitHub Pages 배포
```bash
npm run deploy
```
→ `package.json`의 `homepage` 필드 수정 필요

---

## 📝 Claude Code 작업 시 참고

### 작업 유형별 가이드

#### 1. 데이터만 수정
- 위 "데이터 수정 가이드" 섹션 참고
- 해당 컴포넌트의 상단 `const` 배열 수정

#### 2. 스타일 수정
- 해당 컴포넌트의 `.css` 파일 수정
- CSS 변수는 `src/index.css`에서 관리

#### 3. 새 섹션 추가
```javascript
// 1. src/components/NewSection.js 생성
// 2. src/components/NewSection.css 생성
// 3. App.js에서 import 및 추가:
import NewSection from './components/NewSection';

// 4. Navigation.js의 navItems에 추가:
{ id: 'new', label: 'New Section', labelKr: '새 섹션' },
```

#### 4. 모달 추가
- `ArchitectureModal.js` 패턴 참고
- 부모 컴포넌트에서 `useState`로 열림/닫힘 관리
- 모달 외부 클릭 시 닫히도록 `onClick` 이벤트 처리

#### 5. 반응형 수정
- 각 컴포넌트 CSS 하단의 `@media (max-width: 768px)` 수정
- 좌측 네비게이션은 모바일에서 하단으로 이동됨

---

## 🔗 참고 자료

### 디자인 참고
- [Frontend Design Skill Guide]: 프론트엔드 디자인 가이드라인

### 기술 참고
- [ROS Wiki](http://wiki.ros.org/): ROS 공식 문서
- [FlexBE](http://wiki.ros.org/flexbe): 상태 머신 패키지
- [ros_control](http://wiki.ros.org/ros_control): 하드웨어 추상화

### 포트폴리오 참고
- PARL 구조: Problem → Action → Result → Learning
- 성장 서사: 시작점 → 전환점 → 성취 → 마일스톤

---

## 📄 라이선스

개인 포트폴리오 프로젝트. 비상업적 용도.
