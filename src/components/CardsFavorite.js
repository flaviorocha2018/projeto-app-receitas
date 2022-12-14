import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShareDone from './ShareDone';
import FavoriteOn from './FavoriteOn';

function CardsFavorite(props) {
  const { index, item } = props;

  return (
    <div
      className="final-display"
    >
      <Link to={ `${item.type}s/${item.id}` }>
        <img
          src={ item.image }
          className="card-img-top"
          alt={ item.name }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <div className="card-body">
        { item.type === 'food'
          ? (
            <h5
              className=""
              data-testid={ `${index}-horizontal-top-text` }
            >
              { `${item.nationality} - ${item.category}` }
            </h5>
          )
          : (
            <h5
              className=""
              data-testid={ `${index}-horizontal-top-text` }
            >
              { item.alcoholicOrNot }
            </h5>
          )}
        <Link to={ `${item.type}s/${item.id}` }>
          <h4
            className="card-title"
            data-testid={ `${index}-horizontal-name` }
          >
            { item.name }
          </h4>
        </Link>
        <ShareDone
          index={ index }
          id={ item.id }
          type={ `${item.type}s` }
        />
        <FavoriteOn
          index={ index }
          id={ item.id }
        />
      </div>
    </div>
  );
}

CardsFavorite.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CardsFavorite;
