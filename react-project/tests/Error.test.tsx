import { render, screen } from '@testing-library/react';

import React from 'react';
import ErrorPage from '../app/error';

describe('Tests for the Not Found page: ', () => {
  it('Render the page', () => {
    render(<ErrorPage />);

    expect(screen.getByText(new RegExp('WELCOME TO THE DARK SIDE')));
  });
});
