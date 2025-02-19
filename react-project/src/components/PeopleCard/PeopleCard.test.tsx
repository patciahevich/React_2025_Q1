import { configureStore, Store, UnknownAction } from '@reduxjs/toolkit';
import { mockData } from './mockPeople';
import PeopleCard from './PeopleCard';
import { fireEvent, render, screen } from '@testing-library/react';
import selectedReducer from '../../store/selectedSlice';
import { Provider } from 'react-redux';
import { Mock, vi } from 'vitest';
import { BrowserRouter } from 'react-router';
import useSelected from '../../hooks/useSelected';

let store: Store<unknown, UnknownAction, unknown>;

vi.mock(import('../../hooks/useSelected'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    default: vi.fn(),
  };
});

beforeAll(() => {
  store = configureStore({
    reducer: {
      selected: selectedReducer,
    },
  });
});

describe('Tests for the Card component: ', () => {
  it('Renders the relevant card data.', () => {
    (useSelected as Mock).mockReturnValue({
      toggleItem: vi.fn(),
      isSelected: vi.fn(),
    });

    render(
      <Provider store={store}>
        <PeopleCard data={mockData} handleClick={() => {}} />
      </Provider>
    );
    expect(screen.getByText(new RegExp(mockData.name))).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(mockData.birth_year))
    ).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockData.gender))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockData.height))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockData.mass))).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(mockData.hair_color))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(mockData.eye_color))
    ).toBeInTheDocument();
  });

  it('Add name to the query parameters by clicking the button', () => {
    const addDetails = vi.fn();

    (useSelected as Mock).mockReturnValue({
      toggleItem: vi.fn(),
      isSelected: vi.fn(),
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <PeopleCard
            data={mockData}
            handleClick={() => addDetails(mockData.name)}
          />
        </Provider>
      </BrowserRouter>
    );

    const button = screen.getByText(new RegExp('Planet Info'));
    fireEvent.click(button);

    expect(addDetails).toHaveBeenCalledWith(mockData.name);
  });

  it('Add item to the store by clicking to the card', () => {
    const mockToggleItem = vi.fn();

    (useSelected as Mock).mockReturnValue({
      toggleItem: mockToggleItem,
      isSelected: vi.fn(),
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <PeopleCard data={mockData} handleClick={() => {}} />
        </Provider>
      </BrowserRouter>
    );

    const card = screen.getByText(new RegExp(mockData.name));

    fireEvent.click(card);
    expect(mockToggleItem).toHaveBeenCalledWith(mockData);
  });

  it('Should check if the item is in the store', () => {
    const mockIsSelected = vi.fn().mockReturnValue(false);

    (useSelected as Mock).mockReturnValue({
      toggleItem: vi.fn(),
      isSelected: mockIsSelected,
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <PeopleCard data={mockData} handleClick={() => {}} />
        </Provider>
      </BrowserRouter>
    );

    expect(mockIsSelected).toHaveBeenCalledWith(mockData);
  });
});
