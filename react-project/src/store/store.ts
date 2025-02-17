import { configureStore } from '@reduxjs/toolkit';
import selectedReducer from './selectedSlice';
import { swapiApi } from '../api/swapiApi';

export const store = configureStore({
  reducer: {
    selected: selectedReducer,
    [swapiApi.reducerPath]: swapiApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(swapiApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
