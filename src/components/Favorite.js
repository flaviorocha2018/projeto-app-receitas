import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { detailsFoods, detailsDrinks } from '../services/functions';

function Favorite() {
  const [favoriteInitial, setFavoriteInitial] = useState({});
  const [favoriteState, setFavoriteState] = useState(false);
  const [
    listFavorites,
    setListFavorites,
  ] = useState(JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
  const history = useHistory();

  const SaveOnFavorite = async () => {
    setFavoriteState(true);
    const saveFavorite = [];
    let newFavorite = {};
    if (favoriteInitial.type === 'food') {
      const resultAPI = await detailsFoods(favoriteInitial.id);
      newFavorite = {
        ...favoriteInitial,
        nationality: resultAPI[0].strArea,
        category: resultAPI[0].strCategory,
        alcoholicOrNot: '',
        name: resultAPI[0].strMeal,
        image: resultAPI[0].strMealThumb,
      };
    } else {
      const resultAPI = await detailsDrinks(favoriteInitial.id);
      newFavorite = {
        ...favoriteInitial,
        nationality: '',
        category: resultAPI[0].strCategory,
        alcoholicOrNot: resultAPI[0].strAlcoholic,
        name: resultAPI[0].strDrink,
        image: resultAPI[0].strDrinkThumb,
      };
    }
    saveFavorite.push(newFavorite);
    const saveLocalStorage = [...listFavorites, ...saveFavorite];
    setListFavorites(saveLocalStorage);
    localStorage.setItem('favoriteRecipes', JSON.stringify(saveLocalStorage));
  };

  const DeleteFromFavorite = () => {
    setFavoriteState(false);
    const deleteLocalStorage = listFavorites
      .filter((item) => item.id !== favoriteInitial.id);
    setListFavorites(deleteLocalStorage);
    localStorage.setItem('favoriteRecipes', JSON.stringify(deleteLocalStorage));
  };

  useEffect(() => {
    const info = history.location.pathname.split('/');
    info.shift();
    info[0] = info[0].substring(0, info[0].length - 1);
    setFavoriteInitial({ id: info[1], type: info[0] });
    if (listFavorites.length > 0 && listFavorites.find((item) => item.id === info[1])) {
      setFavoriteState(true);
    }
  }, []);

  return (
    <div>
      { favoriteState
        ? (
          <div>
            <input
              type="image"
              src={ blackHeartIcon }
              alt="Heart On Icon"
              data-testid="favorite-btn"
              onClick={ DeleteFromFavorite }
            />
          </div>)
        : (
          <div>
            <input
              type="image"
              src={ whiteHeartIcon }
              alt="Heart Off Icon"
              data-testid="favorite-btn"
              onClick={ SaveOnFavorite }
            />
          </div>
        )}
    </div>
  );
}

export default Favorite;
