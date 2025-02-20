import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPeople } from 'swapi-ts/src/SWApi';
import { convertToCSV } from '../utils/utils';

interface SelectedSlice {
  selectedItems: Array<IPeople>;
}

const initialState: SelectedSlice = {
  selectedItems: [],
};

const SelectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    toggleSelectedItem: (state, { payload }: PayloadAction<IPeople>) => {
      const index = state.selectedItems.findIndex(
        (item) => item.name === payload.name
      );

      if (index === -1) {
        state.selectedItems.push(payload);
      } else {
        state.selectedItems.splice(index, 1);
      }
    },

    resetSelectedItems: (state) => {
      state.selectedItems = [];
    },

    downloadSelectedItems: (state) => {
      const csvData = convertToCSV(state.selectedItems);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `${state.selectedItems.length}_people.csv`);
      link.click();

      URL.revokeObjectURL(url);
    },
  },
});

export const { toggleSelectedItem, resetSelectedItems, downloadSelectedItems } =
  SelectedSlice.actions;
export default SelectedSlice.reducer;
