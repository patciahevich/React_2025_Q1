import { IPeople } from 'swapi-ts/src/SWApi';
import './PeopleCard.scss';
import { formatDate, getImage } from '../../utils/utils';

type CardData = {
  data: IPeople;
};

function PeopleCard(props: CardData) {
  return (
    <div className="card_wrapper">
      <div>
        <p>name: {props.data.name}</p>
        <p>birth year: {props.data.birth_year}</p>
        <p>gender: {props.data.gender}</p>
        <p>height: {props.data.height}</p>
        <p>mass: {props.data.mass}</p>
        <p>hair color: {props.data.hair_color}</p>
        <p>eye color: {props.data.eye_color}</p>
        <p>
          created:
          {formatDate(props.data.created)}
        </p>
        <p>
          edited:
          {formatDate(props.data.edited)}
        </p>
      </div>
      <div
        className="image"
        style={{ backgroundImage: `url(${getImage(props.data.url)})` }}
      />
    </div>
  );
}

export default PeopleCard;
