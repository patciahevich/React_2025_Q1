import React from 'react';
import './Empty.scss';

type EmptyProps = {
  text: string;
  imageName: string;
};

class Empty extends React.Component<EmptyProps> {
  render() {
    return (
      <div className="empty-wrapper">
        <div
          className="empty"
          style={{
            backgroundImage: `url(./src/assets/${this.props.imageName}.jpg)`,
          }}
        >
          <h2>{this.props.text} Please, try again!</h2>
        </div>
      </div>
    );
  }
}

export default Empty;
