import { Mock, vi } from 'vitest';
import useLocalStorage from '../../hooks/useLocalStorage';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeContext, ThemeProvider } from './ThemeContext';
import React, { useState } from 'react';

vi.mock(import('../../hooks/useLocalStorage'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    default: vi.fn(),
  };
});

vi.mock(import('react'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useState: vi.fn(),
  };
});

const mockSetValue = vi.fn();
const mockSetTheme = vi.fn();

const initialTheme = 'light';
describe('Tests for the Theme Context: ', () => {
  beforeEach(() => {
    (useLocalStorage as Mock).mockReturnValue([initialTheme, mockSetValue]);

    (useState as Mock).mockReturnValue([initialTheme, mockSetTheme]);
  });

  it('Should render the initial theme', () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {(props) => <div>{props?.theme}</div>}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    expect(screen.getByText('light')).toBeInTheDocument();
  });

  it('Should toggle theme', () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {(props) => (
            <>
              <div>{props?.theme}</div>
              <button onClick={props?.toggleTheme}>Toggle Theme</button>
            </>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    expect(screen.getByText(new RegExp('light'))).toBeInTheDocument();
    fireEvent.click(screen.getByText(new RegExp('Toggle Theme')));

    expect(mockSetTheme).toHaveBeenCalled();
  });
});
