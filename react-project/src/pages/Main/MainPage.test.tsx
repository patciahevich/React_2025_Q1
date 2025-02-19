import { BrowserRouter } from 'react-router';
import MainPage from './MainPage';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../context/ThemeContext/ThemeContext';
import { Mock, vi } from 'vitest';
import useSelected from '../../hooks/useSelected';
import { useGetPeopleQuery } from '../../api/swapiApi';
import { mockPeopleData } from '../../utils/mockData';

vi.mock(import('../../hooks/useSelected'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    default: vi.fn(),
  };
});

vi.mock('../../api/swapiApi', () => ({
  useGetPeopleQuery: vi.fn(),
}));

describe('Tests for the Main  page: ', () => {
  (useSelected as Mock).mockReturnValue({
    selectedItems: [],
    toggleItem: vi.fn(),
    isSelected: vi.fn(),
    resetAll: vi.fn(),
    downloadAll: vi.fn(),
  });

  (useGetPeopleQuery as Mock).mockReturnValue({
    data: mockPeopleData,
    isFetching: false,
    error: null,
  });
  it('render the Main page', () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </ThemeProvider>
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
