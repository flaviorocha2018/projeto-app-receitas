import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShareDone from './ShareDone';

function CardsDone(props) {
  const { index, item } = props;
  return (
    <div
      className="card"
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
        <h6
          className=""
          data-testid={ `${index}-horizontal-done-date` }
        >
          { item.doneDate }
        </h6>
        <ShareDone
          index={ index }
          id={ item.id }
          type={ `${item.type}s` }
        />
        { item.tags.map((tag) => (
          <h6
            key={ tag }
            className=""
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            { tag }
          </h6>
        ))}
      </div>
    </div>
  );
}

CardsDone.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    tags: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    nationality: PropTypes.string,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardsDone;
