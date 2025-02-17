import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS, QueryParams, ServerResponse } from '../utils/types';

export const swapiApi = createApi({
  reducerPath: 'swapiApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://swapi.dev/api/`,
  }),
  endpoints: (builder) => ({
    getPeople: builder.query<ServerResponse | null, Partial<QueryParams>>({
      query: ({ page, search }) =>
        `${ENDPOINTS.People}?page=${page}&search=${search}`,
    }),
  }),
});

export const { useGetPeopleQuery } = swapiApi;
