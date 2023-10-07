import { Component } from 'react';

export class SearchBar extends Component {
  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.props.onSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
