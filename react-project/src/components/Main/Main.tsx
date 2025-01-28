import React from 'react';
import type { ServerResponse } from '../../App';
import './Main.scss';
import Card from '../Card/Card';

type MainProps = {
  currentData: ServerResponse | null;
};

class Main extends React.Component<MainProps> {
  render() {
    if (!this.props.currentData) {
      return (
        <div className="main">
          <div className="clue"> Something went wrong. </div>
        </div>
      );
    }

    if (!this.props.currentData.results.length) {
      return (
        <div className="main">
          <div className="clue"> Nothing was found. Try again!</div>
        </div>
      );
    }

    return (
      <main>
        {this.props.currentData.results.map((item, index) => (
          <Card data={item} key={index} />
        ))}
      </main>
    );
  }
}

export default Main;
