import { fireEvent, render, screen } from '@testing-library/react';
import Main from './Main';
import { MemoryRouter } from 'react-router';
import { ServerResponse } from '../../utils/types';
import { Mock, vi } from 'vitest';
import { configureStore, Store, UnknownAction } from '@reduxjs/toolkit';
import selectedReducer from '../../store/selectedSlice';
import { Provider } from 'react-redux';
import { useGetPeopleQuery } from '../../api/swapiApi';
import { ThemeProvider } from '../../context/ThemeContext/ThemeContext';
import { mockPeopleData as mockData } from '../../utils/mockData';
import { useQueryParams } from '../../hooks/useQueryParams';

vi.mock('../../api/swapiApi', () => ({
  useGetPeopleQuery: vi.fn(),
}));

vi.mock('../../hooks/useQueryParams', () => ({
  useQueryParams: vi.fn(),
}));

const mockSetParam = vi.fn();
const mockResetParams = vi.fn();

let store: Store<unknown, UnknownAction, unknown>;

beforeEach(() => {
  store = configureStore({
    reducer: {
      selected: selectedReducer,
    },
  });

  (useQueryParams as Mock).mockReturnValue({
    searchParams: new URLSearchParams({ page: '2' }),
    setParam: mockSetParam,
    removeParam: mockResetParams,
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

    expect(screen.getByRole('navigation')).toBeInTheDocument();
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

  it('Correct work pagination', () => {
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

    expect(screen.getByRole('navigation')).toBeInTheDocument();

    const nextButton = screen.getByText(new RegExp('next'));
    fireEvent.click(nextButton);

    expect(mockSetParam).toHaveBeenCalledWith('page', '3');

    const prevButton = screen.getByText(new RegExp('prev'));
    fireEvent.click(prevButton);

    expect(mockSetParam).toHaveBeenCalledWith('page', '1');
  });

  it('Check if the button is disabled', () => {
    const data = {
      count: 0,
      next: 'https://swapi.dev/api/people/?page=2',
      previous: null,
      results: [mockData.results[0]],
    };
    (useGetPeopleQuery as Mock).mockReturnValue({
      data: data,
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

    const prevButton = screen.getByText(new RegExp('prev'));
    expect(prevButton).toBeDisabled();
  });

  it('Should display the spinner if  data is fetching', () => {
    (useGetPeopleQuery as Mock).mockReturnValue({
      data: null,
      isFetching: true,
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

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('Add/reset name to the query parameters.', async () => {
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

    const button = screen.getAllByText(new RegExp('Planet Info'))[0];
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockSetParam).toHaveBeenCalledWith('details', 'Luke Skywalker');

    const closeButton = screen.getByText(new RegExp('Close'));
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(mockResetParams).toHaveBeenCalledWith('details');
  });
});
