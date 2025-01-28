import React from 'react';
import { IPeople } from 'swapi-ts/src/SWApi';
import './Card.scss';

type CardData = {
  data: IPeople;
  key: number;
};

class Card extends React.Component<CardData> {
  formatDate(date: string) {
    const formatDate = new Date(date);
    const year = formatDate.getFullYear();
    const month = formatDate.getMonth();
    const day = formatDate.getDate();

    return `${day}/${month}/${year}`;
  }

  getImage() {
    const url = this.props.data.url.split('/');
    const category = url[4];
    const index = url[5];
    return `https://starwars-visualguide.com/assets/img/${category === 'people' ? 'characters' : category}/${index}.jpg`;
  }
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
            {this.formatDate(this.props.data.created as unknown as string)}
          </p>
          <p>
            edited:
            {this.formatDate(this.props.data.edited as unknown as string)}
          </p>
        </div>
        <div
          className="image"
          style={{ backgroundImage: `url(${this.getImage()})` }}
        />
      </div>
    );
  }
}

export default Card;
