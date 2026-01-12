import React from 'react';
import './ProjectsSection.css';

const projects = [
  {
    id: 1,
    title: 'Import Manager 리팩토링',
    problem: '여러 파일에 흩어진 코드로 유지보수 어려움, 동시성 문제 발생',
    action: 'Manager 패턴으로 코드 통합 및 상태 관리 중앙화',
    result: '동시성 문제 해결, 유지보수 시간 50% 단축',
    tags: ['ROS', 'Python', 'Architecture'],
  },
  {
    id: 2,
    title: 'FlexBE 배송 시나리오',
    problem: '하드코딩된 배송 로직으로 수정 및 확장 어려움',
    action: 'FlexBE 상태 머신으로 배송 플로우 시각화 및 모듈화',
    result: '시나리오 수정 시간 70% 단축, 신규 사이트 적용 용이',
    tags: ['FlexBE', 'State Machine', 'ROS'],
  },
  {
    id: 3,
    title: 'MQTT 통신 시스템',
    problem: '관제 서버-로봇 간 실시간 통신 불안정',
    action: 'MQTT 프로토콜 기반 통신 레이어 재설계',
    result: '통신 안정성 확보, 메시지 손실률 0.1% 이하',
    tags: ['MQTT', 'Protocol', 'Python'],
  },
];

function ProjectsSection() {
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
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
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
        </div>
        
        <div className="projects-cta">
          <p>더 많은 프로젝트는 노션에서 확인하세요</p>
          <a href="#" className="notion-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466l1.823 1.447zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.166V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.934zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.22.186c-.094-.187 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933l3.222-.187zM2.668 1.358L16.6.256c1.636-.14 2.057.234 2.757.793l3.828 2.66c.467.326.607.653.607 1.12v17.127c0 1.073-.374 1.726-1.682 1.82l-15.457.933c-.981.047-1.448-.093-1.962-.747L1.5 19.896c-.56-.746-.794-1.306-.794-1.96V2.805c0-.84.374-1.353 1.168-1.447z"/>
            </svg>
            <span>Notion Portfolio</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
