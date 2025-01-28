import React from 'react';
import './Button.scss';

type ButtonProps = {
  buttonName: string;
  type: 'button' | 'submit';
  onClick?: () => void;
};

class Button extends React.Component<ButtonProps> {
  render() {
    return <button type={this.props.type}>{this.props.buttonName}</button>;
  }
}
export default Button;
