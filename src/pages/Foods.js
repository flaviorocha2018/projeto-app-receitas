import React, { useState, useContext, useEffect } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import { getMeals, getMealsCat, getAllCategoryMeals } from '../services/functions';

function Foods() {
  const { setTitle, setIconShow, allMeals, setAllMeals } = useContext(RecipesContext);
  const [selectMeals, setSelectMeals] = useState([]);
  const [selectMealsRestore, setSelectMealsRestore] = useState([]);
  const [catMeals, setCatMeals] = useState([]);
  const [categorySelected, setCategorySelected] = useState('');
  const history = useHistory();

  useEffect(() => {
    setTitle({ title: 'Foods' });
    setIconShow({ iconShow: true });
    async function apiMeals() {
      const resultAPI = await getMeals();
      setAllMeals(resultAPI);
      setSelectMealsRestore(resultAPI);
      const LIMIT = 5;
      const resultCatMeals = await getMealsCat();
      setCatMeals(resultCatMeals.slice(0, LIMIT));
    }
    apiMeals();
  }, []);

  const redirectToDetails = () => {
    const mealID = allMeals[0].idMeal;
    history.push(`/foods/${mealID}`);
  };

  useEffect(() => {
    const LIMIT = 12;
    if (allMeals.length === 1 && categorySelected.length === 0) redirectToDetails();
    else setSelectMeals(allMeals.slice(0, LIMIT));
  }, [allMeals]);

  const selectCategorys = async ({ target }) => {
    if (categorySelected === target.value) {
      setAllMeals(selectMealsRestore);
      setCategorySelected('');
    } else {
      setCategorySelected(target.value);
      const resultAPI = await getAllCategoryMeals(target.value);
      setAllMeals(resultAPI);
    }
  };

  const selectAllCategorys = async () => {
    setAllMeals(selectMealsRestore);
    setCategorySelected('');
  };

  return (
    <section className="">
      <Header />
      <div>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ selectAllCategorys }
        >
          All
        </button>
        { catMeals.map((cat, index) => (
          <button
            type="button"
            key={ index }
            value={ cat.strCategory }
            data-testid={ `${cat.strCategory}-category-filter` }
            onClick={ selectCategorys }
          >
            { cat.strCategory }
          </button>
        ))}
      </div>
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

export default Foods;
