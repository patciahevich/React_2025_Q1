import { Mock, vi } from 'vitest';
import { useQueryParams } from '../../hooks/useQueryParams';
import { useGetPersonQuery, useGetPlanetQuery } from '../../api/swapiApi';
import { mockPeopleData, mockPlanetData as planet } from '../../utils/mockData';
import Details from './Details';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';

vi.mock('../../api/swapiApi', () => ({
  useGetPersonQuery: vi.fn(),
  useGetPlanetQuery: vi.fn(),
}));

vi.mock('../../hooks/useQueryParams', () => ({
  useQueryParams: vi.fn(),
}));

beforeEach(() => {
  (useQueryParams as Mock).mockReturnValue({
    searchParams: new URLSearchParams({ details: 'Luke Skywalker' }),
  });

  (useGetPersonQuery as Mock).mockReturnValue({
    data: mockPeopleData.results[0],
    isFetching: false,
    error: null,
  });
});

describe('Tests for the Details component: ', () => {
  it('Render the component', () => {
    (useGetPlanetQuery as Mock).mockReturnValue({
      data: planet,
      isFetching: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <Details />
      </BrowserRouter>
    );

    expect(screen.getByText(new RegExp(planet.name))).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(planet.rotation_period))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(planet.orbital_period))
    ).toBeInTheDocument();
    expect(screen.getByText(new RegExp(planet.diameter))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(planet.climate))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(planet.gravity))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(planet.terrain))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(planet.population))).toBeInTheDocument();
  });
  it('Do not render the component if data is null', () => {
    (useGetPlanetQuery as Mock).mockReturnValue({
      data: null,
      isFetching: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <Details />
      </BrowserRouter>
    );

    expect(screen.queryByText(new RegExp(planet.name))).toBeNull();
  });
  it('Should display the spinner if data is fetching', () => {
    (useGetPlanetQuery as Mock).mockReturnValue({
      data: null,
      isFetching: true,
      error: null,
    });

    render(
      <BrowserRouter>
        <Details />
      </BrowserRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
