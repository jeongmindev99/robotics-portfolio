import React, { useState, useEffect } from 'react';
import './AdminEditModal.css';

/**
 * AdminEditModal — 범용 폼 모달
 *
 * Props:
 *   title          {string}   모달 제목
 *   schema         {Array}    필드 스키마 배열
 *     { key, label, type, options? }
 *     type: 'text' | 'textarea' | 'url' | 'tags' | 'boolean' | 'number' | 'select'
 *   initialValues  {Object}   초기값
 *   onSave         {Function} 저장 시 호출 (updatedValues 전달)
 *   onClose        {Function} 닫기 시 호출
 */
export default function AdminEditModal({ title, schema, initialValues, onSave, onClose }) {
  const [values, setValues] = useState(() => {
    const init = {};
    schema.forEach(field => {
      const raw = initialValues?.[field.key];
      if (field.type === 'tags') {
        init[field.key] = Array.isArray(raw) ? raw.join(', ') : (raw || '');
      } else if (field.type === 'boolean') {
        init[field.key] = Boolean(raw);
      } else {
        init[field.key] = raw !== undefined ? raw : '';
      }
    });
    return init;
  });

  // Body scroll lock — preserve previous value so nested modals don't unlock parent's lock
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const handleChange = (key, value) => {
    setValues(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const result = {};
    schema.forEach(field => {
      const raw = values[field.key];
      if (field.type === 'tags') {
        result[field.key] = raw
          .split(',')
          .map(t => t.trim())
          .filter(Boolean);
      } else if (field.type === 'number') {
        result[field.key] = Number(raw);
      } else if (field.type === 'boolean') {
        result[field.key] = Boolean(raw);
      } else {
        result[field.key] = raw;
      }
    });
    onSave(result);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="admin-edit-overlay" onClick={handleOverlayClick}>
      <div className="admin-edit-content">
        <div className="admin-edit-header">
          <h3 className="admin-edit-title">{title}</h3>
          <button className="admin-edit-close" onClick={onClose} aria-label="닫기">✕</button>
        </div>

        <div className="admin-edit-body">
          {schema.map(field => (
            <div key={field.key} className="admin-edit-field">
              <label className="admin-edit-label">{field.label}</label>
              {renderField(field, values[field.key], (v) => handleChange(field.key, v))}
            </div>
          ))}
        </div>

        <div className="admin-edit-footer">
          <button className="admin-edit-btn cancel" onClick={onClose}>취소</button>
          <button className="admin-edit-btn save" onClick={handleSave}>저장</button>
        </div>
      </div>
    </div>
  );
}

function renderField(field, value, onChange) {
  switch (field.type) {
    case 'textarea':
      return (
        <textarea
          className="admin-edit-input"
          rows={4}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      );

    case 'boolean':
      return (
        <label className="admin-toggle">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={e => onChange(e.target.checked)}
          />
          <span className="admin-toggle-track">
            <span className="admin-toggle-thumb" />
          </span>
          <span className="admin-toggle-text">{value ? '예' : '아니오'}</span>
        </label>
      );

    case 'select':
      return (
        <select
          className="admin-edit-input admin-edit-select"
          value={value}
          onChange={e => onChange(e.target.value)}
        >
          {(field.options || []).map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      );

    case 'number':
      return (
        <input
          type="number"
          className="admin-edit-input"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      );

    case 'url':
      return (
        <input
          type="url"
          className="admin-edit-input"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="https://"
        />
      );

    case 'tags':
      return (
        <input
          type="text"
          className="admin-edit-input"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="쉼표로 구분 (예: ROS, Python, Navigation)"
        />
      );

    default: // 'text'
      return (
        <input
          type="text"
          className="admin-edit-input"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      );
  }
}
