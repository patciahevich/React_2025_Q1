import useSelected from '../../hooks/useSelected';
import styles from './Flyout.module.scss';

function Flyout() {
  const { selectedItems, resetAll, downloadAll } = useSelected();

  if (!selectedItems.length) return null;

  return (
    <aside className={styles.flyout}>
      <button onClick={resetAll}>Unselect all</button>
      <p>{selectedItems.length}</p>
      <button onClick={downloadAll}>Download</button>
    </aside>
  );
}

export default Flyout;
