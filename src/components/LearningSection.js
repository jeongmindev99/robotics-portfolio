import React, { useState } from 'react';
import './LearningSection.css';
import { learningItems } from '../data/learningData';
import { useAdmin } from '../context/AdminContext';
import AdminEditModal from './AdminEditModal';

const CATEGORIES = ['전체', '로보틱스 직무', 'AI', '자기개발'];

const learningSchema = [
  { key: 'skill',       label: '기술/주제명',   type: 'text' },
  {
    key: 'category',
    label: '카테고리',
    type: 'select',
    options: ['로보틱스 직무', 'AI', '자기개발'],
  },
  {
    key: 'status',
    label: '상태',
    type: 'select',
    options: ['학습 중', '학습 예정', '관심'],
  },
  { key: 'description', label: '설명',          type: 'textarea' },
];

function LearningSection() {
  const { isAdmin, isAuthed, data, updateLearningItem, deleteLearningItem, addLearningItem } = useAdmin();
  const adminActive = isAdmin && isAuthed;
  const learningList = adminActive ? data.learningItems : learningItems;

  const [editIndex, setEditIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('전체');

  const handleEdit = (index) => setEditIndex(index);

  const handleAdd = () => {
    addLearningItem();
    setTimeout(() => setEditIndex(learningList.length), 0);
  };

  const handleSave = (index, values) => {
    updateLearningItem(index, values);
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    if (window.confirm('이 학습 항목을 삭제하겠습니까?')) {
      deleteLearningItem(index);
    }
  };

  const filteredItems = activeCategory === '전체'
    ? learningList
    : learningList.filter(item => item.category === activeCategory);

  const editingItem = editIndex !== null ? learningList[editIndex] : null;

  return (
    <section id="learning" className="learning-section section">
      <div className="container">
        <div className="section-header">
          <span className="section-number">05</span>
          <h2 className="section-title">What I'm Learning</h2>
          <p className="section-subtitle">
            부족한 점을 인정하고 꾸준히 학습 중
          </p>
        </div>

        {!adminActive && (
          <div className="learning-tabs">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`learning-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="learning-grid">
          {filteredItems.map((item, index) => {
            // Find the original index in the full list for edit/delete operations
            const originalIndex = learningList.findIndex(i => i === item);
            return (
              <div key={originalIndex} className="learning-card admin-item-wrapper">
                {adminActive && (
                  <div className="admin-card-controls">
                    <button
                      className="admin-btn admin-btn-edit"
                      onClick={() => handleEdit(originalIndex)}
                      title="수정"
                    >✏️</button>
                    <button
                      className="admin-btn admin-btn-delete"
                      onClick={() => handleDelete(originalIndex)}
                      title="삭제"
                    >🗑️</button>
                  </div>
                )}
                <div className="learning-header">
                  <h4 className="learning-skill">{item.skill}</h4>
                  <span className="learning-status">{item.status}</span>
                </div>
                <p className="learning-description">{item.description}</p>
              </div>
            );
          })}

          {adminActive && (
            <button className="admin-add-btn learning-add-btn" onClick={handleAdd}>
              + 학습 항목 추가
            </button>
          )}
        </div>
      </div>

      {editingItem !== null && editingItem !== undefined && (
        <AdminEditModal
          title={editIndex === learningList.length - 1 && learningList[editIndex]?.skill === '새 기술' ? '학습 항목 추가' : '학습 항목 수정'}
          schema={learningSchema}
          initialValues={editingItem}
          onSave={(values) => handleSave(editIndex, values)}
          onClose={() => setEditIndex(null)}
        />
      )}
    </section>
  );
}

export default LearningSection;
