import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { landingMeta, pages } from '../data/landingData';
import { sites } from '../data/deploymentData';
import { heroContent } from '../data/heroData';
import { contactInfo } from '../data/contactData';
import './LandingPage.css';

/* ─── 유틸 ──────────────────────────────────────────────────────────── */
function calcMonths(growthStart) {
  const [year, month] = growthStart.split('.').map(Number);
  const start = new Date(year, month - 1, 1);
  const now = new Date();
  return (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
}

const SESSION_KEY = 'landingTerminalSeen';

/* ─── Card ──────────────────────────────────────────────────────────── */
function LandingCard({ item }) {
  const descLines = item.desc.split('\n');
  const content = (
    <>
      <div className="card-icon">
        <svg
          width="32" height="32" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="1.5"
          dangerouslySetInnerHTML={{ __html: item.icon }}
        />
      </div>
      <h2 className="card-title">{item.title}</h2>
      <p className="card-desc">
        {descLines.map((line, i) => (
          <React.Fragment key={i}>
            {i > 0 && <br />}
            {line}
          </React.Fragment>
        ))}
      </p>
      <span className={`card-cta${!item.ready ? ' card-cta-soon' : ''}`}>
        {item.ready ? (
          <>
            {item.ctaText}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </>
        ) : '준비 중'}
      </span>
    </>
  );

  if (item.ready) {
    return (
      <Link to={item.path} className="landing-card">
        {content}
      </Link>
    );
  }

  return (
    <div className="landing-card landing-card-disabled">
      {content}
    </div>
  );
}

/* ─── Terminal typing engine ───────────────────────────────────────── */
const CHAR_INTERVAL = 40;
const LINE_PAUSE = 400;

function useTerminal(lines, skipAnimation) {
  const [displayedLines, setDisplayedLines] = useState(() => {
    if (skipAnimation) {
      return lines.map(line => ({
        ...line,
        displayText: line.prompt || line.output,
      }));
    }
    return [];
  });
  const [done, setDone] = useState(skipAnimation);
  const stateRef = useRef({ lineIdx: 0, charIdx: 0 });
  const timerRef = useRef(null);

  useEffect(() => {
    if (skipAnimation) return;

    function tick() {
      const { lineIdx, charIdx } = stateRef.current;
      if (lineIdx >= lines.length) {
        setDone(true);
        try { sessionStorage.setItem(SESSION_KEY, '1'); } catch {}
        return;
      }

      const line = lines[lineIdx];
      const text = line.prompt || line.output;

      if (line.prompt) {
        if (charIdx < text.length) {
          const next = charIdx + 1;
          stateRef.current.charIdx = next;
          setDisplayedLines(prev => {
            const updated = [...prev];
            if (updated.length <= lineIdx) {
              updated.push({ ...line, displayText: '' });
            }
            updated[lineIdx] = { ...line, displayText: text.slice(0, next) };
            return updated;
          });
          timerRef.current = setTimeout(tick, CHAR_INTERVAL);
        } else {
          stateRef.current = { lineIdx: lineIdx + 1, charIdx: 0 };
          timerRef.current = setTimeout(tick, LINE_PAUSE);
        }
      } else {
        setDisplayedLines(prev => [...prev, { ...line, displayText: text }]);
        stateRef.current = { lineIdx: lineIdx + 1, charIdx: 0 };
        const nextLine = lines[lineIdx + 1];
        const delay = nextLine?.prompt ? 600 : 150;
        timerRef.current = setTimeout(tick, delay);
      }
    }

    timerRef.current = setTimeout(tick, 500);
    return () => clearTimeout(timerRef.current);
  }, [lines, skipAnimation]);

  return { displayedLines, isTyping: !done };
}

/* ─── Terminal ──────────────────────────────────────────────────────── */
function Terminal() {
  const months = calcMonths(heroContent.growthStart);
  const skipAnimation = useMemo(() => {
    try { return sessionStorage.getItem(SESSION_KEY) === '1'; } catch { return false; }
  }, []);

  const allLines = useMemo(() => [
    ...landingMeta.terminalLines,
    { output: `${months}개월째 가동 중 — ${sites.length}개 현장 로봇 배포 (한국/일본)`, delay: 0, isUptime: true },
  ], [months]);

  const { displayedLines, isTyping } = useTerminal(allLines, skipAnimation);

  return (
    <div className="terminal">
      <div className="terminal-header">
        <span className="terminal-dot terminal-dot-red"></span>
        <span className="terminal-dot terminal-dot-yellow"></span>
        <span className="terminal-dot terminal-dot-green"></span>
        <span className="terminal-title">jeongmin@dev ~ </span>
      </div>
      <div className="terminal-body">
        {displayedLines.map((line, i) => (
          <div key={i} className={`terminal-line ${line.prompt ? 'terminal-prompt' : 'terminal-output'}`}>
            {line.prompt ? (
              <PromptLine text={line.displayText} />
            ) : (
              <OutputLine text={line.displayText} highlight={line.highlight} isUptime={line.isUptime} />
            )}
          </div>
        ))}
        <span className={`terminal-cursor${!isTyping ? ' terminal-cursor-idle' : ''}`}></span>
      </div>
    </div>
  );
}

function PromptLine({ text }) {
  if (text.startsWith('$')) {
    return (
      <>
        <span className="terminal-dollar">$</span>
        <span>{text.slice(1)}</span>
      </>
    );
  }
  return <span>{text}</span>;
}

function OutputLine({ text, highlight, isUptime }) {
  if (isUptime) {
    return (
      <span>
        {text.split(/(\d+[개월째]*\s*|[0-9]+개\s*현장)/).map((part, i) =>
          /\d/.test(part)
            ? <span key={i} className="terminal-stat">{part}</span>
            : part
        )}
      </span>
    );
  }
  if (!highlight || !text.includes(highlight)) {
    return <span>{text}</span>;
  }
  const idx = text.indexOf(highlight);
  return (
    <>
      {text.slice(0, idx)}
      <span className="terminal-highlight">{highlight}</span>
      {text.slice(idx + highlight.length)}
    </>
  );
}

/* ─── Skills ───────────────────────────────────────────────────────── */
function SkillTags() {
  return (
    <div className="skill-tags">
      {landingMeta.skills.map((skill) => (
        <span key={skill} className="skill-tag">{skill}</span>
      ))}
    </div>
  );
}

/* ─── Social Links ─────────────────────────────────────────────────── */
function SocialLinks() {
  const links = [
    {
      href: `mailto:${contactInfo.email}`,
      label: 'Email',
      icon: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    },
    {
      href: contactInfo.github,
      label: 'GitHub',
      icon: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
    },
    {
      href: contactInfo.linkedin,
      label: 'LinkedIn',
      icon: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    },
  ];

  return (
    <div className="social-links">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith('mailto:') ? undefined : '_blank'}
          rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
          className="social-link"
        >
          <svg
            width="20" height="20" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="1.5"
            dangerouslySetInnerHTML={{ __html: link.icon }}
          />
        </a>
      ))}
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */
function LandingPage() {
  return (
    <div className="landing">
      <div className="landing-background">
        <div className="landing-grid"></div>
        <div className="landing-orb landing-orb-1"></div>
        <div className="landing-orb landing-orb-2"></div>
        <div className="landing-orb landing-orb-3"></div>
      </div>

      <div className="landing-content">
        <div className="landing-static-header">
          <h1 className="static-name">{landingMeta.name}</h1>
          <p className="static-role">{landingMeta.role}</p>
        </div>

        <div className="landing-header">
          <Terminal />
        </div>

        <SkillTags />

        <div className={`landing-cards${pages.length > 2 ? ' landing-cards-many' : ''}`}>
          {pages.map((item) => (
            <LandingCard key={item.id} item={item} />
          ))}
        </div>

        <SocialLinks />

        <div className="landing-footer">
          <span>&copy; {new Date().getFullYear()} {landingMeta.name}</span>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
