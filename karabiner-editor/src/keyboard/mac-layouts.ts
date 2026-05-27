export interface Key {
  id: string;
  label: string;
  type: 'key' | 'modifier' | 'function' | 'special';
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface KeyboardLayout {
  name: string;
  width: number;
  height: number;
  keys: Key[];
}

export const MAC_KEYBOARD_LAYOUT: KeyboardLayout = {
  name: 'Mac',
  width: 730,
  height: 300,
  keys: [
    // Row 1
    { id: 'esc', label: 'Esc', type: 'special', x: 10, y: 10, width: 60, height: 40 },
    { id: 'f1', label: 'F1', type: 'function', x: 80, y: 10, width: 40, height: 40 },
    { id: 'f2', label: 'F2', type: 'function', x: 130, y: 10, width: 40, height: 40 },
    { id: 'f3', label: 'F3', type: 'function', x: 180, y: 10, width: 40, height: 40 },
    { id: 'f4', label: 'F4', type: 'function', x: 230, y: 10, width: 40, height: 40 },
    { id: 'f5', label: 'F5', type: 'function', x: 280, y: 10, width: 40, height: 40 },
    { id: 'f6', label: 'F6', type: 'function', x: 330, y: 10, width: 40, height: 40 },
    { id: 'f7', label: 'F7', type: 'function', x: 380, y: 10, width: 40, height: 40 },
    { id: 'f8', label: 'F8', type: 'function', x: 430, y: 10, width: 40, height: 40 },
    { id: 'f9', label: 'F9', type: 'function', x: 480, y: 10, width: 40, height: 40 },
    { id: 'f10', label: 'F10', type: 'function', x: 530, y: 10, width: 40, height: 40 },
    { id: 'f11', label: 'F11', type: 'function', x: 580, y: 10, width: 40, height: 40 },
    { id: 'f12', label: 'F12', type: 'function', x: 630, y: 10, width: 40, height: 40 },
    { id: 'delete', label: '', type: 'special', x: 680, y: 10, width: 40, height: 40 },

    // Row 2
    { id: 'backtick', label: '`', type: 'key', x: 10, y: 60, width: 40, height: 40 },
    { id: '1', label: '1', type: 'key', x: 60, y: 60, width: 40, height: 40 },
    { id: '2', label: '2', type: 'key', x: 110, y: 60, width: 40, height: 40 },
    { id: '3', label: '3', type: 'key', x: 160, y: 60, width: 40, height: 40 },
    { id: '4', label: '4', type: 'key', x: 210, y: 60, width: 40, height: 40 },
    { id: '5', label: '5', type: 'key', x: 260, y: 60, width: 40, height: 40 },
    { id: '6', label: '6', type: 'key', x: 310, y: 60, width: 40, height: 40 },
    { id: '7', label: '7', type: 'key', x: 360, y: 60, width: 40, height: 40 },
    { id: '8', label: '8', type: 'key', x: 410, y: 60, width: 40, height: 40 },
    { id: '9', label: '9', type: 'key', x: 460, y: 60, width: 40, height: 40 },
    { id: '0', label: '0', type: 'key', x: 510, y: 60, width: 40, height: 40 },
    { id: '-', label: '-', type: 'key', x: 560, y: 60, width: 40, height: 40 },
    { id: '=', label: '=', type: 'key', x: 610, y: 60, width: 40, height: 40 },
    { id: 'backspace', label: '⌫', type: 'special', x: 660, y: 60, width: 60, height: 40 },

    // Row 3
    { id: 'tab', label: 'Tab', type: 'modifier', x: 10, y: 110, width: 60, height: 40 },
    { id: 'q', label: 'Q', type: 'key', x: 80, y: 110, width: 40, height: 40 },
    { id: 'w', label: 'W', type: 'key', x: 130, y: 110, width: 40, height: 40 },
    { id: 'e', label: 'E', type: 'key', x: 180, y: 110, width: 40, height: 40 },
    { id: 'r', label: 'R', type: 'key', x: 230, y: 110, width: 40, height: 40 },
    { id: 't', label: 'T', type: 'key', x: 280, y: 110, width: 40, height: 40 },
    { id: 'y', label: 'Y', type: 'key', x: 330, y: 110, width: 40, height: 40 },
    { id: 'u', label: 'U', type: 'key', x: 380, y: 110, width: 40, height: 40 },
    { id: 'i', label: 'I', type: 'key', x: 430, y: 110, width: 40, height: 40 },
    { id: 'o', label: 'O', type: 'key', x: 480, y: 110, width: 40, height: 40 },
    { id: 'p', label: 'P', type: 'key', x: 530, y: 110, width: 40, height: 40 },
    { id: '[', label: '[', type: 'key', x: 580, y: 110, width: 40, height: 40 },
    { id: ']', label: ']', type: 'key', x: 630, y: 110, width: 40, height: 40 },
    { id: '\\', label: '\\', type: 'key', x: 680, y: 110, width: 40, height: 40 },

    // Row 4
    { id: 'caps_lock', label: '⇪', type: 'modifier', x: 10, y: 160, width: 70, height: 40 },
    { id: 'a', label: 'A', type: 'key', x: 90, y: 160, width: 40, height: 40 },
    { id: 's', label: 'S', type: 'key', x: 140, y: 160, width: 40, height: 40 },
    { id: 'd', label: 'D', type: 'key', x: 190, y: 160, width: 40, height: 40 },
    { id: 'f', label: 'F', type: 'key', x: 240, y: 160, width: 40, height: 40 },
    { id: 'g', label: 'G', type: 'key', x: 290, y: 160, width: 40, height: 40 },
    { id: 'h', label: 'H', type: 'key', x: 340, y: 160, width: 40, height: 40 },
    { id: 'j', label: 'J', type: 'key', x: 390, y: 160, width: 40, height: 40 },
    { id: 'k', label: 'K', type: 'key', x: 440, y: 160, width: 40, height: 40 },
    { id: 'l', label: 'L', type: 'key', x: 490, y: 160, width: 40, height: 40 },
    { id: ';', label: ';', type: 'key', x: 540, y: 160, width: 40, height: 40 },
    { id: "'", label: "'", type: 'key', x: 590, y: 160, width: 40, height: 40 },
    { id: 'enter', label: '↵', type: 'special', x: 640, y: 160, width: 80, height: 40 },

    // Row 5
    { id: 'shift_left', label: '⇧', type: 'modifier', x: 10, y: 210, width: 90, height: 40 },
    { id: 'z', label: 'Z', type: 'key', x: 110, y: 210, width: 40, height: 40 },
    { id: 'x', label: 'X', type: 'key', x: 160, y: 210, width: 40, height: 40 },
    { id: 'c', label: 'C', type: 'key', x: 210, y: 210, width: 40, height: 40 },
    { id: 'v', label: 'V', type: 'key', x: 260, y: 210, width: 40, height: 40 },
    { id: 'b', label: 'B', type: 'key', x: 310, y: 210, width: 40, height: 40 },
    { id: 'n', label: 'N', type: 'key', x: 360, y: 210, width: 40, height: 40 },
    { id: 'm', label: 'M', type: 'key', x: 410, y: 210, width: 40, height: 40 },
    { id: ',', label: ',', type: 'key', x: 460, y: 210, width: 40, height: 40 },
    { id: '.', label: '.', type: 'key', x: 510, y: 210, width: 40, height: 40 },
    { id: '/', label: '/', type: 'key', x: 560, y: 210, width: 40, height: 40 },
    { id: 'shift_right', label: '⇧', type: 'modifier', x: 610, y: 210, width: 110, height: 40 },

    // Row 6
    { id: 'fn', label: 'fn', type: 'modifier', x: 10, y: 260, width: 40, height: 40 },
    { id: 'ctrl_left', label: '⌃', type: 'modifier', x: 60, y: 260, width: 40, height: 40 },
    { id: 'alt_left', label: '⌥', type: 'modifier', x: 110, y: 260, width: 40, height: 40 },
    { id: 'win_left', label: '⌘', type: 'modifier', x: 160, y: 260, width: 60, height: 40 },
    { id: 'space', label: '␣', type: 'special', x: 230, y: 260, width: 220, height: 40 },
    { id: 'win_right', label: '⌘', type: 'modifier', x: 460, y: 260, width: 60, height: 40 },
    { id: 'alt_right', label: '⌥', type: 'modifier', x: 530, y: 260, width: 40, height: 40 },

    // Arrow keys (replacing the rightmost Fn key)
    { id: 'left_arrow', label: '←', type: 'special', x: 580, y: 282, width: 40, height: 18 },
    { id: 'up_arrow', label: '↑', type: 'special', x: 630, y: 262, width: 40, height: 18 },
    { id: 'down_arrow', label: '↓', type: 'special', x: 630, y: 282, width: 40, height: 18 },
    { id: 'right_arrow', label: '→', type: 'special', x: 680, y: 282, width: 40, height: 18 },
  ]
};