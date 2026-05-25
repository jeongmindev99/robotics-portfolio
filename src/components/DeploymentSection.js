import React, { useState } from 'react';
import './DeploymentSection.css';
import { sites } from '../data/deploymentData';
import { useAdmin } from '../context/AdminContext';
import AdminEditModal from './AdminEditModal';

const siteSchema = [
  { key: 'startDate', label: '시작 (YYYY.MM)',  type: 'text' },
  { key: 'endDate',   label: '종료 (YYYY.MM 또는 현재)', type: 'text' },
  { key: 'name',      label: '사이트명',         type: 'text' },
  { key: 'robot',     label: '로봇 종류',        type: 'text' },
  { key: 'role',      label: '담당 역할',        type: 'text' },
  { key: 'youtubeLink', label: 'YouTube 영상 링크', type: 'url' },
];

function getYouTubeVideoId(url) {
  if (!url) return null;
  const youtuMatch = url.match(/youtu\.be\/([^/?]+)/);
  if (youtuMatch) return youtuMatch[1];
  const youtubeMatch = url.match(/[?&]v=([^&]+)/);
  if (youtubeMatch) return youtubeMatch[1];
  const embedMatch = url.match(/\/embed\/([^/?]+)/);
  if (embedMatch) return embedMatch[1];
  return null;
}

function getYouTubeEmbedUrl(url) {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

function DeploymentSection() {
  const { isAdmin, isAuthed, data, updateSite, deleteSite, addSite } = useAdmin();
  const adminActive = isAdmin && isAuthed;
  const siteList = adminActive ? data.sites : sites;

  const [editId, setEditId] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

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
              <span className="cell-period">{site.startDate} ~ {site.endDate}</span>
              <span className="cell-name">{site.name}</span>
              <span className="cell-robot">{site.robot}</span>
              <span className="cell-role">{site.role}</span>
              <span className="cell-link">
                {!adminActive && (
                  <div className="link-buttons">
                    {site.youtubeLink && (() => {
                      const videoId = getYouTubeVideoId(site.youtubeLink);
                      return videoId ? (
                        <button
                          className="video-thumbnail-btn"
                          onClick={() => setVideoUrl(getYouTubeEmbedUrl(site.youtubeLink))}
                          title="영상 보기"
                        >
                          <img
                            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                            alt="영상 보기"
                            className="video-thumbnail-img"
                          />
                          <span className="video-play-overlay">▶</span>
                        </button>
                      ) : null;
                    })()}
                  </div>
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

      {videoUrl && (
        <div className="video-modal-overlay" onClick={() => setVideoUrl(null)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setVideoUrl(null)} aria-label="닫기">✕</button>
            <iframe
              width="100%"
              height="500"
              src={videoUrl}
              title="배포 현장 영상"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

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
