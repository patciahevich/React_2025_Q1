import { BrowserRouter, useNavigate } from 'react-router';
import NotFound from './NotFoundPage';
import { fireEvent, render, screen } from '@testing-library/react';
import { Mock, vi } from 'vitest';

vi.mock(import('react-router'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('Tests for the Not Found page: ', () => {
  it('Render the page', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText(new RegExp('This page is not found')));
  });

  it('Go back by clicking the button', () => {
    const mockNavigate = vi.fn();
    (useNavigate as Mock).mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const button = screen.getByText(new RegExp('Go Back'));
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalled();
  });
});
