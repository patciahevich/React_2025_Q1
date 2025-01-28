import React from 'react';
import './App.scss';
import { IPeople } from 'swapi-ts/src/SWApi';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

export type ServerResponse = {
  count: number;
  next: string;
  previous: null;
  results: IPeople[];
};

enum ENDPOINTS {
  People = 'people',
  Planets = 'planets',
  Films = 'films',
  Species = 'species',
  Vehicles = 'vehicles',
  Starships = 'starships',
}

class App extends React.Component {
  state: { data: null | ServerResponse };
  constructor(props: Record<string, never>) {
    super(props);

    this.state = {
      data: null,
    };
  }

  async getData() {
    const baseLink = `https://swapi.dev/api/${ENDPOINTS.People}/?page=1`;
    try {
      const response = await fetch(baseLink, { method: 'GET' });
      this.setState({ data: await response.json() });
    } catch (e) {
      console.warn(e);
    }
  }

  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <div className="wrapper">
        <Header />
        <Main currentData={this.state.data} />
      </div>
    );
  }
}

export default App;
