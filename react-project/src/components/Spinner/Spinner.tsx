import React from 'react';
import './Spinner.scss';

class Spinner extends React.Component {
  render() {
    return (
      <div className="spinner_wrapper">
        <div className="spinner" />
      </div>
    );
  }
}

export default Spinner;
