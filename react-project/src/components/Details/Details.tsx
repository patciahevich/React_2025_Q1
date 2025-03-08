import { getPlanet } from '../../actions/getPlanet';
import Planet from '../Planet/Planet';
import React from 'react';

async function Details({ character }: { character: string | null }) {
  if (!character) return null;

  const { planet: planetData } = await getPlanet(character);

  if (!planetData) return null;

  return <Planet data={planetData} />;
}

export default Details;
