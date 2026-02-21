import React, { useState } from 'react';
import './PhaseModal.css';
import { phaseDetails, architectureLayers } from '../data/phaseData';
import { useAdmin } from '../context/AdminContext';
import AdminEditModal from './AdminEditModal';

const layerSchema = [
  { key: 'name',        label: '항목명',     type: 'text' },
  { key: 'description', label: '설명 (툴팁)', type: 'text' },
  { key: 'experienced', label: '직접 경험',   type: 'boolean' },
  { key: 'indirect',    label: '간접 경험',   type: 'boolean' },
  { key: 'stage',       label: 'Stage 번호', type: 'number' },
];

function ArchitectureView({ onClose, phase }) {
  const countItems = (layer) => {
    if (layer.type === 'horizontal') {
      return layer.groups.reduce((acc, g) => acc + g.items.length, 0);
    }
    return layer.items.length;
  };
  const countExperienced = (layer) => {
    if (layer.type === 'horizontal') {
      return layer.groups.reduce((acc, g) => acc + g.items.filter(i => i.experienced).length, 0);
    }
    return layer.items.filter(i => i.experienced).length;
  };

  const totalItems = architectureLayers.reduce((acc, layer) => acc + countItems(layer), 0);
  const experiencedItems = architectureLayers.reduce((acc, layer) => acc + countExperienced(layer), 0);

  const rosLayers = architectureLayers.filter(l => l.isROS);
  const outsideROSLayers = architectureLayers.filter(l => l.isOutsideROS);
  const otherLayers = architectureLayers.filter(l => !l.isROS && !l.isOutsideROS);

  const renderLayer = (layer, idx, showConnector = true, totalLength = 1) => (
    <div key={idx} className="arch-layer-wrapper">
      {layer.type === 'horizontal' ? (
        <div className="arch-layer horizontal">
          <div className="arch-layer-label">{layer.name}</div>
          <div className="arch-horizontal-groups">
            {layer.groups.map((group, gIdx) => (
              <div key={gIdx} className="arch-group">
                <div className="arch-group-label">{group.name}</div>
                <div className="arch-group-nodes">
                  {group.items.map((item, itemIdx) => (
                    <div key={itemIdx} className={`arch-node ${item.experienced ? 'exp' : ''}`}>
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : layer.type === 'runtime' ? (
        <div className="arch-layer runtime">
          <div className="arch-layer-label">{layer.name}</div>
          <div className="arch-runtime-stack">
            {layer.items.map((item, itemIdx) => (
              <div key={itemIdx} className={`arch-runtime-item ${item.experienced ? 'exp' : ''}`}>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="arch-layer">
          <div className="arch-layer-label">{layer.name}</div>
          <div className="arch-layer-nodes">
            {layer.items.map((item, itemIdx) => (
              <div key={itemIdx} className={`arch-node ${item.experienced ? 'exp' : ''}`}>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
      {showConnector && idx < totalLength - 1 && (
        <div className="arch-connector">
          <div className="connector-line"></div>
        </div>
      )}
    </div>
  );

  return (
    <div className="phase-modal-overlay" onClick={onClose}>
      <div className="phase-modal-content architecture-view" onClick={(e) => e.stopPropagation()}>
        <button className="phase-modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <div className="phase-modal-header">
          <div className="phase-modal-badge">
            <span className="badge-indicator active"></span>
            <span>Phase {phase.number} - {phase.title}</span>
          </div>
          <h2 className="phase-modal-title">System Architecture</h2>
          <p className="phase-modal-description">
            {experiencedItems}/{totalItems} components experienced
          </p>
        </div>

        <div className="arch-diagram">
          {outsideROSLayers.map((layer, idx) => renderLayer(layer, idx, true, outsideROSLayers.length))}
          <div className="arch-connector">
            <div className="connector-line"></div>
          </div>
          <div className="ros-framework-container">
            <div className="ros-framework-label">ROS Framework</div>
            <div className="ros-framework-content">
              {rosLayers.map((layer, idx) => renderLayer(layer, idx, true, rosLayers.length))}
            </div>
          </div>
          {otherLayers.map((layer, idx) => (
            <React.Fragment key={idx}>
              <div className="arch-connector">
                <div className="connector-line"></div>
              </div>
              {renderLayer(layer, idx, idx < otherLayers.length - 1, otherLayers.length)}
            </React.Fragment>
          ))}
        </div>

        <div className="arch-legend">
          <div className="legend-item">
            <span className="legend-dot exp">●</span>
            <span>경험</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot">○</span>
            <span>미경험</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhaseModal({ phase, onClose, isAdminMode }) {
  const { isAdmin, isAuthed, data, updatePhaseLayer, deletePhaseLayer, addPhaseLayer } = useAdmin();
  const adminActive = isAdmin && isAuthed && isAdminMode;

  const [editTarget, setEditTarget] = useState(null); // { index }

  if (!phase) return null;

  const activePhaseDetails = adminActive ? data.phaseDetails : phaseDetails;
  const details = activePhaseDetails[phase.id];

  if (details.isArchitecture) {
    return <ArchitectureView phase={phase} onClose={onClose} />;
  }

  // Group layers by stage
  const stageMap = {};
  details.layers.forEach((layer, globalIdx) => {
    const s = layer.stage ?? 1;
    if (!stageMap[s]) stageMap[s] = [];
    stageMap[s].push({ ...layer, _globalIdx: globalIdx });
  });
  const stageKeys = Object.keys(stageMap).sort((a, b) => Number(a) - Number(b));
  const stages = stageKeys.map(k => stageMap[k]);
  const maxStage = stageKeys.length > 0 ? Number(stageKeys[stageKeys.length - 1]) : 1;

  const directCount = details.layers.filter(l => l.experienced && !l.indirect).length;
  const indirectCount = details.layers.filter(l => l.indirect).length;
  const notExpCount = details.layers.filter(l => !l.experienced).length;
  const hasIndirect = indirectCount > 0;

  const handleEdit = (globalIdx) => setEditTarget({ index: globalIdx });

  const handleDelete = (globalIdx) => {
    if (window.confirm('이 항목을 삭제하겠습니까?')) {
      deletePhaseLayer(phase.id, globalIdx);
    }
  };

  const handleAddToStage = (stageNum) => {
    addPhaseLayer(phase.id, {
      name: '새 항목',
      description: '',
      experienced: false,
      indirect: false,
      stage: stageNum,
    });
  };

  const handleAddNewStage = () => {
    addPhaseLayer(phase.id, {
      name: '새 항목',
      description: '',
      experienced: false,
      indirect: false,
      stage: maxStage + 1,
    });
  };

  const handleSave = (index, values) => {
    updatePhaseLayer(phase.id, index, values);
    setEditTarget(null);
  };

  const editingLayer = editTarget !== null ? details.layers[editTarget.index] : null;

  return (
    <>
      <div className="phase-modal-overlay" onClick={onClose}>
        <div className="phase-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="phase-modal-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>

          {adminActive && (
            <div className="admin-modal-badge">✏️ 관리자 편집 모드</div>
          )}

          <div className="phase-modal-header">
            <div className="phase-modal-badge">
              <span className={`badge-indicator ${phase.experienced ? 'active' : ''}`}></span>
              <span>Phase {phase.number}</span>
            </div>
            <h2 className="phase-modal-title">{phase.title}</h2>
            <span className="phase-modal-title-en">{phase.titleEn}</span>
            <p className="phase-modal-description">{details.description}</p>
          </div>

          <div className="phase-diagram">
            {stages.map((stageItems, stageIdx) => (
              <React.Fragment key={stageIdx}>
                <div className="phase-stage">
                  {stageItems.map((layer) => (
                    <div
                      key={layer._globalIdx}
                      className={`phase-node ${layer.experienced ? (layer.indirect ? 'exp-indirect' : 'exp') : ''} ${adminActive ? 'admin-item-wrapper' : ''}`}
                      title={layer.description}
                    >
                      {layer.name}
                      {adminActive && (
                        <div className="admin-card-controls">
                          <button
                            className="admin-btn admin-btn-edit"
                            onClick={(e) => { e.stopPropagation(); handleEdit(layer._globalIdx); }}
                            title="수정"
                          >✏️</button>
                          <button
                            className="admin-btn admin-btn-delete"
                            onClick={(e) => { e.stopPropagation(); handleDelete(layer._globalIdx); }}
                            title="삭제"
                          >🗑️</button>
                        </div>
                      )}
                    </div>
                  ))}
                  {adminActive && (
                    <button
                      className="admin-stage-add-btn"
                      onClick={() => handleAddToStage(Number(stageKeys[stageIdx]))}
                      title="이 단계에 항목 추가"
                    >+</button>
                  )}
                </div>
                {stageIdx < stages.length - 1 && (
                  <div className="phase-stage-connector">
                    <div className="connector-line"></div>
                  </div>
                )}
              </React.Fragment>
            ))}

            {adminActive && (
              <button className="admin-add-btn admin-new-stage-btn" onClick={handleAddNewStage}>
                + 새 단계(Stage)에 항목 추가
              </button>
            )}
          </div>

          <div className="arch-legend">
            <div className="legend-item">
              <span className="legend-dot exp">●</span>
              <span>직접 경험 ({directCount})</span>
            </div>
            {hasIndirect && (
              <div className="legend-item">
                <span className="legend-dot exp-indirect">◎</span>
                <span>간접 경험 ({indirectCount})</span>
              </div>
            )}
            <div className="legend-item">
              <span className="legend-dot">○</span>
              <span>미경험 ({notExpCount})</span>
            </div>
          </div>
        </div>
      </div>

      {editingLayer !== null && editingLayer !== undefined && (
        <AdminEditModal
          title="Phase 항목 수정"
          schema={layerSchema}
          initialValues={editingLayer}
          onSave={(values) => handleSave(editTarget.index, values)}
          onClose={() => setEditTarget(null)}
        />
      )}
    </>
  );
}

export default PhaseModal;
