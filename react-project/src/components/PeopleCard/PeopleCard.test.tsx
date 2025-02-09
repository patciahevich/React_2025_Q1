import { IPeople } from 'swapi-ts/src/SWApi';
import PeopleCard from './PeopleCard';
import { render, screen } from '@testing-library/react';

const mockData: IPeople = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: 'https://swapi.dev/api/planets/1/',
  films: [
    'https://swapi.dev/api/films/1/',
    'https://swapi.dev/api/films/2/',
    'https://swapi.dev/api/films/3/',
    'https://swapi.dev/api/films/6/',
  ],
  species: [],
  vehicles: [
    'https://swapi.dev/api/vehicles/14/',
    'https://swapi.dev/api/vehicles/30/',
  ],
  starships: [
    'https://swapi.dev/api/starships/12/',
    'https://swapi.dev/api/starships/22/',
  ],
  created: new Date('2014-12-09T13:50:51.644000Z'),
  edited: new Date('2014-12-20T21:17:56.891000Z'),
  url: 'https://swapi.dev/api/people/1/',
};

describe('Tests for the Card component: ', () => {
  it('Renders the relevant card data.', () => {
    render(<PeopleCard data={mockData} handleClick={() => {}} />);
    expect(screen.getByText(new RegExp(mockData.name))).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(mockData.birth_year))
    ).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockData.gender))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockData.height))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockData.mass))).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(mockData.hair_color))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(mockData.eye_color))
    ).toBeInTheDocument();
  });
});
