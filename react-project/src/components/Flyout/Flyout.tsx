import useSelected from '../../hooks/useSelected';
import { useTheme } from '../../hooks/useTheme';
import './Flyout.scss';

function Flyout() {
  const { selectedItems, resetAll, downloadAll } = useSelected();
  const { theme } = useTheme();

  if (!selectedItems.length) return null;

  return (
    <aside className={`${theme} flyout`}>
      <button onClick={resetAll}>Unselect all</button>
      <p>{selectedItems.length}</p>
      <button onClick={downloadAll}>Download</button>
    </aside>
  );
}

export default Flyout;
