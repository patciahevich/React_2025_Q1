import { useRouter } from 'next/router';
import styles from '../styles/NotFound.module.scss';
import React from 'react';

function NotFound() {
  const router = useRouter();

  function goHome() {
    router.push('/');
  }
  return (
    <div className={styles.notFound}>
      <div className={styles.content}>
        <div className={styles.image} />
        <h1>This page is not found</h1>
        <button onClick={goHome}>Go Home</button>
      </div>
    </div>
  );
}

export default NotFound;
