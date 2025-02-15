import useSelected from '../../hooks/useSelected';
import './Flyout.scss';

function Flyout() {
  const { selectedItems, resetAll } = useSelected();

  if (!selectedItems.length) return null;

  return (
    <div className="flyout">
      <button onClick={resetAll}>Unselect all</button>
      <p>{selectedItems.length}</p>
      <button>Download</button>
    </div>
  );
}

export default Flyout;
