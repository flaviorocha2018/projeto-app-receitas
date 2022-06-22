import React, { useContext } from 'react';
import RecipesContext from '../context/Context';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  filterMeals,
  searchMeals,
  filterDrinks,
  searchDrinks,
} from '../services/functions';

function SearchBar() {
  const {
    searchInput,
    setSearchInput,
    searchParam,
    setSearchParam,
    title,
    setAllMeals,
    setAllDrinks,
  } = useContext(RecipesContext);

  const handleSearch = ({ target }) => {
    setSearchInput({ searchInput: target.value });
  };

  const handleSearchParam = ({ target }) => {
    setSearchParam({ searchParam: target.value });
  };

  const handleFoodsSearchResults = (input) => {
    const alertMessage = 'Sorry, we haven\'t found any recipes for these filters.';
    if (input === null || input === undefined) global.alert(alertMessage);
    else setAllMeals(input);
  };

  const handleFoodsSearch = async () => {
    if (searchParam.searchParam === 'Ingredient') {
      const resultAPI = await filterMeals(searchInput.searchInput);
      handleFoodsSearchResults(resultAPI);
    }
    if (searchParam.searchParam === 'Name') {
      const resultAPI = await searchMeals('s', searchInput.searchInput);
      handleFoodsSearchResults(resultAPI);
    }
    if (searchParam.searchParam === 'First') {
      if (searchInput.searchInput.length === 1) {
        const resultAPI = await searchMeals('f', searchInput.searchInput);
        handleFoodsSearchResults(resultAPI);
      } else global.alert('Your search must have only 1 (one) character');
    }
  };

  const handleDrinksSearchResults = (input) => {
    const alertMessage = 'Sorry, we haven\'t found any recipes for these filters.';
    if (input === null || input === undefined) global.alert(alertMessage);
    else setAllDrinks(input);
  };

  const handleDrinksSearch = async () => {
    if (searchParam.searchParam === 'Ingredient') {
      const resultAPI = await filterDrinks(searchInput.searchInput);
      handleDrinksSearchResults(resultAPI);
    }
    if (searchParam.searchParam === 'Name') {
      const resultAPI = await searchDrinks('s', searchInput.searchInput);
      handleDrinksSearchResults(resultAPI);
    }
    if (searchParam.searchParam === 'First') {
      if (searchInput.searchInput.length === 1) {
        const resultAPI = await searchDrinks('f', searchInput.searchInput);
        handleDrinksSearchResults(resultAPI);
      } else global.alert('Your search must have only 1 (one) character');
    }
  };

  const handleSearchBtn = () => {
    if (title.title === 'Foods') handleFoodsSearch();
    else handleDrinksSearch();
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
          onClick={ handleSearchBtn }
        >
          Search
        </button>
      </form>
    </section>
  );
}

export default SearchBar;
