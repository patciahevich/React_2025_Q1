'use client';

import { IPeople } from 'swapi-ts/src/SWApi';
import styles from './PeopleCard.module.scss';
import useSelected from '../../hooks/useSelected';
import React from 'react';

type CardData = {
  data: IPeople;
  handleClick: () => void;
};

function PeopleCard({ data, handleClick }: CardData) {
  const { isSelected, toggleItem } = useSelected();

  function handleSelect(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();

    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON') {
      return;
    }

    toggleItem(data);
  }
  return (
    <div
      data-testid="card"
      className={
        isSelected(data) ? `${styles.card} ${styles.selected}` : styles.card
      }
      onClick={(e) => handleSelect(e)}
    >
      <div>
        <p>name: {data.name}</p>
        <p>birth year: {data.birth_year}</p>
        <p>gender: {data.gender}</p>
        <p>height: {data.height}</p>
        <p>mass: {data.mass}</p>
        <p>hair color: {data.hair_color}</p>
        <p>eye color: {data.eye_color}</p>
        <button className={styles.button} onClick={handleClick}>
          Planet Info
        </button>
      </div>
      <div className={styles.image} />
    </div>
  );
}

export default PeopleCard;
