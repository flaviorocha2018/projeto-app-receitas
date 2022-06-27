import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';

function Cards(props) {
  const { image, text, index } = props;
  return (
    <div
      className="card-display"
      data-testid={ `${index}-recipe-card` }
    >
      <img
        src={ image }
        className="card-img-top"
        alt={ text }
        data-testid={ `${index}-card-img` }
      />
      <div className="card-body">
        <h5
          className="card-title"
          data-testid={ `${index}-card-name` }
        >
          { text }
        </h5>
      </div>
    </div>
  );
}

Cards.propTypes = {
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Cards;
