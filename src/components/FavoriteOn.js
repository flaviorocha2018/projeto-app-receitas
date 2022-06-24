import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteOn() {
  return (
    <div>
      <img
        src={ blackHeartIcon }
        alt="Heart On Icon"
        data-testid="favorite-btn"
      />
    </div>
  );
}

export default FavoriteOn;
