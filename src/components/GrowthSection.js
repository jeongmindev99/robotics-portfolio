import React, { useState } from 'react';
import './GrowthSection.css';

const milestones = [
  {
    date: '2024.03',
    title: '로보틱스 입문',
    description: 'ROS를 전혀 몰랐던 상태에서 로보틱스 세계에 첫 발을 내딛다',
    type: 'start',
  },
  {
    date: '2024.10',
    title: '체계적 문제 해결',
    description: '감으로 하던 디버깅에서 체계적 분석과 문서화로 전환',
    type: 'growth',
  },
  {
    date: '2025.07',
    title: '해외 현장 단독 세팅',
    description: '일본 사이트에서 처음으로 해외 현장을 단독 수행',
    type: 'achievement',
  },
  {
    date: '2025.11',
    title: '전 과정 독립 수행',
    description: '세팅부터 운영까지 로봇 시스템 전체를 혼자 담당',
    type: 'milestone',
  },
];

const monthlyRecords = {
  2024: [
    { month: '03월', work: 'ROS 개념, ROS 활용', result: 'ROS 교육을 돈 받으면서 수료', note: 'ROS 처음 접함' },
    { month: '04월', work: '순찰 로봇 SW개발, 박스 크기 추정, 송장 크롭 개발', result: '고도화된 모듈 개발', note: '첫 프로젝트' },
    { month: '05월', work: '박스 크기 추정 및 OCR 통합 모듈 고도화', result: '판교/잠실 시연 마무리', note: '안정화, 고도화 처음' },
    { month: '06월', work: '잠실/판교 시연 준비, ChatGPT API OCR', result: '시연 완료, GPT-4o API 연동', note: '밤샘 시연 준비' },
    { month: '07월', work: '야마토/소프트뱅크 시연 준비', result: 'POC 잘 마무리', note: '일본 진출, 2주간 사수와 함께 개발' },
    { month: '08월', work: '세팅 메뉴얼 작성, 야마토 시연', result: '메뉴얼 보고 세팅 간편화', note: '전체 시스템 이해도 상승' },
    { month: '09월', work: 'InOrbit 관제 연동, STVL, Localization Fail Safe', result: 'Inorbit 연동, STVL 적용', note: '체계적 문제 해결로 전환' },
    { month: '10월', work: 'Import Manager 리팩토링, Diagnostics, 자동 실행', result: 'legacy 코드 리팩토링', note: '로보월드' },
    { month: '11월', work: '테크원 제임스 세팅, 스테이션 세팅', result: '사이트 세팅 경험', note: '혼자 할 수 있는 것 많아짐' },
    { month: '12월', work: '래미안 포터 세팅, 로봇 운영', result: '기한 내 서비스 시작', note: '디버깅 실력 향상' },
  ],
  2025: [
    { month: '01월', work: '래미안 포터 안정화, 고도화', result: '관제 개발, 인터넷 통신 안정화', note: '로봇을 따라다니지 않아도 될 정도로 안정화' },
    { month: '02월', work: '래미안 안정화, 일본 OCR 시연, 테크원 인수인계', result: '일본 시연, 각종 모듈 개발', note: '대우(시선)이 달라지는 것 느낌' },
    { month: '03월', work: '일본 OCR 시연 및 고도화, 테크원 대응', result: 'OCR 고도화, 인지 모듈 속도 개선', note: '' },
    { month: '04월', work: 'JamesW 코드 리펙토링, ESP32 모터 제어, Caravel MQTT', result: '캐러벨 통신 안정화, 모터 제어 학습', note: '레거시 코드 정리' },
    { month: '05월', work: '인식 모듈 리펙토링, Myactuator 모터, 송장 템플릿', result: 'Nodelet 기반 모듈 최적화', note: '속도 개선에 집중' },
    { month: '06월', work: '일본 준비 (FlexBE scenario, 인식 모듈)', result: 'FlexBE 시나리오 완성, 일본 대응 준비 완료', note: '일본 세팅 준비' },
    { month: '07월', work: 'Arduino Opta, 일본 팜코트 세팅', result: '캐러벨에 Opta 적용, 일본 세팅 완료', note: '해외 단독 세팅!' },
    { month: '08월', work: 'JamesW1.4 부활, 와트 지표 개발, 팜코트 운영', result: '배터리 모니터링 시스템 구축', note: '팜코트 운영 시작' },
    { month: '09월', work: '대치 포터 세팅, 팜코트 운영, AX-FAIR 시연', result: '대치 세팅 완료, 전시회 시연 성공', note: 'AX-FAIR 2025' },
    { month: '10월', work: '일본 캐널코트 운영/안정화, 부산 포터 세팅', result: '캐널코트 안정화, 부산 세팅 착수', note: '다중 사이트 관리' },
    { month: '11월', work: '부산 포터 안정화, 휴직', result: '부산 사이트 안정화 완료', note: '전 과정 독립 수행 달성' },
  ],
};

function GrowthSection() {
  const [showMonthly, setShowMonthly] = useState(false);
  const [activeYear, setActiveYear] = useState(2024);

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
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className={`timeline-item ${milestone.type}`}
            >
              <div className="timeline-marker">
                <div className="marker-dot"></div>
                {index < milestones.length - 1 && <div className="marker-line"></div>}
              </div>

              <div className="timeline-content">
                <span className="timeline-date">{milestone.date}</span>
                <h3 className="timeline-title">{milestone.title}</h3>
                <p className="timeline-description">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="monthly-toggle">
          <button
            className={`toggle-btn ${showMonthly ? 'active' : ''}`}
            onClick={() => setShowMonthly(!showMonthly)}
          >
            <span>월별 성장 기록 {showMonthly ? '접기' : '보기'}</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ transform: showMonthly ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
        </div>

        {showMonthly && (
          <div className="monthly-records">
            <div className="year-tabs">
              <button
                className={`year-tab ${activeYear === 2024 ? 'active' : ''}`}
                onClick={() => setActiveYear(2024)}
              >
                2024년 (인턴/수습 → 정규직)
              </button>
              <button
                className={`year-tab ${activeYear === 2025 ? 'active' : ''}`}
                onClick={() => setActiveYear(2025)}
              >
                2025년 (정규직 1~2년차)
              </button>
            </div>

            <div className="monthly-table">
              <div className="table-header-row">
                <span>시기</span>
                <span>주요 업무</span>
                <span>성과</span>
                <span>특이사항</span>
              </div>
              {monthlyRecords[activeYear].map((record, index) => (
                <div key={index} className={`table-row ${record.note.includes('해외') || record.note.includes('단독') ? 'highlight' : ''}`}>
                  <span className="cell-month">{record.month}</span>
                  <span className="cell-work">{record.work}</span>
                  <span className="cell-result">{record.result}</span>
                  <span className="cell-note">{record.note}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="growth-quote">
          <blockquote>
            "모르는 것을 인정하고, 빠르게 배우고, 체계적으로 기록한다"
          </blockquote>
        </div>
      </div>
    </section>
  );
}

export default GrowthSection;
