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
| 3 | `projects` | How I Solved | 문제 해결 경험 5개 (PARL 구조) |
| 4 | `deployment` | Where I Deployed | 현장 경험 (국내 5 + 해외 2) |
| 5 | `growth` | How I Grew | 성장 타임라인 (전환점 4개) |
| 6 | `tech-experience` | Technical Deep Dive | 기술 심화 - 8개 카테고리별 기술 경험 상세 |
| 7 | `learning` | What I'm Learning | 부족한 점 인정 + 학습 현황 |
| 8 | `contact` | Contact | 연락처 (Email, GitHub, LinkedIn, Notion) |

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
        ├── PhaseModal.js        # Phase 클릭 시 상세 모달 (아키텍처 뷰 포함)
        ├── PhaseModal.css
        ├── ProjectsSection.js   # 프로젝트 카드 (PARL 구조)
        ├── ProjectsSection.css
        ├── DeploymentSection.js # 사이트 배포 현황
        ├── DeploymentSection.css
        ├── GrowthSection.js     # 성장 타임라인
        ├── GrowthSection.css
        ├── TechExperienceSection.js  # 기술 심화 (8개 카테고리)
        ├── TechExperienceSection.css
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

로봇 엔지니어 업무의 7개 Phase:

```javascript
// LifecycleSection.js - Phase 정의
const phases = [
  {
    id: 'design',           // 고유 ID (PhaseModal과 연결)
    number: '01',           // 표시 번호
    title: '설계',          // 한글 제목
    titleEn: 'Design',      // 영문 제목
    icon: '📐',             // 아이콘
    experienced: false,     // ⭐ Phase 전체 경험 여부
  },
  {
    id: 'inspection',
    number: '02',
    title: '검사',
    titleEn: 'Inspection',
    icon: '🔍',
    experienced: true,      // ⭐ 경험함
  },
  {
    id: 'assembly',
    number: '03',
    title: '조립',
    titleEn: 'Assembly',
    icon: '🔧',
    experienced: true,
  },
  {
    id: 'development',
    number: '04',
    title: 'SW 개발',
    titleEn: 'Development',
    icon: '💻',
    experienced: true,
    isHighlight: true,      // ⭐ 메인 강조 (아키텍처 뷰 포함)
  },
  {
    id: 'setup',
    number: '05',
    title: '세팅',
    titleEn: 'Site Setup',
    icon: '📍',
    experienced: true,
  },
  {
    id: 'operation',
    number: '06',
    title: '운영',
    titleEn: 'Operation',
    icon: '🚀',
    experienced: true,
  },
  {
    id: 'cicd',
    number: '07',
    title: 'CI/CD',
    titleEn: 'CI/CD',
    icon: '🔄',
    experienced: false,
  },
];
```

> 📌 **Note**: 각 Phase 클릭 시 상세 내용은 `PhaseModal.js`의 `phaseDetails` 객체에서 관리됩니다.

### 3. 시스템 아키텍처 수정 (PhaseModal.js)

> ⚠️ ArchitectureModal.js는 삭제됨. 아키텍처 뷰는 PhaseModal.js 내에서 처리

모바일 매니퓰레이터 시스템 아키텍처 8개 레이어 (PhaseModal.js의 architectureLayers):

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
    link: '#',                                  // 노션 상세 링크
  },
  {
    id: 2,
    title: 'FlexBE 배송 시나리오',
    titleEn: 'FlexBE Delivery Scenario',
    problem: '복잡한 배송 로직을 하드코딩으로 관리하여 수정이 어려웠음',
    action: 'FlexBE 상태 머신으로 전체 배송 플로우를 시각화하고 모듈화',
    result: '시나리오 수정 시간 70% 단축, 새로운 사이트 적용 용이',
    tags: ['FlexBE', 'State Machine', 'ROS'],
    link: '#',
  },
  {
    id: 3,
    title: 'MQTT 통신 시스템',
    titleEn: 'MQTT Communication System',
    problem: '관제 서버와 로봇 간 실시간 통신이 불안정했음',
    action: 'MQTT 프로토콜 기반 통신 레이어를 새로 설계하고 구현',
    result: '통신 안정성 향상, 메시지 손실률 0.1% 이하',
    tags: ['MQTT', 'Communication', 'Python'],
    link: '#',
  },
];
```

### 5. 사이트 수정 (DeploymentSection.js)

```javascript
const sites = [
  { id: 1, period: '2024.04', name: '래미안 원베일리', robot: '배송로봇', role: '세팅 보조' },
  { id: 2, period: '2024.08', name: '부산 포터', robot: '물류로봇', role: '세팅 및 운영' },
  { id: 3, period: '2024.10', name: '판교 스타필드', robot: '배송로봇', role: '세팅 지원' },
  { id: 4, period: '2025.07', name: '일본 팜코트', robot: '물류로봇', role: '현장 세팅' },
  // ...
];

// 필드 설명:
// - id: 고유 번호
// - period: 참여 시기 (YYYY.MM 형식)
// - name: 사이트명
// - robot: 로봇 종류 (배송로봇, 물류로봇, 서빙로봇 등)
// - role: 담당 역할
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
    // - 'growth': 주황 (전환점/성장)
    // - 'achievement': 민트 (성취)
    // - 'milestone': 골드 + 글로우 (마일스톤)
  },
  {
    date: '2024.10',
    title: '"감으로 디버깅" → 체계적 접근',
    description: '문제를 체계적으로 분석하고 기록하기 시작. 디버깅 과정을 습관화하고 문서화.',
    type: 'growth',
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

### 완료된 항목
- [x] GitHub Pages 배포 설정 (gh-pages, homepage URL)
- [x] 사이트 정보 업데이트 (DeploymentSection.js) - 실제 사이트명 및 노션 링크
- [x] 연락처 정보 업데이트 (ContactSection.js) - Email, GitHub, LinkedIn, Notion 실제 정보

### 필수 수정 (데이터)
- [ ] Phase별 하위 항목 정확하게 업데이트 (LifecycleSection.js)
- [x] 프로젝트 노션 링크 연결 (ProjectsSection.js) - 5개 프로젝트 + 노션 링크 구현 완료
- [x] 프로젝트 CTA 노션 링크 실제 URL로 변경
- [ ] 성장 타임라인 전환점 확정 (GrowthSection.js)

### 추가 개발 예정 (기능)
- [ ] PhaseModal.js의 ArchitectureView에 노션 링크 연결
- [ ] 프로젝트 상세 페이지 또는 모달
- [ ] 사이트별 상세 정보 모달
- [ ] 다크/라이트 모드 토글
- [ ] 애니메이션 개선 (framer-motion 도입 검토)

### 버그 수정 및 코드 정리
- [x] ArchitectureModal.js/css 삭제 완료 (PhaseModal.js로 통합됨)
- [x] ContactSection.js footer 연도 동적 처리 완료
- [x] LearningSection.css 모바일 반응형 CSS 오류 수정 완료 (flex-direction: column)
- [x] Navigation.js nav-footer 연도 동적 처리 완료
- [x] ProjectsSection.css `.project-title` 중복 정의 수정 완료 (하나로 병합)
- [ ] 모바일 반응형 개선
- [x] 스크롤 스냅 모바일에서 비활성화 확인 완료 (index.css @media 768px에서 scroll-snap-type: none)

### 디자인 개선 (Visual Enhancement)
- [ ] HeroSection: 핵심 수치(22개월, 7사이트)에 카운트업 애니메이션 추가
- [ ] HeroSection: 타이핑 애니메이션 효과 추가 (title-line에)
- [ ] ProjectsSection: Result 수치(50%, 70%, 0.5초)를 색상/크기로 강조
- [ ] DeploymentSection: 해외 사이트(일본)에 국기 이모지/배지 추가 (🇯🇵) - location 필드 없음, 구조 변경 필요
- [x] GrowthSection: 타임라인 각 단계별 색상 구분 완료 (start, growth, achievement, milestone)
- [ ] GrowthSection: 타입별 아이콘 추가 고려 (현재 색상 마커만 존재)
- [ ] LearningSection: progress 필드 추가하여 진행률 바 시각화
- [ ] Navigation: 스크롤 진행률 표시기 추가 (상단 프로그레스 바)
- [ ] 전체: "맨 위로" 버튼 추가 (스크롤 시 표시)
- [ ] 호버 효과 개선: 프로젝트 카드, 사이트 행에 더 풍부한 인터랙션
- [ ] 섹션 전환 애니메이션: 스크롤 시 fade-in/slide-up 효과 (Intersection Observer 활용)

### CSS 일관성
- [x] 반응형 브레이크포인트 통일 완료
  - DeploymentSection.css: 768px로 변경됨
  - 전체적으로 768px로 통일됨

### README-코드 불일치 수정
- [x] Phase 구조: README 예시를 실제 코드에 맞게 수정 완료 (icon, isHighlight 추가, items 제거)
- [x] PhaseModal.js: Phase 상세 내용은 phaseDetails 객체에서 layers로 관리됨을 명시
- [x] sites 구조: README 예시를 실제 코드(period, name, robot, role)에 맞게 수정 완료
- [x] GrowthSection type 값: README 예시를 'growth'로 수정 완료

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
