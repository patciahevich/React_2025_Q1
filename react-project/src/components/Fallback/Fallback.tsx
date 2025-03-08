import styles from './Fallback.module.scss';
import React from 'react';

function Fallback() {
  return (
    <div className={styles.fallback}>
      <div className={styles.image} />
      <h2> WELCOME TO THE DARK SIDE</h2>
      <h6>(please, try to reload the page)</h6>
    </div>
  );
}

export default Fallback;
