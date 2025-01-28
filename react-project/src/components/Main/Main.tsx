import React from 'react';
import './Main.scss';
import { State } from '../../App';

type MainProps = {
  currentData: State | null;
};

class Main extends React.Component<MainProps> {
  render() {
    console.log(this.props);
    return this.props.currentData
      ? this.props.currentData.results.map((item, index) => (
          <p key={index}>{item.name}</p>
        ))
      : 'Main';
  }
}

export default Main;
