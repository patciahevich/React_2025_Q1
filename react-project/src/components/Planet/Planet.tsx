import { IPlanet } from 'swapi-ts/src/SWApi';
import { SEARCH_PARAMS } from '../../utils/types';
import { useSearchParams } from 'react-router';
import './Planet.scss';

type PlanetProps = {
  data: IPlanet;
};

function Planet({ data }: PlanetProps) {
  const [searchParams] = useSearchParams();
  const name = searchParams.get(SEARCH_PARAMS.Details);
  return (
    <div className="planet">
      {name ? <p className="clue">The home planet for {name} is :</p> : null}
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
