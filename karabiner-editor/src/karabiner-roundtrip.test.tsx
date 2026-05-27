import { fromKarabinerJson, toKarabinerJson, validateKarabinerJson } from './keyboard/karabiner-utils';
import { LAYERS, createEmptyLayers } from './keyboard/layer-utils';
import sourceConverted from '../karabiner-source-converted.json';

const CONVERTED_JSON = JSON.stringify(sourceConverted);

test('fromKarabinerJson parses all 10 layers', () => {
  const result = fromKarabinerJson(CONVERTED_JSON);
  for (const layer of LAYERS) {
    expect(result.layers[layer.id]).toBeDefined();
  }
});

test('fromKarabinerJson preserves rawRules', () => {
  const result = fromKarabinerJson(CONVERTED_JSON);
  expect(result.rawRules.length).toBeGreaterThan(0);
  const rawDescriptions = result.rawRules.map((r: any) => r.description);
  expect(rawDescriptions).toContain('Remap keys to use Colemak keyboard layout');
  expect(rawDescriptions).toContain('Both command to delete last word');
  expect(rawDescriptions).toContain('kj to esc');
  expect(rawDescriptions).toContain('Hyper + i/j/k/l == vim directional Keys');
  expect(rawDescriptions).toContain('Double tap cmd+q closes apps');
  expect(rawDescriptions).toContain('CapsLock to Hyper');
});

test('fromKarabinerJson parses layer switches', () => {
  const result = fromKarabinerJson(CONVERTED_JSON);
  expect(result.layerSwitches['d']?.targetLayerId).toBe('shift');
  expect(result.layerSwitches['d']?.mode).toBe('delayed');
  expect(result.layerSwitches['f']?.targetLayerId).toBe('ctrl');
  expect(result.layerSwitches['f']?.mode).toBe('delayed');
  expect(result.layerSwitches['s']?.targetLayerId).toBe('cmd');
  expect(result.layerSwitches['s']?.mode).toBe('delayed');
  expect(result.layerSwitches['a']?.targetLayerId).toBe('opt');
  expect(result.layerSwitches['a']?.mode).toBe('delayed');
  expect(result.layerSwitches['k']?.targetLayerId).toBe('shift');
  expect(result.layerSwitches['k']?.mode).toBe('delayed');
  expect(result.layerSwitches['j']?.targetLayerId).toBe('ctrl');
  expect(result.layerSwitches['j']?.mode).toBe('delayed');
  expect(result.layerSwitches['l']?.targetLayerId).toBe('cmd');
  expect(result.layerSwitches['l']?.mode).toBe('delayed');
  expect(result.layerSwitches['semicolon']?.targetLayerId).toBe('opt');
  expect(result.layerSwitches['semicolon']?.mode).toBe('delayed');
  expect(result.layerSwitches['left_command']?.targetLayerId).toBe('hyper');
  expect(result.layerSwitches['left_command']?.mode).toBe('simple');
  expect(result.layerSwitches['left_shift']?.targetLayerId).toBe('shift');
  expect(result.layerSwitches['left_shift']?.mode).toBe('simple');
  expect(result.layerSwitches['right_command']?.targetLayerId).toBe('1');
  expect(result.layerSwitches['right_command']?.mode).toBe('simple');
  expect(result.layerSwitches['caps_lock']?.targetLayerId).toBe('hyper');
  expect(result.layerSwitches['caps_lock']?.mode).toBe('simple');
  expect(result.layerSwitches['q']?.targetLayerId).toBe('2');
  expect(result.layerSwitches['q']?.mode).toBe('delayed');
  expect(result.layerSwitches['w']?.targetLayerId).toBe('3');
  expect(result.layerSwitches['w']?.mode).toBe('delayed');
});

test('fromKarabinerJson parses Main layer remaps', () => {
  const result = fromKarabinerJson(CONVERTED_JSON);
  expect(result.layers['0']['tab']).toBeDefined();
  expect(result.layers['0']['tab']?.keyCode).toBe('escape');
  expect(result.layers['0']['[']).toBeDefined();
  expect(result.layers['0']['[']?.keyCode).toBe('return_or_enter');
});

test('fromKarabinerJson skips pass-through from layer switches', () => {
  const result = fromKarabinerJson(CONVERTED_JSON);
  expect(result.layers['0']['d']).toBeUndefined();
  expect(result.layers['0']['f']).toBeUndefined();
  expect(result.layers['0']['s']).toBeUndefined();
  expect(result.layers['0']['a']).toBeUndefined();
  expect(result.layers['0']['k']).toBeUndefined();
  expect(result.layers['0']['j']).toBeUndefined();
  expect(result.layers['0']['l']).toBeUndefined();
  expect(result.layers['0']['semicolon']).toBeUndefined();
});

test('fromKarabinerJson keeps meaningful switch to_if_alone remaps', () => {
  const result = fromKarabinerJson(CONVERTED_JSON);
  expect(result.layers['0']['left_command']?.keyCode).toBe('tab');
  expect(result.layers['0']['left_shift']?.keyCode).toBe('p');
  expect(result.layers['0']['right_command']?.keyCode).toBe('delete_or_backspace');
  expect(result.layers['0']['caps_lock']?.keyCode).toBe('delete_or_backspace');
});

test('fromKarabinerJson parses Hyper layer remaps', () => {
  const result = fromKarabinerJson(CONVERTED_JSON);
  const hyper = result.layers['hyper'];
  expect(hyper['esc']?.keyCode).toBe('caps_lock');
  expect(hyper['esc']?.modifiers).toContain('ctrl');
  expect(hyper['space']?.keyCode).toBe('spacebar');
  expect(hyper['space']?.modifiers).toContain('ctrl');
  expect(hyper['j']?.keyCode).toBe('down_arrow');
  expect(hyper['h']?.keyCode).toBe('left_arrow');
  expect(hyper['k']?.keyCode).toBe('up_arrow');
  expect(hyper['l']?.keyCode).toBe('right_arrow');
  expect(hyper['z']?.keyCode).toBe('z');
  expect(hyper['z']?.modifiers).toContain('cmd');
  expect(hyper['c']?.keyCode).toBe('c');
  expect(hyper['c']?.modifiers).toContain('cmd');
  expect(hyper['v']?.keyCode).toBe('v');
  expect(hyper['v']?.modifiers).toContain('cmd');
});

test('fromKarabinerJson parses Layer 1 remaps', () => {
  const result = fromKarabinerJson(CONVERTED_JSON);
  const layer1 = result.layers['1'];
  expect(layer1['k']?.keyCode).toBe('4');
  expect(layer1['k']?.modifiers).toContain('shift');
  expect(layer1['q']?.keyCode).toBe('3');
  expect(layer1['w']?.keyCode).toBe('2');
  expect(layer1['j']?.keyCode).toBe('backslash');
});

test('toKarabinerJson round-trip preserves rawRules', () => {
  const parsed = fromKarabinerJson(CONVERTED_JSON);
  const reExported = JSON.parse(toKarabinerJson(parsed.layers, parsed.layerSwitches, parsed.parameters, parsed.rawRules));
  const rules = reExported.profiles[0].complex_modifications.rules;

  const rawRuleDescriptions = rules
    .filter((r: any) => r.description && !r.description.startsWith('Karabiner GUI —'))
    .map((r: any) => r.description);

  expect(rawRuleDescriptions).toContain('Remap keys to use Colemak keyboard layout');
  expect(rawRuleDescriptions).toContain('Hyper + i/j/k/l == vim directional Keys');
  expect(rawRuleDescriptions).toContain('Double tap cmd+q closes apps');
  expect(rawRuleDescriptions).toContain('CapsLock to Hyper');
});

test('toKarabinerJson round-trip preserves raw rules without descriptions', () => {
  const parsed = fromKarabinerJson(CONVERTED_JSON);
  const reExported = JSON.parse(toKarabinerJson(parsed.layers, parsed.layerSwitches, parsed.parameters, parsed.rawRules));
  const rules = reExported.profiles[0].complex_modifications.rules;
  const noDescRules = rules.filter((r: any) => !r.description);
  expect(noDescRules.length).toBe(1);
  expect(noDescRules[0].manipulators).toBeDefined();
});

test('toKarabinerJson round-trip preserves parameters', () => {
  const parsed = fromKarabinerJson(CONVERTED_JSON);
  const reExported = JSON.parse(toKarabinerJson(parsed.layers, parsed.layerSwitches, parsed.parameters, parsed.rawRules));
  expect(reExported.profiles[0].complex_modifications.parameters).toEqual(parsed.parameters);
});

test('toKarabinerJson round-trip preserves layer switch modes', () => {
  const parsed = fromKarabinerJson(CONVERTED_JSON);
  const reExported = JSON.parse(toKarabinerJson(parsed.layers, parsed.layerSwitches, parsed.parameters, parsed.rawRules));
  const rules = reExported.profiles[0].complex_modifications.rules;

  const switchRules = rules.filter((r: any) => r.description?.includes('Layer Switch'));
  expect(switchRules.length).toBe(14);

  const switchDescs = switchRules.map((r: any) => r.description);
  expect(switchDescs).toContain('Karabiner GUI — Layer Switch: d → Shift');
  expect(switchDescs).toContain('Karabiner GUI — Layer Switch: f → Ctrl');
  expect(switchDescs).toContain('Karabiner GUI — Layer Switch: s → Cmd');
  expect(switchDescs).toContain('Karabiner GUI — Layer Switch: k → Shift');
  expect(switchDescs).toContain('Karabiner GUI — Layer Switch: j → Ctrl');
  expect(switchDescs).toContain('Karabiner GUI — Layer Switch: l → Cmd');
  expect(switchDescs).toContain('Karabiner GUI — Layer Switch: a → Opt');
  expect(switchDescs).toContain('Karabiner GUI — Layer Switch: semicolon → Opt');
  expect(switchDescs).toContain('Karabiner GUI — Layer Switch: left_command → Hyper');
  expect(switchDescs).toContain('Karabiner GUI — Layer Switch: left_shift → Shift');
  expect(switchDescs).toContain('Karabiner GUI — Layer Switch: right_command → 1');
  expect(switchDescs).toContain('Karabiner GUI — Layer Switch: caps_lock → Hyper');
  expect(switchDescs).toContain('Karabiner GUI — Layer Switch: q → 2');
  expect(switchDescs).toContain('Karabiner GUI — Layer Switch: w → 3');
});

test('toKarabinerJson round-trip has no invalid key_code values', () => {
  const parsed = fromKarabinerJson(CONVERTED_JSON);
  const json = toKarabinerJson(parsed.layers, parsed.layerSwitches, parsed.parameters, parsed.rawRules);
  const issues = validateKarabinerJson(json);
  expect(issues).toEqual([]);
});

test('toKarabinerJson with empty rawRules produces valid JSON', () => {
  const layers = createEmptyLayers();
  const json = toKarabinerJson(layers, {}, undefined, []);
  const parsed = JSON.parse(json);
  expect(parsed.profiles[0].complex_modifications.rules).toEqual([]);
});
