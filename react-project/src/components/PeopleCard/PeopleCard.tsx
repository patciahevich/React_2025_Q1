'use client';

import { IPeople } from 'swapi-ts/src/SWApi';
import styles from './PeopleCard.module.scss';
import useSelected from '../../hooks/useSelected';
import React from 'react';
import { useQueryParams } from '../../hooks/useQueryParams';
import { SEARCH_PARAMS } from '../../utils/types';

type CardData = {
  data: IPeople;
};

function PeopleCard({ data }: CardData) {
  const { isSelected, toggleItem } = useSelected();

  const { setParam, removeParam } = useQueryParams();

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();

    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON') {
      return;
    }

    toggleItem(data);
    removeParam(SEARCH_PARAMS.Details);
  }
  return (
    <div
      data-testid="card"
      className={
        isSelected(data) ? `${styles.card} ${styles.selected}` : styles.card
      }
      key={data.created.toString()}
      onClick={(e) => handleClick(e)}
    >
      <div>
        <p>name: {data.name}</p>
        <p>birth year: {data.birth_year}</p>
        <p>gender: {data.gender}</p>
        <p>height: {data.height}</p>
        <p>mass: {data.mass}</p>
        <p>hair color: {data.hair_color}</p>
        <p>eye color: {data.eye_color}</p>
        <button
          className={styles.button}
          onClick={() => setParam(SEARCH_PARAMS.Details, data.name)}
        >
          Planet Info
        </button>
      </div>
      <div className={styles.image} />
    </div>
  );
}

export default PeopleCard;
