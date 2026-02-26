# TODO by Claude

*2026-02-22 기준*

---

## 구현 완료 요약

### Phase 1 — 관리자 페이지 (2026-02-21)

| STEP | 내용 | PR |
|------|------|----|
| 1 | AdminContext.js — 전체 상태·CRUD·localStorage·export 로직 | #6 |
| 2 | AdminLoginPrompt.js/.css — 비밀번호 입력 오버레이 | #6 |
| 3 | AdminBar.js/.css — 상단 고정 바 (ADMIN MODE, 내보내기·초기화·나가기) | #6 |
| 4 | AdminEditModal.js/.css — 범용 폼 모달 | #6 |
| 5 | AdminExportPanel.js/.css — JS 코드 복사 패널 | #6 |
| 6 | App.js 수정 — AdminProvider 래핑, 조건부 렌더 | #6 |
| 7 | ProjectsSection.js 수정 — ✏️🗑️ 버튼, [+ 추가] | #6 |
| 8 | DeploymentSection.js 수정 — ✏️🗑️ 버튼, [+ 추가] | #6 |
| 9 | GrowthSection.js 수정 — ✏️🗑️ 버튼, [+ 추가] | #6 |
| 10 | LearningSection.js 수정 — ✏️🗑️ 버튼, [+ 추가] | #6 |
| 11 | LifecycleSection.js 수정 — Phase 노드에 ✏️ 버튼 | #6 |
| 12 | PhaseModal.js 수정 — phase-node 편집·삭제, stage별 추가 | #6 |
| 13 | CSS 공통 — `.admin-item-wrapper`, `.admin-btn`, `.admin-add-btn` | #6 |
| 14 | 검증 — Playwright 자동 테스트 16/16 통과 | #6 |
| 15 | 문서 — CLAUDE.md, README.md, TODO 정리 | #6 |

### Phase 2 — 데이터 분리 및 편집 범위 확장 (2026-02-22)

| STEP | 내용 | PR |
|------|------|----|
| 16 | heroData.js 신규 — badge, titleLines, subtitle, growthStart, robotCount | #7 |
| 17 | contactData.js 신규 — email, github, linkedin, notion | #7 |
| 18 | HeroSection.js — heroContent/sites 참조, growthStart 파싱, 사이트 수 자동 계산, admin ✏️ UI | #7 |
| 19 | ContactSection.js — contactInfo 참조, admin ✏️ UI | #7 |
| 20 | Navigation.js — 저작권 연도 `{new Date().getFullYear()}` 동적 처리 | #7 |
| 21 | PhaseModal(ArchitectureView) — useAdmin() 연동, arch-node ✏️ 버튼 | #7 |
| 22 | AdminContext.js — architectureLayers/heroContent/contactInfo CRUD 뮤테이션, export 확장 | #7 |
| 23 | 문서 — CLAUDE.md, README.md, TODO 정리 | #7 |

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

## 다음 작업

---

### A. 간접 경험 데이터 — 전 Phase 확장

**배경**: `indirect: true` 마킹이 현재 `design` Phase에만 적용되어 있음.
`inspection` ~ `cicd`의 각 항목에는 `indirect` 필드 자체가 없어, 간접 경험을 표현할 수 없음.
렌더링 로직(PhaseModal.js)과 admin 편집 스키마(layerSchema)는 이미 `indirect`를 지원 중.

**현재 상태 (`src/data/phaseData.js`)**:
- `design`: `indirect: true/false` 명시 ✅
- `inspection`, `assembly`, `setup`, `operation`, `cicd`: `indirect` 필드 없음 ❌

#### A-1. phaseData.js 데이터 수정 (`src/data/phaseData.js`)

각 Phase별 `experienced: true` 항목을 검토하여 직접/간접 여부 판단 후 `indirect` 필드 추가.

| Phase | `indirect: true` 후보 (검토 필요) |
|-------|----------------------------------|
| inspection | 외관·치수 검사, PCB 검사, 전기 테스트, 전원 테스트, 낙하·진동 시험, 방수·방진 테스트, EMC 테스트, 품질 기록 |
| assembly | 프레임 조립, 모터 장착, 센서 장착, 전자부 통합, 케이블 배선, 도장·마감, 방수 씰링, 무게중심 측정, 통합 테스트 |
| setup | 네트워크 인프라 설치, 경로 최적화, 시나리오 개발, 이미지 학습, 안전 설정, 통합 시험·인수 테스트, 운영 교육 |
| operation | 예측 정비 |
| cicd | 자동 빌드, 자동 테스트, 배포 자동화, 모니터링 연동 |

- [ ] `inspection` 각 항목에 `indirect: true/false` 추가
- [ ] `assembly` 각 항목에 `indirect: true/false` 추가
- [ ] `setup` 각 항목에 `indirect: true/false` 추가
- [ ] `operation` 각 항목에 `indirect: true/false` 추가
- [ ] `cicd` 각 항목에 `indirect: true/false` 추가

> **작업 방법**: `experienced: false` 항목은 `indirect: false`로 통일.
> `experienced: true` 항목만 직접(false) / 간접(true) 구분.

---

### B. 데이터 정확성 — Phase별 하위 항목 검토

**배경**: phaseData.js의 `experienced` 값이 실제 경험과 일치하는지 전수 검토 필요.
A항목(indirect 추가) 작업과 병행하여 진행.

#### B-1. 각 Phase 항목 정확성 검토 (`src/data/phaseData.js`)

- [ ] **design** — 현재 `experienced: true` 항목 (구동계 선정, 센서 선정, 하드웨어 통신 선정, SW 아키텍처) 정확한지 확인
- [ ] **inspection** — CAN 통신 테스트, 모터 테스트, 센서 테스트만 `experienced: true`인 것이 맞는지 확인
- [ ] **assembly** — 조인트/센서 캘리브레이션만 `experienced: true`인 것이 맞는지 확인
- [ ] **setup** — 현장 평가, 지도 생성, 존·구역 설정, 포즈 등록만 `experienced: true`인 것이 맞는지 확인
- [ ] **operation** — 예측 정비를 제외한 전 항목 `experienced: true`인 것이 맞는지 확인
- [ ] **cicd** — 버전 관리, 코드 리뷰, 컨테이너화, 설정 관리, 롤백, 릴리스 관리가 `experienced: true`인 것이 맞는지 확인
- [ ] **architectureLayers** — Perception 그룹(SLAM, Object Detection, Sensor Fusion, Point Cloud) 전체 `experienced: false`인 것이 맞는지 확인

#### B-2. 누락 항목 추가

- [ ] 각 Phase에서 빠진 실제 경험 항목이 있다면 추가
- [ ] 추가 시 `name`, `description`, `experienced`, `indirect`, `stage` 필드 모두 기입

---

### C. Notion 연동 — ArchitectureView 노션 링크

**배경**: 다른 섹션(ProjectsSection, DeploymentSection)은 카드마다 `notionLink`가 있지만,
SW 개발 아키텍처 모달(ArchitectureView)에는 노션 링크가 없음.
`phaseDetails.development`에 `notionLink` 필드를 추가하고 ArchitectureView 헤더에 표시.

#### C-1. phaseData.js 수정 (`src/data/phaseData.js`)
- [ ] `phaseDetails.development`에 `notionLink` 필드 추가
  ```js
  development: {
    description: '로봇 소프트웨어 시스템을 개발하는 핵심 단계',
    isArchitecture: true,
    notionLink: 'https://...',  // 추가
  },
  ```

#### C-2. AdminContext.js 수정 (`src/context/AdminContext.js`)
- [ ] `updatePhaseMeta(phaseId, fields)` 뮤테이션 추가
  - `phaseDetails[phaseId]`의 `description`, `notionLink` 등 레이어 외 필드 수정용
  - `markDirty('phaseDetails')` 호출
- [ ] context value에 `updatePhaseMeta` 추가

#### C-3. PhaseModal.js 수정 (`src/components/PhaseModal.js`)
- [ ] `ArchitectureView`에 `notionLink` prop 전달
  ```js
  // details에서 꺼내서 전달 (adminActive 반영)
  const activeDetails = adminActive ? data.phaseDetails : phaseDetails;
  const devDetails = activeDetails['development'];
  return <ArchitectureView ... notionLink={devDetails.notionLink} />;
  ```
- [ ] `ArchitectureView` 함수 파라미터에 `notionLink` 추가
- [ ] 헤더 영역에 노션 링크 버튼 렌더
  ```jsx
  {notionLink && (
    <a href={notionLink} target="_blank" rel="noopener noreferrer" className="notion-link-btn">
      Notion에서 보기 ↗
    </a>
  )}
  ```
- [ ] admin 모드: 헤더에 ✏️ 버튼 추가 → `notionLink` 편집 모달 열기
  - schema: `[{ key: 'notionLink', label: 'Notion URL', type: 'url' }]`
  - 저장 시 `updatePhaseMeta('development', { notionLink })` 호출

#### C-4. PhaseModal.css 수정 (`src/components/PhaseModal.css`)
- [ ] `.notion-link-btn` 스타일 추가 (다른 섹션의 Notion 버튼과 일관성 있게)

---

## 남은 항목

- [ ] `npm run deploy` 후 `?admin` 없이 접속 → 관리자 UI 미노출 확인 (배포 후 수동 확인)

---

## 발견 및 수정한 버그

1. **PhaseModal + AdminEditModal 클릭 버블링** — AdminEditModal을 `phase-modal-overlay` 내부에 렌더하면 AdminEditModal 오버레이 클릭 시 PhaseModal까지 닫히는 문제. React Fragment `<>...</>` 사용해서 overlay 밖 형제로 렌더 → 수정 완료.

2. **AdminEditModal body scroll lock 충돌** — cleanup이 항상 `overflow = ''`로 설정해서 PhaseModal이 걸어둔 scroll lock까지 해제되는 문제. `const prev = document.body.style.overflow` 저장 후 복원 → 수정 완료.

3. **GrowthSection 추가 버튼 레이아웃** — 추가 버튼이 `.timeline-item` 으로 감싸져 `.timeline-marker` 없이 flex 레이아웃이 깨지는 문제. `.timeline` 직접 하위로 이동 → 수정 완료.
