export interface KeyboardCharMap {
  [keyCodeOrLetter: string]: { default: string; shift?: string };
}

export interface KeyboardLayoutDef {
  id: string;
  name: string;
  labelOverrides: Record<string, string>;
  charMap: KeyboardCharMap;
}

export const US_LAYOUT: KeyboardLayoutDef = {
  id: 'us',
  name: 'US',
  labelOverrides: {},
  charMap: {
    'grave_accent_and_tilde': { default: '`', shift: '~' },
    '1': { default: '1', shift: '!' },
    '2': { default: '2', shift: '@' },
    '3': { default: '3', shift: '#' },
    '4': { default: '4', shift: '$' },
    '5': { default: '5', shift: '%' },
    '6': { default: '6', shift: '^' },
    '7': { default: '7', shift: '&' },
    '8': { default: '8', shift: '*' },
    '9': { default: '9', shift: '(' },
    '0': { default: '0', shift: ')' },
    'hyphen': { default: '-', shift: '_' },
    'equal_sign': { default: '=', shift: '+' },
    'q': { default: 'q', shift: 'Q' },
    'w': { default: 'w', shift: 'W' },
    'e': { default: 'e', shift: 'E' },
    'r': { default: 'r', shift: 'R' },
    't': { default: 't', shift: 'T' },
    'y': { default: 'y', shift: 'Y' },
    'u': { default: 'u', shift: 'U' },
    'i': { default: 'i', shift: 'I' },
    'o': { default: 'o', shift: 'O' },
    'p': { default: 'p', shift: 'P' },
    'open_bracket': { default: '[', shift: '{' },
    'close_bracket': { default: ']', shift: '}' },
    'backslash': { default: '\\', shift: '|' },
    'a': { default: 'a', shift: 'A' },
    's': { default: 's', shift: 'S' },
    'd': { default: 'd', shift: 'D' },
    'f': { default: 'f', shift: 'F' },
    'g': { default: 'g', shift: 'G' },
    'h': { default: 'h', shift: 'H' },
    'j': { default: 'j', shift: 'J' },
    'k': { default: 'k', shift: 'K' },
    'l': { default: 'l', shift: 'L' },
    'semicolon': { default: ';', shift: ':' },
    'quote': { default: "'", shift: '"' },
    'z': { default: 'z', shift: 'Z' },
    'x': { default: 'x', shift: 'X' },
    'c': { default: 'c', shift: 'C' },
    'v': { default: 'v', shift: 'V' },
    'b': { default: 'b', shift: 'B' },
    'n': { default: 'n', shift: 'N' },
    'm': { default: 'm', shift: 'M' },
    'comma': { default: ',', shift: '<' },
    'period': { default: '.', shift: '>' },
    'slash': { default: '/', shift: '?' },
  },
};

export const GERMAN_LAYOUT: KeyboardLayoutDef = {
  id: 'de',
  name: 'German (QWERTZ)',
  labelOverrides: {
    'y': 'Z',
    'z': 'Y',
    '-': 'ß',
    '=': '´',
    '[': 'ü',
    ']': '+',
    '\\': '#',
    ';': 'ö',
    "'": 'ä',
  },
  charMap: {
    'grave_accent_and_tilde': { default: '^', shift: '°' },
    '1': { default: '1', shift: '!' },
    '2': { default: '2', shift: '"' },
    '3': { default: '3', shift: '§' },
    '4': { default: '4', shift: '$' },
    '5': { default: '5', shift: '%' },
    '6': { default: '6', shift: '&' },
    '7': { default: '7', shift: '/' },
    '8': { default: '8', shift: '(' },
    '9': { default: '9', shift: ')' },
    '0': { default: '0', shift: '=' },
    'hyphen': { default: 'ß', shift: '?' },
    'equal_sign': { default: '´', shift: '`' },
    'q': { default: 'q', shift: 'Q' },
    'w': { default: 'w', shift: 'W' },
    'e': { default: 'e', shift: 'E' },
    'r': { default: 'r', shift: 'R' },
    't': { default: 't', shift: 'T' },
    'z': { default: 'z', shift: 'Z' },
    'u': { default: 'u', shift: 'U' },
    'i': { default: 'i', shift: 'I' },
    'o': { default: 'o', shift: 'O' },
    'p': { default: 'p', shift: 'P' },
    'open_bracket': { default: 'ü', shift: 'Ü' },
    'close_bracket': { default: '+', shift: '*' },
    'backslash': { default: '#', shift: "'" },
    'a': { default: 'a', shift: 'A' },
    's': { default: 's', shift: 'S' },
    'd': { default: 'd', shift: 'D' },
    'f': { default: 'f', shift: 'F' },
    'g': { default: 'g', shift: 'G' },
    'h': { default: 'h', shift: 'H' },
    'j': { default: 'j', shift: 'J' },
    'k': { default: 'k', shift: 'K' },
    'l': { default: 'l', shift: 'L' },
    'semicolon': { default: 'ö', shift: 'Ö' },
    'quote': { default: 'ä', shift: 'Ä' },
    'y': { default: 'y', shift: 'Y' },
    'x': { default: 'x', shift: 'X' },
    'c': { default: 'c', shift: 'C' },
    'v': { default: 'v', shift: 'V' },
    'b': { default: 'b', shift: 'B' },
    'n': { default: 'n', shift: 'N' },
    'm': { default: 'm', shift: 'M' },
    'comma': { default: ',', shift: ';' },
    'period': { default: '.', shift: ':' },
    'slash': { default: '-', shift: '_' },
  },
};

export const COLEMAK_LAYOUT: KeyboardLayoutDef = {
  id: 'colemak',
  name: 'Colemak (DH)',
  labelOverrides: {
    'e': 'F',
    'r': 'P',
    't': 'G',
    'y': 'J',
    'u': 'L',
    'i': 'U',
    'o': 'Y',
    'p': ';',
    '[': '[',
    ']': ']',
    's': 'R',
    'd': 'S',
    'f': 'T',
    'g': 'D',
    'j': 'N',
    'k': 'E',
    'l': 'I',
    ';': 'O',
    "'": "'",
  },
  charMap: {
    'grave_accent_and_tilde': { default: '`', shift: '~' },
    '1': { default: '1', shift: '!' },
    '2': { default: '2', shift: '@' },
    '3': { default: '3', shift: '#' },
    '4': { default: '4', shift: '$' },
    '5': { default: '5', shift: '%' },
    '6': { default: '6', shift: '^' },
    '7': { default: '7', shift: '&' },
    '8': { default: '8', shift: '*' },
    '9': { default: '9', shift: '(' },
    '0': { default: '0', shift: ')' },
    'hyphen': { default: '-', shift: '_' },
    'equal_sign': { default: '=', shift: '+' },
    'q': { default: 'q', shift: 'Q' },
    'w': { default: 'w', shift: 'W' },
    'e': { default: 'f', shift: 'F' },
    'r': { default: 'p', shift: 'P' },
    't': { default: 'g', shift: 'G' },
    'y': { default: 'j', shift: 'J' },
    'u': { default: 'l', shift: 'L' },
    'i': { default: 'u', shift: 'U' },
    'o': { default: 'y', shift: 'Y' },
    'p': { default: ';', shift: ':' },
    'open_bracket': { default: '[', shift: '{' },
    'close_bracket': { default: ']', shift: '}' },
    'backslash': { default: '\\', shift: '|' },
    'a': { default: 'a', shift: 'A' },
    's': { default: 'r', shift: 'R' },
    'd': { default: 's', shift: 'S' },
    'f': { default: 't', shift: 'T' },
    'g': { default: 'd', shift: 'D' },
    'h': { default: 'h', shift: 'H' },
    'j': { default: 'n', shift: 'N' },
    'k': { default: 'e', shift: 'E' },
    'l': { default: 'i', shift: 'I' },
    'semicolon': { default: 'o', shift: 'O' },
    'quote': { default: "'", shift: '"' },
    'z': { default: 'z', shift: 'Z' },
    'x': { default: 'x', shift: 'X' },
    'c': { default: 'c', shift: 'C' },
    'v': { default: 'v', shift: 'V' },
    'b': { default: 'b', shift: 'B' },
    'n': { default: 'n', shift: 'N' },
    'm': { default: 'm', shift: 'M' },
    'comma': { default: ',', shift: '<' },
    'period': { default: '.', shift: '>' },
    'slash': { default: '/', shift: '?' },
  },
};

export const UK_LAYOUT: KeyboardLayoutDef = {
  id: 'uk',
  name: 'UK',
  labelOverrides: {},
  charMap: {
    'grave_accent_and_tilde': { default: '`', shift: '¬' },
    '1': { default: '1', shift: '!' },
    '2': { default: '2', shift: '"' },
    '3': { default: '3', shift: '£' },
    '4': { default: '4', shift: '$' },
    '5': { default: '5', shift: '%' },
    '6': { default: '6', shift: '^' },
    '7': { default: '7', shift: '&' },
    '8': { default: '8', shift: '*' },
    '9': { default: '9', shift: '(' },
    '0': { default: '0', shift: ')' },
    'hyphen': { default: '-', shift: '_' },
    'equal_sign': { default: '=', shift: '+' },
    'q': { default: 'q', shift: 'Q' },
    'w': { default: 'w', shift: 'W' },
    'e': { default: 'e', shift: 'E' },
    'r': { default: 'r', shift: 'R' },
    't': { default: 't', shift: 'T' },
    'y': { default: 'y', shift: 'Y' },
    'u': { default: 'u', shift: 'U' },
    'i': { default: 'i', shift: 'I' },
    'o': { default: 'o', shift: 'O' },
    'p': { default: 'p', shift: 'P' },
    'open_bracket': { default: '[', shift: '{' },
    'close_bracket': { default: ']', shift: '}' },
    'backslash': { default: '\\', shift: '|' },
    'a': { default: 'a', shift: 'A' },
    's': { default: 's', shift: 'S' },
    'd': { default: 'd', shift: 'D' },
    'f': { default: 'f', shift: 'F' },
    'g': { default: 'g', shift: 'G' },
    'h': { default: 'h', shift: 'H' },
    'j': { default: 'j', shift: 'J' },
    'k': { default: 'k', shift: 'K' },
    'l': { default: 'l', shift: 'L' },
    'semicolon': { default: ';', shift: ':' },
    'quote': { default: "'", shift: '@' },
    'z': { default: 'z', shift: 'Z' },
    'x': { default: 'x', shift: 'X' },
    'c': { default: 'c', shift: 'C' },
    'v': { default: 'v', shift: 'V' },
    'b': { default: 'b', shift: 'B' },
    'n': { default: 'n', shift: 'N' },
    'm': { default: 'm', shift: 'M' },
    'comma': { default: ',', shift: '<' },
    'period': { default: '.', shift: '>' },
    'slash': { default: '/', shift: '?' },
    'non_us_pound': { default: '#', shift: '~' },
  },
};

export const LAYOUT_DEFINITIONS: KeyboardLayoutDef[] = [
  US_LAYOUT,
  GERMAN_LAYOUT,
  COLEMAK_LAYOUT,
  UK_LAYOUT,
];

export function getLayout(id: string): KeyboardLayoutDef {
  return LAYOUT_DEFINITIONS.find(l => l.id === id) || US_LAYOUT;
}

export function getCharForKey(keyCode: string, modifiers: string[], layoutId?: string): string | null {
  const layout = getLayout(layoutId || 'us');
  const entry = layout.charMap[keyCode];
  if (!entry) return null;
  const modNames = modifiers.map(m => m.replace(/^(left|right)_/, ''));
  if (modNames.includes('shift') && entry.shift) return entry.shift;
  return entry.default;
}

export const US_KEYBOARD_MAP = US_LAYOUT.charMap;

const US_CHAR_TO_KEY: Record<string, { keyCode: string; modifiers: string[] }> = {};
for (const [keyCode, entry] of Object.entries(US_LAYOUT.charMap)) {
  if (!US_CHAR_TO_KEY[entry.default]) {
    US_CHAR_TO_KEY[entry.default] = { keyCode, modifiers: [] };
  }
  if (entry.shift && !US_CHAR_TO_KEY[entry.shift]) {
    US_CHAR_TO_KEY[entry.shift] = { keyCode, modifiers: ['shift'] };
  }
}

export function getKeyForChar(char: string, layoutId?: string): { keyCode: string; modifiers: string[] } | null {
  if (!layoutId || layoutId === 'us') return US_CHAR_TO_KEY[char] || null;
  const layout = getLayout(layoutId);
  for (const [keyCode, entry] of Object.entries(layout.charMap)) {
    if (entry.default === char) return { keyCode, modifiers: [] };
    if (entry.shift === char) return { keyCode, modifiers: ['shift'] };
  }
  return null;
}

export function getKeyLabel(keyId: string, layoutId?: string): string | null {
  if (!layoutId || layoutId === 'us') return null;
  const layout = getLayout(layoutId);
  return layout.labelOverrides[keyId] || null;
}
