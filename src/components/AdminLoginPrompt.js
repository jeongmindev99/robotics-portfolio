import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import './AdminLoginPrompt.css';

export default function AdminLoginPrompt() {
  const { authenticate } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = authenticate(password);
    if (!ok) {
      setError('비밀번호가 틀렸습니다.');
      setPassword('');
    }
  };

  return (
    <div className="admin-login-overlay">
      <div className="admin-login-card">
        <div className="admin-login-icon">🔐</div>
        <h2 className="admin-login-title">관리자 인증</h2>
        <p className="admin-login-desc">포트폴리오 관리자 모드에 접근하려면 비밀번호를 입력하세요.</p>
        <form className="admin-login-form" onSubmit={handleSubmit}>
          <input
            type="password"
            className="admin-login-input"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            autoFocus
          />
          {error && <p className="admin-login-error">{error}</p>}
          <button type="submit" className="admin-login-btn">
            입장하기
          </button>
        </form>
      </div>
    </div>
  );
}
