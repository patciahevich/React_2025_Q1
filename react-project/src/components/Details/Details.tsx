import Planet from '../Planet/Planet';
import Spinner from '../Spinner/Spinner';
import { useQueryParams } from '../../hooks/useQueryParams';
import { useGetPersonQuery, useGetPlanetQuery } from '../../api/swapiApi';
import React from 'react';

function Details() {
  const { searchParams } = useQueryParams();
  const person = searchParams?.get('details');

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
