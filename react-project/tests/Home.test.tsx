import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../src/context/ThemeContext/ThemeContext';
import { Mock, vi } from 'vitest';
import useSelected from '../src/hooks/useSelected';
import { swapiApi } from '../src/api/swapiApi';
import { mockPeopleData } from '../src/utils/mockData';
import Home from '../app/page';
import React, { act, Suspense } from 'react';
import { useRouter } from 'next/navigation';
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

vi.mock(import('next/navigation'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useRouter: vi.fn(),
  };
});

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
    push: vi.fn(),
  });
});
describe('Tests for the Home  page: ', () => {
  it('render the Home page', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <ThemeProvider>
            <Suspense>
              <Home />
            </Suspense>
          </ThemeProvider>
        </Provider>
      );
    });

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
