import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './Context';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState({ title: 'Foods' });
  const [iconShow, setIconShow] = useState({ iconShow: true });
  const [searchInput, setSearchInput] = useState({ searchInput: '' });
  const [searchParam, setSearchParam] = useState({ searchParam: '' });
  const [allMeals, setAllMeals] = useState([]);
  const [allDrinks, setAllDrinks] = useState([]);

  return (
    <RecipesContext.Provider
      value={ {
        email,
        setEmail,
        title,
        setTitle,
        iconShow,
        setIconShow,
        searchInput,
        setSearchInput,
        searchParam,
        setSearchParam,
        allMeals,
        setAllMeals,
        allDrinks,
        setAllDrinks,
      } }
    >
      {children}
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
