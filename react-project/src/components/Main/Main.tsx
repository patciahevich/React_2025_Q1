import './Main.scss';
import { ServerResponse } from '../../utils/types';
import PeopleCard from '../PeopleCard/PeopleCard';
import Empty from '../Empty/Empty';
import Details from '../Details/Details';
import { useEffect, useState } from 'react';

type MainProps = {
  currentData: ServerResponse | null;
  details: null | string;
  resetDetails: () => void;
  addDetails: (name: string) => void;
};

function Main({ currentData, details, resetDetails, addDetails }: MainProps) {
  const [url, setUrl] = useState<null | string>(null);

  async function getUrl() {
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${details}`
      );
      const data: ServerResponse = await response.json();

      if (data && data.results.length > 0) {
        const url = data.results[0].homeworld as string;
        setUrl(url);
      }
    } catch (e) {
      console.warn(e);
    }
  }
  useEffect(() => {
    if (details) {
      getUrl();
    }
  });

  function handleClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    const target = e.target as HTMLElement;
    if (!target.closest('.button')) {
      resetDetails();
    }
  }
  if (!currentData) {
    return <Empty text="Something went wrong!" imageName="error" />;
  }

  return !currentData.results.length ? (
    <Empty text="Nothing was found." imageName="nothing" />
  ) : (
    <main>
      <section className="cards" onClick={(e) => handleClick(e)}>
        {currentData.results.map((person) => (
          <PeopleCard
            data={person}
            key={person.created.toString()}
            handleClick={() => addDetails(person.name)}
          />
        ))}
      </section>

      <section className={details ? 'details active' : 'details'}>
        {url && details ? <Details url={url} name={details} /> : null}

        <button onClick={resetDetails}>Close</button>
      </section>
    </main>
  );
}

export default Main;
