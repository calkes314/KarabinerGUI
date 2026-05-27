export interface KeyRemap {
  keyCode: string;
  modifiers: string[];
  passthroughAny?: boolean;
  actionType?: 'key_code' | 'open_app' | 'shell';
  appPath?: string;
  shellCommand?: string;
}

export interface LayerDef {
  id: string;
  name: string;
  symbol: string;
  mandatoryModifiers: string[];
  optionalAny: boolean;
}

export type LayerSwitchMode = 'hold' | 'simple' | 'delayed';

export interface LayerSwitchConfig {
  targetLayerId: string;
  mode: LayerSwitchMode;
}

export type LayersState = Record<string, Record<string, KeyRemap>>;
export type LayerSwitches = Record<string, LayerSwitchConfig>;

const MODE_NAMES: Record<LayerSwitchMode, string> = {
  hold: 'Hold',
  simple: 'Simple',
  delayed: 'Delayed',
};

export function getModeName(mode: LayerSwitchMode): string {
  return MODE_NAMES[mode];
}

export function getSwitchMode(switches: LayerSwitches, keyId: string): LayerSwitchMode {
  return switches[keyId]?.mode || 'hold';
}

export function getSwitchTarget(switches: LayerSwitches, keyId: string): string | undefined {
  return switches[keyId]?.targetLayerId;
}

export function normalizeLayerSwitches(raw: any): LayerSwitches {
  const result: LayerSwitches = {};
  if (!raw || typeof raw !== 'object') return result;
  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === 'string') {
      result[key] = { targetLayerId: value, mode: 'hold' };
    } else if (typeof value === 'object' && value !== null) {
      const v = value as any;
      result[key] = {
        targetLayerId: v.targetLayerId || '',
        mode: (v.mode as LayerSwitchMode) || 'hold',
      };
    }
  }
  return result;
}

export const LAYERS: LayerDef[] = [
  { id: '0', name: 'Main', symbol: '', mandatoryModifiers: [], optionalAny: true },
  { id: 'ctrl', name: 'Ctrl', symbol: '⌃', mandatoryModifiers: ['left_control'], optionalAny: false },
  { id: 'opt', name: 'Opt', symbol: '⌥', mandatoryModifiers: ['left_alt'], optionalAny: false },
  { id: 'cmd', name: 'Cmd', symbol: '⌘', mandatoryModifiers: ['left_command'], optionalAny: false },
  { id: 'shift', name: 'Shift', symbol: '⇧', mandatoryModifiers: ['left_shift'], optionalAny: false },
  { id: 'hyper', name: 'Hyper', symbol: '⚡', mandatoryModifiers: ['right_shift', 'right_command', 'right_option', 'right_control'], optionalAny: false },
  { id: '1', name: '1', symbol: '1', mandatoryModifiers: ['right_shift', 'right_command', 'right_option'], optionalAny: false },
  { id: '2', name: '2', symbol: '2', mandatoryModifiers: ['right_shift', 'right_command', 'right_control'], optionalAny: false },
  { id: '3', name: '3', symbol: '3', mandatoryModifiers: ['right_shift', 'right_option', 'right_control'], optionalAny: false },
  { id: '4', name: '4', symbol: '4', mandatoryModifiers: ['right_command', 'right_option', 'right_control'], optionalAny: false },
];

export const DEFAULT_ACTIVE_LAYER = '0';

export function getLayerById(id: string): LayerDef | undefined {
  return LAYERS.find(l => l.id === id);
}

export function getLayerByMandatoryModifiers(mods: string[]): LayerDef | undefined {
  const sorted = [...mods].sort();
  return LAYERS.find(l => {
    const lSorted = [...l.mandatoryModifiers].sort();
    return lSorted.length === sorted.length && lSorted.every((m, i) => m === sorted[i]);
  });
}

export function getTotalRemapCount(layers: LayersState): number {
  return Object.values(layers).reduce(
    (sum, layer) => sum + Object.keys(layer).length,
    0
  );
}

export function createEmptyLayers(): LayersState {
  const layers: LayersState = {};
  for (const layer of LAYERS) {
    layers[layer.id] = {};
  }
  return layers;
}
