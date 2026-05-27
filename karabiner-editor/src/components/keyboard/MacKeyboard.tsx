import React from 'react';
import { MAC_KEYBOARD_LAYOUT, Key } from '../../keyboard/mac-layouts';

interface MacKeyboardProps {
  onKeyClick: (keyId: string) => void;
  selectedKey?: string;
}

const MacKeyboard: React.FC<MacKeyboardProps> = ({ onKeyClick, selectedKey }) => {
  const handleKeyClick = (keyId: string) => {
    onKeyClick(keyId);
  };

  return (
    <div className="keyboard-container">
      <div
        className="keyboard-layout"
        style={{ width: MAC_KEYBOARD_LAYOUT.width, height: MAC_KEYBOARD_LAYOUT.height }}
      >
        {MAC_KEYBOARD_LAYOUT.keys.map((key) => (
          <div
            key={key.id}
            className={`key ${key.type} ${selectedKey === key.id ? 'selected' : ''}`}
            style={{
              left: key.x,
              top: key.y,
              width: key.width,
              height: key.height,
            }}
            onClick={() => handleKeyClick(key.id)}
          >
            {key.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MacKeyboard;