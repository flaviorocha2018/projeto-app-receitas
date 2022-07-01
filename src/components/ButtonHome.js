import React from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ButtonHome() {
  const history = useHistory();
  const historyPathName = history.location.pathname;

  const handleClick = () => {
    history.push('/foods');
  };

  return (
    <div className="cat-buttons">
      <button
        type="button"
        className={
          historyPathName === '/done-recipes' || historyPathName === '/favorite-recipes'
            ? 'home-button' : 'cat-btns'
        }
        onClick={ handleClick }
      >
        Home
      </button>
    </div>
  );
}

export default ButtonHome;
