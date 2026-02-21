import React from 'react';
import './PhaseModal.css';
import { phaseDetails, architectureLayers } from '../data/phaseData';

function ArchitectureView({ onClose, phase }) {
  // Calculate totals including horizontal groups
  const countItems = (layer) => {
    if (layer.type === 'horizontal') {
      return layer.groups.reduce((acc, g) => acc + g.items.length, 0);
    }
    if (layer.type === 'runtime') {
      return layer.items.length;
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

  // Separate ROS and non-ROS layers
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
                    <div
                      key={itemIdx}
                      className={`arch-node ${item.experienced ? 'exp' : ''}`}
                    >
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
              <div
                key={itemIdx}
                className={`arch-runtime-item ${item.experienced ? 'exp' : ''}`}
              >
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
              <div
                key={itemIdx}
                className={`arch-node ${item.experienced ? 'exp' : ''}`}
              >
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
          {/* Outside ROS layers (Cloud, Application) */}
          {outsideROSLayers.map((layer, idx) => renderLayer(layer, idx, true, outsideROSLayers.length))}

          {/* Connector to ROS Framework */}
          <div className="arch-connector">
            <div className="connector-line"></div>
          </div>

          {/* ROS Framework Container */}
          <div className="ros-framework-container">
            <div className="ros-framework-label">ROS Framework</div>
            <div className="ros-framework-content">
              {rosLayers.map((layer, idx) => renderLayer(layer, idx, true, rosLayers.length))}
            </div>
          </div>

          {/* Other layers (Runtime, OS, Physical) */}
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

function PhaseModal({ phase, onClose }) {
  if (!phase) return null;

  const details = phaseDetails[phase.id];

  if (details.isArchitecture) {
    return <ArchitectureView phase={phase} onClose={onClose} />;
  }

  // Group layers by stage for sequential/parallel display
  const stageMap = {};
  details.layers.forEach(layer => {
    const s = layer.stage ?? 1;
    if (!stageMap[s]) stageMap[s] = [];
    stageMap[s].push(layer);
  });
  const stages = Object.keys(stageMap)
    .sort((a, b) => Number(a) - Number(b))
    .map(k => stageMap[k]);

  const directCount = details.layers.filter(l => l.experienced && !l.indirect).length;
  const indirectCount = details.layers.filter(l => l.indirect).length;
  const notExpCount = details.layers.filter(l => !l.experienced).length;
  const hasIndirect = indirectCount > 0;

  return (
    <div className="phase-modal-overlay" onClick={onClose}>
      <div className="phase-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="phase-modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

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
                {stageItems.map((layer, idx) => (
                  <div
                    key={idx}
                    className={`phase-node ${layer.experienced ? (layer.indirect ? 'exp-indirect' : 'exp') : ''}`}
                    title={layer.description}
                  >
                    {layer.name}
                  </div>
                ))}
              </div>
              {stageIdx < stages.length - 1 && (
                <div className="phase-stage-connector">
                  <div className="connector-line"></div>
                </div>
              )}
            </React.Fragment>
          ))}
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
  );
}

export default PhaseModal;
