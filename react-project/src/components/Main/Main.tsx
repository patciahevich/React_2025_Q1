import React from 'react';
import type { ServerResponse } from '../../App';
import './Main.scss';
import Card from '../Card/Card';
import Empty from '../Empty/Epmty';

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

    return !this.props.currentData.results.length ? (
      <Empty />
    ) : (
      <main>
        {this.props.currentData.results.map((item, index) => (
          <Card data={item} key={index} />
        ))}
      </main>
    );
  }
}

export default Main;
