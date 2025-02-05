import { IPlanet } from 'swapi-ts/src/SWApi';

type PlanetProps = {
  data: IPlanet;
};

function Planet({ data }: PlanetProps) {
  return (
    <div className="planet">
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
