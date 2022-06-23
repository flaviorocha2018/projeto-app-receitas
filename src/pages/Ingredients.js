import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/Context';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getIngredientsFoods, getIngredientsDrinks } from '../services/functions';
import CardsIng from '../components/CardsIng';

function Ingredients() {
  const { setTitle, setIconShow } = useContext(RecipesContext);
  const [ingredients, setIngredients] = useState([]);
  const [pageTitle, setPageTitle] = useState('');
  const history = useHistory();

  useEffect(() => {
    setTitle({ title: 'Explore Ingredients' });
    setIconShow({ iconShow: false });
    async function api() {
      if (history.location.pathname === '/explore/foods/ingredients') {
        setPageTitle('foods');
        const result = await getIngredientsFoods();
        const finalResult = result.map((item) => item.strIngredient);
        setIngredients(finalResult);
      } else {
        setPageTitle('drinks');
        const result = await getIngredientsDrinks();
        const finalResult = result.map((item) => item.strIngredient1);
        setIngredients(finalResult);
      }
    }
    api();
  }, []);

  return (
    <section className="">
      <Header />
      <div>
        { ingredients.map((item, index) => (
          <CardsIng
            key={ index }
            index={ index }
            pageTitle={ pageTitle }
            text={ item }
          />
        ))}
      </div>
      <Footer />
    </section>
  );
}

export default Ingredients;
