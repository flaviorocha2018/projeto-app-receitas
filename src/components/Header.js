import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/Context';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const [searchBar, setSearchBar] = useState(false);
  const { title, iconShow } = useContext(RecipesContext);

  const toggleSearch = () => {
    setSearchBar(!searchBar);
  };

  return (
    <header className="">
      <div className="header-icons">
        <Link to="/profile">
          <img
            src={ profileIcon }
            alt="Profile Icon"
            data-testid="profile-top-btn"
          />
        </Link>
        <h2
          data-testid="page-title"
        >
          { title.title }
        </h2>
        { iconShow.iconShow
          && (
            <input
              type="image"
              src={ searchIcon }
              alt="Search Icon"
              data-testid="search-top-btn"
              onClick={ () => toggleSearch() }
            />) }
      </div>
      { searchBar
        && (
          <SearchBar />
        )}
    </header>
  );
}

export default Header;
