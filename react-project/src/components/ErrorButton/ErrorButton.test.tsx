import { fireEvent, render, screen } from '@testing-library/react';
import ErrorButton from './ErrorButton';
import { Mock, vi } from 'vitest';
import React, { useState } from 'react';

vi.mock(import('react'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useState: vi.fn(),
  };
});

const mockSetThrowError = vi.fn();

beforeEach(() => {
  (useState as Mock).mockReturnValue([false, mockSetThrowError]);
});

describe('Tests for the ErrorButton component: ', () => {
  it('Render the Error Button', () => {
    render(<ErrorButton class={'error'} />);

    expect(screen.getByText(new RegExp('Throw Error'))).toBeInTheDocument();
  });

  it('Throw error by clicking on the button', () => {
    render(<ErrorButton class="error" />);

    const button = screen.getByText(new RegExp('Throw Error'));

    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    expect(mockSetThrowError).toHaveBeenCalledWith(true);
  });
});
