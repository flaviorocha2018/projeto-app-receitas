import React, { useContext } from 'react';
import RecipesContext from '../context/Context';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function SearchBar() {
  const {
    searchInput,
    setSearchInput,
    setSearchParam,
  } = useContext(RecipesContext);

  const handleSearch = ({ target }) => {
    setSearchInput({ searchInput: target.value });
  };

  const handleSearchParam = ({ target }) => {
    setSearchParam({ searchParam: target.value });
  };

  return (
    <section className="">
      <form>
        <div className="form-outline mb-4">
          <input
            type="text"
            className="form-control"
            data-testid="search-input"
            name="search"
            placeholder="Search Recipe"
            value={ searchInput.searchInput }
            onChange={ handleSearch }
          />
        </div>
        <div
          className="form-check form-check-inline"
          onChange={ handleSearchParam }
        >
          <label className="form-check-label" htmlFor="flexCheck1">
            <input
              className="form-check-input"
              type="radio"
              value="Ingredient"
              id="flexCheck1"
              name="search-item"
              data-testid="ingredient-search-radio"
            />
            Ingredient
          </label>
          <label className="form-check-label" htmlFor="flexCheck2">
            <input
              className="form-check-input"
              type="radio"
              value="Name"
              id="flexCheck2"
              name="search-item"
              data-testid="name-search-radio"
            />
            Name
          </label>
          <label className="form-check-label" htmlFor="flexCheck3">
            <input
              className="form-check-input"
              type="radio"
              value="First"
              id="flexCheck3"
              name="search-item"
              data-testid="first-letter-search-radio"
            />
            First Letter
          </label>
        </div>
        <button
          type="button"
          data-testid="exec-search-btn"
        >
          Search
        </button>
      </form>
    </section>
  );
}

export default SearchBar;
