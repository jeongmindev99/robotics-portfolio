# TODO by Claude

*`docs/TODO-by-human.md` 기반 세부 작업 목록 (2026-02-21 기준)*

## 우선순위 범례
- **[P2]** 기능·UX 개선 — 사용자 경험 관련
- **[P3]** 데이터 구조 개선 — 유지보수성, 향후 관리자 페이지 대비
- **[P4]** 디자인·문구 다듬기

---

## A. Hero 섹션 (`src/components/HeroSection.js`)

### A-5. secondary CTA 버튼 개선 [P4]
- [ ] **"연락하기" 버튼 문구 교체** (line 56–58):
  - 후보 문구: "함께 일해요", "같이 만들어봐요", "커피 한 잔 어때요?"
  - 이메일·전화 아이콘 SVG 추가 검토
  - `HeroSection.css`에서 `.cta-button.secondary` 스타일 강화 (배경색, 테두리, 호버 효과)

---

## B. What I Build 섹션 — 공통

### B-1. Phase 카드 `experienced` 자동 계산 [P2]
- 파일: `src/components/LifecycleSection.js`, `src/components/PhaseModal.js`
- [ ] **문제**: `phases` 배열의 `experienced` 필드가 수동 하드코딩 → `phaseDetails` 데이터와 불일치 가능
- [ ] **해결**: `LifecycleSection.js`에서 `phaseDetails`를 import 후, 각 phase의 `experienced`를 런타임에 자동 계산
  ```js
  // phaseDetails.layers 중 하나라도 experienced === true면 phase 카드를 "경험"으로 표시
  // development(isArchitecture)는 항상 true 처리
  const isPhaseExperienced = (phaseId) => {
    const detail = phaseDetails[phaseId];
    if (!detail) return false;
    if (detail.isArchitecture) return true;
    return detail.layers.some(l => l.experienced);
  };
  ```
- [ ] `phases` 배열에서 `experienced` 필드 제거 (자동 계산으로 대체)
- [ ] `flow-node`의 className 조건부 로직 업데이트

### B-2. 모달 열릴 때 배경 스크롤 잠금 및 위치 복원 [P2]
- 파일: `src/components/LifecycleSection.js`
- [ ] **스크롤 위치 저장**: `setSelectedPhase(phase)` 호출 전 `window.scrollY` 저장 (useRef 또는 변수)
- [ ] **body scroll lock**: `useEffect`에서 `selectedPhase` 상태 감지
  - 열릴 때: `document.body.style.overflow = 'hidden'`
  - 닫힐 때: `document.body.style.overflow = ''`
- [ ] **스크롤 복원**: 모달 닫힐 때 `window.scrollTo({ top: savedScrollY, behavior: 'instant' })` 실행
- [ ] **PhaseModal 내부 스크롤 확인**: `PhaseModal.css`의 `.phase-modal-content`에 `overflow-y: auto; max-height: 90vh;` 설정 여부 확인 및 추가

### B-3. 관리자 페이지 대비 데이터 구조 개선 [P3]
- [ ] **데이터 파일 분리**: `PhaseModal.js` 내 `phaseDetails`, `architectureLayers`를 별도 파일로 이동
  - `src/data/phaseData.js` 생성 후 두 객체 export
  - `PhaseModal.js`에서 import하여 사용 (동작 변화 없음)
  - 향후 관리자 페이지는 이 파일만 read/write하거나 API로 교체하면 됨
- [ ] **간접 경험 표현 방식 결정**: Phase 1 하드웨어 선정 항목 3개는 "간접 경험"이나 현재 `experienced: true`로만 표시됨
  - 옵션 A (권장): `experienced: true, indirect: true` 필드 추가 (최소 변경)
  - 옵션 B: `experience: 'direct' | 'indirect' | 'none'` (구조 변경)
  - 선택 후 `PhaseModal.js`의 CSS 클래스 분기도 함께 업데이트

### B-4. 모달 내 순차·병렬 작업 구분 배치 [P3]
- 파일: `src/components/PhaseModal.js` (phaseDetails 데이터)
- [ ] **검토 대상**: design, inspection, assembly, setup, operation, cicd (SW 개발 제외)
- [ ] 각 Phase에서 순차 수행 작업 vs 병렬 수행 가능 작업을 명확히 구분
  - 예(setup): 현장 평가 → 지도 생성 → 포즈 등록 (순차) / 이미지 학습 + 안전 설정 (병렬 가능)
- [ ] **데이터 구조에 그룹 정보 추가**: `layers` 아이템에 `group: string` 또는 `order: 'sequential' | 'parallel'` 필드 추가 — 향후 관리자 페이지에서 배치 수정 가능하도록
- [ ] **시각적 구분**: `PhaseModal.css`에서 그룹/순서 표현 방식 구현

---

## C. Phase 1 — 설계 (`PhaseModal.js` → `phaseDetails.design`)

### C-2. 항목 순서 재정렬 [P3]
- [ ] 현재 순서(하드웨어 선정 4개 → 기구 설계, 배선 설계, 회로/PCB, 응력, 열, EMC, 3D 모델링, SW 아키텍처, BOM, 설계 검토) → 아래 순서로 정렬:
  1. 구동계 선정
  2. 센서 선정
  3. 하드웨어 통신 선정
  4. 컴퓨팅 플랫폼 선정
  5. 기구 설계
  6. 3D 모델링
  7. 배선 설계
  8. 회로/PCB 설계
  9. 응력 분석
  10. 열 분석
  11. EMC 분석
  12. SW 아키텍처
  13. BOM 관리
  14. 설계 검토

---

## G. 기타

### G-1. 사용되지 않는 파일 삭제 [P3]
- [ ] `src/components/ArchitectureModal.js` 삭제 (PhaseModal.js 내 ArchitectureView로 대체됨)
- [ ] `src/components/ArchitectureModal.css` 삭제
- [ ] 삭제 전 import 여부 재확인 (`grep -r "ArchitectureModal" src/`)

### G-2. Footer 연도 동적 처리 [P3]
- [ ] `src/components/ContactSection.js` line 72: `"2025"` → `{new Date().getFullYear()}`

### G-3. 관리자 페이지 없이 직접 수정 가능한 구조 만들기 [P3]
- [ ] **데이터 파일 분리** (B-3와 연계):
  - `src/data/phaseData.js` — `phaseDetails`, `architectureLayers`
  - `src/data/projectsData.js` — `projects`
  - `src/data/deploymentData.js` — `sites`
  - `src/data/growthData.js` — `milestones`
  - `src/data/learningData.js` — `learningItems`
- [ ] 각 파일에 **수정 가이드 주석** 추가 (어떤 필드가 무엇인지 명시)
- [ ] `README.md` 데이터 수정 가이드 섹션을 분리된 파일 경로로 업데이트

---

## 작업 순서 권장

```
P2 기능·UX 개선 (다음)
├── B-1   → Phase 카드 experienced 자동 계산
└── B-2   → 모달 배경 스크롤 잠금 및 복원

P3 구조 개선 (시간 여유 시)
├── B-3, G-3   → 데이터 파일 분리 (관리자 페이지 대비)
├── B-4        → 순차/병렬 작업 구분
├── C-2        → Phase 1 설계 항목 순서 정렬
└── G-1, G-2   → 미사용 파일 삭제, 연도 동적 처리

P4 디자인·문구 (마지막)
└── A-5   → CTA secondary 버튼 개선 ("연락하기")
```

---

## 완료 기준

각 작업은 다음 조건을 모두 만족할 때 체크:
1. 코드 변경 완료
2. `npm start` 로 로컬 확인 (레이아웃, 반응형, 인터랙션 이상 없음)
3. feature 브랜치 commit → PR 생성
