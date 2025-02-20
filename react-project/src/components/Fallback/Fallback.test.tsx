import Fallback from './Fallback';
import { render, screen } from '@testing-library/react';

describe('Tests for the Fallback component: ', () => {
  it('Should render the component', () => {
    render(<Fallback />);
    expect(
      screen.getByText(new RegExp('WELCOME TO THE DARK SIDE'))
    ).toBeInTheDocument();
  });
});
