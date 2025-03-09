import { Mock, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Planet from './Planet';
import { mockPlanetData } from '../../utils/mockData';
import { useQueryParams } from '../../hooks/useQueryParams';
import React from 'react';

vi.mock('../../hooks/useQueryParams', () => ({
  useQueryParams: vi.fn(),
}));

describe('Tests for the Planet component: ', () => {
  it('Should display name of the character', () => {
    const mockSearchParams = {
      get: vi.fn().mockReturnValue('Luke Skywalker'),
    };

    (useQueryParams as Mock).mockReturnValue({
      searchParams: mockSearchParams,
      removeParam: vi.fn(),
    });

    render(<Planet data={mockPlanetData} />);

    expect(
      screen.getByText(new RegExp('The home planet for Luke Skywalker is :'))
    ).toBeInTheDocument();
  });

  it('Should not display name of the character', () => {
    (useQueryParams as Mock).mockReturnValue({
      searchParams: new URLSearchParams({}),
    });

    render(<Planet data={mockPlanetData} />);

    expect(
      screen.queryByText(new RegExp('The home planet for Luke Skywalker is :'))
    ).toBeNull();
  });
});
