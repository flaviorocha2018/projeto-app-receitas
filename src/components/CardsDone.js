import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShareDone from './ShareDone';

function CardsDone(props) {
  const [tags, setTags] = useState([]);
  const { index, item } = props;

  useEffect(() => {
    if (typeof item.tags === 'object') setTags(item.tags);
    else {
      const newTags = [];
      newTags.push(item.tags.split(','));
      setTags(newTags);
    }
  }, []);

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
        { tags.map((tag) => (
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
  item: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CardsDone;
