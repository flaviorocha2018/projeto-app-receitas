import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { detailsDrinks, getMeals } from '../services/functions';
import CardsRec from '../components/CardsRec';
import Share from '../components/Share';
import Favorite from '../components/Favorite';

function DetailsDrinks() {
  const [drinkDetails, setDrinkDetails] = useState('');
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const [drinkMeasures, setDrinkMeasures] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const history = useHistory();

  const getIngredients = () => {
    const ingredients = {};
    Object.keys(drinkDetails).forEach((key) => {
      if (key.includes('strIngredient')) {
        ingredients[key] = drinkDetails[key];
      }
    });
    const filteredIngredients = Object.values(ingredients)
      .filter((value) => value !== null);
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

  useEffect(() => {
    async function getAPI() {
      const drinkID = (history.location.pathname.replace(/\D/g, ''));
      const resultAPI = await detailsDrinks(drinkID);
      const recomendationsAPI = await getMeals();
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
    getIngredients();
    getMeasures();
  }, [drinkDetails]);

  return (
    <section className="">
      <img
        src={ drinkDetails.strDrinkThumb }
        alt={ drinkDetails.strDrink }
        data-testid="recipe-photo"
      />
      <div>
        <h2
          data-testid="recipe-title"
        >
          { drinkDetails.strDrink }
        </h2>
        <div>
          <Share />
          <Favorite />
        </div>
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
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="btn-start-recipe"
        onClick={ () => history.push(`${history.location.pathname}/in-progress`) }
      >
        Start Recipe
      </button>
    </section>
  );
}

export default DetailsDrinks;
