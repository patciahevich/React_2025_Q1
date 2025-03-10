import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../../utils/types';

interface FormState {
  allForms: Array<FormData>;
}

const initialState: FormState = {
  allForms: [],
};

const formSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<FormData>) => {
      state.allForms.push(action.payload);
    },
  },
});

export const { add } = formSlice.actions;
export default formSlice.reducer;
