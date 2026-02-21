import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import './AdminExportPanel.css';

const FILE_PATHS = {
  projects:           'src/data/projectsData.js',
  sites:              'src/data/deploymentData.js',
  milestones:         'src/data/growthData.js',
  learningItems:      'src/data/learningData.js',
  phaseDetails:       'src/data/phaseData.js',
};

export default function AdminExportPanel({ onClose }) {
  const { dirtyKeys, exportCode, resetKey } = useAdmin();
  const dirty = [...dirtyKeys];
  const [activeKey, setActiveKey] = useState(dirty[0] || null);
  const [copied, setCopied] = useState({});

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleCopy = (key) => {
    const code = exportCode(key);
    navigator.clipboard.writeText(code).then(() => {
      setCopied(prev => ({ ...prev, [key]: true }));
      setTimeout(() => setCopied(prev => ({ ...prev, [key]: false })), 2000);
    });
  };

  const handleResetKey = (key) => {
    if (window.confirm(`"${FILE_PATHS[key]}" 파일의 변경사항을 원본으로 되돌리겠습니까?`)) {
      resetKey(key);
      if (dirty.length <= 1) onClose();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (dirty.length === 0) {
    return (
      <div className="admin-export-overlay" onClick={handleOverlayClick}>
        <div className="admin-export-panel">
          <div className="admin-export-header">
            <h3 className="admin-export-title">내보내기</h3>
            <button className="admin-export-close" onClick={onClose}>✕</button>
          </div>
          <div className="admin-export-empty">
            <p>변경된 파일이 없습니다.</p>
          </div>
        </div>
      </div>
    );
  }

  const code = activeKey ? exportCode(activeKey) : '';

  return (
    <div className="admin-export-overlay" onClick={handleOverlayClick}>
      <div className="admin-export-panel" onClick={e => e.stopPropagation()}>
        <div className="admin-export-header">
          <h3 className="admin-export-title">내보내기</h3>
          <button className="admin-export-close" onClick={onClose}>✕</button>
        </div>

        <div className="admin-export-guide">
          <span className="admin-export-step">1.</span> 코드 복사
          <span className="admin-export-arrow"> → </span>
          <span className="admin-export-step">2.</span> 파일 교체
          <span className="admin-export-arrow"> → </span>
          <span className="admin-export-step">3.</span> <code>npm run deploy</code>
          <span className="admin-export-arrow"> → </span>
          <span className="admin-export-step">4.</span> 초기화
        </div>

        {/* 파일 탭 */}
        <div className="admin-export-tabs">
          {dirty.map(key => (
            <button
              key={key}
              className={`admin-export-tab ${activeKey === key ? 'active' : ''}`}
              onClick={() => setActiveKey(key)}
            >
              {FILE_PATHS[key]?.split('/').pop() || key}
            </button>
          ))}
        </div>

        {/* 코드 영역 */}
        {activeKey && (
          <div className="admin-export-code-section">
            <div className="admin-export-file-path">
              <span className="admin-export-file-icon">📄</span>
              {FILE_PATHS[activeKey] || activeKey}
            </div>
            <pre className="admin-export-pre">{code}</pre>
            <div className="admin-export-actions">
              <button
                className="admin-export-copy-btn"
                onClick={() => handleCopy(activeKey)}
              >
                {copied[activeKey] ? '복사됨 ✓' : '코드 복사'}
              </button>
              <button
                className="admin-export-reset-btn"
                onClick={() => handleResetKey(activeKey)}
              >
                이 파일만 초기화
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
