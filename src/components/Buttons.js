import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Buttons(props) {
  const { filterRecipes } = props;
  return (
    <div className="cat-buttons">
      <button
        type="button"
        className="cat-btns"
        data-testid="filter-by-all-btn"
        value="all"
        onClick={ filterRecipes }
      >
        All
      </button>
      <button
        type="button"
        className="cat-btns"
        data-testid="filter-by-food-btn"
        value="food"
        onClick={ filterRecipes }
      >
        Food
      </button>
      <button
        type="button"
        className="cat-btns"
        data-testid="filter-by-drink-btn"
        value="drink"
        onClick={ filterRecipes }
      >
        Drinks
      </button>
    </div>
  );
}

Buttons.propTypes = {
  filterRecipes: PropTypes.func.isRequired,
};

export default Buttons;
