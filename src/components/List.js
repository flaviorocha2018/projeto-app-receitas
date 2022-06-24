import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/Context';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function List(props) {
  const { inProgressRecipe, setInProgressRecipe } = useContext(RecipesContext);
  const [itemDone, setItemDone] = useState(false);
  const [itemChecked, setItemChecked] = useState(false);
  const [itemsLocal] = useState(JSON.parse(localStorage.getItem('inProgressRecipes'))
    || inProgressRecipe);
  const { name, index, measures, checkAll, type, id } = props;
  const types = type === 'foods' ? 'meals' : 'cocktails';

  useEffect(() => {
    console.log(itemsLocal);
    if (itemsLocal[types][id]) {
      console.log(itemsLocal);
      return itemsLocal[types][id].includes(name)
        ? setItemChecked(true) : setItemChecked(false);
    }
  }, []);

  const checkbox = () => {
    setItemChecked(!itemChecked);

    setItemDone(!itemDone);

    if (itemsLocal[types][id]) {
      itemsLocal[types][id] = [...itemsLocal[types][id], name];
    } else itemsLocal[types][id] = [name];

    setTimeout(() => localStorage
      .setItem('inProgressRecipes', JSON.stringify(itemsLocal)), 2);
    setInProgressRecipe(itemsLocal);
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
        checked={ itemChecked }
        // itemChecked ? checked : null
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
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default List;
