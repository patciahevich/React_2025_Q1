import React from 'react';
import styles from '../styles/Home.module.scss';
import Flyout from '../src/components/Flyout/Flyout';
import ErrorButton from '../src/components/ErrorButton/ErrorButton';
import Header from '../src/components/Header/Header';
import Main from '../src/components/Main/Main';
import { useTheme } from '../src/hooks/useTheme';

function Home() {
  const { theme } = useTheme();

  return (
    <div className={`${styles.homePage} ${styles[theme]}`}>
      <ErrorButton class={styles.error} />
      <Flyout />
      <Header />
      <Main />
    </div>
  );
}

export default Home;
