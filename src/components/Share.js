import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function Share() {
  const history = useHistory();
  const [showMsg, setShowMsg] = useState(false);

  const handleClick = () => {
    setShowMsg(true);
    if (history.location.pathname.includes('progress')) {
      const url = history.location.pathname;
      const newURL = url.substring(0, url.lastIndexOf('/'));
      copy(`http://localhost:3000${newURL}`);
    } else copy(`http://localhost:3000${history.location.pathname}`);
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
            data-testid="share-btn"
            onClick={ handleClick }
          />
        )}
    </div>
  );
}

export default Share;
