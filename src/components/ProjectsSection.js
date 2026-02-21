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
  { key: 'notionLink', label: 'Notion Link',        type: 'url' },
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
                {project.notionLink && (
                  <a href={project.notionLink} target="_blank" rel="noopener noreferrer" className="project-notion-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466l1.823 1.447zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.166V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.934z"/>
                    </svg>
                    상세 보기
                  </a>
                )}
              </div>
            </div>
          ))}

          {adminActive && (
            <button className="admin-add-btn" onClick={handleAdd}>
              + 프로젝트 추가
            </button>
          )}
        </div>

        <div className="projects-cta">
          <p>더 많은 프로젝트는 노션에서 확인하세요</p>
          <a href="https://notion.so/2e9d8a0a7b5a81c5a57ed22576f1cb0c" target="_blank" rel="noopener noreferrer" className="notion-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466l1.823 1.447zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.166V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.934zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.22.186c-.094-.187 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933l3.222-.187zM2.668 1.358L16.6.256c1.636-.14 2.057.234 2.757.793l3.828 2.66c.467.326.607.653.607 1.12v17.127c0 1.073-.374 1.726-1.682 1.82l-15.457.933c-.981.047-1.448-.093-1.962-.747L1.5 19.896c-.56-.746-.794-1.306-.794-1.96V2.805c0-.84.374-1.353 1.168-1.447z"/>
            </svg>
            <span>Notion Portfolio</span>
          </a>
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
