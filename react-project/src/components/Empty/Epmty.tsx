import React from 'react';
import './Empty.scss';

class Empty extends React.Component {
  render() {
    return (
      <div className="empty-wrapper">
        <div className="empty">
          <h2> Nothing was found. Try again!</h2>
        </div>
      </div>
    );
  }
}

export default Empty;
