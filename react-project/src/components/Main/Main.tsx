import React from 'react';
import './Main.scss';
import { ServerResponse } from '../../utils/types';
import PeopleCard from '../PeopleCard/PeopleCard';
import Empty from '../Empty/Empty';

type MainProps = {
  currentData: ServerResponse | null;
};

class Main extends React.Component<MainProps> {
  render() {
    if (!this.props.currentData) {
      return <Empty text="Something went wrong!" imageName="error" />;
    }

    return !this.props.currentData.results.length ? (
      <Empty text="Nothing was found." imageName="nothing" />
    ) : (
      <main>
        {this.props.currentData.results.map((item) => (
          <PeopleCard data={item} key={item.created.toString()} />
        ))}
      </main>
    );
  }
}

export default Main;
