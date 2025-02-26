import styles from './Spinner.module.scss';
import React from 'react';

function Spinner() {
  return (
    <div data-testid="spinner" className={styles.spinnerWrapper}>
      <div className={styles.spinner} />
    </div>
  );
}

export default Spinner;
