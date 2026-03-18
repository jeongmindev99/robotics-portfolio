import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { projects as srcProjects } from '../data/projectsData';
import { sites as srcSites } from '../data/deploymentData';
import { milestones as srcMilestones } from '../data/growthData';
import { learningItems as srcLearningItems } from '../data/learningData';
import { phaseDetails as srcPhaseDetails, architectureLayers as srcArchitectureLayers } from '../data/phaseData';
import { heroContent as srcHeroContent } from '../data/heroData';
import { contactInfo as srcContactInfo } from '../data/contactData';

// ─── 비밀번호 설정 ──────────────────────────────────────────────────────────
// 변경하려면 프로젝트 루트의 .env.local 파일에서 REACT_APP_ADMIN_PASSWORD 값을 수정하세요.
// 예: REACT_APP_ADMIN_PASSWORD=my_new_password
const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || 'admin';

// ─── localStorage 키 ─────────────────────────────────────────────────────────
const LS_DATA_KEY = 'portfolioAdminData';
const LS_DIRTY_KEY = 'portfolioAdminDirtyKeys';

// ─── 원본 데이터 스냅샷 (export 비교 기준) ───────────────────────────────────
const SOURCE_DATA = {
  projects: srcProjects,
  sites: srcSites,
  milestones: srcMilestones,
  learningItems: srcLearningItems,
  phaseDetails: srcPhaseDetails,
  architectureLayers: srcArchitectureLayers,
  heroContent: srcHeroContent,
  contactInfo: srcContactInfo,
};

// ─── 파일별 export 코드 생성 헤더 템플릿 ─────────────────────────────────────
const FILE_HEADERS = {
  projects: `/**
 * projectsData.js — How I Solved 섹션 프로젝트 데이터
 *
 * 각 항목 구조:
 *   id         {number}  고유 ID
 *   title      {string}  프로젝트명
 *   problem    {string}  해결한 문제
 *   action     {string}  취한 행동
 *   result     {string}  결과 (highlight 표시)
 *   tags       {Array}   기술 태그
 *   notionLink {string}  노션 상세 링크
 */
`,
  sites: `/**
 * deploymentData.js — Where I Deployed 섹션 데이터
 *
 * 각 항목 구조:
 *   id         {number}  고유 ID
 *   period     {string}  배포 시기 (YYYY.MM)
 *   name       {string}  사이트명
 *   robot      {string}  로봇 종류
 *   role       {string}  담당 역할
 *   notionLink {string}  노션 상세 링크
 */
`,
  milestones: `/**
 * growthData.js — How I Grew 섹션 타임라인 데이터
 *
 * 각 항목 구조:
 *   date        {string}  날짜 (YYYY.MM)
 *   title       {string}  마일스톤 제목
 *   description {string}  설명
 *   type        {string}  'start' | 'growth' | 'achievement' | 'milestone'
 */
`,
  learningItems: `/**
 * learningData.js — What I'm Learning 섹션 데이터
 *
 * 각 항목 구조:
 *   skill       {string}  기술/주제명
 *   status      {string}  '학습 중' | '학습 예정' | '관심'
 *   description {string}  상세 설명
 */
`,
  phaseDetails: `/**
 * phaseData.js — Phase 모달 데이터 (phaseDetails 부분)
 *
 * 각 Phase의 layers 필드 구조:
 *   name        {string}  표시 이름
 *   description {string}  툴팁 설명
 *   experienced {boolean} 경험 여부
 *   indirect    {boolean} true면 간접 경험
 *   stage       {number}  같은 숫자끼리 병렬 배치
 */
`,
  architectureLayers: `/**
 * phaseData.js — SW 개발 아키텍처 데이터 (architectureLayers 부분)
 *
 * 레이어 구조:
 *   name         {string}  레이어 이름
 *   type         {string}  'single' | 'horizontal' | 'runtime'
 *   isROS        {boolean} ROS Framework 영역
 *   isOutsideROS {boolean} ROS 외부 상위 레이어
 *   items        {Array}   type이 single/runtime일 때 사용
 *   groups       {Array}   type이 horizontal일 때 사용
 *     groups[].name  {string}  그룹 이름
 *     groups[].items {Array}   { name, experienced }
 */
`,
  heroContent: `/**
 * heroData.js — Hero 섹션 콘텐츠 데이터
 *
 * 구조:
 *   badge       {string}  뱃지 텍스트
 *   titleLines  {Array}   제목 줄 배열
 *   highlightLine {number} 강조할 titleLines 인덱스
 *   subtitle    {string}  부제목
 *   growthStart {string}  성장 시작 시점 (YYYY.MM)
 *   robotCount  {number}  로봇 경험 모델 수
 */
`,
  contactInfo: `/**
 * contactData.js — 연락처 데이터
 *
 * 구조:
 *   email          {string}  이메일 주소
 *   github         {string}  GitHub URL
 *   githubDisplay  {string}  GitHub 표시 텍스트
 *   linkedin       {string}  LinkedIn URL
 *   linkedinDisplay {string} LinkedIn 표시 텍스트
 *   notion         {string}  Notion URL
 */
`,
};

const EXPORT_VAR_NAMES = {
  projects: 'projects',
  sites: 'sites',
  milestones: 'milestones',
  learningItems: 'learningItems',
  phaseDetails: 'phaseDetails',
  architectureLayers: 'architectureLayers',
  heroContent: 'heroContent',
  contactInfo: 'contactInfo',
};

// ─── JS 스타일 코드 직렬화 ────────────────────────────────────────────────────
function toJSCode(value, indent = 0) {
  const pad = '  '.repeat(indent);
  const padInner = '  '.repeat(indent + 1);
  if (value === null || value === undefined) return String(value);
  if (typeof value === 'boolean') return String(value);
  if (typeof value === 'number') return String(value);
  if (typeof value === 'string') return `'${value.replace(/'/g, "\\'")}'`;
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const items = value.map(v => `${padInner}${toJSCode(v, indent + 1)}`).join(',\n');
    return `[\n${items},\n${pad}]`;
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value)
      .map(([k, v]) => `${padInner}${k}: ${toJSCode(v, indent + 1)}`)
      .join(',\n');
    return `{\n${entries},\n${pad}}`;
  }
  return String(value);
}

// ─── Context 생성 ─────────────────────────────────────────────────────────────
const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [searchParams] = useSearchParams();
  const isAdmin = searchParams.has('admin');
  const [isAuthed, setIsAuthed] = useState(
    () => sessionStorage.getItem('adminAuthed') === 'true'
  );

  // localStorage에서 데이터 로드, 없으면 원본 사용
  const [data, setData] = useState(() => {
    if (!isAdmin) return SOURCE_DATA;
    try {
      const saved = localStorage.getItem(LS_DATA_KEY);
      if (saved) return { ...SOURCE_DATA, ...JSON.parse(saved) };
    } catch {}
    return { ...SOURCE_DATA };
  });

  const [dirtyKeys, setDirtyKeys] = useState(() => {
    try {
      const saved = localStorage.getItem(LS_DIRTY_KEY);
      if (saved) return new Set(JSON.parse(saved));
    } catch {}
    return new Set();
  });

  // 데이터 변경 시 localStorage 자동 저장
  useEffect(() => {
    if (!isAdmin || !isAuthed) return;
    localStorage.setItem(LS_DATA_KEY, JSON.stringify(data));
    localStorage.setItem(LS_DIRTY_KEY, JSON.stringify([...dirtyKeys]));
  }, [data, dirtyKeys, isAdmin, isAuthed]);

  // ─── 인증 ──────────────────────────────────────────────────────────────────
  const authenticate = useCallback((password) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('adminAuthed', 'true');
      setIsAuthed(true);
      return true;
    }
    return false;
  }, []);

  // ─── 공통 updater ──────────────────────────────────────────────────────────
  const markDirty = useCallback((key) => {
    setDirtyKeys(prev => new Set([...prev, key]));
  }, []);

  const setKey = useCallback((key, updater) => {
    setData(prev => ({ ...prev, [key]: updater(prev[key]) }));
    markDirty(key);
  }, [markDirty]);

  // ─── Projects ──────────────────────────────────────────────────────────────
  const updateProject = useCallback((id, fields) => {
    setKey('projects', list => list.map(p => p.id === id ? { ...p, ...fields } : p));
  }, [setKey]);

  const deleteProject = useCallback((id) => {
    setKey('projects', list => list.filter(p => p.id !== id));
  }, [setKey]);

  const addProject = useCallback(() => {
    setKey('projects', list => {
      const maxId = list.reduce((m, p) => Math.max(m, p.id), 0);
      return [...list, {
        id: maxId + 1,
        title: '새 프로젝트',
        problem: '',
        action: '',
        result: '',
        tags: [],
        notionLink: '',
      }];
    });
  }, [setKey]);

  // ─── Sites ─────────────────────────────────────────────────────────────────
  const updateSite = useCallback((id, fields) => {
    setKey('sites', list => list.map(s => s.id === id ? { ...s, ...fields } : s));
  }, [setKey]);

  const deleteSite = useCallback((id) => {
    setKey('sites', list => list.filter(s => s.id !== id));
  }, [setKey]);

  const addSite = useCallback(() => {
    setKey('sites', list => {
      const maxId = list.reduce((m, s) => Math.max(m, s.id), 0);
      return [...list, {
        id: maxId + 1,
        startDate: '',
        endDate: '현재',
        name: '새 사이트',
        robot: '',
        role: '',
        notionLink: '',
        youtubeLink: '',
      }];
    });
  }, [setKey]);

  // ─── Milestones ────────────────────────────────────────────────────────────
  const updateMilestone = useCallback((index, fields) => {
    setKey('milestones', list => list.map((m, i) => i === index ? { ...m, ...fields } : m));
  }, [setKey]);

  const deleteMilestone = useCallback((index) => {
    setKey('milestones', list => list.filter((_, i) => i !== index));
  }, [setKey]);

  const addMilestone = useCallback(() => {
    setKey('milestones', list => [...list, {
      date: '',
      title: '새 마일스톤',
      description: '',
      type: 'milestone',
    }]);
  }, [setKey]);

  // ─── LearningItems ─────────────────────────────────────────────────────────
  const updateLearningItem = useCallback((index, fields) => {
    setKey('learningItems', list => list.map((l, i) => i === index ? { ...l, ...fields } : l));
  }, [setKey]);

  const deleteLearningItem = useCallback((index) => {
    setKey('learningItems', list => list.filter((_, i) => i !== index));
  }, [setKey]);

  const addLearningItem = useCallback(() => {
    setKey('learningItems', list => [...list, {
      skill: '새 기술',
      category: '로보틱스 직무',
      status: '관심',
      description: '',
    }]);
  }, [setKey]);

  // ─── ArchitectureLayers ────────────────────────────────────────────────────
  const updateArchitectureItem = useCallback((layerIdx, groupIdx, itemIdx, fields) => {
    setKey('architectureLayers', layers => layers.map((layer, lIdx) => {
      if (lIdx !== layerIdx) return layer;
      if (groupIdx !== null) {
        return {
          ...layer,
          groups: layer.groups.map((group, gIdx) =>
            gIdx !== groupIdx ? group : {
              ...group,
              items: group.items.map((item, iIdx) => iIdx === itemIdx ? { ...item, ...fields } : item),
            }
          ),
        };
      }
      return {
        ...layer,
        items: layer.items.map((item, iIdx) => iIdx === itemIdx ? { ...item, ...fields } : item),
      };
    }));
  }, [setKey]);

  const updateArchitectureLayer = useCallback((layerIdx, fields) => {
    setKey('architectureLayers', layers =>
      layers.map((layer, lIdx) => lIdx === layerIdx ? { ...layer, ...fields } : layer)
    );
  }, [setKey]);

  const deleteArchitectureItem = useCallback((layerIdx, groupIdx, itemIdx) => {
    setKey('architectureLayers', layers => layers.map((layer, lIdx) => {
      if (lIdx !== layerIdx) return layer;
      if (groupIdx !== null) {
        return {
          ...layer,
          groups: layer.groups.map((group, gIdx) =>
            gIdx !== groupIdx ? group : {
              ...group,
              items: group.items.filter((_, iIdx) => iIdx !== itemIdx),
            }
          ),
        };
      }
      return {
        ...layer,
        items: layer.items.filter((_, iIdx) => iIdx !== itemIdx),
      };
    }));
  }, [setKey]);

  const addArchitectureItem = useCallback((layerIdx, groupIdx, newItem) => {
    setKey('architectureLayers', layers => layers.map((layer, lIdx) => {
      if (lIdx !== layerIdx) return layer;
      if (groupIdx !== null) {
        return {
          ...layer,
          groups: layer.groups.map((group, gIdx) =>
            gIdx !== groupIdx ? group : {
              ...group,
              items: [...group.items, newItem],
            }
          ),
        };
      }
      return {
        ...layer,
        items: [...layer.items, newItem],
      };
    }));
  }, [setKey]);

  // ─── HeroContent ───────────────────────────────────────────────────────────
  const updateHeroContent = useCallback((fields) => {
    setKey('heroContent', prev => ({ ...prev, ...fields }));
  }, [setKey]);

  // ─── ContactInfo ────────────────────────────────────────────────────────────
  const updateContactInfo = useCallback((fields) => {
    setKey('contactInfo', prev => ({ ...prev, ...fields }));
  }, [setKey]);

  // ─── PhaseDetails ──────────────────────────────────────────────────────────
  const updatePhaseMeta = useCallback((phaseId, fields) => {
    setKey('phaseDetails', details => ({
      ...details,
      [phaseId]: { ...details[phaseId], ...fields },
    }));
  }, [setKey]);

  const updatePhaseLayer = useCallback((phaseId, index, fields) => {
    setKey('phaseDetails', details => ({
      ...details,
      [phaseId]: {
        ...details[phaseId],
        layers: details[phaseId].layers.map((l, i) => i === index ? { ...l, ...fields } : l),
      },
    }));
  }, [setKey]);

  const deletePhaseLayer = useCallback((phaseId, index) => {
    setKey('phaseDetails', details => ({
      ...details,
      [phaseId]: {
        ...details[phaseId],
        layers: details[phaseId].layers.filter((_, i) => i !== index),
      },
    }));
  }, [setKey]);

  const addPhaseLayer = useCallback((phaseId, newLayer) => {
    setKey('phaseDetails', details => ({
      ...details,
      [phaseId]: {
        ...details[phaseId],
        layers: [...details[phaseId].layers, newLayer],
      },
    }));
  }, [setKey]);

  // ─── Export ────────────────────────────────────────────────────────────────
  const exportCode = useCallback((key) => {
    const header = FILE_HEADERS[key] || '';
    const varName = EXPORT_VAR_NAMES[key] || key;
    const value = data[key];
    return `${header}export const ${varName} = ${toJSCode(value)};\n`;
  }, [data]);

  // ─── Reset ─────────────────────────────────────────────────────────────────
  const resetAll = useCallback(() => {
    localStorage.removeItem(LS_DATA_KEY);
    localStorage.removeItem(LS_DIRTY_KEY);
    window.location.reload();
  }, []);

  const resetKey = useCallback((key) => {
    setData(prev => ({ ...prev, [key]: SOURCE_DATA[key] }));
    setDirtyKeys(prev => {
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
  }, []);

  const value = {
    isAdmin,
    isAuthed,
    data,
    dirtyKeys,
    authenticate,
    updateProject,
    deleteProject,
    addProject,
    updateSite,
    deleteSite,
    addSite,
    updateMilestone,
    deleteMilestone,
    addMilestone,
    updateLearningItem,
    deleteLearningItem,
    addLearningItem,
    updatePhaseMeta,
    updatePhaseLayer,
    deletePhaseLayer,
    addPhaseLayer,
    updateArchitectureItem,
    updateArchitectureLayer,
    deleteArchitectureItem,
    addArchitectureItem,
    updateHeroContent,
    updateContactInfo,
    exportCode,
    resetAll,
    resetKey,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  return useContext(AdminContext);
}
