import React, { FormEvent } from 'react';
import './Header.scss';

type SearchProps = {
  onSearchApply: (value: string) => void;
};

type SearchState = {
  searchInputValue: string;
};

class Header extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);

    this.state = {
      searchInputValue: localStorage.getItem('searchValue') ?? '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ searchInputValue: event.target.value });
  }

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.onSearchApply(this.state.searchInputValue);
    localStorage.setItem('searchValue', this.state.searchInputValue);
  };

  render() {
    return (
      <header>
        <h1>STAR WARS API</h1>
        <div className="logo" />
        <form
          className="search_form"
          name="search-form"
          onSubmit={this.handleSubmit}
        >
          <input
            name="search"
            placeholder="Search..."
            value={this.state.searchInputValue}
            onChange={this.handleChange}
          />
          <button type="submit">Search</button>
        </form>
      </header>
    );
  }
}

export default Header;
