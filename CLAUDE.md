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
App.js (스크롤 트래킹)
├── Navigation.js         # 좌측 네비게이션 (80px 고정)
├── HeroSection.js        # 히어로 + 통계
├── LifecycleSection.js   # 7개 Phase
│   ├── PhaseModal.js     # Phase 상세 모달
│   └── ArchitectureModal.js  # SW개발 아키텍처 모달
├── ProjectsSection.js    # PARL 구조 프로젝트
├── DeploymentSection.js  # 사이트 배포 현황
├── GrowthSection.js      # 성장 타임라인
├── LearningSection.js    # 학습 현황
└── ContactSection.js     # 연락처
```

각 컴포넌트는 `src/components/`에 `.js`와 `.css` 파일 쌍으로 존재.

## Workflow Rules

### Documentation First
- **작업 전 README.md 필수 참조**
- 아키텍처/설계 변경 시 CLAUDE.md와 README.md 즉시 업데이트

### Git Workflow
- 작업 완료 후 자동 commit & push
- **main 브랜치 직접 push 금지** - PR을 통해서만 머지
- 기능 개발/버그 수정 시 feature branch 생성 → PR 생성

### PR Process
1. 새 기능/수정 요청 → 브랜치 생성
2. 코드 변경 및 commit
3. GitHub push 후 PR 생성
4. 사용자가 PR 리뷰 및 승인
5. main 머지 후 `npm run deploy`로 배포

### Branch Naming
- `feature/기능명` - 새 기능
- `fix/버그명` - 버그 수정
- `docs/문서명` - 문서 업데이트
- `refactor/대상` - 리팩토링

### Deployment
main 브랜치 머지 완료 후:
```bash
git checkout main
git pull origin main
npm run deploy
```

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
