import { useCallback, useEffect, useState } from 'react';
import { IPlanet } from 'swapi-ts/src/SWApi';
import Planet from '../Planet/Planet';
import Spinner from '../Spinner/Spinner';
import { useQueryParams } from '../../hooks/useQueryParams';
import { SEARCH_PARAMS, ServerResponse } from '../../utils/types';

function Details() {
  const { searchParams } = useQueryParams();
  const [data, setData] = useState<null | IPlanet>(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const person = searchParams.get(SEARCH_PARAMS.Details);

  const fetchData = useCallback(async () => {
    setIsLoaded(false);
    try {
      const personResponse = await fetch(
        `https://swapi.dev/api/people/?search=${person}`
      );
      const data: ServerResponse = await personResponse.json();

      if (data && data.results.length > 0) {
        const url = data.results[0].homeworld as string;
        const planetResponse = await fetch(url, { method: 'GET' });
        const planetData = await planetResponse.json();
        setData(planetData);
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setIsLoaded(true);
    }
  }, [person]);

  useEffect(() => {
    if (!person) return;

    fetchData();
  }, [person]);

  if (!isLoaded) {
    return <Spinner />;
  }

  return data ? <Planet data={data} /> : null;
}

export default Details;
