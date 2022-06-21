import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './Context';

function Provider({ children }) {
  const [title, setTitle] = useState({ title: 'Foods' });
  const [iconShow, setIconShow] = useState({ iconShow: true });
  const [searchInput, setSearchInput] = useState({ searchInput: '' });
  const [searchParam, setSearchParam] = useState({ searchParam: '' });

  return (
    <RecipesContext.Provider
      value={ {
        title,
        setTitle,
        iconShow,
        setIconShow,
        searchInput,
        setSearchInput,
        searchParam,
        setSearchParam,
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
