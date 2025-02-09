import { render, screen } from '@testing-library/react';
import Main from './Main';
import mockData from './mockData';
import { MemoryRouter } from 'react-router';
import { ServerResponse } from '../../utils/types';

describe('Main Component', () => {
  it('Verify that the component renders the specified number of cards.', async () => {
    render(
      <MemoryRouter>
        <Main currentData={mockData} />
      </MemoryRouter>
    );

    const main = await screen.findByTestId('main');
    expect(main).toBeInTheDocument();

    const children = main.querySelectorAll('.card_wrapper');
    expect(children).toHaveLength(mockData.results.length);
  });
  it('Should return the empty component if no data is passed', () => {
    render(
      <MemoryRouter>
        <Main currentData={null} />
      </MemoryRouter>
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

    render(
      <MemoryRouter>
        <Main currentData={emptyData} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Nothing was found/i)).toBeInTheDocument();
  });
});
