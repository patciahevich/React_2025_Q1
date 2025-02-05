import { useEffect, useState } from 'react';
import ErrorButton from '../../components/ErrorButton/ErrorButton';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Pagination from '../../components/Pagination/Pagination';
import Spinner from '../../components/Spinner/Spinner';
import { ServerResponse, ENDPOINTS, SEARCH_PARAMS } from '../../utils/types';
import './MainPage.scss';
import { useSearchParams } from 'react-router';

type Params = {
  search: string;
  page: string;
  details?: string;
};

function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<null | ServerResponse>(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [page, setPage] = useState(
    Number(searchParams.get(SEARCH_PARAMS.Page)) || 1
  );
  const [details, setDetails] = useState<string | null>(
    searchParams.get(SEARCH_PARAMS.Details)
  );

  async function fetchData(searchValue: string) {
    setIsLoaded(false);
    const params: Params = {
      search: searchValue,
      page: page.toString(),
    };

    if (details) {
      params.details = details;
    }

    setSearchParams(params);
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

  function addDetails(name: string) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(SEARCH_PARAMS.Details, name);
    setSearchParams(newParams);
    setDetails(name);
  }

  function resetDetails() {
    setDetails(null);
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(SEARCH_PARAMS.Details);
    setSearchParams(newParams);
  }

  useEffect(() => {
    const savedValue = localStorage.getItem('searchValue') ?? '';
    fetchData(savedValue);
  }, [page]);

  return (
    <div className="main-page">
      <ErrorButton />
      <Header onSearchApply={fetchData} />
      {isLoaded ? (
        <Main
          currentData={data}
          details={details}
          resetDetails={resetDetails}
          addDetails={addDetails}
        />
      ) : (
        <Spinner />
      )}
      {data ? (
        <Pagination
          changePage={setPage}
          currentPage={page}
          prevPage={data?.previous ?? null}
          nextPage={data?.next ?? null}
        />
      ) : null}
    </div>
  );
}

export default MainPage;
