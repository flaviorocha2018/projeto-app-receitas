import React, { useEffect, useContext } from 'react';
import RecipesContext from '../context/Context';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Buttons from '../components/Buttons';
import CardsFavorite from '../components/CardsFavorite';

function FavoriteRecipes() {
  const {
    setTitle,
    setIconShow,
    checkLocal,
    setCheckLocal,
    restoreCheckLocal,
    setRestoreCheckLocal,
  } = useContext(RecipesContext);

  useEffect(() => {
    setTitle({ title: 'Favorite Recipes' });
    setIconShow({ iconShow: false });
    setCheckLocal(JSON
      .parse(localStorage.getItem('favoriteRecipes')));
    setRestoreCheckLocal(JSON
      .parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  const filterRecipes = async ({ target }) => {
    const { value } = target;
    await setCheckLocal(restoreCheckLocal);
    if (value !== 'all') {
      setCheckLocal(restoreCheckLocal.filter((item) => (item.type === value)));
    }
  };

  // useEffect(() => {
  // }, [checkLocal]);

  return (
    <section className="">
      <Header />
      <Buttons
        filterRecipes={ filterRecipes }
      />
      { checkLocal.map((item, index) => (
        <CardsFavorite
          key={ index }
          index={ index }
          item={ item }
        />
      ))}
    </section>
  );
}

export default FavoriteRecipes;
