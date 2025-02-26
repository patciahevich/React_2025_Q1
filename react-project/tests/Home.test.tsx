import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../src/context/ThemeContext/ThemeContext';
import { Mock, vi } from 'vitest';
import useSelected from '../src/hooks/useSelected';
import { swapiApi } from '../src/api/swapiApi';
import { mockPeopleData } from '../src/utils/mockData';
import Home from '../pages/index';
import React from 'react';
import { useRouter } from 'next/router';
import { configureStore, Store, UnknownAction } from '@reduxjs/toolkit';
import selectedReducer from '../src/store/selectedSlice';
import { Provider } from 'react-redux';

vi.mock(import('../src/hooks/useSelected'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    default: vi.fn(),
  };
});

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('../src/api.swapiApi', () => ({
  useGetPeopleQuery: vi.fn().mockReturnValue({
    data: mockPeopleData,
    isFetching: false,
    error: null,
  }),
}));

let store: Store<unknown, UnknownAction, unknown>;

beforeEach(() => {
  store = configureStore({
    reducer: {
      selected: selectedReducer,
      [swapiApi.reducerPath]: swapiApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(swapiApi.middleware),
  });

  (useSelected as Mock).mockReturnValue({
    selectedItems: [],
    toggleItem: vi.fn(),
    isSelected: vi.fn(),
    resetAll: vi.fn(),
    downloadAll: vi.fn(),
  });

  (useRouter as Mock).mockReturnValue({
    query: { page: '1' },
    push: vi.fn(),
  });
});
describe('Tests for the Home  page: ', () => {
  it('render the Home page', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
