import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/Context';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const { setSearchInput } = useContext(RecipesContext);

  const handleClick = () => {
    setSearchInput({ searchInput: '' });
  };

  return (
    <footer
      data-testid="footer"
      className="footer-icons"
    >
      <Link to="/drinks" onClick={ () => handleClick() }>
        <img
          src={ drinkIcon }
          alt="Drink Icon"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/explore" onClick={ () => handleClick() }>
        <img
          src={ exploreIcon }
          alt="Explore Icon"
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link to="/foods" onClick={ () => handleClick() }>
        <img
          src={ mealIcon }
          alt="Meal Icon"
          data-testid="food-bottom-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;
