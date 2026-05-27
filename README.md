# Karabiner GUI

**Visual keyboard editor for Karabiner-Elements.** A React app to create, edit, and manage complex modifications through an interactive SVG keyboard — no JSON editing by hand.

---

## Features

- **Interactive SVG keyboard** — click or navigate any key to configure its remap
- **Layer system** — 10 layers (Main, Ctrl, Opt, Cmd, Shift, Hyper, 1–4) with hold/simple/delayed activation via Q/W
- **Multiple action types** — key code remaps, app launchers, shell scripts
- **Keyboard layouts** — US, German QWERTZ, Colemak DH, UK; layout-aware character maps for visual mode
- **Smart key aliases** — type `opt`, `cmd`, `space`, `esc` and it resolves to the correct key code
- **Split modifier support** — toggle between short (shift/ctrl/opt/cmd) and full (left_shift/right_shift etc.) modifier names
- **Visual & Direct modes** — Visual mode shows the output character; Direct mode shows the key code
- **Theme system** — Light, Dark, and Obsidian presets with customizable accent/bg/card colors
- **Full keyboard navigation** — arrow keys navigate the grid, Space enters editing, Tab cycles through config controls, global shortcuts for export/import/save/settings
- **Round-trip JSON** — export to a Karabiner-compatible file, import existing configurations
- **Direct Karabiner integration** — save/load from `~/.config/karabiner/karabiner.json` via Express server (preserves existing settings)

---

## Quick Start

```bash
cd karabiner-editor
npm install
npm run dev
```

This starts two servers concurrently:
- **React dev server** on `http://localhost:3003`
- **Express config server** on `http://localhost:3001`

Open `http://localhost:3003` in a browser.

---

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `← ↑ → ↓` | Navigate between SVG keys |
| `Space` | Select focused key / enter editing mode |
| `Esc` | Close config panel (back to movement mode) |
| `Esc` (again) | Clear focus entirely |
| `Shift+↑ / Shift+↓` | Switch to previous / next layer |
| `Tab` | Cycle through config panel controls |
| `⌘S / Ctrl+S` | Export configuration to JSON file |
| `⌘⇧S / Ctrl+Shift+S` | Save to Karabiner (`karabiner.json`) |
| `⌘I / Ctrl+I` | Import configuration from JSON file |
| `⌘, / ⌘K` or `Ctrl+, / Ctrl+K` | Toggle settings panel |

### Config panel controls (when a key is selected)

| Control | Action |
|---|---|
| Action type dropdown | Switch between Key Code / Open App / Shell Script |
| Text input | Enter key code, app path, or shell command |
| Modifier buttons | `← →` arrows cycle between buttons; `Tab` skips the group |
| Passthrough checkbox | Toggle "any modifier passthrough" |
| Layer switch dropdown | Assign a layer to this key (hold/simple/delayed) |

---

## Usage

### Navigating the keyboard

Use arrow keys or click on a key. A dashed outline shows which key has keyboard focus. Press **Space** to enter editing mode for that key.

### Editing a remap

1. Select a key (click or Space)
2. Choose the action type: **Key Code**, **Open App**, or **Shell Script**
3. For Key Code — type the karabiner key code (`escape`, `spacebar`, `a`...) or use an alias (`esc`, `space`, `opt`, `cmd`)
4. Add output modifiers by clicking the modifier buttons
5. Toggle passthrough for "any" modifiers if needed

### Layers

Layers let you assign multiple actions to the same physical key. The base layer shows the key's label; remaps on other layers display the target key code or action symbol.

Layer switches on the base layer (Q/W) activate higher layers via hold, simple toggle, or delayed-hold modes.

### Themes

Open Settings (gear icon or `⌘,`) to:
- Choose Light, Dark, or Obsidian preset
- Customize accent, background, and card colors with color pickers
- Reset all custom color overrides

### Export & Save

- **Export** (`⌘S`) — saves a Karabiner-compatible JSON file with only `complex_modifications`
- **Save to Karabiner** (`⌘⇧S`) — merges your modifications into `~/.config/karabiner/karabiner.json`, preserving all existing settings

### Visual vs Direct mode

- **Direct** — shows the raw key code and modifier symbols
- **Visual** — shows the output character (layout-aware via character maps)

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                React App (port 3003)             │
│                                                   │
│  App.tsx                                          │
│   ├── Theme management (CSS vars, presets)        │
│   ├── ParametersPanel (settings modal)            │
│   └── KeyboardEditor                              │
│        ├── LayerSidebar (layer navigation)        │
│        ├── SVG keyboard (interactive keys)        │
│        ├── KeyConfigPanel (remap editor)          │
│        └── Toolbar (export/import/save actions)    │
└───────────────────┬─────────────────────────────┘
                    │ HTTP (localhost:3001)
┌───────────────────▼─────────────────────────────┐
│           Express Server (port 3001)             │
│                                                   │
│  GET  /api/config  → reads karabiner.json         │
│  POST /api/config  → merges + writes karabiner.json│
└─────────────────────────────────────────────────┘
```

Key design decisions:

- **No CRA proxy** — server adds CORS headers for `localhost:3003`; client fetches directly
- **Save always merges** — only replaces `complex_modifications`, preserves `virtual_hid_keyboard`, `devices`, `simple_modifications`, etc.
- **Empty keyCode stays in state** — prevents re-populate cycle on re-selection; filtered during export
- **Roving tabIndex** on SVG keys — only the focused/selected key is Tab-reachable; arrow keys handle grid movement

---

## Project Structure

```
karabiner-editor/
├── server/
│   └── index.js              Express server — reads/writes karabiner.json
├── src/
│   ├── keyboard/
│   │   ├── KeyboardEditor.tsx     Main editor component, keyboard nav, global shortcuts
│   │   ├── KeyConfigPanel.tsx     Remap editor panel (modifiers, action type, inputs)
│   │   ├── LayerSidebar.tsx       Layer selection sidebar
│   │   ├── ParametersPanel.tsx    Settings modal (themes, layout, split modifiers)
│   │   ├── karabiner-utils.ts     Karabiner JSON generation, parsing, validation, aliases
│   │   ├── layer-utils.ts         Layer definitions, config types, conversion helpers
│   │   ├── keyboard-layouts.ts    Layout definitions + char maps (US, German, Colemak, UK)
│   │   ├── keyboard-navigation.ts SVG key grid nav — builds adjacency grid for arrow keys
│   │   ├── app-symbols.ts         Display symbols for app and shell action types
│   │   ├── mac-layouts.ts         SVG key positions and dimensions
│   │   ├── us-keyboard-map.ts     Re-exports from keyboard-layouts.ts
│   │   └── keyboard.css           All keyboard/SVG/config-panel/toolbar styles
│   ├── App.tsx                    Root — theme management, applyTheme
│   ├── App.css                    App-level layout
│   ├── themes.css                 CSS custom properties for Light/Dark/Obsidian
│   ├── index.css                  Global styles, imports themes.css
│   ├── App.test.tsx               App rendering test
│   └── karabiner-roundtrip.test.tsx  Round-trip export validation test
└── package.json                   Scripts: start (port 3003), server (port 3001), dev (both)
```

---

## Dependencies

- **React 19** — UI framework
- **TypeScript** — type safety
- **Express 5** — config server (reads/writes `karabiner.json`)
- **react-scripts** — build tooling (Create React App)
- **concurrently** — runs React dev server + Express server in parallel

---

## Configuration

### Server

The Express server runs on `port 3001` and CORS-whitelists `http://localhost:3003`. It reads/writes `~/.config/karabiner/karabiner.json`. On POST, it merges the incoming `complex_modifications` into the existing file, preserving all other profiles and settings.

### Karabiner-Elements

This editor creates `complex_modifications` rules with `manipulators` array entries. Each rule is a single-manipulator object keyed by the editor-generated UUID. The exported JSON is a standard Karabiner `complex_modifications` payload — import it manually via Karabiner-Elements Preferences, or use **Save to Karabiner** to write directly to `karabiner.json`.

---

## License

MIT
