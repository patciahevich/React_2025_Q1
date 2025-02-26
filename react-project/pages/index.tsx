import React from 'react';
import styles from '../styles/Home.module.scss';
import Flyout from '../src/components/Flyout/Flyout';
import ErrorButton from '../src/components/ErrorButton/ErrorButton';
import Header from '../src/components/Header/Header';
import Main from '../src/components/Main/Main';

function Home() {
  return (
    <div className={styles.homePage}>
      <ErrorButton class={styles.error} />
      <Flyout />
      <Header />
      <Main />
    </div>
  );
}

export default Home;
