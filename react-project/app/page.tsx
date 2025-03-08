import React, { Suspense } from 'react';
import styles from '../styles/Home.module.scss';
import Flyout from '../src/components/Flyout/Flyout';
import ErrorButton from '../src/components/ErrorButton/ErrorButton';
import Header from '../src/components/Header/Header';
import Main from '../src/components/Main/Main';
import { QueryParams } from '../src/utils/types';
import Spinner from '../src/components/Spinner/Spinner';

async function Home({ searchParams }: { searchParams?: Promise<QueryParams> }) {
  const params = await searchParams;
  const search = params?.search || '';
  const page = params?.page || '1';
  const details = params?.details || null;

  return (
    <div className={`${styles.homePage}`}>
      <ErrorButton class={styles.error} />
      <Flyout />
      <Header />
      <Suspense fallback={<Spinner />}>
        <Main search={search} page={page} details={details} />
      </Suspense>
    </div>
  );
}

export default Home;
