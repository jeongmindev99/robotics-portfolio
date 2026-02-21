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

## 발견 및 수정한 버그 (2026-02-21)

1. **PhaseModal + AdminEditModal 클릭 버블링** — AdminEditModal을 `phase-modal-overlay` 내부에 렌더하면 AdminEditModal 오버레이 클릭 시 PhaseModal까지 닫히는 문제. React Fragment `<>...</>` 사용해서 overlay 밖 형제로 렌더 → 수정 완료.

2. **AdminEditModal body scroll lock 충돌** — cleanup이 항상 `overflow = ''`로 설정해서 PhaseModal이 걸어둔 scroll lock까지 해제되는 문제. `const prev = document.body.style.overflow` 저장 후 복원 → 수정 완료.

3. **GrowthSection 추가 버튼 레이아웃** — 추가 버튼이 `.timeline-item` 으로 감싸져 `.timeline-marker` 없이 flex 레이아웃이 깨지는 문제. `.timeline` 직접 하위로 이동 → 수정 완료.
