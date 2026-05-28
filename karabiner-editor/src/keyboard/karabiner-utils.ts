import { LayersState, LayerSwitches, LAYERS, getLayerById } from './layer-utils';

export const KEY_ID_TO_KARABINER: Record<string, string> = {
  backtick: 'grave_accent_and_tilde',
  '-': 'hyphen',
  '=': 'equal_sign',
  '[': 'open_bracket',
  ']': 'close_bracket',
  '\\': 'backslash',
  ';': 'semicolon',
  "'": 'quote',
  ',': 'comma',
  '.': 'period',
  '/': 'slash',
  esc: 'escape',
  backspace: 'delete_or_backspace',
  enter: 'return_or_enter',
  return: 'return_or_enter',
  space: 'spacebar',
  tab: 'tab',
  caps_lock: 'caps_lock',
  shift_left: 'left_shift',
  shift_right: 'right_shift',
  ctrl_left: 'left_control',
  ctrl_right: 'right_control',
  alt_left: 'left_alt',
  alt_right: 'right_alt',
  win_left: 'left_command',
  win_right: 'right_command',
  fn: 'fn',
  delete: 'delete_forward',
  print_screen: 'print_screen',
  scroll_lock: 'scroll_lock',
  pause: 'pause',
  left_arrow: 'left_arrow',
  right_arrow: 'right_arrow',
  up_arrow: 'up_arrow',
  down_arrow: 'down_arrow',
  hash: 'non_us_pound',
  page_up: 'page_up',
  page_down: 'page_down',
  home: 'home',
  end: 'end',
  insert: 'insert',
  menu: 'application',
};

export const KARABINER_TO_KEY_ID: Record<string, string> = {};
for (const [id, code] of Object.entries(KEY_ID_TO_KARABINER)) {
  KARABINER_TO_KEY_ID[code] = id;
}

export const KARABINER_DISPLAY: Record<string, string> = {
  grave_accent_and_tilde: '`',
  hyphen: '-',
  equal_sign: '=',
  open_bracket: '[',
  close_bracket: ']',
  backslash: '\\',
  semicolon: ';',
  quote: "'",
  comma: ',',
  period: '.',
  slash: '/',
  escape: 'Esc',
  delete_or_backspace: '⌫',
  return_or_enter: '↵',
  spacebar: '␣',
  tab: 'Tab',
  caps_lock: 'Caps',
  left_shift: '⇧',
  right_shift: '⇧',
  left_control: '⌃',
  right_control: '⌃',
  left_alt: '⌥',
  right_alt: '⌥',
  left_command: '⌘',
  right_command: '⌘',
  fn: 'fn',
  delete_forward: '⌦',
  print_screen: 'PrtSc',
  scroll_lock: 'ScrLk',
  pause: 'Pause',
  left_arrow: '←',
  right_arrow: '→',
  up_arrow: '↑',
  down_arrow: '↓',
  non_us_pound: '#',
  page_up: 'PgUp',
  page_down: 'PgDn',
  home: 'Home',
  end: 'End',
  insert: 'Ins',
  application: 'Menu',
  f1: '☀',
  f2: '☀',
  f3: '⊞',
  f4: '⊟',
  f5: '⌨',
  f6: '⌨',
  f7: '⏮',
  f8: '⏯',
  f9: '⏭',
  f10: '✕',
  f11: '♪',
  f12: '♫',
};

export const KEY_ALIASES: Record<string, string> = {
  opt: 'left_alt',
  option: 'left_alt',
  alt: 'left_alt',
  command: 'left_command',
  cmd: 'left_command',
  ctrl: 'left_control',
  control: 'left_control',
  shift: 'left_shift',
  backspace: 'delete_or_backspace',
  delete: 'delete_or_backspace',
  ' ': 'spacebar',
  space: 'spacebar',
  enter: 'return_or_enter',
  return: 'return_or_enter',
  caps: 'caps_lock',
  capslock: 'caps_lock',
  esc: 'escape',
  escape: 'escape',
  tab: 'tab',
  fn: 'fn',
  home: 'home',
  end: 'end',
  pageup: 'page_up',
  pagedown: 'page_down',
  pgup: 'page_up',
  pgdn: 'page_down',
  ins: 'insert',
  insert: 'insert',
  del: 'delete_or_backspace',
};

export function getDisplayName(keyCode: string): string {
  const upper = keyCode.toUpperCase();
  if (KARABINER_DISPLAY[keyCode]) return KARABINER_DISPLAY[keyCode];
  if (/^[a-z]$/.test(keyCode)) return upper;
  if (/^f\d{1,2}$/.test(keyCode)) return upper;
  if (/^\d$/.test(keyCode)) return keyCode;
  return keyCode;
}

export const MODIFIER_UI_TO_KARABINER: Record<string, string> = {
  shift: 'left_shift',
  ctrl: 'left_control',
  alt: 'left_alt',
  cmd: 'left_command',
};

export const KARABINER_TO_MODIFIER_UI: Record<string, string> = {};
for (const [ui, karabiner] of Object.entries(MODIFIER_UI_TO_KARABINER)) {
  KARABINER_TO_MODIFIER_UI[karabiner] = ui;
}

export const SPLIT_MODIFIER_NAMES = [
  'left_shift', 'right_shift',
  'left_control', 'right_control',
  'left_alt', 'right_alt',
  'left_command', 'right_command',
];

const SHORT_TO_LEFT: Record<string, string> = {
  shift: 'left_shift',
  ctrl: 'left_control',
  alt: 'left_alt',
  cmd: 'left_command',
};

export function convertModifiersOnSplitToggle(
  modifiers: string[],
  toSplit: boolean
): string[] {
  if (toSplit) {
    return modifiers.map(m => SHORT_TO_LEFT[m] || m);
  }
  return modifiers.map(m => KARABINER_TO_MODIFIER_UI[m] || m);
}

export const MODIFIER_UI_TO_SYMBOL: Record<string, string> = {
  shift: '⇧',
  ctrl: '⌃',
  alt: '⌥',
  cmd: '⌘',
  left_shift: '⇧L',
  right_shift: '⇧R',
  left_control: '⌃L',
  right_control: '⌃R',
  left_alt: '⌥L',
  right_alt: '⌥R',
  left_command: '⌘L',
  right_command: '⌘R',
};

export interface ParsedKarabiner {
  keyConfig: Record<string, any>;
  layers: LayersState;
  layerSwitches: LayerSwitches;
  parameters: Record<string, number>;
  rawRules: any[];
}

export const DEFAULT_PARAMETERS: Record<string, number> = {
  'basic.to_if_held_down_threshold_milliseconds': 200,
  'basic.to_if_alone_timeout_milliseconds': 1000,
  'basic.to_delayed_action_delay_milliseconds': 500,
  'basic.simultaneous_threshold_milliseconds': 50,
};

export const PARAMETER_LABELS: Record<string, string> = {
  'basic.to_if_held_down_threshold_milliseconds': 'To if held down threshold (ms)',
  'basic.to_if_alone_timeout_milliseconds': 'To if alone timeout (ms)',
  'basic.to_delayed_action_delay_milliseconds': 'To delayed action delay (ms)',
  'basic.simultaneous_threshold_milliseconds': 'Simultaneous threshold (ms)',
};

function buildManipulatorFromConfig(
  sourceId: string,
  config: any,
  fromModifiers?: any
): any {
  const fromKeyCode = KEY_ID_TO_KARABINER[sourceId] || sourceId;
  const toKeyCode = config.keyCode;
  const toModifiers: string[] = (config.modifiers || []).map(
    (m: string) => MODIFIER_UI_TO_KARABINER[m] || m
  );

  let toItem: any;
  if (config.actionType === 'shell') {
    toItem = { shell_command: config.shellCommand || config.keyCode };
  } else if (config.actionType === 'open_app' && config.appPath) {
    toItem = { shell_command: `open '${config.appPath}'` };
  } else {
    toItem = { key_code: toKeyCode };
    if (toModifiers.length > 0) {
      toItem.modifiers = toModifiers;
    } else if (config.passthroughAny) {
      toItem.modifiers = 'any';
    }
  }

  const manip: any = {
    type: 'basic',
    from: { key_code: fromKeyCode },
    to: [toItem],
  };

  if (fromModifiers && Object.keys(fromModifiers).length > 0) {
    manip.from.modifiers = fromModifiers;
  }

  return manip;
}

function makeModifierItem(mods: string[], halt?: boolean): any[] {
  if (mods.length <= 1) return mods.map(m => ({ key_code: m, ...(halt ? { halt: true } : {}) }));
  return [{ key_code: mods[0], modifiers: mods.slice(1), ...(halt ? { halt: true } : {}) }];
}

export function toKarabinerJson(
  layers: LayersState,
  layerSwitches: LayerSwitches,
  parameters?: Record<string, number>,
  rawRules?: any[]
): string {
  const mergedParams = { ...DEFAULT_PARAMETERS, ...parameters };
  const rules: any[] = [];
  const switchKeys = new Set(Object.keys(layerSwitches));

  for (const layerDef of LAYERS) {
    const layerConfig = layers[layerDef.id] || {};
    const entries = layerDef.id === '0'
      ? Object.entries(layerConfig).filter(([keyId]) => !switchKeys.has(keyId))
      : Object.entries(layerConfig);

    if (entries.length === 0) continue;

    const manipulators: any[] = [];

    for (const [sourceId, config] of entries) {
      const fromKeyCode = KEY_ID_TO_KARABINER[sourceId] || sourceId;
      if (!config.keyCode && config.actionType !== 'open_app' && config.actionType !== 'shell') continue;
      if (config.actionType !== 'open_app' && config.actionType !== 'shell' && config.keyCode === fromKeyCode && (!config.modifiers || config.modifiers.length === 0)) continue;

      const fromModifiers: any = {};
      if (layerDef.mandatoryModifiers.length > 0) {
        fromModifiers.mandatory = layerDef.mandatoryModifiers;
      }
      if (layerDef.id === '0' || (layerDef.optionalAny) || (config.passthroughAny)) {
        fromModifiers.optional = ['any'];
      }

      manipulators.push(buildManipulatorFromConfig(sourceId, config, fromModifiers));
    }

    if (manipulators.length > 0) {
      rules.push({
        description: `Karabiner GUI — ${layerDef.name}`,
        enabled: true,
        manipulators,
      });
    }
  }

  function buildTapItem(sourceId: string, config: any | undefined, originalKeyCode: string, halt?: boolean): any {
    if (config && config.keyCode) {
      const fromKeyCodeForCheck = KEY_ID_TO_KARABINER[sourceId] || sourceId;
      const isPassThrough = config.keyCode === fromKeyCodeForCheck
        && (!config.modifiers || config.modifiers.length === 0);
      if (!isPassThrough) {
        if (config.actionType === 'shell') {
          const item: any = { shell_command: config.shellCommand || config.keyCode };
          if (halt) item.halt = true;
          return item;
        }
        if (config.actionType === 'open_app' && config.appPath) {
          const item: any = { shell_command: `open '${config.appPath}'` };
          if (halt) item.halt = true;
          return item;
        }
        const item: any = { key_code: config.keyCode };
        const mods = (config.modifiers || []).map(
          (m: string) => MODIFIER_UI_TO_KARABINER[m] || m
        );
        if (mods.length > 0) item.modifiers = mods;
        if (halt) item.halt = true;
        return item;
      }
    }
    const item: any = { key_code: originalKeyCode, modifiers: 'any' };
    if (halt) item.halt = true;
    return item;
  }

  function fixEmptyKeyCodes(rules: any[]): void {
    for (const rule of rules) {
      if (!rule.manipulators) continue;
      for (const manip of rule.manipulators) {
        const fromKeyCode = manip?.from?.key_code;
        if (!fromKeyCode) continue;
        const process = (obj: any) => {
          if (!obj || typeof obj !== 'object') return;
          if (obj.key_code === '') obj.key_code = fromKeyCode;
        };
        for (const key of ['to', 'to_if_alone', 'to_if_held_down', 'to_if_canceled', 'to_if_invoked']) {
          if (Array.isArray(manip[key])) manip[key].forEach(process);
        }
        if (manip.to_delayed_action) {
          for (const sub of ['to_if_canceled', 'to_if_invoked']) {
            if (Array.isArray(manip.to_delayed_action[sub])) manip.to_delayed_action[sub].forEach(process);
          }
        }
      }
    }
  }

  for (const [keyId, switchEntry] of Object.entries(layerSwitches)) {
    const layoutId = KARABINER_TO_KEY_ID[keyId];
    if (layoutId && layerSwitches[layoutId]) continue;
    const targetLayerId = switchEntry.targetLayerId;
    const mode = switchEntry.mode || 'hold';
    const fromKeyCode = KEY_ID_TO_KARABINER[keyId] || keyId;
    const targetLayer = getLayerById(targetLayerId);
    if (!targetLayer) continue;

    const basicConfig = layers['0']?.[keyId];

    const manip: any = {
      type: 'basic',
      from: {
        key_code: fromKeyCode,
        modifiers: { optional: ['any'] },
      },
    };

    const heldMods = targetLayer.mandatoryModifiers;

    if (mode === 'simple') {
      manip.to = makeModifierItem(heldMods);
      manip.to_if_alone = [buildTapItem(keyId, basicConfig, fromKeyCode, true)];
    } else if (mode === 'delayed') {
      manip.to_delayed_action = {
        to_if_canceled: [buildTapItem(keyId, basicConfig, fromKeyCode)],
        to_if_invoked: [{ key_code: 'vk_none' }],
      };
      manip.to_if_alone = [buildTapItem(keyId, basicConfig, fromKeyCode, true)];
      manip.to_if_held_down = makeModifierItem(heldMods, true);
    } else {
      if (basicConfig && basicConfig.keyCode) {
        const fromKeyCodeForCheck = KEY_ID_TO_KARABINER[keyId] || keyId;
        const isPassThrough = basicConfig.keyCode === fromKeyCodeForCheck
          && (!basicConfig.modifiers || basicConfig.modifiers.length === 0);
        if (!isPassThrough) {
          if (basicConfig.actionType === 'shell') {
            manip.to_if_alone = [{ shell_command: basicConfig.shellCommand || basicConfig.keyCode }];
          } else if (basicConfig.actionType === 'open_app' && basicConfig.appPath) {
            manip.to_if_alone = [{ shell_command: `open '${basicConfig.appPath}'` }];
          } else {
            const toItem: any = { key_code: basicConfig.keyCode };
            const toMods = (basicConfig.modifiers || []).map(
              (m: string) => MODIFIER_UI_TO_KARABINER[m] || m
            );
            if (toMods.length > 0) toItem.modifiers = toMods;
            manip.to_if_alone = [toItem];
          }
        }
      }
      if (heldMods.length > 0) {
        manip.to_if_held_down = makeModifierItem(heldMods);
      }
    }

    rules.push({
      description: `Karabiner GUI — Layer Switch: ${keyId} → ${targetLayer.name}`,
      enabled: true,
      manipulators: [manip],
    });
  }

  if (rawRules) {
    rules.push(...rawRules);
  }

  fixEmptyKeyCodes(rules);

  if (rules.length === 0) {
    return JSON.stringify({
      profiles: [{ complex_modifications: { parameters: mergedParams, rules: [] } }],
    }, null, 2);
  }

  return JSON.stringify({
    profiles: [{
      complex_modifications: {
        parameters: mergedParams,
        rules,
      },
    }],
  }, null, 2);
}

const VALID_KEY_CODE_RE = /^[a-z0-9_]+$/;

export interface ValidationIssue {
  rule: string;
  field: string;
  value: string;
}

export function validateKarabinerJson(jsonString: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  try {
    const parsed = JSON.parse(jsonString);
    const rules = parsed?.profiles?.[0]?.complex_modifications?.rules || [];
    for (const rule of rules) {
      const desc = rule.description || '(no description)';
      for (const manip of rule.manipulators || []) {
        const check = (obj: any, path: string) => {
          if (!obj || typeof obj !== 'object') return;
          if (typeof obj.key_code === 'string' && obj.key_code !== '' && !VALID_KEY_CODE_RE.test(obj.key_code)) {
            issues.push({ rule: desc, field: path + '.key_code', value: obj.key_code });
          }
          for (const key of ['to', 'to_if_alone', 'to_if_held_down', 'to_if_canceled', 'to_if_invoked']) {
            if (Array.isArray(obj[key])) {
              obj[key].forEach((item: any, i: number) => check(item, `${path}.${key}[${i}]`));
            }
          }
          if (obj.to_delayed_action) {
            for (const sub of ['to_if_canceled', 'to_if_invoked']) {
              if (Array.isArray(obj.to_delayed_action[sub])) {
                obj.to_delayed_action[sub].forEach((item: any, i: number) =>
                  check(item, `${path}.to_delayed_action.${sub}[${i}]`)
                );
              }
            }
          }
        };
        check(manip, `manipulator`);
      }
    }
  } catch {
    // JSON not parseable — skip validation
  }
  return issues;
}

export function fromKarabinerJson(jsonString: string, splitModifiers?: boolean): ParsedKarabiner {
  const layers: LayersState = {};
  for (const layer of LAYERS) layers[layer.id] = {};
  const layerSwitches: LayerSwitches = {};
  let parameters: Record<string, number> = { ...DEFAULT_PARAMETERS };

  const switchRe = /^Karabiner GUI — Layer Switch: (\S+) → (.+)$/;
  const layerRe = /^Karabiner GUI — (.+)$/;
  const rawRules: any[] = [];

  const validModifiers = splitModifiers
    ? ['shift', 'ctrl', 'alt', 'cmd', ...SPLIT_MODIFIER_NAMES]
    : ['shift', 'ctrl', 'alt', 'cmd'];

  try {
    const parsed = JSON.parse(jsonString);
    const profiles = parsed.profiles || [];

    for (const profile of profiles) {
      const cm = profile.complex_modifications;
      if (cm?.parameters) {
        parameters = { ...DEFAULT_PARAMETERS, ...cm.parameters };
      }

      const rules = cm?.rules || [];
      for (const rule of rules) {
        const desc = rule.description ?? '';
        const swMatch = desc.match(switchRe);

        if (swMatch) {
          const keyId = KARABINER_TO_KEY_ID[swMatch[1]] || swMatch[1];
          const targetLayerName = swMatch[2];
          const targetLayer = LAYERS.find(l => l.name === targetLayerName);
          if (targetLayer) {
            const manip = rule.manipulators?.[0];
            let mode: string = 'hold';
            if (manip?.to_delayed_action) {
              mode = 'delayed';
            } else if (manip?.to && !manip?.to_if_held_down) {
              mode = 'simple';
            }
            layerSwitches[keyId] = { targetLayerId: targetLayer.id, mode: mode as any };
          }

          const manip = rule.manipulators?.[0];
          if (manip?.to_if_alone?.[0]?.key_code) {
            const toIfAlone = manip.to_if_alone[0];
            const toMods: string[] = Array.isArray(toIfAlone.modifiers)
              ? toIfAlone.modifiers
                .map((m: string) => splitModifiers ? m : (KARABINER_TO_MODIFIER_UI[m] || m))
                .filter((m: string) => validModifiers.includes(m))
              : [];

            const isPassthrough = toIfAlone.key_code === keyId && toMods.length === 0;
            if (!isPassthrough) {
              layers['0'][keyId] = {
                keyCode: toIfAlone.key_code,
                modifiers: toMods,
              };
            }
          }

          continue;
        }

        const layerMatch = desc.match(layerRe);
        if (layerMatch) {
          const layerName = layerMatch[1];
          let targetLayer = LAYERS.find(l => l.name === layerName);

          for (const manip of rule.manipulators || []) {
            if (manip.type !== 'basic') continue;
            const fromKeyCode = manip.from?.key_code;
            if (!fromKeyCode) continue;

            const toItem = manip.to?.[0];
            if (!toItem) continue;

            const sourceId = KARABINER_TO_KEY_ID[fromKeyCode] || fromKeyCode;
            if (!sourceId) continue;

            let layerId = targetLayer ? targetLayer.id : '0';

            if (toItem.shell_command) {
              const match = toItem.shell_command.match(/^open '(.+)'$/);
              if (match) {
                layers[layerId][sourceId] = {
                  keyCode: match[1],
                  modifiers: [],
                  actionType: 'open_app' as const,
                  appPath: match[1],
                };
              } else {
                layers[layerId][sourceId] = {
                  keyCode: toItem.shell_command,
                  modifiers: [],
                  actionType: 'shell' as const,
                  shellCommand: toItem.shell_command,
                };
              }
              continue;
            }

            if (!toItem.key_code) continue;

            const hasAnyMod = !Array.isArray(toItem.modifiers) && toItem.modifiers === 'any';
            const hasAnyOptional = manip.from?.modifiers?.optional?.includes('any');
            const toModifiers: string[] = Array.isArray(toItem.modifiers)
              ? (toItem.modifiers as string[])
                .map((m: string) => splitModifiers ? m : (KARABINER_TO_MODIFIER_UI[m] || m))
                .filter((m: string) => validModifiers.includes(m))
              : [];

            layers[layerId][sourceId] = {
              keyCode: toItem.key_code,
              modifiers: toModifiers,
              ...((hasAnyMod || hasAnyOptional) ? { passthroughAny: true } : {}),
            };
          }
        } else {
          rawRules.push(rule);
        }
      }
    }
  } catch {
    console.error('Failed to parse Karabiner JSON');
  }

  const keyConfig = { ...layers['0'] };
  return { keyConfig, layers, layerSwitches, parameters, rawRules };
}
