import { Store, UnknownAction, configureStore } from '@reduxjs/toolkit';
import { Mock, vi } from 'vitest';
import selectedReducer, { toggleSelectedItem } from '../../store/selectedSlice';
import Flyout from './Flyout';
import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import useSelected from '../../hooks/useSelected';
import { mockPeopleData as mockData } from '../../utils/mockData';
import { ThemeProvider } from '../../context/ThemeContext/ThemeContext';
import React from 'react';

vi.mock(import('../../hooks/useSelected'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    default: vi.fn(),
  };
});

let store: Store<unknown, UnknownAction, unknown>;

beforeAll(() => {
  store = configureStore({
    reducer: {
      selected: selectedReducer,
    },
  });
});

describe('Tests for the Flyout component: ', () => {
  it('Should render if there no data in the store', () => {
    (useSelected as Mock).mockReturnValue({
      selectedItems: [],
      resetAll: vi.fn(),
      downloadAll: vi.fn(),
    });

    render(
      <ThemeProvider>
        <Provider store={store}>
          <Flyout />
        </Provider>
      </ThemeProvider>
    );

    expect(screen.queryByRole('complementary')).toBeNull();
  });

  it('Should render when there is element in the store', () => {
    const item = mockData.results[0];

    store.dispatch(toggleSelectedItem(item));

    (useSelected as Mock).mockReturnValue({
      selectedItems: [item],
      resetAll: vi.fn(),
      downloadAll: vi.fn(),
    });
    render(
      <ThemeProvider>
        <Provider store={store}>
          <Flyout />
        </Provider>
      </ThemeProvider>
    );

    expect(screen.getByRole('complementary')).toBeInTheDocument();
  });

  it('Should reset  all selected items when clicking on the button', () => {
    const item = mockData.results[0];
    const mockResetAll = vi.fn();

    store.dispatch(toggleSelectedItem(item));

    (useSelected as Mock).mockReturnValue({
      selectedItems: [item],
      resetAll: mockResetAll,
      downloadAll: vi.fn(),
    });
    render(
      <ThemeProvider>
        <Provider store={store}>
          <Flyout />
        </Provider>
      </ThemeProvider>
    );

    expect(screen.getByRole('complementary')).toBeInTheDocument();
    const button = screen.getByText(new RegExp('Unselect all'));
    fireEvent.click(button);
    expect(mockResetAll).toHaveBeenCalled();
  });

  it('Should download  all selected items when clicking on the button', () => {
    const item = mockData.results[0];
    const mockDownloadAll = vi.fn();

    store.dispatch(toggleSelectedItem(item));

    (useSelected as Mock).mockReturnValue({
      selectedItems: [item],
      resetAll: vi.fn(),
      downloadAll: mockDownloadAll,
    });
    render(
      <ThemeProvider>
        <Provider store={store}>
          <Flyout />
        </Provider>
      </ThemeProvider>
    );

    expect(screen.getByRole('complementary')).toBeInTheDocument();
    const button = screen.getByText(new RegExp('Download'));
    fireEvent.click(button);
    expect(mockDownloadAll).toHaveBeenCalled();
  });
});
