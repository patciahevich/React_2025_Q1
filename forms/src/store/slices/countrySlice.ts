import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CountryState {
  countries: Array<string>;
}

const initialState: CountryState = {
  countries: [
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Italy',
    'Spain',
    'Netherlands',
    'Belgium',
    'Sweden',
    'Norway',
    'Denmark',
    'Finland',
    'Iceland',
    'Switzerland',
    'Austria',
    'Poland',
    'Czech Republic',
    'Hungary',
    'Slovakia',
    'Portugal',
    'Greece',
    'Ireland',
    'Australia',
    'New Zealand',
    'Japan',
    'South Korea',
    'China',
    'India',
    'Brazil',
    'Argentina',
    'Mexico',
    'Colombia',
    'Chile',
    'Peru',
    'South Africa',
    'Egypt',
    'Turkey',
    'Saudi Arabia',
    'United Arab Emirates',
    'Israel',
    'Thailand',
    'Vietnam',
    'Malaysia',
    'Indonesia',
    'Philippines',
    'Singapore',
    'Russia',
    'Ukraine',
    'Kazakhstan',
  ],
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.countries.push(action.payload);
    },
  },
});

export const { add } = countriesSlice.actions;
export default countriesSlice.reducer;
