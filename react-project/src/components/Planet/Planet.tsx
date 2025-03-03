'use client';

import { IPlanet } from 'swapi-ts/src/SWApi';
import styles from './Planet.module.scss';
import { useQueryParams } from '../../hooks/useQueryParams';
import React from 'react';

type PlanetProps = {
  data: IPlanet;
};

function Planet({ data }: PlanetProps) {
  const { searchParams } = useQueryParams();
  const name = searchParams?.get('details');

  return (
    <div className={styles.planet}>
      {name ? (
        <p className={styles.clue}>The home planet for {name} is :</p>
      ) : null}
      <h2>Name: {data.name}</h2>
      <p>Rotation period: {data.rotation_period}</p>
      <p>Orbital period: {data.orbital_period}</p>
      <p>Diameter: {data.diameter}</p>
      <p>Climate: {data.climate}</p>
      <p>Gravity: {data.gravity}</p>
      <p>Terrain: {data.terrain}</p>
      <p>Population: {data.population}</p>
    </div>
  );
}

export default Planet;
