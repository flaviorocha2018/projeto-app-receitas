import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/Context';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import {
  getMeals,
  getNation,
  getNationsFoods,
} from '../services/functions';

function Nationalities() {
  const { setTitle, setIconShow } = useContext(RecipesContext);
  const [nations, setNations] = useState([]);
  const [selectMeals, setSelectMeals] = useState([]);

  const showInitialMeals = async () => {
    const LIMIT = 12;
    const resultMeals = await getMeals();
    setSelectMeals(resultMeals.slice(0, LIMIT));
  };

  useEffect(() => {
    setTitle({ title: 'Explore Nationalities' });
    setIconShow({ iconShow: true });
    showInitialMeals();
    async function apiMeals() {
      const resultNations = await getNation();
      setNations(resultNations);
    }
    apiMeals();
  }, []);

  const showMeals = async (input) => {
    const LIMIT = 12;
    const result = await getNationsFoods(input);
    setSelectMeals(result.slice(0, LIMIT));
  };

  const changeNation = ({ target }) => {
    if (target.value === 'All') showInitialMeals();
    else showMeals(target.value);
  };

  return (
    <section className="">
      <Header />
      <select
        className="form-select"
        aria-label="Default select example"
        data-testid="explore-by-nationality-dropdown"
        onChange={ changeNation }
      >
        <option
          defaultValue
          value="All"
          data-testid="All-option"
        >
          All
        </option>
        { nations.map((nation, index) => (
          <option
            data-testid={ `${nation.strArea}-option` }
            key={ index }
            value={ nation.strArea }
          >
            { nation.strArea }
          </option>
        ))}
      </select>
      { selectMeals.map((meal, index) => (
        <Link to={ `/foods/${meal.idMeal}` } key={ index }>
          <Cards
            index={ index }
            image={ meal.strMealThumb }
            text={ meal.strMeal }
          />
        </Link>
      ))}
      <Footer />
    </section>
  );
}

export default Nationalities;
