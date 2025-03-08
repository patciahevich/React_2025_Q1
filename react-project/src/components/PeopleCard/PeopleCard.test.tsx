import { configureStore, Store, UnknownAction } from '@reduxjs/toolkit';
import PeopleCard from './PeopleCard';
import { fireEvent, render, screen } from '@testing-library/react';
import selectedReducer from '../../store/selectedSlice';
import { Provider } from 'react-redux';
import { Mock, vi } from 'vitest';
import useSelected from '../../hooks/useSelected';
import { mockPeopleData } from '../../utils/mockData';
import React from 'react';
import { useQueryParams } from '../../hooks/useQueryParams';

let store: Store<unknown, UnknownAction, unknown>;
const cardItem = mockPeopleData.results[0];

vi.mock(import('../../hooks/useSelected'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    default: vi.fn(),
  };
});

vi.mock('../../hooks/useQueryParams', () => ({
  useQueryParams: vi.fn(),
}));

const mockSetParam = vi.fn();
const mockResetParam = vi.fn();

beforeAll(() => {
  (useQueryParams as Mock).mockReturnValue({
    setParam: mockSetParam,
    removeParam: mockResetParam,
  });

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
        <PeopleCard data={cardItem} />
      </Provider>
    );
    expect(screen.getByText(new RegExp(cardItem.name))).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(cardItem.birth_year))
    ).toBeInTheDocument();
    expect(screen.getByText(new RegExp(cardItem.gender))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(cardItem.height))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(cardItem.mass))).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(cardItem.hair_color))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(cardItem.eye_color))
    ).toBeInTheDocument();
  });

  it('Add name to the query parameters by clicking the button', () => {
    (useSelected as Mock).mockReturnValue({
      toggleItem: vi.fn(),
      isSelected: vi.fn(),
    });

    render(
      <Provider store={store}>
        <PeopleCard data={cardItem} />
      </Provider>
    );

    const button = screen.getByText(new RegExp('Planet Info'));
    fireEvent.click(button);

    expect(mockSetParam).toHaveBeenCalledWith('details', cardItem.name);
  });

  it('Remove the name from the query parameters by clicking the button', () => {
    (useSelected as Mock).mockReturnValue({
      toggleItem: vi.fn(),
      isSelected: vi.fn(),
    });

    render(
      <Provider store={store}>
        <PeopleCard data={cardItem} />
      </Provider>
    );

    const card = screen.getByText(new RegExp('Luke Skywalker'));
    fireEvent.click(card);

    expect(mockResetParam).toHaveBeenCalledWith('details');
  });

  it('Add item to the store by clicking to the card', () => {
    const mockToggleItem = vi.fn();

    (useSelected as Mock).mockReturnValue({
      toggleItem: mockToggleItem,
      isSelected: vi.fn(),
    });

    render(
      <Provider store={store}>
        <PeopleCard data={cardItem} />
      </Provider>
    );

    const card = screen.getByText(new RegExp(cardItem.name));

    fireEvent.click(card);
    expect(mockToggleItem).toHaveBeenCalledWith(cardItem);
  });

  it('Should check if the item is in the store', () => {
    const mockIsSelected = vi.fn().mockReturnValue(false);

    (useSelected as Mock).mockReturnValue({
      toggleItem: vi.fn(),
      isSelected: mockIsSelected,
    });

    render(
      <Provider store={store}>
        <PeopleCard data={cardItem} />
      </Provider>
    );

    expect(mockIsSelected).toHaveBeenCalledWith(cardItem);
  });
});
