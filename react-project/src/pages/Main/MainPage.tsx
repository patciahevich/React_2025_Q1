import { useCallback, useEffect, useState } from 'react';
import ErrorButton from '../../components/ErrorButton/ErrorButton';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Pagination from '../../components/Pagination/Pagination';
import Spinner from '../../components/Spinner/Spinner';
import { ServerResponse, ENDPOINTS } from '../../utils/types';
import './MainPage.scss';
import { useSearchParams } from 'react-router';
import Flyout from '../../components/Flyout/Flyout';

function MainPage() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<null | ServerResponse>(null);
  const [isLoaded, setIsLoaded] = useState(true);

  const page = searchParams.get('page') ?? 1;
  const search = searchParams.get('search');

  const fetchData = useCallback(
    async function () {
      setIsLoaded(false);

      const baseLink = `https://swapi.dev/api/${ENDPOINTS.People}?page=${page}&search=${search}`;

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
    },
    [page, search]
  );

  useEffect(() => {
    if (search !== null) {
      fetchData();
    }
  }, [page, search]);

  return (
    <div className="main-page">
      <ErrorButton />
      <Flyout />
      <Header />
      {isLoaded ? (
        <>
          <Main currentData={data} />
          <Pagination
            prevPage={data?.previous ?? null}
            nextPage={data?.next ?? null}
          />
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default MainPage;
