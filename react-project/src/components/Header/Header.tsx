import { FormEvent } from 'react';
import './Header.scss';
import useLocalStorage from '../../hooks/useLocalStorage';

type SearchProps = {
  onSearchApply: (value: string) => void;
};

function Header({ onSearchApply }: SearchProps) {
  const [searchInputValue, setSearchInputValue] = useLocalStorage();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchInputValue(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearchApply(searchInputValue);
    setSearchInputValue(searchInputValue);
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
