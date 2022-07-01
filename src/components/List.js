import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/Context';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function List(props) {
  const { inProgressRecipe, setInProgressRecipe } = useContext(RecipesContext);
  const [itemDone, setItemDone] = useState(false);
  const [itemChecked, setItemChecked] = useState(true);
  const [itemsLocal] = useState(JSON
    .parse(localStorage.getItem('inProgressRecipes')) || inProgressRecipe);
  const { name, index, measures, checkAll, checkAll2, type, id, ingredients } = props;
  const types = type === 'foods' ? 'meals' : 'cocktails';

  const check = () => {
    if ((itemsLocal[types][id] || []).length === ingredients) return checkAll();
    return checkAll2();
  };

  useEffect(() => {
    const itemOnStorage = itemsLocal[types][id];
    if (itemOnStorage && itemOnStorage.includes(`${name} - ${measures[index]}`)) {
      setInProgressRecipe(itemsLocal);
      setItemDone(true);
    } else {
      setItemChecked(false);
    }

    check();
  }, []);

  const checkbox = ({ target }) => {
    setItemChecked(!itemChecked);
    setItemDone(!itemDone);
    const data = inProgressRecipe[types][id];

    if ((data || []).includes(target.value)) { // remove ingrediente selecionadp dp localStorage
      itemsLocal[types][id] = data.filter((item) => item !== target.value);
    } else if (data) {
      itemsLocal[types][id] = [...inProgressRecipe[types][id],
        target.value];
    } else itemsLocal[types][id] = [target.value];

    localStorage.setItem('inProgressRecipes', JSON.stringify(itemsLocal));
    setInProgressRecipe(itemsLocal);

    check(); // resolve bug da quantidade de ingredientes selecionados
  };

  return (
    <label
      htmlFor={ `${name} - ${measures[index]}` }
      data-testid={ `${index}-ingredient-step` }
      className={ itemDone ? 'done-ingredient' : '' }
    >
      <input
        type="checkbox"
        id={ `${name} - ${measures[index]}` }
        value={ `${name} - ${measures[index]}` }
        onChange={ checkbox }
        checked={ itemChecked }
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
  checkAll2: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  ingredients: PropTypes.number.isRequired,
};

export default List;
