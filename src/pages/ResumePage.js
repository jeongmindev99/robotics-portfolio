import React from 'react';
import { Link } from 'react-router-dom';
import { resumeData } from '../data/resumeData';
import './ResumePage.css';

/* ─── helpers ─────────────────────────────────────────────────────────── */

function Section({ title, children }) {
  return (
    <section className="r-section">
      <h2 className="r-section-title">{title}</h2>
      <div className="r-section-body">{children}</div>
    </section>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────── */

export default function ResumePage() {
  const d = resumeData;
  const hasExp = d.experience.some(e => e.company);
  const hasSkills = d.skills.some(s => s.items.length > 0);
  const hasEdu = d.education.some(e => e.school);
  const hasPub = d.publications && d.publications.length > 0;
  const hasCert = d.certifications.some(c => c.name);
  const hasLang = d.languages.length > 0;

  return (
    <div className="resume-page">
      {/* actions */}
      <div className="r-actions">
        <Link to="/" className="r-btn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          홈으로
        </Link>
        <button className="r-btn" onClick={() => window.print()}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          인쇄
        </button>
      </div>

      {/* paper */}
      <article className="r-paper">

        {/* header */}
        <header className="r-header">
          <h1 className="r-name">{d.profile.name}</h1>
          <p className="r-title">{d.profile.title}</p>
          <div className="r-contact">
            {d.profile.email && <a href={`mailto:${d.profile.email}`}>{d.profile.email}</a>}
            {d.profile.phone && <span>{d.profile.phone}</span>}
            {d.profile.location && <span>{d.profile.location}</span>}
            {d.profile.github && <a href={d.profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
            {d.profile.linkedin && <a href={d.profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
          </div>
        </header>

        {/* summary */}
        {d.summary && (
          <p className="r-summary">{d.summary}</p>
        )}

        {/* experience */}
        {hasExp && (
          <Section title="경력">
            {d.experience.filter(e => e.company).map(exp => (
              <div key={exp.id} className="r-entry">
                <div className="r-row">
                  <strong>{exp.company}</strong>
                  <span className="r-period">{exp.period}</span>
                </div>
                {exp.role && <div className="r-role">{exp.role}</div>}
                {exp.achievements.length > 0 && (
                  <ul className="r-list">
                    {exp.achievements.map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* skills */}
        {hasSkills && (
          <Section title="기술">
            <div className="r-skills">
              {d.skills.filter(s => s.items.length > 0).map((g, i) => (
                <div key={i} className="r-skill-row">
                  <span className="r-skill-cat">{g.category}</span>
                  <span className="r-skill-items">{g.items.join(' · ')}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* education */}
        {hasEdu && (
          <Section title="학력">
            {d.education.filter(e => e.school).map(edu => (
              <div key={edu.id} className="r-entry">
                <div className="r-row">
                  <strong>{edu.school}</strong>
                  <span className="r-period">{edu.period}</span>
                </div>
                <div className="r-desc">
                  {edu.degree} / {edu.major}
                  {edu.note && <span className="r-note"> — {edu.note}</span>}
                </div>
              </div>
            ))}
          </Section>
        )}

        {/* publications */}
        {hasPub && (
          <Section title="논문">
            {d.publications.map(pub => (
              <div key={pub.id} className="r-entry">
                <div className="r-pub-title">
                  {pub.link ? (
                    <a href={pub.link} target="_blank" rel="noopener noreferrer">{pub.title}</a>
                  ) : pub.title}
                </div>
                <div className="r-desc">{pub.authors}</div>
                <div className="r-desc r-note">{pub.journal}</div>
              </div>
            ))}
          </Section>
        )}

        {/* certifications */}
        {hasCert && (
          <Section title="자격증">
            {d.certifications.filter(c => c.name).map(cert => (
              <div key={cert.id} className="r-row r-entry">
                <span><strong>{cert.name}</strong>{cert.issuer && ` — ${cert.issuer}`}</span>
                {cert.date && <span className="r-period">{cert.date}</span>}
              </div>
            ))}
          </Section>
        )}

        {/* languages */}
        {hasLang && (
          <Section title="어학">
            <div className="r-lang-list">
              {d.languages.map((l, i) => (
                <span key={i} className="r-lang">
                  <strong>{l.language}</strong> {l.level}
                </span>
              ))}
            </div>
          </Section>
        )}
      </article>
    </div>
  );
}
