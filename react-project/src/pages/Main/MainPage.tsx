import { useEffect, useState } from 'react';
import ErrorButton from '../../components/ErrorButton/ErrorButton';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Pagination from '../../components/Pagination/Pagination';
import Spinner from '../../components/Spinner/Spinner';
import { ServerResponse, ENDPOINTS } from '../../utils/types';
import './MainPage.scss';
import { useSearchParams } from 'react-router';

function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<null | ServerResponse>(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  async function fetchData(searchValue: string) {
    setIsLoaded(false);
    setSearchParams({ search: searchValue, page: page.toString() });
    const baseLink = `https://swapi.dev/api/${ENDPOINTS.People}?page=${page}&search=${searchValue}`;

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
  }, [page]);

  return (
    <div className="main-page">
      <ErrorButton />
      <Header onSearchApply={fetchData} />
      {isLoaded ? <Main currentData={data} /> : <Spinner />}
      {data ? (
        <Pagination
          changePage={setPage}
          currentPage={page}
          prevPage={data?.previous}
          nextPage={data?.next}
        />
      ) : null}
    </div>
  );
}

export default MainPage;
