import styles from './Main.module.scss';
import { QueryParams } from '../../utils/types';
import PeopleCard from '../PeopleCard/PeopleCard';
import Empty from '../Empty/Empty';
import Details from '../Details/Details';
import React, { Suspense } from 'react';
import { getPeople } from '../../actions/getPeople';
import Pagination from '../Pagination/Pagination';
import Spinner from '../Spinner/Spinner';

async function Main({ search, page, details }: QueryParams) {
  const data = await getPeople(search, page);

  if (!data) return <Empty text="Something went wrong!" imageName="error" />;

  return !data.results.length ? (
    <Empty text="Nothing was found." imageName="nothing" />
  ) : (
    <>
      <main className={styles.main}>
        <section data-testid="main" className={styles.cards}>
          {data.results.map((person) => (
            <PeopleCard data={person} key={person.created.toString()} />
          ))}
        </section>

        <article
          className={`${styles.details} ${details ? styles.active : ''}`}
        >
          {details ? (
            <Suspense fallback={<Spinner />}>
              <Details character={details} />
            </Suspense>
          ) : null}
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
