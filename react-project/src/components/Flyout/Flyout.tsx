import useSelected from '../../hooks/useSelected';
import './Flyout.scss';

function Flyout() {
  const { selectedItems, resetAll, downloadAll } = useSelected();

  if (!selectedItems.length) return null;

  return (
    <div className="flyout">
      <button onClick={resetAll}>Unselect all</button>
      <p>{selectedItems.length}</p>
      <button onClick={downloadAll}>Download</button>
    </div>
  );
}

export default Flyout;
