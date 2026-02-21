import React, { useState } from 'react';
import './GrowthSection.css';
import { milestones } from '../data/growthData';
import { useAdmin } from '../context/AdminContext';
import AdminEditModal from './AdminEditModal';

const milestoneSchema = [
  { key: 'date',        label: '날짜 (YYYY.MM)',  type: 'text' },
  { key: 'title',       label: '제목',            type: 'text' },
  { key: 'description', label: '설명',            type: 'textarea' },
  {
    key: 'type',
    label: '유형',
    type: 'select',
    options: ['start', 'growth', 'achievement', 'milestone'],
  },
];

function GrowthSection() {
  const { isAdmin, isAuthed, data, updateMilestone, deleteMilestone, addMilestone } = useAdmin();
  const adminActive = isAdmin && isAuthed;
  const milestoneList = adminActive ? data.milestones : milestones;

  const [editIndex, setEditIndex] = useState(null);

  const handleEdit = (index) => setEditIndex(index);

  const handleAdd = () => {
    addMilestone();
    setTimeout(() => setEditIndex(milestoneList.length), 0);
  };

  const handleSave = (index, values) => {
    updateMilestone(index, values);
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    if (window.confirm('이 마일스톤을 삭제하겠습니까?')) {
      deleteMilestone(index);
    }
  };

  const editingMilestone = editIndex !== null ? milestoneList[editIndex] : null;

  return (
    <section id="growth" className="growth-section section">
      <div className="container">
        <div className="section-header">
          <span className="section-number">04</span>
          <h2 className="section-title">How I Grew</h2>
          <p className="section-subtitle">
            성장의 전환점이 된 순간들
          </p>
        </div>

        <div className="timeline">
          {milestoneList.map((milestone, index) => (
            <div
              key={index}
              className={`timeline-item ${milestone.type} admin-item-wrapper`}
            >
              {adminActive && (
                <div className="admin-card-controls">
                  <button
                    className="admin-btn admin-btn-edit"
                    onClick={() => handleEdit(index)}
                    title="수정"
                  >✏️</button>
                  <button
                    className="admin-btn admin-btn-delete"
                    onClick={() => handleDelete(index)}
                    title="삭제"
                  >🗑️</button>
                </div>
              )}
              <div className="timeline-marker">
                <div className="marker-dot"></div>
                {index < milestoneList.length - 1 && <div className="marker-line"></div>}
              </div>

              <div className="timeline-content">
                <span className="timeline-date">{milestone.date}</span>
                <h3 className="timeline-title">{milestone.title}</h3>
                <p className="timeline-description">{milestone.description}</p>
              </div>
            </div>
          ))}

          {adminActive && (
            <div className="timeline-item" style={{ padding: '0' }}>
              <button className="admin-add-btn" onClick={handleAdd}>
                + 마일스톤 추가
              </button>
            </div>
          )}
        </div>

        <div className="growth-quote">
          <blockquote>
            "모르는 것을 인정하고, 빠르게 배우고, 체계적으로 기록한다"
          </blockquote>
        </div>
      </div>

      {editingMilestone !== null && editingMilestone !== undefined && (
        <AdminEditModal
          title={editIndex === milestoneList.length - 1 && milestoneList[editIndex]?.title === '새 마일스톤' ? '마일스톤 추가' : '마일스톤 수정'}
          schema={milestoneSchema}
          initialValues={editingMilestone}
          onSave={(values) => handleSave(editIndex, values)}
          onClose={() => setEditIndex(null)}
        />
      )}
    </section>
  );
}

export default GrowthSection;
