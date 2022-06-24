import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/Context';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { detailsFoods, detailsDrinks } from '../services/functions';
import Share from '../components/Share';
import Favorite from '../components/Favorite';
import List from '../components/List';

function InProgress() {
  const { inProgressRecipe, setInProgressRecipe } = useContext(RecipesContext);
  const [type, setType] = useState('');
  const [details, setDetails] = useState('');
  const [allDetails, setAllDetails] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [counter, setCounter] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [checkLocal] = useState(JSON
    .parse(localStorage.getItem('doneRecipes')) || []);
  const history = useHistory();
  const newDate = new Date();

  const getIngredients = () => {
    const ingredientsIP = {};
    Object.keys(allDetails).forEach((key) => {
      if (key.includes('strIngredient')) {
        ingredientsIP[key] = allDetails[key];
      }
    });
    if (type === 'foods') {
      const filteredIngredients = Object.values(ingredientsIP)
        .filter((value) => value !== '')
        .filter((value) => value !== null);
      setIngredients(filteredIngredients);
    } else {
      const filteredIngredients = Object.values(ingredientsIP)
        .filter((value) => value !== null)
        .filter((value) => value !== '');
      setIngredients(filteredIngredients);
    }
  };

  const getMeasures = () => {
    const measuresIP = {};
    Object.keys(allDetails).forEach((key) => {
      if (key.includes('strMeasure')) {
        measuresIP[key] = allDetails[key];
      }
    });
    const filteredMeasures = Object.values(measuresIP)
      .filter((value) => value !== null);
    setMeasures(filteredMeasures);
  };

  const foodAPI = async (input) => {
    const resultAPI = await detailsFoods(input);
    setAllDetails(resultAPI[0]);
    setDetails({
      id: resultAPI[0].idMeal,
      type: 'food',
      name: resultAPI[0].strMeal,
      category: resultAPI[0].strCategory,
      nationality: resultAPI[0].strArea,
      alcoholicOrNot: '',
      image: resultAPI[0].strMealThumb,
      tags: resultAPI[0].strTags,
    });
  };

  const drinkAPI = async (input) => {
    const resultAPI = await detailsDrinks(input);
    setAllDetails(resultAPI[0]);
    setDetails({
      id: resultAPI[0].idDrink,
      type: 'drink',
      name: resultAPI[0].strDrink,
      category: resultAPI[0].strCategory,
      nationality: '',
      alcoholicOrNot: resultAPI[0].strAlcoholic,
      image: resultAPI[0].strDrinkThumb,
      tags: [],
    });
  };

  useEffect(() => {
    const info = history.location.pathname.split('/');
    setType(info[1]);
    if (info[1] === 'foods') foodAPI(info[2]);
    else drinkAPI(info[2]);
  }, []);

  useEffect(() => {
    getIngredients();
    getMeasures();
  }, [allDetails]);

  const checkAll = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    if (counter !== 0 && counter === ingredients.length) setBtnDisabled(false);
  }, [counter]);

  const deleteFromInProgress = () => {
    const types = details.type === 'foods' ? 'meals' : 'cocktails';
    delete inProgressRecipe[types][details.id];
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipe));
    setInProgressRecipe(inProgressRecipe);
  };

  const saveRecipeDone = () => {
    deleteFromInProgress();
    const data = newDate.toLocaleDateString().split('-').reverse();
    const fullDate = data[0];
    details.doneDate = fullDate;
    if (checkLocal !== null) {
      const saveStorage = [details, ...checkLocal];
      localStorage.setItem('doneRecipes', JSON.stringify(saveStorage));
    } else localStorage.setItem('doneRecipes', JSON.stringify(details));
    history.push('/done-recipes');
  };

  return (
    <section className="">
      <img
        src={ details.image }
        alt={ details.name }
        data-testid="recipe-photo"
      />
      <div>
        <h2
          data-testid="recipe-title"
        >
          { details.name }
        </h2>
        <div>
          <Share />
          <Favorite />
        </div>
        <h4
          data-testid="recipe-category"
        >
          { details.category }
        </h4>
      </div>
      <div>
        <div>
          { ingredients.map((item, index) => (
            <List
              key={ index }
              name={ item }
              index={ index }
              measures={ measures }
              checkAll={ checkAll }
              type={ type }
              id={ details.id }
            />
          ))}
        </div>
      </div>
      <div>
        <p
          data-testid="instructions"
        >
          { allDetails.strInstructions }
        </p>
      </div>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        className="finish-recipe-btn"
        onClick={ saveRecipeDone }
        disabled={ btnDisabled }
      >
        Finish Recipe
      </button>
    </section>
  );
}

export default InProgress;
