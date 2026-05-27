import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MAC_KEYBOARD_LAYOUT, KeyboardLayout, Key } from './mac-layouts';
import KeyConfigPanel from './KeyConfigPanel';
import ParametersPanel from './ParametersPanel';
import LayerSidebar from './LayerSidebar';
import { ThemeConfig } from '../App';
import {
  DEFAULT_PARAMETERS,
  MODIFIER_UI_TO_SYMBOL,
  getDisplayName,
  toKarabinerJson,
  fromKarabinerJson,
  validateKarabinerJson,
  convertModifiersOnSplitToggle,
} from './karabiner-utils';
import {
  LayersState,
  LayerSwitches,
  createEmptyLayers,
  getTotalRemapCount,
  getLayerById,
  getSwitchTarget,
  normalizeLayerSwitches,
  LAYERS,
} from './layer-utils';
import { getCharForKey, getKeyLabel } from './keyboard-layouts';
import { getAppSymbol, getShellSymbol } from './app-symbols';
import { buildNavigationGrid, NavigationGrid } from './keyboard-navigation';
import './keyboard.css';

const STORAGE_KEY = 'karabiner-editor-config';

interface KeyboardEditorProps {
  theme: ThemeConfig;
  onThemeChange: (partial: Partial<ThemeConfig>) => void;
}

const KeyboardEditor: React.FC<KeyboardEditorProps> = ({ theme, onThemeChange }) => {
  const [selectedKey, setSelectedKey] = useState<Key | null>(null);
  const [keyboardLayout] = useState<KeyboardLayout>(MAC_KEYBOARD_LAYOUT);
  const [layers, setLayers] = useState<LayersState>(createEmptyLayers);
  const [layerSwitches, setLayerSwitches] = useState<LayerSwitches>({});
  const [selectedLayerId, setSelectedLayerId] = useState<string>('0');
  const [parameters, setParameters] = useState<Record<string, number>>({ ...DEFAULT_PARAMETERS });
  const [showParams, setShowParams] = useState(false);
  const [rawRules, setRawRules] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'direct' | 'visual'>('direct');
  const [splitModifiers, setSplitModifiers] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState('us');
  const [karabinerStatus, setKarabinerStatus] = useState<string | null>(null);
  const [focusedKeyId, setFocusedKeyId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const initialLoadDone = useRef(false);
  const focusedKeyRef = useRef<string | null>(null);
  focusedKeyRef.current = focusedKeyId;
  const selectedKeyRef = useRef<Key | null>(null);
  selectedKeyRef.current = selectedKey;
  const selectedLayerRef = useRef(selectedLayerId);
  selectedLayerRef.current = selectedLayerId;
  const showParamsRef = useRef(showParams);
  showParamsRef.current = showParams;
  const navGrid: NavigationGrid = useMemo(() => buildNavigationGrid(keyboardLayout.keys), [keyboardLayout]);
  const actionTypeSelectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (!initialLoadDone.current) {
      initialLoadDone.current = true;
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
            if (parsed.layers) {
            const restored: LayersState = createEmptyLayers();
            for (const layer of LAYERS) {
              if (parsed.layers[layer.id]) {
                restored[layer.id] = parsed.layers[layer.id];
              }
            }
            setLayers(restored);
            if (parsed.layerSwitches) setLayerSwitches(normalizeLayerSwitches(parsed.layerSwitches));
            if (parsed.parameters) setParameters({ ...DEFAULT_PARAMETERS, ...parsed.parameters });
            if (parsed.rawRules) setRawRules(parsed.rawRules);
            if (parsed.viewMode) setViewMode(parsed.viewMode);
            if (typeof parsed.splitModifiers === 'boolean') setSplitModifiers(parsed.splitModifiers);
            if (parsed.selectedLayout) setSelectedLayout(parsed.selectedLayout);
          } else {
            const restored: LayersState = createEmptyLayers();
            restored['0'] = parsed;
            setLayers(restored);
          }
        }
      } catch {
        console.error('Failed to restore saved config');
      }
    }
  }, []);

  useEffect(() => {
    if (initialLoadDone.current) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          layers,
          layerSwitches,
          parameters,
          rawRules,
          viewMode,
          splitModifiers,
          selectedLayout,
        }));
      } catch {
        console.error('Failed to save config to localStorage');
      }
    }
  }, [layers, layerSwitches, parameters, rawRules, viewMode, splitModifiers, selectedLayout]);

  const handleKeyClick = (key: Key) => {
    setSelectedKey(key);
    setFocusedKeyId(key.id);
  };

  const handleKeyConfigChange = (keyId: string, config: any) => {
    setLayers(prev => {
      const layer = { ...(prev[selectedLayerId] || {}) };
      layer[keyId] = config;
      return { ...prev, [selectedLayerId]: layer };
    });
  };

  const handleLayerSwitchChange = (keyId: string, targetLayerId: string | null, mode?: string) => {
    setLayerSwitches(prev => {
      const next = { ...prev };
      if (targetLayerId) {
        next[keyId] = { targetLayerId, mode: (mode as any) || 'hold' };
      } else {
        delete next[keyId];
      }
      return next;
    });
  };

  const handleSave = () => {
    const json = toKarabinerJson(layers, layerSwitches, parameters, rawRules);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'karabiner-remaps.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLoad = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const json = evt.target?.result as string;
        const parsed = fromKarabinerJson(json, splitModifiers);
        setLayers(parsed.layers);
        setLayerSwitches(parsed.layerSwitches);
        setParameters(parsed.parameters);
        setRawRules(parsed.rawRules || []);
      } catch {
        alert('Failed to parse Karabiner JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleSaveToKarabiner = async () => {
    setKarabinerStatus(null);
    try {
      const json = toKarabinerJson(layers, layerSwitches, parameters, rawRules);
      const issues = validateKarabinerJson(json);
      if (issues.length > 0) {
        const first = issues[0];
        setKarabinerStatus(`Invalid key_code "${first.value}" in rule "${first.rule}" (${first.field})`);
        return;
      }
      const parsed = JSON.parse(json);
      console.log('Generated Karabiner JSON:', json.substring(0, 2000) + '...');
      const res = await fetch('http://localhost:3001/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed),
      });
      if (!res.ok) {
        const body = await res.text();
        console.error('Save failed:', res.status, body);
        let msg = `Server returned ${res.status}`;
        try { const j = JSON.parse(body); if (j.error) msg = j.error; } catch {}
        throw new Error(msg);
      }
      setKarabinerStatus('Saved to Karabiner ✓');
    } catch (err: any) {
      const msg = err.message || 'Unknown error';
      setKarabinerStatus('Error: ' + msg);
    }
  };

  const handleLoadFromKarabiner = async () => {
    setKarabinerStatus(null);
    try {
      const res = await fetch('http://localhost:3001/api/config');
      if (!res.ok) {
        const body = await res.text();
        console.error('Load failed:', res.status, body);
        let msg = `Server returned ${res.status}`;
        try { const j = JSON.parse(body); if (j.error) msg = j.error; } catch {}
        throw new Error(msg);
      }
      const parsed = await res.json();
      const result = fromKarabinerJson(JSON.stringify(parsed), splitModifiers);
      setLayers(result.layers);
      setLayerSwitches(result.layerSwitches);
      setParameters(result.parameters);
      setRawRules(result.rawRules || []);
      setKarabinerStatus('Loaded from Karabiner ✓');
    } catch (err: any) {
      setKarabinerStatus('Error: ' + err.message);
    }
  };

  const refs = {
    handleSave: useRef(handleSave),
    handleSaveToKarabiner: useRef(handleSaveToKarabiner),
    handleLoad: useRef(handleLoad),
  };
  refs.handleSave.current = handleSave;
  refs.handleSaveToKarabiner.current = handleSaveToKarabiner;
  refs.handleLoad.current = handleLoad;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedKeyRef.current) {
          setSelectedKey(null);
          const id = focusedKeyRef.current;
          if (id) {
            const el = document.querySelector(`g[data-key-id="${id}"]`);
            if (el) (el as any).focus();
          }
        } else {
          setFocusedKeyId(null);
        }
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        if (e.shiftKey) {
          refs.handleSaveToKarabiner.current();
        } else {
          refs.handleSave.current();
        }
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'i') {
        e.preventDefault();
        refs.handleLoad.current();
        return;
      }
      if ((e.metaKey || e.ctrlKey) && (e.key === ',' || e.key === 'k')) {
        e.preventDefault();
        setShowParams(prev => !prev);
        return;
      }
      if (e.shiftKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
        e.preventDefault();
        const currentIdx = LAYERS.findIndex(l => l.id === selectedLayerRef.current);
        const delta = e.key === 'ArrowDown' ? 1 : -1;
        const nextIdx = (currentIdx + delta + LAYERS.length) % LAYERS.length;
        setSelectedLayerId(LAYERS[nextIdx].id);
        setSelectedKey(null);
        setFocusedKeyId(null);
        return;
      }
      const current = focusedKeyRef.current;
      if (!current) return;
      const dir = e.key === 'ArrowLeft' ? 'left' : e.key === 'ArrowRight' ? 'right' : e.key === 'ArrowUp' ? 'up' : e.key === 'ArrowDown' ? 'down' : null;
      if (!dir) return;
      const keyEl = (e.target as HTMLElement).closest('g[role="button"]');
      if (!keyEl) return;
      e.preventDefault();
      const neighborId = navGrid[current]?.[dir as keyof (typeof navGrid)[string]];
      if (neighborId) {
        setFocusedKeyId(neighborId);
        const el = document.querySelector(`g[data-key-id="${neighborId}"]`);
        if (el) (el as any).focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [navGrid, keyboardLayout.keys]);

  const handleSaveParams = (params: Record<string, number>) => {
    setParameters(params);
    setShowParams(false);
  };

  const handleSplitModifiersToggle = (split: boolean) => {
    const converted: Record<string, any> = {};
    for (const layerId of Object.keys(layers)) {
      converted[layerId] = {};
      for (const [keyId, config] of Object.entries(layers[layerId] || {})) {
        converted[layerId][keyId] = {
          ...config,
          modifiers: convertModifiersOnSplitToggle(config.modifiers || [], split),
        };
      }
    }
    setLayers(prev => {
      const next = { ...prev };
      for (const layerId of Object.keys(next)) {
        next[layerId] = converted[layerId] || {};
      }
      return next;
    });
    setSplitModifiers(split);
  };

  const renderKey = (key: Key) => {
    const isSelected = selectedKey?.id === key.id;
    const isFocused = focusedKeyId === key.id;
    const currentLayerConfig = layers[selectedLayerId]?.[key.id];
    const cx = key.x + key.width / 2;
    const cy = key.y + key.height / 2;

    let layerIndicator: string | null = null;
    if (selectedLayerId === '0') {
      const targetLayerId = getSwitchTarget(layerSwitches, key.id);
      if (targetLayerId) {
        const targetDef = getLayerById(targetLayerId);
        if (targetDef) layerIndicator = targetDef.symbol;
      }
    } else {
      const layerDef = getLayerById(selectedLayerId);
      if (layerDef?.symbol) layerIndicator = layerDef.symbol;
    }

    let displayLabel: string | null = null;
    if (currentLayerConfig) {
      if (currentLayerConfig.actionType === 'shell') {
        displayLabel = getShellSymbol(currentLayerConfig.shellCommand || currentLayerConfig.keyCode);
      } else if (currentLayerConfig.actionType === 'open_app' && currentLayerConfig.appPath) {
        displayLabel = getAppSymbol(currentLayerConfig.appPath);
      } else if (viewMode === 'visual') {
        const char = getCharForKey(currentLayerConfig.keyCode, currentLayerConfig.modifiers || [], selectedLayout);
        if (char !== null) {
          displayLabel = char;
        } else {
          const modStr = (currentLayerConfig.modifiers || []).map((m: string) => MODIFIER_UI_TO_SYMBOL[m] || m).join('');
          displayLabel = modStr + getDisplayName(currentLayerConfig.keyCode);
        }
      }
    }

    return (
      <g
        key={key.id}
        data-key-id={key.id}
        onClick={() => handleKeyClick(key)}
        tabIndex={key.id === (focusedKeyId || selectedKey?.id) ? 0 : -1}
        role="button"
        onKeyDown={(e) => {
          if (e.key === ' ') {
            e.preventDefault();
            handleKeyClick(key);
            setTimeout(() => actionTypeSelectRef.current?.focus(), 50);
          }
        }}
      >
        <rect
          x={key.x}
          y={key.y}
          width={key.width}
          height={key.height}
          rx={3}
          className={`key ${isSelected ? 'selected' : ''} ${isFocused ? 'focused' : ''} ${currentLayerConfig?.keyCode && selectedLayerId !== '0' ? 'remapped-layer' : ''} ${currentLayerConfig?.keyCode ? 'remapped' : ''}`}
        />
        {currentLayerConfig?.keyCode ? (
          <>
            <text
              x={cx}
              y={cy + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              className="key-target-center"
            >
              {displayLabel || getDisplayName(currentLayerConfig.keyCode)}
            </text>
            <text
              x={key.x + key.width - 4}
              y={key.y + 11}
              textAnchor="end"
              className="key-input-top-right"
            >
              {getKeyLabel(key.id, selectedLayout) || key.label}
            </text>
            {viewMode !== 'visual' && currentLayerConfig.modifiers && currentLayerConfig.modifiers.length > 0 && (
              <text
                x={key.x + 4}
                y={key.y + key.height - 5}
                className="key-modifiers-bottom-left"
              >
                {currentLayerConfig.modifiers.map((m: string) => MODIFIER_UI_TO_SYMBOL[m] || m).join('')}
              </text>
            )}
          </>
        ) : (
          <text
            x={cx}
            y={cy + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            className="key-label"
          >
            {getKeyLabel(key.id, selectedLayout) || key.label}
          </text>
        )}
        {layerIndicator && (
          <text
            x={key.x + 3}
            y={key.y + 11}
            className="key-layer-indicator"
          >
            {layerIndicator}
          </text>
        )}
      </g>
    );
  };

  const totalRemaps = getTotalRemapCount(layers);
  const currentLayerConfig = selectedKey ? (layers[selectedLayerId]?.[selectedKey.id] || null) : null;

  return (
    <div className="keyboard-editor">
      <div className="editor-header">
        <h2>Keyboard Editor</h2>
        <div className="view-mode-toggle">
          <button
            className={`view-mode-btn ${viewMode === 'direct' ? 'active' : ''}`}
            onClick={() => setViewMode('direct')}
          >
            Direct
          </button>
          <button
            className={`view-mode-btn ${viewMode === 'visual' ? 'active' : ''}`}
            onClick={() => setViewMode('visual')}
          >
            Visual
          </button>
        </div>
        <button className="settings-btn" onClick={() => setShowParams(true)} title="Settings">
          <span className="settings-icon">⚙</span>
        </button>
      </div>
      <div className="editor-body">
        <LayerSidebar
          layers={layers}
          selectedLayerId={selectedLayerId}
          onSelectLayer={(id) => {
            setSelectedLayerId(id);
            setSelectedKey(null);
            setFocusedKeyId(null);
          }}
        />
        <div className="editor-main">
          <div className="keyboard-container">
            <svg className="keyboard-svg" width={keyboardLayout.width} height={keyboardLayout.height}>
              {keyboardLayout.keys.map(renderKey)}
            </svg>
          </div>
          {totalRemaps > 0 && (
            <div className="remap-summary">
              <strong>{totalRemaps}</strong> remap{totalRemaps > 1 ? 's' : ''} across all layers
            </div>
          )}

          <div className="editor-bottom">
            <KeyConfigPanel
              selectedKey={selectedKey}
              selectedLayerId={selectedLayerId}
              currentConfig={currentLayerConfig}
              layerSwitches={layerSwitches}
              splitModifiers={splitModifiers}
              selectedLayout={selectedLayout}
              onKeyConfigChange={handleKeyConfigChange}
              onLayerSwitchChange={handleLayerSwitchChange}
              actionTypeSelectRef={actionTypeSelectRef}
            />

            <div className="toolbar">
              <button className="btn btn-primary" onClick={handleSave} tabIndex={-1}>
                Export
              </button>
              <button className="btn btn-secondary" onClick={handleLoad} tabIndex={-1}>
                Import
              </button>
              <button className="btn btn-primary" onClick={handleSaveToKarabiner} tabIndex={-1}>
                Save to Karabiner
              </button>
              <button className="btn btn-secondary" onClick={handleLoadFromKarabiner} tabIndex={-1}>
                Load from Karabiner
              </button>
              {karabinerStatus && (
                <span className={`toolbar-status ${karabinerStatus.startsWith('Error') ? 'error' : 'success'}`}>
                  {karabinerStatus}
                </span>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
            <div
              tabIndex={0}
              className="focus-sentinel"
              onFocus={() => {
                const id = focusedKeyRef.current;
                if (id) {
                  const el = document.querySelector(`g[data-key-id="${id}"]`);
                  if (el) (el as any).focus();
                }
              }}
            />
          </div>
        </div>
      </div>

      {showParams && (
        <ParametersPanel
          parameters={parameters}
          splitModifiers={splitModifiers}
          selectedLayout={selectedLayout}
          theme={theme}
          onSave={handleSaveParams}
          onSplitModifiersChange={handleSplitModifiersToggle}
          onLayoutChange={setSelectedLayout}
          onThemeChange={onThemeChange}
          onClose={() => setShowParams(false)}
        />
      )}
    </div>
  );
};

export default KeyboardEditor;
