import React, { useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

function List(props) {
  const [itemDone, setItemDone] = useState(false);
  const { name, index, measures, checkAll } = props;

  const checkbox = () => {
    setItemDone(!itemDone);
    checkAll();
  };

  return (
    <label
      htmlFor={ name }
      data-testid={ `${index}-ingredient-step` }
      className={ itemDone ? 'done-ingredient' : '' }
    >
      <input
        type="checkbox"
        id={ name }
        value={ name }
        onChange={ checkbox }
      />
      {`${name} - ${measures[index]}`}
    </label>
  );
}

List.propTypes = {
  name: PropTypes.string.isRequired,
  measures: PropTypes.arrayOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  checkAll: PropTypes.func.isRequired,
};

export default List;
