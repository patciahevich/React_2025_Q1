import { useDispatch } from 'react-redux';

import {
  toggleSelectedItem,
  resetSelectedItems,
  downloadSelectedItems,
} from '../store/selectedSlice';
import { IPeople } from 'swapi-ts/src/SWApi';
import { useAppSelector } from '../store/hooks/useAppSelector';

function useSelected() {
  const dispatch = useDispatch();
  const selectedItems = useAppSelector((state) => state.selected.selectedItems);

  const toggleItem = (item: IPeople) => {
    dispatch(toggleSelectedItem(item));
  };

  const isSelected = (item: IPeople) =>
    selectedItems.some((people) => people.name === item.name);

  const resetAll = () => {
    dispatch(resetSelectedItems());
  };

  const downloadAll = () => {
    dispatch(downloadSelectedItems());
  };

  return { selectedItems, toggleItem, isSelected, resetAll, downloadAll };
}

export default useSelected;
