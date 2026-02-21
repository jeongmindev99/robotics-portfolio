import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import AdminExportPanel from './AdminExportPanel';
import './AdminBar.css';

export default function AdminBar() {
  const { dirtyKeys, resetAll } = useAdmin();
  const [exportOpen, setExportOpen] = useState(false);

  const handleExit = () => {
    window.location.href = window.location.pathname;
  };

  const handleReset = () => {
    if (window.confirm('모든 변경사항을 초기화하고 원본 데이터로 되돌리겠습니까?')) {
      resetAll();
    }
  };

  return (
    <>
      <div className="admin-bar">
        <div className="admin-bar-left">
          <span className="admin-bar-pulse" />
          <span className="admin-bar-label">ADMIN MODE</span>
        </div>

        <div className="admin-bar-center">
          {dirtyKeys.size > 0 ? (
            <span className="admin-bar-badge dirty">변경 {dirtyKeys.size}건</span>
          ) : (
            <span className="admin-bar-badge saved">저장됨</span>
          )}
        </div>

        <div className="admin-bar-right">
          <button
            className="admin-bar-btn"
            onClick={() => setExportOpen(true)}
            disabled={dirtyKeys.size === 0}
          >
            내보내기
          </button>
          <button className="admin-bar-btn danger" onClick={handleReset}>
            초기화
          </button>
          <button className="admin-bar-btn exit" onClick={handleExit}>
            나가기
          </button>
        </div>
      </div>

      {exportOpen && <AdminExportPanel onClose={() => setExportOpen(false)} />}
    </>
  );
}
