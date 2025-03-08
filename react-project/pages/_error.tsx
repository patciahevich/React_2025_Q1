import React from 'react';
import styles from '../styles/Error.module.scss';

type ErrorProps = {
  statusCode: number;
};

function Error({ statusCode }: ErrorProps) {
  return (
    <div className={styles.fallback}>
      <div className={styles.image} />
      <h2> WELCOME TO THE DARK SIDE</h2>
      <h2>The error with status {statusCode}</h2>
      <h6>(please, try to reload the page)</h6>
    </div>
  );
}

Error.getInitialProps = function ({ res, err }) {
  const statusCode = res?.statusCode || err?.statusCode || 500;
  return { statusCode };
};

export default Error;
