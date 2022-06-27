import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/Context';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteOn(props) {
  const { id, index } = props;
  const {
    checkLocal,
    setCheckLocal,
    setRestoreCheckLocal,
  } = useContext(RecipesContext);

  const [
    listFavorites,
    setListFavorites,
  ] = useState(JSON.parse(localStorage.getItem('favoriteRecipes')) || []);

  const RemoveFromFavorite = () => {
    const deleteLocalStorage = listFavorites
      .filter((item) => item.id !== id);
    setListFavorites(deleteLocalStorage);
    localStorage.setItem('favoriteRecipes', JSON.stringify(deleteLocalStorage));
    setCheckLocal(deleteLocalStorage);
    setRestoreCheckLocal(deleteLocalStorage);
  };

  useEffect(() => {
    setListFavorites(checkLocal);
  }, [checkLocal]);

  return (
    <div>
      <div>
        <input
          type="image"
          src={ blackHeartIcon }
          alt="Heart On Icon"
          data-testid={ `${index}-horizontal-favorite-btn` }
          onClick={ RemoveFromFavorite }
        />
      </div>
    </div>
  );
}

FavoriteOn.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default FavoriteOn;
