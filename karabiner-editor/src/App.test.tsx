import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the keyboard editor', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { level: 2, name: /keyboard editor/i });
  expect(heading).toBeInTheDocument();
});
