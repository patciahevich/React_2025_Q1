import { fireEvent, render, screen } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import NotFound from '../app/not-found';
import React from 'react';
import { useRouter } from 'next/navigation';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('Tests for the Not Found page: ', () => {
  it('Render the page', () => {
    render(<NotFound />);

    expect(screen.getByText(new RegExp('This page is not found')));
  });

  it('Go back by clicking the button', () => {
    const mockNavigate = vi.fn();

    (useRouter as Mock).mockReturnValue({
      push: mockNavigate,
    });

    render(<NotFound />);

    const button = screen.getByText(new RegExp('Go Home'));
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalled();
  });
});
