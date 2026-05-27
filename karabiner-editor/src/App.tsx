import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import KeyboardEditor from './keyboard/KeyboardEditor';

export interface ThemeConfig {
  preset: 'light' | 'dark' | 'obsidian';
  customOverrides: Record<string, string>;
}

const STORAGE_KEY = 'karabiner-editor-theme';

function loadTheme(): ThemeConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch { /* ignore */ }
  return { preset: 'light', customOverrides: {} };
}

function saveTheme(t: ThemeConfig) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(t));
  } catch { /* ignore */ }
}

function applyTheme(t: ThemeConfig) {
  document.documentElement.setAttribute('data-theme', t.preset);
  const root = document.documentElement;
  const knownVars = ['--accent', '--bg-app', '--bg-card'];
  knownVars.forEach(v => root.style.removeProperty(v));
  for (const [key, val] of Object.entries(t.customOverrides)) {
    root.style.setProperty(key, val);
  }
}

function App() {
  const [theme, setThemeState] = useState<ThemeConfig>(loadTheme);

  useEffect(() => {
    applyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  const updateTheme = useCallback((partial: Partial<ThemeConfig>) => {
    setThemeState(prev => ({ ...prev, ...partial }));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <KeyboardEditor theme={theme} onThemeChange={updateTheme} />
      </header>
    </div>
  );
}

export default App;
