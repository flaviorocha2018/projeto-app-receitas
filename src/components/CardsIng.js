import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/Context';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function CardsIng(props) {
  const { text, index, pageTitle } = props;
  const { setSearchInput } = useContext(RecipesContext);
  const history = useHistory();

  const clickCardIng = () => {
    setSearchInput({ searchInput: text });
    history.push(`/${pageTitle}`);
  };

  return (
    <div
      className="card"
      data-testid={ `${index}-ingredient-card` }
    >
      <button
        type="button"
        onClick={ clickCardIng }
      >
        <img
          src={ pageTitle === 'foods'
            ? `https://www.themealdb.com/images/ingredients/${text}-Small.png`
            : `https://www.thecocktaildb.com/images/ingredients/${text}-Small.png` }
          className="card-img-top"
          alt={ text }
          data-testid={ `${index}-card-img` }
        />
        <div className="card-body">
          <h5
            className="card-title"
            data-testid={ `${index}-card-name` }
          >
            { text }
          </h5>
        </div>
      </button>
    </div>
  );
}

CardsIng.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CardsIng;
