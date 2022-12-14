import React, { useState, useEffect, useContext } from 'react';
import RecipesContext from '../context/Context';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Buttons from '../components/Buttons';
import CardsFavorite from '../components/CardsFavorite';
import ButtonHome from '../components/ButtonHome';

function FavoriteRecipes() {
  const {
    setTitle,
    setIconShow,
    checkLocal,
    setCheckLocal,
    restoreCheckLocal,
    setRestoreCheckLocal,
  } = useContext(RecipesContext);
  const [showFavorites, setShowFavorites] = useState([]);

  useEffect(() => {
    setTitle({ title: 'Favorite Recipes' });
    setIconShow({ iconShow: false });
    setCheckLocal(JSON
      .parse(localStorage.getItem('favoriteRecipes')) || []);
    setRestoreCheckLocal(JSON
      .parse(localStorage.getItem('favoriteRecipes')) || []);
  }, []);

  const filterRecipes = async ({ target }) => {
    const { value } = target;
    await setCheckLocal(restoreCheckLocal);
    if (value !== 'all') {
      setCheckLocal(restoreCheckLocal.filter((item) => (item.type === value)));
    }
  };

  useEffect(() => {
    setShowFavorites(checkLocal);
  }, [checkLocal]);

  return (
    <section className="">
      <Header />
      <Buttons
        filterRecipes={ filterRecipes }
      />
      { showFavorites.map((item, index) => (
        <CardsFavorite
          key={ index }
          index={ index }
          item={ item }
        />
      ))}
      <ButtonHome />
    </section>
  );
}

export default FavoriteRecipes;
