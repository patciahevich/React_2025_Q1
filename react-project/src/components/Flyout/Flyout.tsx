import useSelected from '../../hooks/useSelected';
import { useTheme } from '../../hooks/useTheme';
import './Flyout.scss';

function Flyout() {
  const { selectedItems, resetAll, downloadAll } = useSelected();
  const { theme } = useTheme();

  if (!selectedItems.length) return null;

  return (
    <div className={`${theme} flyout`}>
      <button onClick={resetAll}>Unselect all</button>
      <p>{selectedItems.length}</p>
      <button onClick={downloadAll}>Download</button>
    </div>
  );
}

export default Flyout;
