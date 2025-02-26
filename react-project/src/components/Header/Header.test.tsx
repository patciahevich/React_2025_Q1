import { fireEvent, render, screen } from '@testing-library/react';
import Header from './Header';
import { ThemeProvider } from '../../context/ThemeContext/ThemeContext';
import { Mock, vi } from 'vitest';
import { useQueryParams } from '../../hooks/useQueryParams';
import React from 'react';

vi.mock('../../hooks/useQueryParams', () => ({
  useQueryParams: vi.fn(),
}));

vi.mock(import('../../hooks/useSearchFromLS'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    default: vi.fn().mockImplementation(() => ''),
  };
});

describe('Tests for the Header component: ', () => {
  it('Render the input', () => {
    (useQueryParams as Mock).mockReturnValue({
      setParams: vi.fn(),
      searchParams: null,
    });
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText(new RegExp('STAR WARS API'))).toBeInTheDocument();
  });
  it('Input updates on change', () => {
    (useQueryParams as Mock).mockReturnValue({
      setParams: vi.fn(),
      searchParams: null,
    });
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');

    fireEvent.change(input, { target: { value: 'Luke' } });
    expect(input).toHaveValue('Luke');
  });

  it('Change the query parameters by clicking the button', () => {
    const mockSetParams = vi.fn();
    (useQueryParams as Mock).mockReturnValue({
      setParams: mockSetParams,
      searchParams: null,
    });

    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Luke' } });
    expect(input).toHaveValue('Luke');

    const button = screen.getByText(new RegExp('Search'));
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockSetParams).toHaveBeenCalledWith({ page: '1', search: 'Luke' });
  });
});
