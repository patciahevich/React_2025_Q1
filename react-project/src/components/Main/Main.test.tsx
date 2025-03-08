import { act, fireEvent, render, screen } from '@testing-library/react';
import Main from './Main';
import { Mock, vi } from 'vitest';
import { configureStore, Store, UnknownAction } from '@reduxjs/toolkit';
import selectedReducer from '../../store/selectedSlice';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../context/ThemeContext/ThemeContext';
import {
  mockPeopleData as mockData,
  emptyData,
  mockPrevData,
} from '../../utils/mockData';
import { useQueryParams } from '../../hooks/useQueryParams';
import React, { Suspense } from 'react';
import { getPeople } from '../../actions/getPeople';

vi.mock('../../hooks/useQueryParams', () => ({
  useQueryParams: vi.fn(),
}));

vi.mock('../../actions/getPeople', () => ({
  getPeople: vi.fn(),
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
    (getPeople as Mock).mockResolvedValue(mockData);

    await act(async () => {
      render(
        <Provider store={store}>
          <ThemeProvider>
            <Suspense>
              <Main search={''} page={'2'} details={null} />
            </Suspense>
          </ThemeProvider>
        </Provider>
      );
    });

    const main = await screen.findByTestId('main');
    expect(main).toBeInTheDocument();

    const children = screen.getAllByTestId('card');
    expect(children).toHaveLength(mockData.results.length);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('Should return the empty component if no data is passed', async () => {
    (getPeople as Mock).mockResolvedValue(null);

    await act(async () => {
      render(
        <Provider store={store}>
          <ThemeProvider>
            <Suspense>
              <Main search={''} page={'2'} details={null} />
            </Suspense>
          </ThemeProvider>
        </Provider>
      );
    });

    expect(screen.getByText(/Please, try again!/i)).toBeInTheDocument();
  });
  it('Should render the empty component if the result.length is 0', async () => {
    (getPeople as Mock).mockResolvedValue(emptyData);

    await act(async () => {
      render(
        <Provider store={store}>
          <ThemeProvider>
            <Suspense>
              <Main search={''} page={'2'} details={null} />
            </Suspense>
          </ThemeProvider>
        </Provider>
      );
    });
    expect(screen.getByText(/Nothing was found/i)).toBeInTheDocument();
  });

  it('Correct work of the next button', async () => {
    (getPeople as Mock).mockResolvedValue(mockData);

    await act(async () => {
      render(
        <Provider store={store}>
          <ThemeProvider>
            <Suspense>
              <Main search={''} page={'2'} details={null} />
            </Suspense>
          </ThemeProvider>
        </Provider>
      );
    });

    expect(screen.getByRole('navigation')).toBeInTheDocument();

    const nextButton = screen.getByText(new RegExp('next'));
    fireEvent.click(nextButton);

    expect(mockSetParam).toHaveBeenCalledWith('page', '3');
  });

  it('Correct work of the prev button', async () => {
    (getPeople as Mock).mockResolvedValue(mockData);

    await act(async () => {
      render(
        <Provider store={store}>
          <ThemeProvider>
            <Suspense>
              <Main search={''} page={'2'} details={null} />
            </Suspense>
          </ThemeProvider>
        </Provider>
      );
    });

    expect(screen.getByRole('navigation')).toBeInTheDocument();

    const nextButton = screen.getByText(new RegExp('prev'));
    fireEvent.click(nextButton);

    expect(mockSetParam).toHaveBeenCalledWith('page', '1');
  });

  it('Check if the button is disabled', async () => {
    (getPeople as Mock).mockResolvedValue(mockPrevData);

    await act(async () => {
      render(
        <Provider store={store}>
          <ThemeProvider>
            <Suspense>
              <Main search={''} page={'2'} details={null} />
            </Suspense>
          </ThemeProvider>
        </Provider>
      );
    });

    const prevButton = screen.getByText(new RegExp('prev'));
    expect(prevButton).toBeDisabled();
  });

  it('Add name to the query parameters.', async () => {
    (getPeople as Mock).mockResolvedValue(mockData);

    await act(async () => {
      render(
        <Provider store={store}>
          <ThemeProvider>
            <Suspense>
              <Main search={''} page={'2'} details={null} />
            </Suspense>
          </ThemeProvider>
        </Provider>
      );
    });

    const button = screen.getAllByText(new RegExp('Planet Info'))[0];
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockSetParam).toHaveBeenCalledWith('details', 'Luke Skywalker');
  });

  it('Remove name to the query parameters.', async () => {
    (getPeople as Mock).mockResolvedValue(mockData);

    await act(async () => {
      render(
        <Provider store={store}>
          <ThemeProvider>
            <Suspense>
              <Main search={''} page={'2'} details={'Luke Skywalker'} />
            </Suspense>
          </ThemeProvider>
        </Provider>
      );
    });

    const card = screen.getByText(new RegExp('Luke Skywalker'));
    expect(card).toBeInTheDocument();

    fireEvent.click(card);
    expect(mockResetParams).toHaveBeenCalledWith('details');
  });
});
