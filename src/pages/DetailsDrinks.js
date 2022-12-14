import React, { useState, useContext, useEffect } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../context/Context';
import { detailsDrinks, getMeals } from '../services/functions';
import CardsRec from '../components/CardsRec';
import Share from '../components/Share';
import Favorite from '../components/Favorite';
import ButtonHome from '../components/ButtonHome';

function DetailsDrinks() {
  const { setSearchInput } = useContext(RecipesContext);
  const [drinkDetails, setDrinkDetails] = useState('');
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const [drinkMeasures, setDrinkMeasures] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [startBtn, setStartBtn] = useState(false);
  const [continueBtn, setContinueBtn] = useState(false);
  const [checkLocal] = useState(JSON
    .parse(localStorage.getItem('doneRecipes')) || []);
  const [checkLocalInProgress] = useState(JSON
    .parse(localStorage.getItem('inProgressRecipes')) || { cocktails: {}, meals: {} });
  const history = useHistory();

  const getIngredients = () => {
    const ingredients = {};
    Object.keys(drinkDetails).forEach((key) => {
      if (key.includes('strIngredient')) {
        ingredients[key] = drinkDetails[key];
      }
    });
    const filteredIngredients = Object.values(ingredients)
      .filter((value) => value !== null)
      .filter((value) => value !== '');
    setDrinkIngredients(filteredIngredients);
  };

  const getMeasures = () => {
    const measures = {};
    Object.keys(drinkDetails).forEach((key) => {
      if (key.includes('strMeasure')) {
        measures[key] = drinkDetails[key];
      }
    });
    const filteredMeasures = Object.values(measures)
      .filter((value) => value !== null);
    setDrinkMeasures(filteredMeasures);
  };

  const isBtnDisabled = () => {
    setStartBtn(checkLocal.some((item) => item.id === drinkDetails.idDrink));
  };

  const isBtnContinue = () => {
    const btnCtn = Object.keys(checkLocalInProgress.cocktails)
      .includes(drinkDetails.idDrink);
    setContinueBtn(btnCtn);
  };

  useEffect(() => {
    async function getAPI() {
      const drinkID = (history.location.pathname.replace(/\D/g, ''));
      const resultAPI = await detailsDrinks(drinkID);
      const recomendationsAPI = await getMeals();
      setSearchInput({ searchInput: '' });
      setDrinkDetails(resultAPI[0]);
      setRecomendations(recomendationsAPI);
    }
    getAPI();
  }, []);

  useEffect(() => {
    const LIMIT = 6;
    setRecomendations(recomendations.slice(0, LIMIT));
  }, [drinkMeasures]);

  useEffect(() => {
    isBtnDisabled();
    isBtnContinue();
    getIngredients();
    getMeasures();
  }, [drinkDetails]);

  return (
    <section className="details-back">
      <img
        src={ drinkDetails.strDrinkThumb }
        alt={ drinkDetails.strDrink }
        data-testid="recipe-photo"
        className="details-img"
      />
      <div className="details-name">
        <h2
          data-testid="recipe-title"
        >
          { drinkDetails.strDrink }
        </h2>
        <div className="details-btns">
          <Share />
          <Favorite />
        </div>
      </div>
      <div>
        <h4
          data-testid="recipe-category"
        >
          { drinkDetails.strAlcoholic }
        </h4>
      </div>
      <div>
        <ul>
          { drinkIngredients.map((item, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${item} - ${drinkMeasures[index]}`}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p
          data-testid="instructions"
        >
          { drinkDetails.strInstructions }
        </p>
      </div>
      <div>
        <p>
          RECOMMENDATIONS
        </p>
      </div>
      <div className="carousel-card">
        { recomendations.map((meal, index) => (
          <Link to={ `/foods/${meal.idMeal}` } key={ index }>
            <CardsRec
              index={ index }
              image={ meal.strMealThumb }
              text={ meal.strMeal }
            />
          </Link>
        ))}
      </div>
      <div className="end-button">
        <ButtonHome />
        { !startBtn
          && (
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="continue-btns"
              onClick={ () => history.push(`${history.location.pathname}/in-progress`) }
            >
              { continueBtn ? 'Continue Recipe' : 'Start Recipe' }
            </button>
          )}
      </div>
    </section>
  );
}

export default DetailsDrinks;
