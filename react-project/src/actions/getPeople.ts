import { ServerResponse } from '../utils/types';

export async function getPeople(search: string, page = '1') {
  try {
    const peopleRes = await fetch(
      `https://swapi.dev/api/people?search=${search}&page=${page}`,
      {
        cache: 'force-cache',
      }
    );
    const people: ServerResponse = await peopleRes.json();

    return people;
  } catch {
    throw new Error('Failed to fetch people data');
  }
}
