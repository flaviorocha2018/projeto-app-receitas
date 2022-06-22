import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/Context';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explore() {
  const { title, setTitle, setIconShow } = useContext(RecipesContext);
  const history = useHistory();
  const pageTitle = 'Explore Foods';

  useEffect(() => {
    setIconShow({ iconShow: false });
    if (history.location.pathname === '/explore/foods') {
      setTitle({ title: pageTitle });
    } else setTitle({ title: 'Explore Drinks' });
  }, []);

  const redirecIngredient = () => {
    if (title.title === pageTitle) {
      history.push('/explore/foods/ingredients');
    } else history.push('/explore/drinks/ingredients');
  };

  const redirecNationality = () => {
    history.push('/explore/foods/nationalities');
  };

  const redirectUser = () => {

  };

  return (
    <section className="">
      <Header />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ redirecIngredient }
      >
        By Ingredient
      </button>
      { title.title === pageTitle
        && (
          <button
            type="button"
            data-testid="explore-by-nationality"
            onClick={ redirecNationality }
          >
            By Nationality
          </button>
        )}
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ redirectUser }
      >
        Surprise me!
      </button>
      <Footer />
    </section>
  );
}

export default Explore;
