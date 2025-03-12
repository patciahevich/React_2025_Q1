import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../../utils/types';

interface FormState {
  allForms: {
    uncontrolled: Array<FormData>;
    controlled: Array<FormData>;
  };
}

const initialState: FormState = {
  allForms: {
    uncontrolled: [],
    controlled: [],
  },
};

const formSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addToControlledForms: (state, action: PayloadAction<FormData>) => {
      state.allForms.controlled.unshift(action.payload);
    },
    addToUncontrolledForms: (state, action: PayloadAction<FormData>) => {
      state.allForms.uncontrolled.unshift(action.payload);
    },
  },
});

export const { addToControlledForms, addToUncontrolledForms } =
  formSlice.actions;
export default formSlice.reducer;
