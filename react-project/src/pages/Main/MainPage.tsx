import { useEffect, useState } from 'react';
import ErrorButton from '../../components/ErrorButton/ErrorButton';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Pagination from '../../components/Pagination/Pagination';
import Spinner from '../../components/Spinner/Spinner';
import { ServerResponse, ENDPOINTS } from '../../utils/types';
import './MainPage.scss';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useQueryParams } from '../../hooks/useQueryParams';

function MainPage() {
  const [savedValue] = useLocalStorage();
  const { searchParams } = useQueryParams({
    search: savedValue,
    page: '1',
  });
  const [data, setData] = useState<null | ServerResponse>(null);
  const [isLoaded, setIsLoaded] = useState(true);

  const page = searchParams.get('page') ?? 1;
  const search = searchParams.get('search') ?? '';

  async function fetchData() {
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
  }

  useEffect(() => {
    fetchData();
  }, [page, search]);

  return (
    <div className="main-page">
      <ErrorButton />
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
