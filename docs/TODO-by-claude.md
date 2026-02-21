# TODO by Claude

*관리자 페이지 구현 작업 목록 (2026-02-21 기준)*

---

## 아키텍처 결정 요약

| 항목 | 선택 |
|------|------|
| 진입 방식 | `?admin` URL 파라미터 |
| 인증 | 하드코딩 비밀번호 + sessionStorage (탭 닫으면 해제) |
| 편집 UX | 항목별 ✏️ 버튼 → 폼 모달 (contenteditable 아님) |
| 데이터 유지 | localStorage 자동 저장 + clipboard export |
| 새 의존성 | 없음 (React hooks + CSS만 사용) |
| 편집 범위 | Phase 항목 · 프로젝트 · 배포사이트 · 타임라인 · 학습 현황 |

---

## STEP 1 — AdminContext (핵심 상태 관리) ✅

파일: `src/context/AdminContext.js` 신규 생성

- [x] `isAdmin` — `new URLSearchParams(window.location.search).has('admin')` 감지
- [x] `isAuthed` — `sessionStorage.getItem('adminAuthed') === 'true'`
- [x] `data` 초기화: `localStorage.getItem('adminData')` 파싱 → 없으면 `src/data/*.js` 원본 사용
- [x] `dirtyKeys: Set` — 수정된 파일 키 추적 (`'projects'` | `'sites'` | `'milestones'` | `'learningItems'` | `'phaseDetails'`)
- [x] `authenticate(password)` → 일치 시 `sessionStorage.setItem('adminAuthed','true')` + `isAuthed` 업데이트
- [x] `updateProject(id, fields)` / `deleteProject(id)` / `addProject()`
- [x] `updateSite(id, fields)` / `deleteSite(id)` / `addSite()`
- [x] `updateMilestone(index, fields)` / `deleteMilestone(index)` / `addMilestone()`
- [x] `updateLearningItem(index, fields)` / `deleteLearningItem(index)` / `addLearningItem()`
- [x] `updatePhaseLayer(phaseId, index, fields)` / `deletePhaseLayer(phaseId, index)` / `addPhaseLayer(phaseId)`
- [x] `useEffect` — `data` 변경 시마다 `localStorage.setItem('adminData', JSON.stringify(data))` 자동 저장
- [x] `exportCode(key)` — 키별 JS 모듈 텍스트 생성 (JSON → JS 스타일 변환, 원본 주석 헤더 포함)
- [x] `resetAll()` — localStorage 삭제 후 `window.location.reload()`

---

## STEP 2 — AdminLoginPrompt ✅

파일: `src/components/AdminLoginPrompt.js` / `.css` 신규 생성

- [x] 전체화면 오버레이 (`position: fixed; inset: 0; z-index: 9998`)
- [x] 중앙 카드 (기존 `phase-modal-content` 스타일 활용)
- [x] `<input type="password">` + 제출 버튼
- [x] 틀렸을 때 에러 메시지 표시
- [x] 비밀번호 상수 파일 상단에 선언: `const ADMIN_PASSWORD = 'robotics2024';` + 변경 방법 주석

---

## STEP 3 — AdminBar ✅

파일: `src/components/AdminBar.js` / `.css` 신규 생성

- [x] `position: fixed; top: 0; left: 80px; right: 0; height: 48px; z-index: 9997`
- [x] 모바일(`max-width: 768px`) → `left: 0; bottom: 70px; top: auto`
- [x] 좌측: 펄스 점 + "ADMIN MODE" 텍스트
- [x] 중앙: `dirtyKeys.size > 0` 시 "변경 N건" 배지 / 없으면 "저장됨"
- [x] 우측 버튼 3개: [내보내기] [초기화] [나가기]
  - [x] [나가기]: `window.location.href = window.location.pathname` (쿼리 파라미터 제거)
  - [x] [초기화]: `resetAll()` 호출
  - [x] [내보내기]: `AdminExportPanel` 열기
- [x] 오렌지 기조 스타일: `background: rgba(255,107,53,0.12); border-bottom: 1px solid var(--accent-warning)`

---

## STEP 4 — AdminEditModal ✅

파일: `src/components/AdminEditModal.js` / `.css` 신규 생성

- [x] 기존 `PhaseModal`과 동일한 overlay + content 패턴
- [x] Props: `schema[]`, `initialValues`, `onSave(updatedValues)`, `onClose`, `title`
- [x] `schema` 타입별 렌더링:
  - [x] `text` → `<input type="text">`
  - [x] `textarea` → `<textarea rows="3">`
  - [x] `url` → `<input type="url">`
  - [x] `tags` → `<input>` (쉼표 구분 문자열 ↔ 배열 자동 변환)
  - [x] `boolean` → 토글 스위치 (CSS only, 체크박스 기반)
  - [x] `number` → `<input type="number">`
  - [x] `select` → `<select>` (options는 schema에서 정의)
- [x] 로컬 `useState`로 폼 값 관리
- [x] Save 시 `onSave(localValues)` 호출 후 닫기
- [x] body scroll lock (LifecycleSection 방식과 동일)
- [x] 기존 디자인 토큰(CSS 변수) 사용

---

## STEP 5 — AdminExportPanel ✅

파일: `src/components/AdminExportPanel.js` / `.css` 신규 생성

- [x] AdminBar [내보내기] 클릭 시 표시되는 우측 drawer 또는 모달
- [x] `dirtyKeys`에 있는 파일만 탭/섹션으로 표시
- [x] 각 파일별:
  - [x] 파일 경로 표시 (`src/data/projectsData.js`)
  - [x] `<pre>` 블록에 `exportCode(key)` 결과 표시
  - [x] [코드 복사] 버튼 → `navigator.clipboard.writeText(code)`
  - [x] 복사 후 "복사됨 ✓" 피드백 (2초 후 원복)
  - [x] [이 파일만 초기화] 버튼
- [x] 안내 텍스트: "코드 복사 → src/data/xxx.js 교체 → npm run deploy → 초기화"

---

## STEP 6 — App.js 수정 ✅

파일: `src/App.js`

- [x] `?admin` 파라미터 감지
- [x] `AdminContext.Provider`로 전체 앱 래핑
- [x] `isAdmin && !isAuthed` → `<AdminLoginPrompt>` 렌더
- [x] `isAdmin && isAuthed` → `<AdminBar>` 렌더 (main 위에)
- [x] `<main>`에 admin 모드 시 `paddingTop: 48px` 추가 (AdminBar 높이)

---

## STEP 7 — ProjectsSection.js 수정 ✅

- [x] `useContext(AdminContext)` 추가
- [x] `projectList = isAdmin && isAuthed ? data.projects : projects` (원본 fallback)
- [x] 각 `.project-card`에 admin 오버레이:
  - [x] ✏️ 버튼 → `AdminEditModal` 열기
  - [x] 🗑️ 버튼 → 확인 후 `deleteProject(project.id)`
- [x] 그리드 마지막에 [+ 프로젝트 추가] 버튼 → `addProject()` 후 편집 모달
- [x] `projectSchema` 정의:
  ```
  title(text), problem(textarea), action(textarea),
  result(textarea), tags(tags), notionLink(url)
  ```

---

## STEP 8 — DeploymentSection.js 수정 ✅

- [x] `siteList = isAdmin && isAuthed ? data.sites : sites`
- [x] 각 `.table-row` 마지막 셀에 ✏️ 🗑️ 버튼 추가
- [x] 테이블 하단에 [+ 사이트 추가] 버튼
- [x] `siteSchema` 정의: `period(text), name(text), robot(text), role(text), notionLink(url)`

---

## STEP 9 — GrowthSection.js 수정 ✅

- [x] `milestoneList = isAdmin && isAuthed ? data.milestones : milestones`
- [x] 각 `.timeline-item` 옆에 ✏️ 🗑️ 버튼
- [x] 타임라인 끝에 [+ 마일스톤 추가] 버튼
- [x] `milestoneSchema` 정의: `date(text), title(text), description(textarea), type(select: start/growth/achievement/milestone)`

---

## STEP 10 — LearningSection.js 수정 ✅

- [x] `learningList = isAdmin && isAuthed ? data.learningItems : learningItems`
- [x] 각 `.learning-card` 헤더에 ✏️ 🗑️ 버튼
- [x] 그리드 마지막에 [+ 학습 항목 추가] 카드 (점선 테두리)
- [x] `learningSchema` 정의: `skill(text), status(select: 학습 중/학습 예정/관심), description(textarea)`

---

## STEP 11 — LifecycleSection.js 수정 ✅

- [x] `phaseDetailsData = isAdmin && isAuthed ? data.phaseDetails : phaseDetails`
- [x] admin 모드에서 각 `flow-node`에 ✏️ 버튼 오버레이
- [x] 클릭 시 Phase 모달을 `adminMode: true` 플래그와 함께 열기
- [x] Phase 자체 추가/삭제는 제외 (구조적 고정)

---

## STEP 12 — PhaseModal.js 수정 ✅

- [x] `isAdminMode` prop 추가
- [x] admin 모드 시 `data.phaseDetails` (context)에서 읽기
- [x] 각 `.phase-node`에 admin 모드 오버레이:
  - [x] ✏️ → `AdminEditModal` (layerSchema: `name, description, experienced(boolean), indirect(boolean), stage(number)`)
  - [x] 🗑️ → `deletePhaseLayer(phase.id, index)`
- [x] 각 stage 사이에 [+ 이 stage에 항목 추가] 버튼
- [x] diagram 하단에 [+ 새 stage에 항목 추가] 버튼 (현재 최대 stage + 1)
- [x] "관리자 모드 편집 중" 안내 배지 표시
- [x] Architecture View (development phase) 편집은 이번 범위 제외

---

## STEP 13 — CSS 공통 ✅

각 컴포넌트 CSS 또는 공통 위치에 추가 (App.css에 전역 적용):

- [x] `.admin-item-wrapper` — `position: relative` (edit 버튼 absolute 기준점)
- [x] `.admin-btn` — 28×28px, border-radius 4px, cursor pointer
- [x] `.admin-btn-edit` — `border: 1px solid var(--accent-primary); color: var(--accent-primary)`
- [x] `.admin-btn-delete` — `border: 1px solid var(--accent-warning); color: var(--accent-warning)`
- [x] `.admin-btn:hover` — 배경색 강조
- [x] `.admin-add-btn` — 점선 테두리, teal 색상, 전체 너비, 가운데 정렬
- [x] 모바일(768px) 반응형 확인

---

## STEP 14 — 검증 ✅

- [x] `npm run build` → Compiled successfully (에러 없음 확인)
- [x] 일반 접속 → 관리자 UI 전혀 없음 (Playwright 자동 검증)
- [x] `?admin` → 비밀번호 모달 표시 (Playwright 자동 검증)
- [x] 비밀번호 입력 → AdminBar 표시, 편집 버튼 47개 표시 (Playwright 자동 검증)
- [x] 프로젝트 ✏️ → 폼 모달 → 저장 → 카드 즉시 업데이트 (Playwright 자동 검증)
- [x] 프로젝트 🗑️ → 카드 삭제 (6 → 5) (Playwright 자동 검증)
- [x] [+ 프로젝트 추가] → 카드 추가 (5 → 6) (Playwright 자동 검증)
- [x] 새로고침 (`?admin` 유지) → 변경사항 localStorage 복원 (Playwright 자동 검증)
- [x] [내보내기] → 패널 열림 + 코드 블록 표시 (Playwright 자동 검증)
- [x] [초기화] → 원본 데이터 복원 (Playwright 자동 검증)
- [x] Phase 모달 admin 편집 → 배지 표시 + 레이어 편집 버튼 14개 (Playwright 자동 검증)
- [ ] `npm run deploy` 후 `?admin` 없이 접속 → 관리자 UI 미노출 (배포 후 확인)

---

## STEP 15 — 문서 ✅

- [x] `CLAUDE.md` 변경 이력에 관리자 페이지 구현 기록
- [x] 비밀번호 변경 방법: `src/context/AdminContext.js` 상단 `ADMIN_PASSWORD` 상수 수정 (CLAUDE.md에 명시)

---

## 구현 순서

```
STEP 1  AdminContext.js       ← 모든 상태·로직의 핵심 (병목, 먼저 완료 필요)
STEP 2  AdminLoginPrompt      ↓ 이후 병렬 진행 가능
STEP 3  AdminBar              ↓
STEP 4  AdminEditModal        ↓ (가장 많이 재사용)
STEP 5  AdminExportPanel      ↓
STEP 6  App.js 수정           ← Context Provider 래핑
─────── 이후 섹션 병렬 가능 ───────────────────────────
STEP 7  ProjectsSection       ← 가장 단순, 패턴 확립용
STEP 8  DeploymentSection
STEP 9  GrowthSection
STEP 10 LearningSection
STEP 11 LifecycleSection
STEP 12 PhaseModal            ← 가장 복잡, 마지막
STEP 13 CSS 공통
STEP 14 검증
STEP 15 문서
```
