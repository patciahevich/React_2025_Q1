import React from 'react';

type ErrorButtonState = {
  throwError: boolean;
};

class Button extends React.Component {
  state: ErrorButtonState;
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      throwError: false,
    };
  }
  handleClick = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('New Error');
    }
    return (
      <button type="button" onClick={this.handleClick} className="error">
        Throw Error
      </button>
    );
  }
}
export default Button;
