import { IPeople } from 'swapi-ts/src/SWApi';

export type ServerResponse = {
  count: number;
  next: string;
  previous: null;
  results: IPeople[];
};

export enum ENDPOINTS {
  People = 'people',
  Planets = 'planets',
  Films = 'films',
  Species = 'species',
  Vehicles = 'vehicles',
  Starships = 'starships',
}
