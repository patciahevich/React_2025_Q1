import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPeople } from 'swapi-ts/src/SWApi';

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
  },
});

export const { toggleSelectedItem, resetSelectedItems } = SelectedSlice.actions;
export default SelectedSlice.reducer;
