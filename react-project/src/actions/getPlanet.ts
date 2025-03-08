import { IPlanet } from 'swapi-ts/src/SWApi';
import { getPeople } from './getPeople';

export async function getPlanet(character: string) {
  try {
    const people = await getPeople(character);

    const url = people.results[0].homeworld as string;
    const planetRes = await fetch(url, {
      cache: 'force-cache',
      mode: 'no-cors',
    });
    const planet: IPlanet = await planetRes.json();

    return planet;
  } catch {
    throw new Error('Failed to fetch planet data');
  }
}
