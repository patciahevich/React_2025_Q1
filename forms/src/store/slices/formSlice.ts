import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  allForms: Array<FormData>;
}

const initialState: CounterState = {
  allForms: [],
};

const counterSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<FormData>) => {
      state.allForms.push(action.payload);
    },
  },
});

export const { add } = counterSlice.actions;
export default counterSlice.reducer;
