import { useEffect, useState } from 'react';
import { IPlanet } from 'swapi-ts/src/SWApi';
import Planet from '../Planet/Planet';
import Spinner from '../Spinner/Spinner';

type DetailsProps = { url: string; name: string };

function Details({ url }: DetailsProps) {
  const [data, setData] = useState<null | IPlanet>(null);
  const [isLoaded, setIsLoaded] = useState(true);

  async function fetchPlanetData(url: string) {
    setData(null);
    setIsLoaded(false);
    try {
      const response = await fetch(url, { method: 'GET' });
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
    fetchPlanetData(url);
  }, [url]);

  if (!isLoaded) {
    return <Spinner />;
  }

  return data ? <Planet data={data} /> : null;
}

export default Details;
