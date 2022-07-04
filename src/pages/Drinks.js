import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../context/Context';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import {
  getDrinks,
  getDrinksCat,
  getAllCategoryDrinks,
  filterDrinks,
} from '../services/functions';

function Drinks() {
  const {
    setTitle,
    setIconShow,
    allDrinks,
    setAllDrinks,
    searchInput,
    setSearchInput,
  } = useContext(RecipesContext);
  const [selectDrinks, setSelectDrinks] = useState([]);
  const [selectDrinksRestore, setSelectDrinksRestore] = useState([]);
  const [catDrinks, setCatDrinks] = useState([]);
  const [categorySel, setCategorySel] = useState('');
  const history = useHistory();

  const searchIngredients = async () => {
    const result = await filterDrinks(searchInput.searchInput);
    setAllDrinks(result);
  };

  const getAllDrinks = async () => {
    const result = await getDrinks();
    setAllDrinks(result);
    setSelectDrinksRestore(result);
  };

  useEffect(() => {
    setTitle({ title: 'Drinks' });
    setIconShow({ iconShow: true });
    async function apiDrinks() {
      if (searchInput.searchInput !== '') searchIngredients();
      else getAllDrinks();
      const LIMIT = 5;
      const resultCatDrinks = await getDrinksCat();
      setCatDrinks(resultCatDrinks.slice(0, LIMIT));
    }
    apiDrinks();
  }, []);

  const redirectToDetails = () => {
    const drinkID = allDrinks[0].idDrink;
    setAllDrinks(selectDrinksRestore);
    history.push(`/drinks/${drinkID}`);
  };

  useEffect(() => {
    const LIMIT = 12;
    if ((allDrinks || []).length === 1 && categorySel.length === 0) redirectToDetails();
    else setSelectDrinks((allDrinks || []).slice(0, LIMIT));
  }, [allDrinks]);

  const selectCategorys = async ({ target }) => {
    if (categorySel === target.value) {
      setAllDrinks(selectDrinksRestore);
      setCategorySel('');
    } else {
      setCategorySel(target.value);
      const resultAPI = await getAllCategoryDrinks(target.value);
      setAllDrinks(resultAPI);
    }
  };

  const selectAllCategorys = () => {
    getAllDrinks();
    setCategorySel('');
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
        { catDrinks.map((cat, index) => (
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
        { selectDrinks.map((drink, index) => (
          <Link to={ `/drinks/${drink.idDrink}` } key={ index }>
            <Cards
              index={ index }
              image={ drink.strDrinkThumb }
              text={ drink.strDrink }
            />
          </Link>
        ))}
      </div>
      <Footer />
    </section>
  );
}

export default Drinks;
