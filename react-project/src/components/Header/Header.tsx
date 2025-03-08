'use client';

import React, { FormEvent, useState } from 'react';
import styles from './Header.module.scss';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useQueryParams } from '../../hooks/useQueryParams';
import useSearchFromLS from '../../hooks/useSearchFromLS';
import ThemeToggleButton from '../ThemeToggleButton/ThemeToggleButton';
import { useTheme } from '../../hooks/useTheme';

const KEY = 'searchValue';

function Header() {
  const [, setSavedValue] = useLocalStorage(KEY, '');
  const { setParams } = useQueryParams();
  const { initialValue } = useSearchFromLS(KEY);
  const [searchValue, setSearchValue] = useState(initialValue);
  const { theme } = useTheme();

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
    <header className={`${styles.header} ${styles[theme]}`}>
      <ThemeToggleButton />
      <h1>STAR WARS API</h1>
      <div className={styles.logo} />
      <form
        className={styles.searchForm}
        name="search-form"
        onSubmit={handleSubmit}
      >
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
