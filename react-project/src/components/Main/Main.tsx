import './Main.scss';
import { SEARCH_PARAMS, ServerResponse } from '../../utils/types';
import PeopleCard from '../PeopleCard/PeopleCard';
import Empty from '../Empty/Empty';
import Details from '../Details/Details';
import { useQueryParams } from '../../hooks/useQueryParams';

type MainProps = {
  currentData: ServerResponse | null;
};

function Main({ currentData }: MainProps) {
  const { searchParams, setParam, removeParam } = useQueryParams();

  const details = searchParams.get(SEARCH_PARAMS.Details);

  function addDetails(name: string) {
    setParam(SEARCH_PARAMS.Details, name);
  }

  function resetDetails() {
    removeParam(SEARCH_PARAMS.Details);
  }

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
      <section
        data-testid="main"
        className="cards"
        onClick={(e) => handleClick(e)}
      >
        {currentData.results.map((person) => (
          <PeopleCard
            data={person}
            key={person.created.toString()}
            handleClick={() => addDetails(person.name)}
          />
        ))}
      </section>

      <section className={details ? 'details active' : 'details'}>
        {details ? <Details /> : null}

        <button onClick={resetDetails}>Close</button>
      </section>
    </main>
  );
}

export default Main;
