# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 필수 참조

**작업 전 반드시 README.md를 먼저 읽고 프로젝트 컨텍스트를 파악할 것.**

README.md에는 다음 정보가 포함되어 있음:
- 전체 구조 및 섹션 구성
- 데이터 수정 가이드 (각 컴포넌트별 상세)
- 디자인 시스템 (CSS 변수, 색상 규칙)
- TODO 리스트

## Commands

```bash
npm start      # 개발 서버 (localhost:3000)
npm run build  # 프로덕션 빌드
npm run deploy # GitHub Pages 배포
```

## Architecture

```
App.js (AdminProvider 래핑, 스크롤 트래킹)
├── AdminLoginPrompt.js  # ?admin 접속 시 비밀번호 입력 오버레이
├── AdminBar.js          # 관리자 모드 상단 고정 바
├── Navigation.js        # 좌측 네비게이션 (80px 고정)
├── HeroSection.js       # 히어로 + 통계 (admin 편집 지원)
├── LifecycleSection.js  # 7개 Phase
│   └── PhaseModal.js    # Phase 상세 모달 (ArchitectureView 포함, admin 편집 지원)
├── ProjectsSection.js   # PARL 구조 프로젝트 (6개, admin 편집 지원)
├── DeploymentSection.js # 사이트 배포 현황 (admin 편집 지원)
├── GrowthSection.js     # 성장 타임라인 (admin 편집 지원)
├── LearningSection.js   # 학습 현황 (admin 편집 지원)
└── ContactSection.js    # 연락처 (admin 편집 지원)
```

관리자 공통 컴포넌트 (`src/components/`):
- `AdminEditModal.js` — 범용 폼 모달 (text/textarea/url/tags/boolean/select/number)
- `AdminExportPanel.js` — dirty 파일별 JS 코드 복사 패널 (우측 drawer)

관리자 컨텍스트 (`src/context/`):
- `AdminContext.js` — admin 상태, CRUD 뮤테이션, localStorage 자동 저장, JS export

데이터 (`src/data/`):
- `phaseData.js` — `phaseDetails` (Phase 레이어), `architectureLayers` (SW개발 아키텍처)
- `projectsData.js` — How I Solved 프로젝트 목록
- `deploymentData.js` — Where I Deployed 사이트 목록
- `growthData.js` — How I Grew 타임라인
- `learningData.js` — What I'm Learning 목록
- `heroData.js` — Hero 섹션 콘텐츠 (badge, titleLines, subtitle, growthStart, robotCount)
- `contactData.js` — 연락처 정보 (email, github, linkedin, notion)

## Workflow Rules

### Documentation First
- **작업 전 README.md 필수 참조**
- 아키텍처/설계 변경 시 CLAUDE.md와 README.md 즉시 업데이트

### Branch Strategy

```
main   ← 배포용 브랜치 (GitHub Pages). 직접 push 금지.
  ↑
devel  ← 통합 테스트 브랜치. feature PR은 여기로 머지.
  ↑
feature/*, fix/*, docs/*  ← 단위 작업 브랜치
```

### Git Workflow
- **feature → devel PR**: 기능 개발/버그 수정 완료 시 `devel`로 PR 생성
- **devel → main PR**: 충분히 테스트 후 `main`으로 PR 생성 → 머지 후 배포
- **main, devel 직접 push 금지** — PR을 통해서만 머지

### PR Process
1. `devel` 기반으로 feature 브랜치 생성
2. 코드 변경 및 commit → `devel`로 PR 생성
3. 사용자가 PR 리뷰 및 승인 → `devel` 머지
4. 충분한 테스트 후 `devel` → `main` PR 생성 → 머지
5. `npm run deploy`로 GitHub Pages 배포

### Branch Naming
- `feature/기능명` - 새 기능
- `fix/버그명` - 버그 수정
- `docs/문서명` - 문서 업데이트
- `refactor/대상` - 리팩토링

### Deployment
devel → main 머지 완료 후:
```bash
git checkout main
git pull origin main
npm run deploy
```

## 관리자 페이지 사용법

**접근**: `?admin` URL 파라미터 추가 (예: `localhost:3000/?admin`)
**비밀번호**: 프로젝트 루트 `.env.local` 파일의 `REACT_APP_ADMIN_PASSWORD` 값 변경 후 재빌드
**편집 가능 섹션**: Hero / How I Solved / Where I Deployed / How I Grew / What I'm Learning / What I Build (Phase 레이어 + SW 아키텍처) / Contact
**데이터 반영**: 편집 → [내보내기] → JS 코드 복사 → `src/data/xxx.js` 파일 교체 → `npm run deploy`

## 최근 변경 이력

### 2026-02-22: 데이터 분리 및 admin 편집 범위 확장 (feature/todo-next-tasks → devel)
- **heroData.js** 신규 — Hero 섹션 콘텐츠 데이터 분리 (badge, titleLines, highlightLine, subtitle, growthStart, robotCount)
- **contactData.js** 신규 — 연락처 데이터 분리 (email, github, linkedin, notion)
- **HeroSection.js** 수정 — heroContent/sites 데이터 참조, growthStart 자동 파싱, 사이트 수 자동 계산, admin 편집 UI 추가
- **ContactSection.js** 수정 — contactInfo 데이터 참조, admin 편집 UI 추가
- **Navigation.js** 수정 — 저작권 연도 `{new Date().getFullYear()}` 동적 처리
- **PhaseModal.js** 수정 — ArchitectureView에 useAdmin() 연동, adminActive 패턴 적용, arch-node ✏️ 버튼 추가
- **AdminContext.js** 수정 — architectureLayers/heroContent/contactInfo CRUD 뮤테이션 추가, EXPORT_VAR_NAMES/FILE_HEADERS 확장

### 2026-02-21: 관리자 페이지 구현 (feature/admin-page → devel)
- **AdminContext.js** 신규 — 전체 admin 상태 관리, CRUD, localStorage 자동 저장, JS 코드 export
- **AdminLoginPrompt.js/.css** 신규 — `?admin` 파라미터 감지 시 표시되는 비밀번호 입력 오버레이
- **AdminBar.js/.css** 신규 — 상단 고정 바 (ADMIN MODE 배지, 변경건수, 내보내기·초기화·나가기)
- **AdminEditModal.js/.css** 신규 — 범용 폼 모달 (text/textarea/url/tags/boolean/select/number 타입)
- **AdminExportPanel.js/.css** 신규 — dirty 파일별 JS 코드 복사 패널 (우측 drawer)
- **App.js** 수정 — AdminProvider 래핑, 조건부 AdminLoginPrompt/AdminBar 렌더
- **ProjectsSection.js** 수정 — 프로젝트 카드별 ✏️🗑️ 버튼, [+ 추가] 버튼
- **DeploymentSection.js** 수정 — 사이트 행별 ✏️🗑️ 버튼, [+ 추가] 버튼
- **GrowthSection.js** 수정 — 타임라인 항목별 ✏️🗑️ 버튼, [+ 추가] 버튼
- **LearningSection.js** 수정 — 학습 카드별 ✏️🗑️ 버튼, [+ 추가] 버튼
- **LifecycleSection.js** 수정 — Phase 노드에 ✏️ 버튼 → Phase 모달을 admin 모드로 열기
- **PhaseModal.js** 수정 — isAdminMode prop 추가, phase-node별 편집·삭제, stage별 추가, 새 stage 추가
- **App.css** 수정 — admin 공통 CSS (`.admin-item-wrapper`, `.admin-btn`, `.admin-add-btn` 등)

### 2026-02-21: 문서 동기화 (미커밋, docs/ + README.md + CLAUDE.md)
- README.md: 코드와 불일치하던 데이터 구조 예시 8개 항목 수정
  - `phaseDetails` 구조 (`hasArchitecture/items` → `isArchitecture/layers`)
  - `architectureLayers` 전체 구조 재작성 (type/isROS/isOutsideROS/groups 반영)
  - `projects` 3개 → 6개, `titleEn` 필드 제거, `notionLink` 구현 완료 반영
  - `sites` 필드명 정정 (`location/type/highlight` → `robot/notionLink`)
  - `milestones` type 값 정정 (`turning-point` → `growth`)
  - `learningItems` `progress` 필드 없음으로 정정
- CLAUDE.md: 아키텍처 트리 수정 (ArchitectureModal.js 미사용 명시, PhaseModal ArchitectureView 주석 추가, 프로젝트 수 6개로 수정)
- docs/TODO-by-human.md, docs/TODO-by-claude.md 신규 생성

### 2026-02-21: P2~P4 기능·구조 개선 (PR #5 / feature/p2-p3-p4-improvements)
- **G-1** `ArchitectureModal.js`, `ArchitectureModal.css` 삭제 (미사용 파일)
- **G-2** `ContactSection.js` Footer 연도 → `{new Date().getFullYear()}` 동적 처리
- **G-3 / B-3** 데이터 파일 분리 (관리자 페이지 대비)
  - `src/data/phaseData.js` 신규 — `phaseDetails`, `architectureLayers` export
  - `src/data/projectsData.js` 신규 — `projects` export
  - `src/data/deploymentData.js` 신규 — `sites` export
  - `src/data/growthData.js` 신규 — `milestones` export
  - `src/data/learningData.js` 신규 — `learningItems` export
  - 각 컴포넌트(ProjectsSection, DeploymentSection, GrowthSection, LearningSection, PhaseModal) 인라인 데이터 제거 → import로 교체
- **B-4** `PhaseModal.js` stage 기반 순차·병렬 배치 렌더링 구현
  - `phaseData.js`의 `stage` 필드로 그루핑 → 같은 stage 항목 나란히 표시
  - `indirect: true` 항목은 `.exp-indirect` CSS 클래스로 별도 스타일 (주황 점선 테두리)
  - 범례: 직접 경험(●) / 간접 경험(◎) / 미경험(○) 3단계 표시
- **B-1** `LifecycleSection.js` Phase 카드 `experienced` 자동 계산
  - `phaseDetails.layers` 중 `experienced === true` 항목이 하나라도 있으면 Phase 카드 "경험" 표시
  - `development` (isArchitecture) 는 항상 경험 처리
  - 하드코딩된 `experienced` 필드 제거
- **B-2** 모달 열릴 때 배경 스크롤 잠금 및 닫힐 때 위치 복원
  - `useEffect`로 `document.body.style.overflow = 'hidden'` / `''` 전환
  - `useRef`로 scrollY 저장, 닫힐 때 `window.scrollTo({ behavior: 'instant' })` 복원
- **A-5** Hero secondary CTA 버튼 개선
  - 문구: "연락하기" → "커피 한 잔 어때요?" + 이메일 아이콘 추가
  - CSS: 호버 시 배경색·translateY 효과 추가
- **C-2** Phase 1 설계 항목 순서 → stage 필드 기반 논리적 순서로 phaseData.js에 반영

### 2026-02-21: P1 콘텐츠 정확성 수정 (PR #4 / feature/p1-content-fixes)
- **HeroSection.js**
  - 타이틀: "로봇 소프트웨어의 설계부터 운영까지" → "로봇이 만들어지고 현장에 배포되어 운영되기까지"
  - 부제목: "22개월 만에 7개 사이트…" → "문제를 해결하다 보니, 어느새 소프트웨어 잡부가 되어버린 나의 여정"
  - 통계: 22개월 → 2024.05~현재, 사이트 7 → 9, 통신 경험 제거 후 로봇 4모델 추가
  - CTA: "경험 살펴보기" → "나의 여정 보기"
- **PhaseModal.js**
  - Phase 1(설계): 구동계·센서·하드웨어 통신·컴퓨팅 플랫폼 선정 항목 4개 추가
  - Phase 2(검사): CAN·모터·센서 테스트만 경험으로 정정, 외관+치수 통합, 기능 테스트 제거, 낙하/방수/EMC 시험 추가
  - Phase 3(조립): 캘리브레이션 2개만 경험으로 정정, 케이블 3개 항목 통합, 도장/방수/무게중심 추가
  - Phase 4(세팅): 현장 평가·지도·존구역·포즈만 경험으로 정정, 네트워크 설치·운영 교육 항목 추가

---

## UI/UX Checklist

**CSS 수정 시 반드시 확인:**

### 레이아웃
- [ ] 고정 요소(Navigation 등)가 콘텐츠를 가리지 않는지 확인
- [ ] `margin-left/right`와 `padding-left/right`가 충돌하지 않는지 확인
- [ ] 고정 네비게이션(80px)이 있을 때 main에 `margin-left: 80px` 적용 여부 확인

### 반응형
- [ ] 모바일(max-width: 768px)에서 레이아웃 정상 동작 확인
- [ ] 고정 요소가 모바일에서 적절히 처리되는지 확인

### 섹션 구분
- [ ] 섹션 간 시각적 분리가 명확한지 확인
- [ ] 스크롤 시 현재 위치를 쉽게 파악할 수 있는지 확인

### 인터랙션
- [ ] 클릭 가능한 요소에 명확한 호버 효과가 있는지 확인
- [ ] CTA 버튼이 사용자 행동을 유도하는 문구인지 확인
- [ ] 모달이 정상적으로 열리고 닫히는지 확인

### 테스트 명령
```bash
npm start  # 개발 서버에서 직접 확인
```
