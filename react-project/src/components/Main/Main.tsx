'use client';

import styles from './Main.module.scss';
import { SEARCH_PARAMS } from '../../utils/types';
import PeopleCard from '../PeopleCard/PeopleCard';
import Empty from '../Empty/Empty';
import Details from '../Details/Details';
import { useQueryParams } from '../../hooks/useQueryParams';
import { useGetPeopleQuery } from '../../api/swapiApi';
import Spinner from '../Spinner/Spinner';
import Pagination from '../Pagination/Pagination';
import React from 'react';

function Main() {
  const { searchParams, setParam, removeParam } = useQueryParams();
  const page = searchParams?.get('page') ?? 1;
  const search: string = searchParams?.get('search') ?? '';
  const details = searchParams?.get('details');

  const { data, error, isFetching } = useGetPeopleQuery({
    page: page.toString(),
    search,
  });

  function addDetails(name: string) {
    setParam(SEARCH_PARAMS.Details, name);
  }

  function resetDetails() {
    removeParam(SEARCH_PARAMS.Details);
  }

  function handleClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    const target = e.target as HTMLElement;
    if (target.tagName !== 'BUTTON') {
      resetDetails();
    }
  }

  if (isFetching) return <Spinner />;
  if (error || !data)
    return <Empty text="Something went wrong!" imageName="error" />;

  return !data.results.length ? (
    <Empty text="Nothing was found." imageName="nothing" />
  ) : (
    <>
      <main className={styles.main}>
        <section
          data-testid="main"
          className={styles.cards}
          onClick={(e) => handleClick(e)}
        >
          {data.results.map((person) => (
            <PeopleCard
              data={person}
              key={person.created.toString()}
              handleClick={() => addDetails(person.name)}
            />
          ))}
        </section>

        <article
          className={`${styles.details} ${details ? styles.active : ''}`}
        >
          {details ? <Details /> : null}

          <button onClick={resetDetails}>Close</button>
        </article>
      </main>
      <Pagination
        prevPage={data.previous ?? null}
        nextPage={data.next ?? null}
      />
    </>
  );
}

export default Main;
