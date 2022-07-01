import React, { useState, useContext, useEffect } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import {
  getMeals,
  getMealsCat,
  getAllCategoryMeals,
  filterMeals,
} from '../services/functions';

function Foods() {
  const {
    setTitle,
    setIconShow,
    allMeals,
    setAllMeals,
    searchInput,
    setSearchInput,
  } = useContext(RecipesContext);
  const [selectMeals, setSelectMeals] = useState([]);
  const [selectMealsRestore, setSelectMealsRestore] = useState([]);
  const [catMeals, setCatMeals] = useState([]);
  const [categorySelected, setCategorySelected] = useState('');
  const history = useHistory();

  const searchIngredients = async () => {
    const result = await filterMeals(searchInput.searchInput);
    setAllMeals(result);
  };

  const getAllMeals = async () => {
    const result = await getMeals();
    setAllMeals(result);
    setSelectMealsRestore(result);
  };

  const apiMeals = async () => {
    if (searchInput.searchInput !== '') searchIngredients();
    else getAllMeals();
    const LIMIT = 5;
    const resultCatMeals = await getMealsCat();
    setCatMeals(resultCatMeals.slice(0, LIMIT));
  };

  useEffect(() => {
    setTitle({ title: 'Foods' });
    setIconShow({ iconShow: true });
    apiMeals();
  }, []);

  const redirectToDetails = () => {
    const mealID = allMeals[0].idMeal;
    history.push(`/foods/${mealID}`);
  };

  useEffect(() => {
    const LIMIT = 12;
    if ((allMeals || []).length === 1
      && categorySelected.length === 0) redirectToDetails();
    else setSelectMeals((allMeals || []).slice(0, LIMIT));
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

  const selectAllCategorys = () => {
    getAllMeals();
    setCategorySelected('');
    setSearchInput({ searchInput: '' });
  };

  return (
    <section className="">
      <Header />
      <div className="cat-buttons">
        <button
          className="cat-btns"
          type="button"
          data-testid="All-category-filter"
          onClick={ selectAllCategorys }
        >
          All
        </button>
        { catMeals.map((cat, index) => (
          <button
            type="button"
            className="cat-btns"
            key={ index }
            value={ cat.strCategory }
            data-testid={ `${cat.strCategory}-category-filter` }
            onClick={ selectCategorys }
          >
            { cat.strCategory }
          </button>
        ))}
      </div>
      <div className="card-father">
        { selectMeals.map((meal, index) => (
          <Link to={ `/foods/${meal.idMeal}` } key={ index }>
            <Cards
              index={ index }
              image={ meal.strMealThumb }
              text={ meal.strMeal }
            />
          </Link>
        ))}
      </div>
      <Footer />
    </section>
  );
}

export default Foods;
