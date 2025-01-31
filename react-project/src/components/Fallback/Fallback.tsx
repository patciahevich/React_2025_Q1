import React from 'react';
import './Fallback.scss';

class Fallback extends React.Component {
  render() {
    return (
      <div className="fallback">
        <div className="image" />
        <h2> WELCOME TO THE DARK SIDE</h2>
        <h6>(please, try to reload the page)</h6>
      </div>
    );
  }
}

export default Fallback;
