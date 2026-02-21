## 공통
- 내 요구사항에 맞게 수정하되, 좀 더 매끄럽고, 격식있고, 자연스러운 표현으로 내 의도를 표현할 수 있다면 너의 생각대로 수정해줘.
- 문장, 단어 등을 추가, 삭제, 변경할 때는 내가 원하는 바를 최대한 반영해줘.
- 문장, 단어 등을 추가, 수정 할때는 디자인에 대한 부분까지도 고려하여 자연스럽게 어울리도록 해줘.

## 완료된 요구사항

### Hero 섹션
- [x] "연락하기" 버튼 문구와 디자인 개선 → "커피 한 잔 어때요?" + 이메일 아이콘

### What I Build 섹션
- [x] Phase 안에 경험 항목이 하나라도 있으면 테두리 자동 활성화 (자동 계산)
- [x] Phase 모달에서 배경 스크롤 잠금 및 닫힐 때 스크롤 위치 복원
- [x] Phase 레이어 항목 순차/병렬 배치 (stage 필드 기반)
- [x] 간접 경험 항목 표현 (indirect: true → 주황 점선 테두리, 범례 추가)
- [x] 관리자 페이지에서 Phase 레이어 항목 수정 가능한 구조 구현

### How I Solved
- [x] 관리자 페이지에서 프로젝트 추가/수정/삭제 구현

### Where I Deployed
- [x] 관리자 페이지에서 사이트 추가/수정/삭제 구현

### How I Grew
- [x] 관리자 페이지에서 타임라인 항목 추가/수정/삭제 구현

### What I'm Learning
- [x] 관리자 페이지에서 학습 항목 추가/수정/삭제 구현

### 관리자 페이지
- [x] 관리자 페이지 구현 완료 (`?admin` URL 파라미터로 진입)
- [x] 비밀번호 인증 (sessionStorage, 탭 닫으면 해제)
- [x] 변경사항 localStorage 자동 저장 + JS 코드 export 기능

---

## 미완료 / 향후 작업

### Phase 1: 데이터 정확성 검증
- [ ] Phase별 하위 항목 정확하게 업데이트 (`src/data/phaseData.js`)

### Phase 2: Notion 연동
- [ ] PhaseModal의 ArchitectureView에 노션 링크 연결

### Phase 3: UI/UX 개선
- [ ] 다크/라이트 모드 토글
- [ ] 모바일 반응형 개선 (DeploymentSection 테이블 → 카드)

### Phase 5: 접근성
- [ ] 모달 ESC 키로 닫기
- [ ] 포커스 트랩 구현
- [ ] `aria-modal`, `role="dialog"` 추가

### Phase 7: SEO
- [ ] favicon 추가
- [ ] Open Graph 태그
- [ ] manifest.json (PWA)

### Phase 13: 코드 정리
- [ ] 반응형 브레이크포인트 통일 (600px/900px → 768px 표준으로)
- [ ] ProjectsSection.css `.project-title` 중복 정의 수정
- [ ] 사용되지 않는 CSS 클래스 정리

### Phase 15: 콘텐츠 품질
- [ ] 프로젝트 성과 수치 검증 (50%, 70% 등 근거 확인)
- [ ] 모든 노션 링크 동작 확인
