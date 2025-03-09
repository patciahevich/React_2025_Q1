import { Mock, vi } from 'vitest';
import { mockPlanetData as planet } from '../../utils/mockData';
import Details from './Details';
import { act, render, screen } from '@testing-library/react';
import { getPlanet } from '../../actions/getPlanet';
import React, { Suspense } from 'react';

vi.mock('../../actions/getPlanet', () => ({
  getPlanet: vi.fn(),
}));

describe('Tests for the Details component: ', () => {
  it.skip('Render the component', async () => {
    (getPlanet as Mock).mockResolvedValue(planet);

    await act(async () => {
      render(
        <Suspense>
          <Details character={'Luke Skywalker'} />
        </Suspense>
      );
    });

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
  it('Do not render the component if data is null', async () => {
    render(await Details({ character: null }));

    expect(screen.queryByText(new RegExp(planet.name))).toBeNull();
  });
});
