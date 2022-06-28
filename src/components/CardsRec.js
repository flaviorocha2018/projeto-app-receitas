import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

function CardsRec(props) {
  const { image, text, index } = props;
  return (
    <div
      className="card-display"
      data-testid={ `${index}-recomendation-card` }
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
          data-testid={ `${index}-recomendation-title` }
        >
          { text }
        </h5>
      </div>
    </div>
  );
}

CardsRec.propTypes = {
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CardsRec;
