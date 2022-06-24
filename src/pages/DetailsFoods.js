import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { detailsFoods, getDrinks } from '../services/functions';
import CardsRec from '../components/CardsRec';
import Share from '../components/Share';
import Favorite from '../components/Favorite';

function DetailsFoods() {
  const [foodDetails, setFoodDetails] = useState('');
  const [foodIngredients, setFoodIngredients] = useState([]);
  const [foodMeasures, setFoodMeasures] = useState([]);
  const [videoURL, setVideoURL] = useState('');
  const [recomendationsDrinks, setRecomendationsDrinks] = useState([]);
  const [startBtn, setStartBtn] = useState(false);
  const [continueBtn, setContinueBtn] = useState(false);
  const [checkLocal] = useState(JSON
    .parse(localStorage.getItem('doneRecipes')) || []);
  const [checkLocalInProgress] = useState(JSON
    .parse(localStorage.getItem('inProgressRecipes')) || { cocktails: {}, meals: {} });

  const history = useHistory();

  const getIngredients = () => {
    const ingredients = {};
    Object.keys(foodDetails).forEach((key) => {
      if (key.includes('strIngredient')) {
        ingredients[key] = foodDetails[key];
      }
    });
    const filteredIngredients = Object.values(ingredients)
      .filter((value) => value !== '')
      .filter((value) => value !== null);
    setFoodIngredients(filteredIngredients);
  };

  const getMeasures = () => {
    const measures = {};
    Object.keys(foodDetails).forEach((key) => {
      if (key.includes('strMeasure')) {
        measures[key] = foodDetails[key];
      }
    });
    const filteredMeasures = Object.values(measures)
      .filter((value) => value !== '');
    setFoodMeasures(filteredMeasures);
  };

  const fixVideo = (input) => {
    const { strYoutube } = input;
    const fixedVideoURL = strYoutube.replace(/watch\?v=/g, 'embed/');
    setVideoURL(fixedVideoURL);
  };

  const isBtnDisabled = () => {
    setStartBtn(checkLocal.some((item) => item.id === foodDetails.idMeal));
  };

  const isBtnContinue = () => {
    const btnCtn = Object.keys(checkLocalInProgress.meals).includes(foodDetails.idMeal);
    setContinueBtn(btnCtn);
  };

  useEffect(() => {
    async function getAPI() {
      const foodID = (history.location.pathname.replace(/\D/g, ''));
      const resultAPI = await detailsFoods(foodID);
      const recomendationsAPI = await getDrinks();
      setFoodDetails(resultAPI[0]);
      setRecomendationsDrinks(recomendationsAPI);
      fixVideo(resultAPI[0]);
    }
    getAPI();
  }, []);

  useEffect(() => {
    const LIMIT = 6;
    setRecomendationsDrinks(recomendationsDrinks.slice(0, LIMIT));
  }, [foodMeasures]);

  useEffect(() => {
    isBtnDisabled();
    isBtnContinue();
    getIngredients();
    getMeasures();
  }, [foodDetails]);

  return (
    <section className="">
      <img
        src={ foodDetails.strMealThumb }
        alt={ foodDetails.strMeal }
        data-testid="recipe-photo"
      />
      <div>
        <h2
          data-testid="recipe-title"
        >
          { foodDetails.strMeal }
        </h2>
        <div>
          <Share />
          <Favorite />
        </div>
        <h4
          data-testid="recipe-category"
        >
          { foodDetails.strCategory }
        </h4>
      </div>
      <div>
        <ul>
          { foodIngredients.map((item, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${item} - ${foodMeasures[index]}`}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p
          data-testid="instructions"
        >
          { foodDetails.strInstructions }
        </p>
      </div>
      <div>
        <iframe
          data-testid="video"
          src={ videoURL }
          title="Youtube Video"
        />
      </div>
      <div>
        <p>
          RECOMMENDATIONS
        </p>
      </div>
      <div className="carousel-card">
        { recomendationsDrinks.map((drink, index) => (
          <Link to={ `/drinks/${drink.idDrink}` } key={ index }>
            <CardsRec
              index={ index }
              image={ drink.strDrinkThumb }
              text={ drink.strDrink }
            />
          </Link>
        ))}
      </div>
      { !startBtn
        && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="btn-start-recipe"
            onClick={ () => history.push(`${history.location.pathname}/in-progress`) }
          >
            { continueBtn ? 'Continue Recipe' : 'Start Recipe' }
          </button>
        )}
    </section>
  );
}

export default DetailsFoods;
