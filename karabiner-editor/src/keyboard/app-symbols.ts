const APP_SYMBOLS: Record<string, string> = {
  'Safari': '🧭',
  'Obsidian': '◆',
  'Signal': '🔒',
  'Discord': '💬',
  'Steam': '🎮',
  'iTerm': '$|',
  'Tor Browser': '🌐',
  'Pages': '📝',
  'Karabiner-Elements': '🔧',
  'Anki': '★',
  'WhatsApp': '✉',
  'Visual Studio Code': ']▁[',
  'PyCharm': '🐍',
  'Terminal': '>_',
  'Podcasts': '🎙',
  'Music': '🎵',
  'Spotify': '🎧',
  'Arc': '🌐',
  'Figma': '🖌',
  'Fork': '⑂',
  'Bear': '🐻',
  'CleanMyMac X': '🧹',
  'Presentify': '🖥',
  'Warp': '⚡',
  'Files': '📁',
  'Notes': '📓',
  'Zeplin': '🎨',
  'Spark': '✉',
}

function abbreviate(name: string): string {
  return name.split(/[\s.-]+/).filter(Boolean).map(w => w[0].toUpperCase()).join('').slice(0, 3)
}

export function getAppSymbol(appPath: string): string {
  const name = appPath.split('/').pop()?.replace('.app', '') || ''
  return APP_SYMBOLS[name] || abbreviate(name)
}

export function getShellSymbol(command: string): string {
  const cmd = command.length > 12 ? command.slice(0, 11) + '…' : command
  return '>sh ' + cmd
}
