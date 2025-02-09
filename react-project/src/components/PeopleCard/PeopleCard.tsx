import { IPeople } from 'swapi-ts/src/SWApi';
import './PeopleCard.scss';
import { getImage } from '../../utils/utils';

type CardData = {
  data: IPeople;
  handleClick: () => void;
};

function PeopleCard({ data, handleClick }: CardData) {
  return (
    <div className="card_wrapper">
      <div>
        <p>name: {data.name}</p>
        <p>birth year: {data.birth_year}</p>
        <p>gender: {data.gender}</p>
        <p>height: {data.height}</p>
        <p>mass: {data.mass}</p>
        <p>hair color: {data.hair_color}</p>
        <p>eye color: {data.eye_color}</p>
        <button className="button" onClick={handleClick}>
          Planet Info
        </button>
      </div>
      <div
        className="image"
        style={{ backgroundImage: `url(${getImage(data.url)})` }}
      />
    </div>
  );
}

export default PeopleCard;
