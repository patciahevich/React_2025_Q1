import React, { FormEvent } from 'react';
import './Header.scss';
import Button from '../Button/Button';

type SearchProps = {
  currentValue: string;
  changeSearchValue: (value: string) => void;
};

type SearchState = {
  searchInputValue: string;
};

class Header extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);

    this.state = {
      searchInputValue: this.props.currentValue,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ searchInputValue: event.target.value });
  }

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget.elements;
    const currentSearchValue = form[0] as HTMLInputElement;

    this.props.changeSearchValue(currentSearchValue.value);
  };

  render() {
    return (
      <header>
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
          <Button type="submit" buttonName="Search" />
        </form>
      </header>
    );
  }
}

export default Header;
