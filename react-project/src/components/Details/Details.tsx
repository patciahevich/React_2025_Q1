import Planet from '../Planet/Planet';
import Spinner from '../Spinner/Spinner';
import { useQueryParams } from '../../hooks/useQueryParams';
import { SEARCH_PARAMS } from '../../utils/types';
import { useGetPersonQuery, useGetPlanetQuery } from '../../api/swapiApi';

function Details() {
  const { searchParams } = useQueryParams();
  const person = searchParams.get(SEARCH_PARAMS.Details);

  const { data: peopleData, isFetching: isPeopleFetching } = useGetPersonQuery(
    person,
    {
      skip: !person,
    }
  );

  const personHomeworld = peopleData?.results?.[0]?.homeworld;

  const { data: planetData, isFetching: isPlanetFetching } = useGetPlanetQuery(
    personHomeworld,
    {
      skip: !personHomeworld,
    }
  );

  if (isPeopleFetching || isPlanetFetching) {
    return <Spinner />;
  }

  return planetData ? <Planet data={planetData} /> : null;
}

export default Details;
