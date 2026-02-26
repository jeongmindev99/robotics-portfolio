import React, { useState } from 'react';
import './DeploymentSection.css';
import { sites } from '../data/deploymentData';
import { useAdmin } from '../context/AdminContext';
import AdminEditModal from './AdminEditModal';

const siteSchema = [
  { key: 'period',     label: '기간 (YYYY.MM)',  type: 'text' },
  { key: 'name',       label: '사이트명',         type: 'text' },
  { key: 'robot',      label: '로봇 종류',        type: 'text' },
  { key: 'role',       label: '담당 역할',        type: 'text' },
  { key: 'notionLink', label: 'Notion Link',     type: 'url' },
];

function DeploymentSection() {
  const { isAdmin, isAuthed, data, updateSite, deleteSite, addSite } = useAdmin();
  const adminActive = isAdmin && isAuthed;
  const siteList = adminActive ? data.sites : sites;

  const [editId, setEditId] = useState(null);

  const handleEdit = (site) => setEditId(site.id);

  const handleAdd = () => {
    addSite();
    setTimeout(() => setEditId('__new__'), 0);
  };

  const handleSave = (id, values) => {
    updateSite(id, values);
    setEditId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('이 사이트를 삭제하겠습니까?')) {
      deleteSite(id);
    }
  };

  const editingSite = editId
    ? (editId === '__new__'
        ? siteList[siteList.length - 1]
        : siteList.find(s => s.id === editId))
    : null;

  return (
    <section id="deployment" className="deployment-section section">
      <div className="container">
        <div className="section-header">
          <span className="section-number">03</span>
          <h2 className="section-title">Where I Deployed</h2>
          <p className="section-subtitle">
            실제 현장에서 로봇을 세팅하고 운영한 경험
          </p>
        </div>

        <div className="sites-table">
          <div className="table-header">
            <span>기간</span>
            <span>사이트</span>
            <span>로봇</span>
            <span>역할</span>
            <span></span>
          </div>
          {siteList.map((site) => (
            <div key={site.id} className="table-row admin-item-wrapper">
              <span className="cell-period">{site.period}</span>
              <span className="cell-name">{site.name}</span>
              <span className="cell-robot">{site.robot}</span>
              <span className="cell-role">{site.role}</span>
              <span className="cell-link">
                {site.notionLink && !adminActive && (
                  <a href={site.notionLink} target="_blank" rel="noopener noreferrer" className="site-notion-link">
                    상세
                  </a>
                )}
                {adminActive && (
                  <span className="admin-row-controls">
                    <button
                      className="admin-btn admin-btn-edit"
                      onClick={() => handleEdit(site)}
                      title="수정"
                    >✏️</button>
                    <button
                      className="admin-btn admin-btn-delete"
                      onClick={() => handleDelete(site.id)}
                      title="삭제"
                    >🗑️</button>
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>

        {adminActive && (
          <button className="admin-add-btn" style={{ marginTop: '12px' }} onClick={handleAdd}>
            + 사이트 추가
          </button>
        )}
      </div>

      {editingSite && (
        <AdminEditModal
          title={editId === '__new__' ? '사이트 추가' : '사이트 수정'}
          schema={siteSchema}
          initialValues={editingSite}
          onSave={(values) => handleSave(editingSite.id, values)}
          onClose={() => setEditId(null)}
        />
      )}
    </section>
  );
}

export default DeploymentSection;
