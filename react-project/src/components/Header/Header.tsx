import { FormEvent, useState, useEffect } from 'react';
import './Header.scss';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useQueryParams } from '../../hooks/useQueryParams';

function Header() {
  const [savedValue, setSavedValue] = useLocalStorage();
  const { searchParams, setParams } = useQueryParams();
  const initialSearch = searchParams.get('search');
  const [searchValue, setSearchValue] = useState(
    initialSearch ?? savedValue ?? ''
  );

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

  useEffect(() => {
    if (initialSearch === null) {
      setParams({
        page: '1',
        search: searchValue,
      });
    }
  }, []);

  return (
    <header>
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
