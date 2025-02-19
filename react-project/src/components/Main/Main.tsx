import './Main.scss';
import { SEARCH_PARAMS } from '../../utils/types';
import PeopleCard from '../PeopleCard/PeopleCard';
import Empty from '../Empty/Empty';
import Details from '../Details/Details';
import { useQueryParams } from '../../hooks/useQueryParams';
import { useGetPeopleQuery } from '../../api/swapiApi';
import Spinner from '../Spinner/Spinner';
import Pagination from '../Pagination/Pagination';

function Main() {
  const { searchParams, setParam, removeParam } = useQueryParams();
  const page = searchParams.get('page') ?? 1;
  const search = searchParams.get('search') ?? '';
  const details = searchParams.get(SEARCH_PARAMS.Details);

  const { data, error, isFetching } = useGetPeopleQuery({
    page: page.toString(),
    search,
  });

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

  if (isFetching) return <Spinner />;
  if (error || !data)
    return <Empty text="Something went wrong!" imageName="error" />;

  return !data.results.length ? (
    <Empty text="Nothing was found." imageName="nothing" />
  ) : (
    <>
      <main>
        <section
          data-testid="main"
          className="cards"
          onClick={(e) => handleClick(e)}
        >
          {data.results.map((person) => (
            <PeopleCard
              data={person}
              key={person.created.toString()}
              handleClick={() => addDetails(person.name)}
            />
          ))}
        </section>

        <article className={details ? 'details active' : 'details'}>
          {details ? <Details /> : null}

          <button onClick={resetDetails}>Close</button>
        </article>
      </main>
      <Pagination
        prevPage={data.previous ?? null}
        nextPage={data.next ?? null}
      />
    </>
  );
}

export default Main;
