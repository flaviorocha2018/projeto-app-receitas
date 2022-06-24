import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareDone(props) {
  const [showMsg, setShowMsg] = useState(false);
  const { index, type, id } = props;

  const handleClick = () => {
    setShowMsg(true);
    copy(`http://localhost:3000/${type}/${id}`);
  };

  return (
    <div>
      { showMsg
        ? <p>Link copied!</p>
        : (
          <input
            type="image"
            src={ shareIcon }
            alt="Share Icon"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ handleClick }
          />
        )}
    </div>
  );
}

ShareDone.propTypes = {
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ShareDone;
