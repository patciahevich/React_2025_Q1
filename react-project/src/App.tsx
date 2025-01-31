import { useEffect, useState } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Spinner from './components/Spinner/Spinner';
import ErrorButton from './components/ErrorButton/ErrorButton';
import { ENDPOINTS, ServerResponse } from './utils/types';

function App() {
  const [data, setData] = useState<null | ServerResponse>(null);
  const [isLoaded, setIsLoaded] = useState(true);

  async function fetchData(searchValue: string) {
    setIsLoaded(false);
    const baseLink = `https://swapi.dev/api/${ENDPOINTS.People}/?search=${searchValue}`;

    try {
      const response = await fetch(baseLink, { method: 'GET' });
      const currentData = await response.json();
      setData(currentData);
    } catch (e) {
      console.warn(e);
      setData(null);
    } finally {
      setIsLoaded(true);
    }
  }

  useEffect(() => {
    const savedValue = localStorage.getItem('searchValue') ?? '';
    fetchData(savedValue);
  }, []);

  return (
    <div className="app">
      <ErrorButton />
      <Header onSearchApply={fetchData} />
      {isLoaded ? <Main currentData={data} /> : <Spinner />}
    </div>
  );
}

export default App;
