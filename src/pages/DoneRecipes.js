import React, { useState, useEffect, useContext } from 'react';
import RecipesContext from '../context/Context';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Buttons from '../components/Buttons';
import CardsDone from '../components/CardsDone';
import ButtonHome from '../components/ButtonHome';

function DoneRecipes() {
  const { setTitle, setIconShow } = useContext(RecipesContext);
  const [checkLocal, setCheckLocal] = useState(JSON
    .parse(localStorage.getItem('doneRecipes')) || []);
  const [restoreCheckLocal] = useState(JSON
    .parse(localStorage.getItem('doneRecipes')) || []);

  useEffect(() => {
    setTitle({ title: 'Done Recipes' });
    setIconShow({ iconShow: false });
  }, []);

  const filterRecipes = async ({ target }) => {
    const { value } = target;
    await setCheckLocal(restoreCheckLocal);
    if (value !== 'all') {
      setCheckLocal(restoreCheckLocal.filter((item) => (item.type === value)));
    }
  };

  return (
    <section className="">
      <Header />
      <Buttons
        filterRecipes={ filterRecipes }
      />
      { checkLocal.map((item, index) => (
        <CardsDone
          key={ index }
          index={ index }
          item={ item }
        />
      ))}
      <ButtonHome />
    </section>
  );
}

export default DoneRecipes;
