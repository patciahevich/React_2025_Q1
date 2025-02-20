import { render, screen } from '@testing-library/react';
import Empty from './Empty';

describe('Tests for Empty component', () => {
  it('Should render the text from props', () => {
    const text = 'Something went wrong!';
    const imageName = 'error';

    render(<Empty text={text} imageName={imageName} />);

    expect(screen.getByText(new RegExp(text))).toBeInTheDocument();
  });
});
