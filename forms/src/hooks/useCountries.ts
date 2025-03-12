import { useAppSelector } from '../store/hooks/useAppSelector';

function useCountries() {
  const countries = useAppSelector((state) => state.countries.countries);

  return { countries };
}

export default useCountries;
