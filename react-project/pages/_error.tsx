import React from 'react';
import styles from '../styles/Error.module.scss';

function Error() {
  return (
    <div className={styles.fallback}>
      <div className={styles.image} />
      <h2> WELCOME TO THE DARK SIDE</h2>
      <h6>(please, try to reload the page)</h6>
    </div>
  );
}

export default Error;
