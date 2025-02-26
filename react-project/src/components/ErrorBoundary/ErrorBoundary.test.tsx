import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import React from 'react';

function ErrorComponent() {
  throw new Error('Test Error');
  return <></>;
}
describe('Tests for the ErrorBoundary component: ', () => {
  it('Render the child when there is no errors', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">No error</div>
      </ErrorBoundary>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
  it('Render the fallback component when there is an error', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByText(new RegExp('WELCOME TO THE DARK SIDE'))
    ).toBeInTheDocument();
  });
});
