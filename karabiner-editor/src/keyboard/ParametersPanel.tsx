import React, { useState } from 'react';
import { DEFAULT_PARAMETERS, PARAMETER_LABELS } from './karabiner-utils';
import { LAYOUT_DEFINITIONS } from './keyboard-layouts';
import { ThemeConfig } from '../App';

interface ParametersPanelProps {
  parameters: Record<string, number>;
  splitModifiers: boolean;
  selectedLayout?: string;
  theme: ThemeConfig;
  onSave: (params: Record<string, number>) => void;
  onSplitModifiersChange: (v: boolean) => void;
  onLayoutChange?: (layoutId: string) => void;
  onThemeChange: (partial: Partial<ThemeConfig>) => void;
  onClose: () => void;
}

const PRESETS: { id: string; name: string }[] = [
  { id: 'light', name: 'Light' },
  { id: 'dark', name: 'Dark' },
  { id: 'obsidian', name: 'Obsidian' },
];

const ParametersPanel: React.FC<ParametersPanelProps> = ({
  parameters, splitModifiers, selectedLayout, theme,
  onSave, onSplitModifiersChange, onLayoutChange, onThemeChange, onClose,
}) => {
  const [localParams, setLocalParams] = useState<Record<string, number>>({ ...parameters });

  const handleChange = (key: string, value: string) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 0) {
      setLocalParams(prev => ({ ...prev, [key]: num }));
    }
  };

  const handleReset = () => {
    setLocalParams({ ...DEFAULT_PARAMETERS });
  };

  const handleCustomColorChange = (key: string, value: string) => {
    onThemeChange({ customOverrides: { ...theme.customOverrides, [key]: value } });
  };

  const allParamKeys = Object.keys({ ...DEFAULT_PARAMETERS, ...parameters });

  return (
    <div className="parameters-overlay" onClick={onClose}>
      <div className="parameters-panel" onClick={e => e.stopPropagation()}>
        <h3>Settings</h3>

        <div className="parameter-field" style={{ marginBottom: 12 }}>
          <label>
            <input
              type="checkbox"
              checked={splitModifiers}
              onChange={() => onSplitModifiersChange(!splitModifiers)}
            />
            {' '}Use left/right modifier pairs
          </label>
        </div>

        <div className="parameter-field" style={{ marginBottom: 16 }}>
          <label htmlFor="keyboard-layout">Keyboard Layout:</label>
          <select
            id="keyboard-layout"
            value={selectedLayout || 'us'}
            onChange={(e) => onLayoutChange?.(e.target.value)}
            className="layer-switch-select"
            style={{ width: 140 }}
          >
            {LAYOUT_DEFINITIONS.map(l => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
        </div>

        <div className="theme-section">
          <h4>Theme</h4>
          <div className="parameter-field" style={{ marginBottom: 12 }}>
            <label htmlFor="theme-preset">Preset:</label>
            <select
              id="theme-preset"
              value={theme.preset}
              onChange={(e) => onThemeChange({ preset: e.target.value as ThemeConfig['preset'] })}
              className="layer-switch-select"
              style={{ width: 140 }}
            >
              {PRESETS.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="parameter-field" style={{ marginBottom: 8 }}>
            <label>Custom Colors:</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <div className="color-input-row">
                <label>Accent</label>
                <input
                  type="color"
                  value={theme.customOverrides['--accent'] || (
                    theme.preset === 'dark' ? '#64b5f6' :
                    theme.preset === 'obsidian' ? '#7C3AED' : '#4a90e2'
                  )}
                  onChange={(e) => handleCustomColorChange('--accent', e.target.value)}
                />
              </div>
              <div className="color-input-row">
                <label>Background</label>
                <input
                  type="color"
                  value={theme.customOverrides['--bg-app'] || (
                    theme.preset === 'light' ? '#f5f5f5' :
                    theme.preset === 'obsidian' ? '#1a1a2e' : '#1a1a2e'
                  )}
                  onChange={(e) => handleCustomColorChange('--bg-app', e.target.value)}
                />
              </div>
              <div className="color-input-row">
                <label>Card</label>
                <input
                  type="color"
                  value={theme.customOverrides['--bg-card'] || (
                    theme.preset === 'light' ? '#ffffff' :
                    theme.preset === 'obsidian' ? '#2a2a42' : '#1e1e38'
                  )}
                  onChange={(e) => handleCustomColorChange('--bg-card', e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            className="toolbar-button"
            style={{ marginTop: 4, fontSize: 12, padding: '4px 10px' }}
            onClick={() => onThemeChange({ customOverrides: {} })}
          >
            Reset custom colors
          </button>
        </div>

        <div className="parameters-list" style={{ marginTop: 16 }}>
          <h4 style={{ margin: '0 0 8px', color: 'var(--text-primary)', fontSize: 14 }}>Karabiner Parameters</h4>
          {allParamKeys.map(key => (
            <div key={key} className="parameter-field">
              <label htmlFor={`param-${key}`}>
                {PARAMETER_LABELS[key] || key}
              </label>
              <input
                id={`param-${key}`}
                type="number"
                min={0}
                value={localParams[key] ?? DEFAULT_PARAMETERS[key] ?? 0}
                onChange={e => handleChange(key, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="parameters-actions" style={{ marginTop: 16 }}>
          <button className="btn btn-primary" onClick={() => { onSave(localParams); }}>
            Save
          </button>
          <button className="btn btn-secondary" onClick={handleReset}>
            Reset Defaults
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParametersPanel;
