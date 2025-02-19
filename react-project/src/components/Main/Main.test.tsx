import { render, screen } from '@testing-library/react';
import Main from './Main';
import mockData from './mockData';
import { MemoryRouter } from 'react-router';
import { ServerResponse } from '../../utils/types';
import { Mock, vi } from 'vitest';
import { configureStore, Store, UnknownAction } from '@reduxjs/toolkit';
import selectedReducer from '../../store/selectedSlice';
import { Provider } from 'react-redux';
import { useGetPeopleQuery } from '../../api/swapiApi';
import { ThemeProvider } from '../../context/ThemeContext/ThemeContext';

vi.mock('../../api/swapiApi', () => ({
  useGetPeopleQuery: vi.fn(),
}));

let store: Store<unknown, UnknownAction, unknown>;

beforeAll(() => {
  store = configureStore({
    reducer: {
      selected: selectedReducer,
    },
  });
});

describe('Main Component', () => {
  it('Verify that the component renders the specified number of cards.', async () => {
    (useGetPeopleQuery as Mock).mockReturnValue({
      data: mockData,
      isFetching: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <Main />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    const main = await screen.findByTestId('main');
    expect(main).toBeInTheDocument();

    const children = main.querySelectorAll('.card');
    expect(children).toHaveLength(mockData.results.length);
  });

  it('Should return the empty component if no data is passed', () => {
    (useGetPeopleQuery as Mock).mockReturnValue({
      data: null,
      isFetching: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <Main />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText(/Please, try again!/i)).toBeInTheDocument();
  });
  it('Should render the empty component if the result.length is 0', () => {
    const emptyData: ServerResponse = {
      count: 0,
      next: 'https://swapi.dev/api/people/?page=2',
      previous: null,
      results: [],
    };

    (useGetPeopleQuery as Mock).mockReturnValue({
      data: emptyData,
      isFetching: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <Main />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    expect(screen.getByText(/Nothing was found/i)).toBeInTheDocument();
  });
});
