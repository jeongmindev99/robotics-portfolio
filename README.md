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
| 3 | `projects` | How I Solved | 문제 해결 경험 6개 (PARL 구조) |
| 4 | `deployment` | Where I Deployed | 현장 경험 (국내 5 + 해외 2) |
| 5 | `growth` | How I Grew | 성장 타임라인 (전환점 4개) |
| 6 | `learning` | What I'm Learning | 부족한 점 인정 + 학습 현황 |
| 7 | `contact` | Contact | 연락처 (Email, GitHub, LinkedIn, Notion) |

### 핵심 인터랙션

1. **네비게이션 바** (좌측 고정): 클릭 시 해당 섹션으로 스무스 스크롤
2. **스크롤 스냅**: 섹션 단위로 스냅
3. **Phase 클릭** (Lifecycle): 모달로 하위 항목 표시
4. **Architecture Modal**: SW개발 Phase 클릭 시 시스템 아키텍처 다이어그램 표시

---

## 📁 프로젝트 구조

```
robotics-portfolio/
├── package.json
├── README.md                    # 이 파일
├── docs/
│   ├── TODO-by-claude.md        # Claude Code 작업 목록
│   └── TODO-by-human.md        # 사람이 처리할 작업 목록
├── public/
│   └── index.html               # HTML 템플릿, 폰트 로드
└── src/
    ├── index.js                 # React 엔트리 포인트
    ├── index.css                # CSS 변수, 글로벌 스타일, 애니메이션
    ├── App.js                   # 메인 앱, 섹션 구성, 스크롤 핸들링
    ├── App.css                  # 섹션 공통 스타일 + 관리자 공통 CSS
    ├── context/
    │   └── AdminContext.js      # 관리자 모드 상태 관리 (CRUD, localStorage, export)
    ├── data/                    # 각 섹션의 콘텐츠 데이터
    │   ├── phaseData.js         # Phase 모달 레이어 + 시스템 아키텍처 레이어
    │   ├── projectsData.js      # 프로젝트 카드 (6개)
    │   ├── deploymentData.js    # 배포 사이트 목록 (7개)
    │   ├── growthData.js        # 성장 타임라인 마일스톤
    │   └── learningData.js      # 학습 현황 항목
    └── components/
        ├── Navigation.js/.css       # 좌측 네비게이션 바 (80px 고정)
        ├── HeroSection.js/.css      # 히어로 섹션
        ├── LifecycleSection.js/.css # 7개 Phase (로봇 엔지니어 업무 사이클)
        ├── PhaseModal.js/.css       # Phase 상세 모달 (ArchitectureView 포함)
        ├── ProjectsSection.js/.css  # 프로젝트 카드 (PARL 구조)
        ├── DeploymentSection.js/.css # 사이트 배포 현황
        ├── GrowthSection.js/.css    # 성장 타임라인
        ├── LearningSection.js/.css  # 학습 현황
        ├── ContactSection.js/.css   # 연락처
        ├── AdminLoginPrompt.js/.css  # 관리자 비밀번호 입력 오버레이
        ├── AdminBar.js/.css          # 관리자 상단 고정 바
        ├── AdminEditModal.js/.css    # 관리자 범용 폼 모달
        └── AdminExportPanel.js/.css  # 관리자 JS 코드 내보내기 패널
```

---

## 🔑 관리자 모드

코드 에디터 없이 브라우저에서 직접 콘텐츠를 수정할 수 있는 기능.

### 접근 방법
URL에 `?admin` 파라미터 추가:
```
localhost:3000/?admin
https://jeongmindev99.github.io/robotics-portfolio/?admin
```

### 비밀번호 변경
`src/context/AdminContext.js` 파일 상단의 `ADMIN_PASSWORD` 상수 수정:
```js
const ADMIN_PASSWORD = 'robotics2024'; // ← 여기 변경
```

### 편집 가능 항목
| 섹션 | 편집 내용 |
|------|----------|
| How I Solved | 프로젝트 카드 추가/수정/삭제 |
| Where I Deployed | 사이트 행 추가/수정/삭제 |
| How I Grew | 타임라인 항목 추가/수정/삭제 |
| What I'm Learning | 학습 항목 추가/수정/삭제 |
| What I Build | Phase별 레이어 항목 추가/수정/삭제 |

### 변경사항 반영 워크플로우
1. `?admin` 접속 → 비밀번호 입력 → 편집
2. **[내보내기]** 버튼 클릭 → 변경된 파일의 JS 코드 표시
3. **[코드 복사]** → `src/data/xxx.js` 파일에 붙여넣기
4. `npm run deploy`로 배포
5. **[초기화]** 버튼으로 localStorage 정리

---

## 🔧 데이터 수정 가이드

> 직접 코드를 수정할 때는 아래 안내에 따라 `src/data/` 폴더의 파일을 수정.

### 1. Hero 섹션 수정 (HeroSection.js)

Hero 섹션은 별도 데이터 파일 없이 `src/components/HeroSection.js`에서 직접 수정:
- 메인 타이틀: `hero-title` 클래스 텍스트
- 부제목: `hero-subtitle` 클래스 텍스트
- 핵심 수치: `.stat-item` 항목들

### 2. Phase 수정 (src/data/phaseData.js)

Phase별 레이어 항목은 `phaseData.js`의 `phaseDetails` 객체에서 관리:

```js
export const phaseDetails = {
  design: {
    description: '...',
    layers: [
      { name: '기구 설계', description: '...', experienced: false, indirect: false, stage: 1 },
      { name: 'SW 아키텍처', description: '...', experienced: true, indirect: false, stage: 2 },
      // ...
    ]
  },
  development: {
    description: '...',
    isArchitecture: true,  // ArchitectureView로 렌더링
  },
  // 나머지 phase ID별 정의
};
```

> `stage` 필드: 같은 숫자끼리 같은 행에 표시 (병렬 작업), 다른 숫자는 순차 표시
> `indirect: true`: 간접 경험 (주황 점선 테두리)
> `experienced: true`: 직접 경험 (민트 테두리)

Phase 카드의 `experienced` 여부는 `phaseDetails[id].layers`에 `experienced: true` 항목이 하나라도 있으면 자동으로 활성화.

### 3. 시스템 아키텍처 수정 (src/data/phaseData.js)

`architectureLayers` 배열로 관리. 레이어 타입:
- `'single'`: 단일 행 레이어 (items 배열)
- `'horizontal'`: 수평 그룹 레이어 (groups 배열, 각 group에 items)
- `'runtime'`: 런타임 환경 레이어

레이어 속성:
- `isOutsideROS: true` → Cloud/Application 레이어 (ROS 프레임워크 외부)
- `isROS: true` → ROS 프레임워크 내부 레이어
- 둘 다 없으면 → Runtime, OS, Hardware 등 하위 레이어

### 4. 프로젝트 수정 (src/data/projectsData.js)

```js
export const projects = [
  {
    id: 1,
    title: 'Import Manager 리팩토링',
    problem: '...',
    action: '...',
    result: '...',
    tags: ['ROS', 'Python', 'Architecture'],
    notionLink: 'https://notion.so/...',  // 있으면 "상세 보기" 링크 자동 표시
  },
  // ...
];
```

### 5. 사이트 수정 (src/data/deploymentData.js)

```js
export const sites = [
  {
    id: 1,
    period: '2024.05',
    name: '판교 테크원',
    robot: '배송로봇',
    role: '세팅 및 운영',
    notionLink: 'https://notion.so/...',  // 있으면 행에 링크 아이콘 표시
  },
  // ...
];
```

### 6. 성장 타임라인 수정 (src/data/growthData.js)

```js
export const milestones = [
  {
    date: '2024.03',
    title: 'ROS 제로에서 시작',
    description: '...',
    type: 'start',  // 'start' | 'growth' | 'achievement' | 'milestone'
  },
  // ...
];
```

타입별 색상 (GrowthSection.css):
- `start`: 파랑 (시작점)
- `growth`: 주황 (성장/전환점)
- `achievement`: 민트 (성취)
- `milestone`: 골드 + 글로우 (마일스톤)

### 7. 학습 현황 수정 (src/data/learningData.js)

```js
export const learningItems = [
  {
    skill: 'C++',
    status: '학습 중',  // '학습 중' | '학습 예정' | '관심'
    description: '로보틱스 핵심 언어, 기초 문법과 STL 학습 중',
  },
  // ...
];
```

### 8. 연락처 수정 (ContactSection.js)

`src/components/ContactSection.js`에서 직접 수정 (이메일, GitHub, LinkedIn, Notion URL).

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
  --accent-warning: #ff6b35;   /* 오렌지 - 전환점, 관리자 모드 */
  --accent-highlight: #ffd700; /* 골드 - 마일스톤, 최고 성취 */

  /* 테두리 */
  --border-color: #2a2a2a;
  --border-highlight: #3a3a3a;

  /* 폰트 */
  --font-display: 'Outfit', 'Noto Sans KR', sans-serif;
  --font-body: 'Noto Sans KR', 'Outfit', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* 효과 */
  --glow-primary: 0 0 20px rgba(0, 212, 170, 0.3);
  --glow-secondary: 0 0 20px rgba(0, 153, 255, 0.3);
}
```

### 색상 사용 규칙

| 색상 | 용도 |
|------|------|
| `--accent-primary` (민트) | 경험한 영역, 주요 버튼, 링크 |
| `--accent-secondary` (블루) | 해외 사이트, 특별한 항목 |
| `--accent-warning` (오렌지) | 전환점, 관리자 모드 |
| `--accent-highlight` (골드) | 마일스톤, 최고 성취 |

---

## 🚀 실행 방법

```bash
npm install        # 의존성 설치
npm start          # 개발 서버 (localhost:3000)
npm run build      # 프로덕션 빌드
npm run deploy     # GitHub Pages 배포
```

---

## 📝 Claude Code 작업 시 참고

### 데이터 수정
- 콘텐츠는 모두 `src/data/` 폴더에서 관리
- 관리자 모드(`?admin`)로 브라우저에서 수정 후 코드 export 가능

### 스타일 수정
- 각 컴포넌트의 `.css` 파일 수정
- CSS 변수는 `src/index.css`에서 관리

### 새 섹션 추가
```js
// 1. src/components/NewSection.js + NewSection.css 생성
// 2. App.js에서 import 및 렌더링 추가
// 3. Navigation.js의 navItems에 추가
{ id: 'new', label: 'New Section', labelKr: '새 섹션' },
```

### 모달 패턴
`PhaseModal.js` 참고: overlay + content 구조, 외부 클릭으로 닫기, body scroll lock.

### 관리자 모드 패턴
```js
const { isAdmin, isAuthed, data } = useAdmin();
const adminActive = isAdmin && isAuthed;
const itemList = adminActive ? data.xxx : originalImport; // 원본 fallback
```

---

## 📄 라이선스

개인 포트폴리오 프로젝트. 비상업적 용도.
