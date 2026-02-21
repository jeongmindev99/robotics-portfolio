# TODO by Claude

*`docs/TODO-by-human.md` 기반 세부 작업 목록 (2026-02-21 갱신)*

---

## 완료된 작업

### Hero 섹션
- [x] **A-5** secondary CTA "연락하기" → "커피 한 잔 어때요?" + 이메일 아이콘 + 호버 효과 향상

### What I Build 섹션

- [x] **B-1** Phase 카드 `experienced` 자동 계산
  - `phaseDetails.layers` 중 하나라도 `experienced: true`면 Phase 카드 "경험" 처리
  - `development` (isArchitecture)는 항상 경험 처리
  - 하드코딩 제거, 데이터와 UI 자동 동기화

- [x] **B-2** 모달 열릴 때 배경 스크롤 잠금 + 닫을 때 원위치 복원
  - `useEffect`로 `document.body.style.overflow` 제어
  - `useRef`로 scrollY 저장 → 닫을 때 `window.scrollTo({ behavior: 'instant' })` 복원

- [x] **B-3** 관리자 페이지 대비 데이터 구조 분리
  - `src/data/phaseData.js` — `phaseDetails`, `architectureLayers`
  - `src/data/projectsData.js` — How I Solved 프로젝트 목록
  - `src/data/deploymentData.js` — Where I Deployed 사이트 목록
  - `src/data/growthData.js` — How I Grew 타임라인
  - `src/data/learningData.js` — What I'm Learning 목록
  - 각 컴포넌트에서 인라인 데이터 제거 → import로 교체

- [x] **B-4** 모달 내 순차·병렬 작업 구분 배치
  - `stage` 필드로 그루핑 → 같은 stage 항목 나란히 표시, stage 간 화살표 연결
  - `stage` 필드 자체가 관리자 페이지에서 수정 가능한 구조

- [x] **간접 경험 표현** (SW 개발 제외 전 Phase 적용 가능)
  - `indirect: true` 필드 추가 (현재 Phase 1 하드웨어 선정 3개 적용)
  - ◎ 주황 점선 테두리로 시각 구분, 범례에 "간접 경험" 표시
  - 다른 Phase도 `indirect: true` 추가만 하면 즉시 반영되는 구조

- [x] **각 Phase 항목 검토 및 정정** (P1 content fixes)
  - Phase 1 설계: 하드웨어 선정 4개 항목 추가, stage 기반 재정렬
  - Phase 2 검사: 경험 항목 정정, 외관+치수 통합, 환경시험 추가
  - Phase 3 조립: 경험 항목 정정, 케이블 통합, 도장/방수/무게중심 추가
  - Phase 5 세팅: 경험 항목 정정, 네트워크 설치·운영 교육 추가

### 기타
- [x] **G-1** 미사용 `ArchitectureModal.js/.css` 삭제
- [x] **G-2** Footer 연도 동적 처리 (`{new Date().getFullYear()}`)
- [x] **관리자 페이지 노력 검토** 완료
  - 결론: 데이터 파일(`src/data/*.js`) 직접 수정 방식으로 준비 완료
  - 현재도 코드 수정 없이 데이터 파일만 편집하면 콘텐츠 수정 가능

---

## 남은 작업

### 관리자 페이지 구현 [미착수 / 향후 작업]

> 현재 `src/data/*.js` 파일 구조로 준비가 완료된 상태.
> API 또는 CMS로 교체하거나 UI를 붙이는 것만 남아 있음.

#### 구현 범위 (우선순위 순)

**[P-A] 핵심 편집 기능**
- [ ] Phase 모달 항목 편집 (추가/삭제/수정/experienced 토글/stage 변경)
- [ ] 프로젝트 카드 편집 (추가/삭제/수정)
- [ ] 배포 사이트 편집 (추가/삭제/수정)

**[P-B] 부가 편집 기능**
- [ ] 성장 타임라인 편집
- [ ] 학습 현황 편집
- [ ] Hero 통계 숫자 편집

**[P-C] 인프라**
- [ ] 인증 (관리자만 접근 가능하도록)
- [ ] 데이터 저장 방식 결정: 로컬 JSON 파일 수정 / Firebase / Supabase 등
- [ ] 변경사항 실시간 미리보기

#### 구현 난이도 (참고)

| 방식 | 노력 | 비고 |
|------|------|------|
| JSON 파일 직접 수정 (현재) | 없음 | 코드 에디터 필요, 이미 완료 |
| 간단한 관리 UI (React + localStorage) | 중간 (3~5일) | 배포 후 데이터 휘발 주의 |
| Firebase/Supabase 연동 관리 UI | 높음 (1~2주) | 실시간 반영, 인증 포함 |

---

## 데이터 직접 수정 가이드 (관리자 페이지 전까지)

콘텐츠를 바꾸려면 `src/data/` 폴더의 해당 파일만 편집하면 됩니다.

| 수정 대상 | 파일 |
|-----------|------|
| Phase 모달 항목 | `src/data/phaseData.js` |
| 프로젝트 카드 | `src/data/projectsData.js` |
| 배포 사이트 | `src/data/deploymentData.js` |
| 성장 타임라인 | `src/data/growthData.js` |
| 학습 현황 | `src/data/learningData.js` |
