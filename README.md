# Karabiner GUI

This is a React-based GUI for Karabiner Elements that allows users to visualize and configure keyboard layouts.

## Features

- Visual keyboard editor with ANSI and ISO layouts
- Interactive key selection by clicking on keys
- Key configuration panel that displays information about selected keys
- Responsive design that works on different screen sizes
- Switch between ANSI and ISO keyboard layouts

## Implementation Details

### Key Features Added

1. **Interactive Key Selection**: Users can now click on any key in the keyboard layout to select it
2. **Configuration Panel**: When a key is selected, detailed information about that key is displayed in the configuration panel
3. **Visual Feedback**: Selected keys are highlighted with a different color
4. **Responsive Design**: The interface adapts to different screen sizes

### Files Modified

- `src/keyboard/KeyboardEditor.tsx`: Main component with key selection functionality
- `src/keyboard/KeyConfigPanel.tsx`: Panel that displays key information
- `src/keyboard/keyboard.css`: Styling for the keyboard components
- `src/App.tsx`: Updated to use the KeyboardEditor component

### How to Use

1. Run the application using `npm start`
2. The keyboard layout will be displayed
3. Click on any key to select it
4. The key configuration panel will show details about the selected key
5. Click "Configure Key" to open the key configuration interface (placeholder functionality)

### Keyboard Layouts

The application currently supports:
- ANSI layout (standard US keyboard)
- ISO layout (European keyboard)

### Future Enhancements

- Full key configuration interface
- Save/load keyboard configurations
- Support for additional keyboard layouts
- Custom key mapping functionality