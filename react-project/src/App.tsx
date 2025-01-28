import React from 'react';
import './App.scss';
import { IPeople } from 'swapi-ts/src/SWApi';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Spinner from './components/Spinner/Spinner';

export type ServerResponse = {
  count: number;
  next: string;
  previous: null;
  results: IPeople[];
};

type State = {
  data: null | ServerResponse;
  searchValue: string;
  isLoaded: boolean;
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
  state: State;
  constructor(props: Record<string, never>) {
    super(props);

    this.state = {
      data: null,
      searchValue: '',
      isLoaded: true,
    };

    this.changeState = this.changeState.bind(this);
    this.setState = this.setState.bind(this);
  }

  async getData() {
    this.setState({ isLoaded: false });
    const baseLink = `https://swapi.dev/api/${ENDPOINTS.People}/?search=${this.state.searchValue}`;
    try {
      const response = await fetch(baseLink, { method: 'GET' });
      this.setState({
        data: await response.json(),
        isLoaded: true,
      });
    } catch (e) {
      console.warn(e);
    }
  }
  changeState(currentValue: string) {
    this.setState({ searchValue: currentValue }, () => {
      this.getData();
    });
  }

  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <div className="wrapper">
        <Header currentValue="" changeSearchValue={this.changeState} />
        {this.state.isLoaded ? (
          <Main currentData={this.state.data} />
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default App;
