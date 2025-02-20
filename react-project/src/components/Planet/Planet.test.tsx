import { Mock, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Planet from './Planet';
import { mockPlanetData } from '../../utils/mockData';
import { useQueryParams } from '../../hooks/useQueryParams';
import { BrowserRouter } from 'react-router';

vi.mock('../../hooks/useQueryParams', () => ({
  useQueryParams: vi.fn(),
}));

describe('Tests for the Planet component: ', () => {
  it('Should display name of the character', () => {
    (useQueryParams as Mock).mockReturnValue({
      searchParams: new URLSearchParams({ details: 'Luke Skywalker' }),
    });

    render(
      <BrowserRouter>
        <Planet data={mockPlanetData} />
      </BrowserRouter>
    );

    expect(
      screen.getByText(new RegExp('The home planet for Luke Skywalker is :'))
    ).toBeInTheDocument();
  });

  it('Should not display name of the character', () => {
    (useQueryParams as Mock).mockReturnValue({
      searchParams: new URLSearchParams({}),
    });

    render(
      <BrowserRouter>
        <Planet data={mockPlanetData} />
      </BrowserRouter>
    );

    expect(
      screen.queryByText(new RegExp('The home planet for Luke Skywalker is :'))
    ).toBeNull();
  });
});
