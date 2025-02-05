import { FormEvent, useState } from 'react';
import './Header.scss';

type SearchProps = {
  onSearchApply: (value: string) => void;
};

function getFromLocalStorage() {
  return localStorage.getItem('searchValue') ?? '';
}

function Header({ onSearchApply }: SearchProps) {
  const [searchInputValue, setSearchInputValue] = useState(
    getFromLocalStorage()
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchInputValue(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearchApply(searchInputValue);
    localStorage.setItem('searchValue', searchInputValue);
  }
  return (
    <header>
      <h1>STAR WARS API</h1>
      <div className="logo" />
      <form className="search_form" name="search-form" onSubmit={handleSubmit}>
        <input
          name="search"
          placeholder="Search..."
          value={searchInputValue}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}

export default Header;
