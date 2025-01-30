import React from 'react';
import { IPeople } from 'swapi-ts/src/SWApi';
import './PeopleCard.scss';
import { formatDate, getImage } from '../../utils/utils';

type CardData = {
  data: IPeople;
};

class PeopleCard extends React.Component<CardData> {
  render() {
    return (
      <div className="card_wrapper">
        <div>
          <p>name: {this.props.data.name}</p>
          <p>birth year: {this.props.data.birth_year}</p>
          <p>gender: {this.props.data.gender}</p>
          <p>height: {this.props.data.height}</p>
          <p>mass: {this.props.data.mass}</p>
          <p>hair color: {this.props.data.hair_color}</p>
          <p>eye color: {this.props.data.eye_color}</p>
          <p>
            created:
            {formatDate(this.props.data.created)}
          </p>
          <p>
            edited:
            {formatDate(this.props.data.edited)}
          </p>
        </div>
        <div
          className="image"
          style={{ backgroundImage: `url(${getImage(this.props.data.url)})` }}
        />
      </div>
    );
  }
}

export default PeopleCard;
