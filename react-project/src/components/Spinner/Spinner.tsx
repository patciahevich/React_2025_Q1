import styles from './Spinner.module.scss';

function Spinner() {
  return (
    <div data-testid="spinner" className={styles.spinnerWrapper}>
      <div className={styles.spinner} />
    </div>
  );
}

export default Spinner;
