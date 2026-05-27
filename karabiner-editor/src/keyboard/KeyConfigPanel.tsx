import React, { useState, useEffect, useRef } from 'react';
import { Key } from './mac-layouts';
import { KEY_ID_TO_KARABINER, MODIFIER_UI_TO_SYMBOL, KEY_ALIASES } from './karabiner-utils';
import { LAYERS, LayerSwitches, LayerSwitchMode, getSwitchMode, getSwitchTarget, getModeName } from './layer-utils';

interface KeyConfigPanelProps {
  selectedKey: Key | null;
  selectedLayerId: string;
  currentConfig: any;
  layerSwitches: LayerSwitches;
  splitModifiers?: boolean;
  selectedLayout?: string;
  onKeyConfigChange?: (keyId: string, config: any) => void;
  onLayerSwitchChange?: (keyId: string, targetLayerId: string | null, mode?: string) => void;
  actionTypeSelectRef?: React.RefObject<HTMLSelectElement | null>;
}

const KeyConfigPanel: React.FC<KeyConfigPanelProps> = ({
  selectedKey,
  selectedLayerId,
  currentConfig,
  layerSwitches,
  splitModifiers,
  selectedLayout,
  onKeyConfigChange,
  onLayerSwitchChange,
  actionTypeSelectRef,
}) => {
  const [actionType, setActionType] = useState<'key_code' | 'open_app' | 'shell'>('key_code');
  const [keyCode, setKeyCode] = useState<string>('');
  const [appPath, setAppPath] = useState<string>('');
  const [shellCommand, setShellCommand] = useState<string>('');
  const [modifierKeys, setModifierKeys] = useState<string[]>([]);
  const [passthroughAny, setPassthroughAny] = useState<boolean>(false);
  const keyCodeInputRef = useRef<HTMLInputElement>(null);
  const prevKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (selectedKey && currentConfig?.keyCode) {
      setActionType(currentConfig.actionType || 'key_code');
      setKeyCode(currentConfig.keyCode);
      setAppPath(currentConfig.appPath || '');
      setShellCommand(currentConfig.shellCommand || '');
      setModifierKeys(currentConfig.modifiers || []);
      setPassthroughAny(currentConfig.passthroughAny || false);
    } else if (selectedKey) {
      setActionType('key_code');
      setKeyCode(KEY_ID_TO_KARABINER[selectedKey.id] || selectedKey.id);
      setAppPath('');
      setShellCommand('');
      setModifierKeys([]);
      setPassthroughAny(false);
    } else {
      setActionType('key_code');
      setKeyCode('');
      setAppPath('');
      setShellCommand('');
      setModifierKeys([]);
      setPassthroughAny(false);
    }
    const currKeyId = selectedKey?.id ?? null;
    if (currKeyId && currKeyId !== prevKeyRef.current && keyCodeInputRef.current && actionType === 'key_code') {
      requestAnimationFrame(() => keyCodeInputRef.current?.select());
    }
    prevKeyRef.current = currKeyId;
  }, [selectedKey, selectedLayerId, currentConfig]);

  const emitChange = (overrides: Record<string, any>) => {
    if (!onKeyConfigChange || !selectedKey) return;
    onKeyConfigChange(selectedKey.id, { keyCode, modifiers: modifierKeys, passthroughAny, actionType, appPath, shellCommand, ...overrides });
  };

  const handleKeyCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    const resolved = KEY_ALIASES[input];
    if (resolved) {
      setKeyCode(resolved);
      emitChange({ keyCode: resolved });
      return;
    }

    setKeyCode(input);
    emitChange({ keyCode: input });
  };

  const handleActionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as 'key_code' | 'open_app' | 'shell';
    setActionType(newType);
    emitChange({ actionType: newType });
  };

  const handleAppPathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setAppPath(input);
    emitChange({ keyCode: input, actionType: 'open_app', appPath: input });
  };

  const handleShellCommandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setShellCommand(input);
    emitChange({ keyCode: input, actionType: 'shell', shellCommand: input });
  };

  const handleModifierChange = (modifier: string) => {
    const newModifiers = modifierKeys.includes(modifier)
      ? modifierKeys.filter(m => m !== modifier)
      : [...modifierKeys, modifier];
    setModifierKeys(newModifiers);
    emitChange({ modifiers: newModifiers });
  };

  const handlePassthroughAnyChange = () => {
    const newValue = !passthroughAny;
    setPassthroughAny(newValue);
    emitChange({ passthroughAny: newValue });
  };

  const handleModifierKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const step = e.key === 'ArrowRight' ? 1 : -1;
    const nextIdx = (idx + step + MODIFIER_OPTIONS.length) % MODIFIER_OPTIONS.length;
    const buttons = (e.currentTarget.parentNode as HTMLElement)?.querySelectorAll('button');
    if (buttons && buttons[nextIdx]) {
      (buttons[nextIdx] as HTMLButtonElement).focus();
    }
  };

  const currentSwitch = selectedKey ? getSwitchTarget(layerSwitches, selectedKey.id) : undefined;
  const currentMode: LayerSwitchMode = selectedKey ? getSwitchMode(layerSwitches, selectedKey.id) : 'hold';
  const [selectedMode, setSelectedMode] = useState<LayerSwitchMode>(currentMode);

  useEffect(() => {
    setSelectedMode(currentMode);
  }, [currentMode, selectedKey?.id]);

  const MODIFIER_OPTIONS = splitModifiers
    ? ['left_shift', 'right_shift', 'left_control', 'right_control', 'left_alt', 'right_alt', 'left_command', 'right_command']
    : ['shift', 'ctrl', 'alt', 'cmd'];

  const MODIFIER_LABELS: Record<string, string> = {
    shift: 'Shift', ctrl: 'Ctrl', alt: 'Opt', cmd: 'Cmd',
    left_shift: 'L-Shift', right_shift: 'R-Shift',
    left_control: 'L-Ctrl', right_control: 'R-Ctrl',
    left_alt: 'L-Opt', right_alt: 'R-Opt',
    left_command: 'L-Cmd', right_command: 'R-Cmd',
  };

  if (!selectedKey) {
    return (
      <div className="key-config-panel">
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, margin: 0 }}>Click a key on the keyboard to configure it.</p>
      </div>
    );
  }

  const layerLabel = LAYERS.find(l => l.id === selectedLayerId);

  const actionInput = () => {
    switch (actionType) {
      case 'key_code':
        return (
          <input
            ref={keyCodeInputRef}
            type="text"
            className="action-input"
            value={keyCode}
            onChange={handleKeyCodeChange}
            onFocus={(e) => setTimeout(() => e.target.select(), 0)}
            placeholder="Enter key code"
          />
        );
      case 'open_app':
        return (
          <input
            type="text"
            className="action-input"
            value={appPath}
            onChange={handleAppPathChange}
            onFocus={(e) => setTimeout(() => e.target.select(), 0)}
            placeholder="/Applications/Safari.app"
          />
        );
      case 'shell':
        return (
          <input
            type="text"
            className="action-input"
            value={shellCommand}
            onChange={handleShellCommandChange}
            onFocus={(e) => setTimeout(() => e.target.select(), 0)}
            placeholder="open -a Safari"
          />
        );
    }
  };

  return (
    <div className="key-config-panel">
      <div className="key-config-header">
        <span className="key-config-key-label">{selectedKey.label}</span>
        <span className="layer-badge">{layerLabel?.name || selectedLayerId}</span>
      </div>
      <div className="key-config-details">
        <div className="action-row">
          <select
            ref={actionTypeSelectRef}
            value={actionType}
            onChange={handleActionTypeChange}
            className="action-type-select"
          >
            <option value="key_code">Key Code</option>
            <option value="open_app">Open App</option>
            <option value="shell">Shell Script</option>
          </select>
          {actionInput()}
        </div>

        <div className="modifier-section">
          <label>Output Modifiers:</label>
          <div className="modifier-buttons">
            {MODIFIER_OPTIONS.map((mod, idx) => (
              <button
                key={mod}
                className={`btn ${modifierKeys.includes(mod) ? 'btn-primary' : 'btn-secondary'}`}
                tabIndex={idx === 0 ? 0 : -1}
                onClick={() => handleModifierChange(mod)}
                onKeyDown={(e) => handleModifierKeyDown(e, idx)}
              >
                {MODIFIER_UI_TO_SYMBOL[mod] || mod} {MODIFIER_LABELS[mod] || mod}
              </button>
            ))}
          </div>
        </div>

        <div className="key-config-passthrough">
          <label>
            <input
              type="checkbox"
              checked={passthroughAny}
              onChange={handlePassthroughAnyChange}
            />
            {' '}Passthrough any modifiers
          </label>
        </div>

        {selectedLayerId === '0' && (
          <div className="key-config-layer-switch">
            <label htmlFor="layer-switch">Layer Switch (hold):</label>
            <select
              id="layer-switch"
              value={currentSwitch || ''}
              onChange={(e) => {
                const newTarget = e.target.value || null;
                if (onLayerSwitchChange) {
                  onLayerSwitchChange(selectedKey.id, newTarget, newTarget ? selectedMode : undefined);
                }
              }}
              className="layer-switch-select"
            >
              <option value="">None</option>
              {LAYERS.filter(l => l.id !== '0').map(l => (
                <option key={l.id} value={l.id}>
                  {l.symbol ? `${l.symbol} ` : ''}{l.name}
                </option>
              ))}
            </select>
            {currentSwitch && (
              <div className="layer-switch-mode">
                <label htmlFor="switch-mode">Mode:</label>
                <select
                  id="switch-mode"
                  value={selectedMode}
                  onChange={(e) => {
                    const newMode = e.target.value as LayerSwitchMode;
                    setSelectedMode(newMode);
                    if (onLayerSwitchChange) {
                      onLayerSwitchChange(selectedKey.id, currentSwitch, newMode);
                    }
                  }}
                  className="layer-switch-select"
                >
                  <option value="hold">{getModeName('hold')} — hold to activate</option>
                  <option value="simple">{getModeName('simple')} — activates immediately</option>
                  <option value="delayed">{getModeName('delayed')} — tap types, hold activates</option>
                </select>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default KeyConfigPanel;
