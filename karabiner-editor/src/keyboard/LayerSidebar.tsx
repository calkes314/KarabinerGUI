import React from 'react';
import { LAYERS, LayersState } from './layer-utils';

interface LayerSidebarProps {
  layers: LayersState;
  selectedLayerId: string;
  onSelectLayer: (id: string) => void;
}

const LayerSidebar: React.FC<LayerSidebarProps> = ({ layers, selectedLayerId, onSelectLayer }) => {
  return (
    <div className="layer-sidebar">
      <div className="layer-sidebar-header">Layers</div>
      {LAYERS.map((layer, i) => {
        const prevLayer = i > 0 ? LAYERS[i - 1] : null;
        const showDivider = prevLayer && (prevLayer.id === '0' || prevLayer.id === 'hyper');
        const count = Object.keys(layers[layer.id] || {}).length;
        return (
          <React.Fragment key={layer.id}>
            {showDivider && <div className="layer-divider" />}
            <button
              className={`layer-btn ${selectedLayerId === layer.id ? 'active' : ''}`}
              onClick={() => onSelectLayer(layer.id)}
              tabIndex={-1}
              title={`${layer.name}${layer.symbol ? ` (${layer.symbol})` : ''} — ${count} remap${count !== 1 ? 's' : ''}`}
            >
              <span className="layer-btn-symbol">{layer.symbol || '─'}</span>
              <span className="layer-btn-name">{layer.name}</span>
              {count > 0 && <span className="layer-btn-count">{count}</span>}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default LayerSidebar;
