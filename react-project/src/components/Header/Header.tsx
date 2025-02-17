import { FormEvent, useState } from 'react';
import './Header.scss';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useQueryParams } from '../../hooks/useQueryParams';
import useSearchFromLS from '../../hooks/useSearchFromLS';
import ThemeToggleButton from '../ThemeToggleButton/ThemeToggleButton';

const KEY = 'searchValue';

function Header() {
  const [, setSavedValue] = useLocalStorage(KEY, '');
  const { setParams } = useQueryParams();
  const { initialValue } = useSearchFromLS();
  const [searchValue, setSearchValue] = useState(initialValue);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setParams({
      page: '1',
      search: searchValue,
    });
    setSavedValue(searchValue);
  }

  return (
    <header>
      <ThemeToggleButton />
      <h1>STAR WARS API</h1>
      <div className="logo" />
      <form className="search_form" name="search-form" onSubmit={handleSubmit}>
        <input
          name="search"
          placeholder="Search..."
          value={searchValue}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}

export default Header;
