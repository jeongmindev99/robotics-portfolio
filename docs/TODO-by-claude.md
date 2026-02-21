# TODO by Claude

*관리자 페이지 구현 작업 목록 (2026-02-21 기준)*

---

## 구현 완료 요약

| STEP | 내용 | 상태 |
|------|------|------|
| 1 | AdminContext.js — 전체 상태·CRUD·localStorage·export 로직 | ✅ |
| 2 | AdminLoginPrompt.js/.css — 비밀번호 입력 오버레이 | ✅ |
| 3 | AdminBar.js/.css — 상단 고정 바 (ADMIN MODE, 내보내기·초기화·나가기) | ✅ |
| 4 | AdminEditModal.js/.css — 범용 폼 모달 | ✅ |
| 5 | AdminExportPanel.js/.css — JS 코드 복사 패널 | ✅ |
| 6 | App.js 수정 — AdminProvider 래핑, 조건부 렌더 | ✅ |
| 7 | ProjectsSection.js 수정 — ✏️🗑️ 버튼, [+ 추가] | ✅ |
| 8 | DeploymentSection.js 수정 | ✅ |
| 9 | GrowthSection.js 수정 | ✅ |
| 10 | LearningSection.js 수정 | ✅ |
| 11 | LifecycleSection.js 수정 | ✅ |
| 12 | PhaseModal.js 수정 — 레이어 편집, stage별 추가 | ✅ |
| 13 | CSS 공통 — `.admin-item-wrapper`, `.admin-btn`, `.admin-add-btn` | ✅ |
| 14 | 검증 — Playwright 자동 테스트 16/16 통과 | ✅ (배포 후 최종 확인 필요) |
| 15 | 문서 — CLAUDE.md, README.md, TODO 정리 | ✅ |

---

## 아키텍처 결정

| 항목 | 선택 |
|------|------|
| 진입 방식 | `?admin` URL 파라미터 |
| 인증 | 하드코딩 비밀번호 + sessionStorage |
| 편집 UX | 항목별 ✏️ 버튼 → 폼 모달 |
| 데이터 유지 | localStorage 자동 저장 + clipboard export |
| 새 의존성 | 없음 (React hooks + CSS만 사용) |

---

## 남은 항목

- [ ] `npm run deploy` 후 `?admin` 없이 접속 → 관리자 UI 미노출 확인 (배포 후 수동 확인)

---

## 다음 작업

---

### A. SW 개발 아키텍처 — admin 편집 가능 구조

**배경**: AdminContext에 `architectureLayers`가 SOURCE_DATA에 포함돼 있으나,
`PhaseModal.js`의 `ArchitectureView`는 정적 import를 직접 사용 중.

#### A-1. AdminContext.js 수정 (`src/context/AdminContext.js`)
- [x] `architectureLayers` CRUD 뮤테이션 추가
  - [x] `updateArchitectureItem(layerIdx, groupIdx, itemIdx, fields)` — item의 `name`, `experienced` 수정
  - [x] `updateArchitectureLayer(layerIdx, fields)` — layer의 `name` 수정
  - [x] `markDirty('architectureLayers')` 호출 포함
- [x] `EXPORT_VAR_NAMES`에 `architectureLayers: 'architectureLayers'` 추가
- [x] `FILE_HEADERS`에 `architectureLayers` 헤더 템플릿 추가
- [x] context value 객체에 새 뮤테이션 함수 추가

#### A-2. PhaseModal.js 수정 (`src/components/PhaseModal.js`)
- [x] `ArchitectureView` 컴포넌트에 `useAdmin()` 호출 추가
- [x] `const activeArchLayers = adminActive ? data.architectureLayers : architectureLayers` 패턴 적용
  - `totalItems`, `experiencedItems`, `rosLayers`, `outsideROSLayers`, `otherLayers` 계산 시 `activeArchLayers` 사용
- [x] `ArchitectureView`에 `isAdminMode` prop 전달 (line 155: `<ArchitectureView phase={phase} onClose={onClose} isAdminMode={isAdminMode} />`)
- [x] admin 모드에서 각 `arch-node`에 ✏️ 버튼 추가 → `experienced` 토글 또는 AdminEditModal 열기
  - schema: `[{ key: 'name', type: 'text' }, { key: 'experienced', type: 'boolean' }]`
- [x] admin 모드에서 arch-node 수정 후 `updateArchitectureItem` 호출

---

### B. 날짜 자동화

#### B-1. HeroSection.js (`src/components/HeroSection.js`)
- [x] line 31 `2024` (성장 시작 연도) → `heroData.js`에서 읽어오도록 변경 (C항목과 연동)

#### B-2. Navigation.js (`src/components/Navigation.js`)
- [x] line 37 `2025` → `{new Date().getFullYear()}` 로 변경

---

### C. 소개 문구·통계 — 데이터 파일 분리 + admin 편집

**배경**: HeroSection.js의 모든 텍스트·통계가 하드코딩되어 있음.

#### C-1. heroData.js 신규 생성 (`src/data/heroData.js`)
- [x] 아래 구조로 `heroContent` export
  ```js
  export const heroContent = {
    badge: 'Robotics Software Engineer',
    titleLines: ['로봇이 만들어지고', '현장에 배포되어 운영되기까지', '전 과정을 경험한 엔지니어'],
    highlightLine: 1,          // titleLines 중 강조할 인덱스
    subtitle: '문제를 해결하다 보니, 어느새 소프트웨어 잡부가 되어버린 나의 여정',
    growthStart: '2024.05',    // 성장 기간 시작 (B-1 자동화 연동)
    robotCount: 4,
  };
  ```

#### C-2. HeroSection.js 수정 (`src/components/HeroSection.js`)
- [x] `heroContent` import 추가
- [x] `useAdmin()` 추가, `adminActive ? data.heroContent : heroContent` 패턴 적용
- [x] 모든 하드코딩 텍스트를 `heroContent.*` 참조로 교체
  - badge, titleLines, subtitle, growthStart, robotCount
- [x] 성장 시작 연도: `heroContent.growthStart.split('.')[0]` → stat number, `.split('.')[1] + ' ~ 현재'` → stat label
- [x] 사이트 수: D항목에서 처리 (C항목에서는 제외)

#### C-3. AdminContext.js 수정 (`src/context/AdminContext.js`)
- [x] `SOURCE_DATA`에 `heroContent: srcHeroContent` 추가
- [x] `heroContent` import 추가
- [x] `updateHeroContent(fields)` 뮤테이션 추가
- [x] `EXPORT_VAR_NAMES`, `FILE_HEADERS`에 `heroContent` 추가
- [x] context value에 `updateHeroContent` 추가

#### C-4. HeroSection.js admin 편집 UI
- [x] admin 모드에서 badge/title/subtitle 영역에 ✏️ 버튼 추가
- [x] 클릭 시 AdminEditModal 열기
  - schema: `badge(text)`, `titleLines(textarea)`, `subtitle(textarea)`, `growthStart(text)`, `robotCount(number)`

---

### D. 사이트 배포 수 — 자동 계산

#### D-1. HeroSection.js 수정 (`src/components/HeroSection.js`)
- [x] `sites` import 추가: `import { sites } from '../data/deploymentData'`
- [x] `useAdmin()` 추가 (C항목에서 이미 추가됨)
- [x] 사이트 수 stat: `9` 하드코딩 → `(adminActive ? data.sites : sites).length`

---

### E. 이메일·링크 — 데이터 파일 분리 + admin 편집

**배경**: ContactSection.js의 이메일, GitHub, LinkedIn, Notion URL이 모두 하드코딩.

#### E-1. contactData.js 신규 생성 (`src/data/contactData.js`)
- [x] 아래 구조로 `contactInfo` export
  ```js
  export const contactInfo = {
    email: 'jeongmin.dev99@gmail.com',
    github: 'https://github.com/jeongmindev99',
    githubDisplay: 'github.com/jeongmindev99',
    linkedin: 'https://linkedin.com/in/jeongminchoi',
    linkedinDisplay: 'linkedin.com/in/jeongminchoi',
    notion: 'https://notion.so/2e9d8a0a7b5a81c5a57ed22576f1cb0c',
  };
  ```

#### E-2. ContactSection.js 수정 (`src/components/ContactSection.js`)
- [x] `contactInfo` import 추가
- [x] `useAdmin()` 추가, `adminActive ? data.contactInfo : contactInfo` 패턴 적용
- [x] 모든 하드코딩 링크/텍스트를 `contactInfo.*` 참조로 교체

#### E-3. AdminContext.js 수정 (`src/context/AdminContext.js`)
- [x] `SOURCE_DATA`에 `contactInfo: srcContactInfo` 추가
- [x] `contactInfo` import 추가
- [x] `updateContactInfo(fields)` 뮤테이션 추가
- [x] `EXPORT_VAR_NAMES`, `FILE_HEADERS`에 `contactInfo` 추가
- [x] context value에 `updateContactInfo` 추가

#### E-4. ContactSection.js admin 편집 UI
- [x] admin 모드에서 각 연락처 항목에 ✏️ 버튼 추가
- [x] AdminEditModal schema: `email(text)`, `github(url)`, `githubDisplay(text)`, `linkedin(url)`, `linkedinDisplay(text)`, `notion(url)`

---

### F. CLAUDE.md / README.md 업데이트
- [x] 신규 데이터 파일(`heroData.js`, `contactData.js`) 아키텍처 섹션에 추가
- [x] admin 편집 범위 표에 HeroContent, ContactInfo 항목 추가
- [x] 변경 이력 기록

---

## 발견 및 수정한 버그 (2026-02-21)

1. **PhaseModal + AdminEditModal 클릭 버블링** — AdminEditModal을 `phase-modal-overlay` 내부에 렌더하면 AdminEditModal 오버레이 클릭 시 PhaseModal까지 닫히는 문제. React Fragment `<>...</>` 사용해서 overlay 밖 형제로 렌더 → 수정 완료.

2. **AdminEditModal body scroll lock 충돌** — cleanup이 항상 `overflow = ''`로 설정해서 PhaseModal이 걸어둔 scroll lock까지 해제되는 문제. `const prev = document.body.style.overflow` 저장 후 복원 → 수정 완료.

3. **GrowthSection 추가 버튼 레이아웃** — 추가 버튼이 `.timeline-item` 으로 감싸져 `.timeline-marker` 없이 flex 레이아웃이 깨지는 문제. `.timeline` 직접 하위로 이동 → 수정 완료.
