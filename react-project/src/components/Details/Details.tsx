import { getPlanet } from '../../actions/getPlanet';
import Planet from '../Planet/Planet';
import React from 'react';

async function Details({ character }: { character: string | null }) {
  if (!character) return null;

  const planet = await getPlanet(character);

  if (!planet) return null;

  return <Planet data={planet} />;
}

export default Details;
