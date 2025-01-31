import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Spinner from './components/Spinner/Spinner';
import ErrorButton from './components/ErrorButton/ErrorButton';
import { ENDPOINTS, ServerResponse } from './utils/types';

type AppState = {
  data: null | ServerResponse;
  isLoaded: boolean;
};

class App extends React.Component {
  state: AppState;
  constructor(props: Record<string, never>) {
    super(props);

    this.state = {
      data: null,
      isLoaded: true,
    };

    this.setState = this.setState.bind(this);
    this.getData = this.getData.bind(this);
  }

  async getData(searchValue: string) {
    this.setState({ isLoaded: false });
    const baseLink = `https://swapi.dev/api/${ENDPOINTS.People}/?search=${searchValue}`;

    try {
      const response = await fetch(baseLink, { method: 'GET' });
      this.setState({
        data: await response.json(),
        isLoaded: true,
      });
    } catch (e) {
      console.warn(e);
      this.setState({ data: null, isLoaded: true });
    }
  }

  componentDidMount() {
    const savedValue = localStorage.getItem('searchValue') ?? '';
    this.getData(savedValue);
  }

  render() {
    return (
      <div className="app">
        <ErrorButton />
        <Header onSearchApply={this.getData} />
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
