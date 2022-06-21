import React, { useEffect, useContext } from 'react';
import RecipesContext from '../context/Context';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';

function DoneRecipes() {
  const { setTitle, setIconShow } = useContext(RecipesContext);
  useEffect(() => {
    setTitle({ title: 'Done Recipes' });
    setIconShow({ iconShow: false });
  }, []);
  return (
    <section className="">
      <Header />
    </section>
  );
}

export default DoneRecipes;
