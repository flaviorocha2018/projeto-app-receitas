import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './Context';

function Provider({ children }) {
  const [email, setEmail] = useState({ email: '' });
  const [password, setPassword] = useState({ password: '' });

  return (
    <RecipesContext.Provider value={ { email, setEmail, password, setPassword } }>
      {children}
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
