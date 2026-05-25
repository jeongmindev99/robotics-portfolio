import React, { useState } from 'react';
import './ProjectsSection.css';
import { projects } from '../data/projectsData';
import { useAdmin } from '../context/AdminContext';
import AdminEditModal from './AdminEditModal';

const projectSchema = [
  { key: 'title',      label: '프로젝트명',         type: 'text' },
  { key: 'problem',    label: 'Problem',            type: 'textarea' },
  { key: 'action',     label: 'Action',             type: 'textarea' },
  { key: 'result',     label: 'Result',             type: 'textarea' },
  { key: 'tags',       label: 'Tags (쉼표 구분)',   type: 'tags' },
];

function ProjectsSection() {
  const { isAdmin, isAuthed, data, updateProject, deleteProject, addProject } = useAdmin();
  const adminActive = isAdmin && isAuthed;
  const projectList = adminActive ? data.projects : projects;

  const [editTarget, setEditTarget] = useState(null); // { id, isNew }

  const handleEdit = (project) => {
    setEditTarget({ id: project.id, isNew: false });
  };

  const handleAdd = () => {
    addProject();
    // addProject adds to the end; open modal for the new item after state update
    setTimeout(() => {
      setEditTarget({ id: null, isNew: true });
    }, 0);
  };

  const handleSave = (id, values) => {
    updateProject(id, values);
    setEditTarget(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('이 프로젝트를 삭제하겠습니까?')) {
      deleteProject(id);
    }
  };

  // Determine editing project
  const editingProject = editTarget
    ? (editTarget.isNew
        ? projectList[projectList.length - 1]  // newly added
        : projectList.find(p => p.id === editTarget.id))
    : null;

  return (
    <section id="projects" className="projects-section section">
      <div className="container">
        <div className="section-header">
          <span className="section-number">02</span>
          <h2 className="section-title">How I Solved</h2>
          <p className="section-subtitle">
            실제 문제를 해결한 경험
          </p>
        </div>

        <div className="projects-grid">
          {projectList.map((project, index) => (
            <div
              key={project.id}
              className={`project-card${adminActive ? ' admin-item-wrapper' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {adminActive && (
                <div className="admin-card-controls">
                  <button
                    className="admin-btn admin-btn-edit"
                    onClick={() => handleEdit(project)}
                    title="수정"
                  >✏️</button>
                  <button
                    className="admin-btn admin-btn-delete"
                    onClick={() => handleDelete(project.id)}
                    title="삭제"
                  >🗑️</button>
                </div>
              )}
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>

                <div className="project-details">
                  <div className="detail-item">
                    <span className="detail-label">Problem</span>
                    <p className="detail-text">{project.problem}</p>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Action</span>
                    <p className="detail-text">{project.action}</p>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Result</span>
                    <p className="detail-text highlight">{project.result}</p>
                  </div>
                </div>

                <div className="project-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="project-footer">
                <span className="project-id">#{String(index + 1).padStart(2, '0')}</span>
              </div>
            </div>
          ))}

          {adminActive && (
            <button className="admin-add-btn" onClick={handleAdd}>
              + 프로젝트 추가
            </button>
          )}
        </div>

      </div>

      {editingProject && (
        <AdminEditModal
          title={editTarget.isNew ? '프로젝트 추가' : '프로젝트 수정'}
          schema={projectSchema}
          initialValues={editingProject}
          onSave={(values) => handleSave(editingProject.id, values)}
          onClose={() => setEditTarget(null)}
        />
      )}
    </section>
  );
}

export default ProjectsSection;
