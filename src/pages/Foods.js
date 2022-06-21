import React, { useContext, useEffect } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesContext from '../context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Foods() {
  const { setTitle, setIconShow } = useContext(RecipesContext);
  useEffect(() => {
    setTitle({ title: 'Foods' });
    setIconShow({ iconShow: true });
  }, []);
  return (
    <section className="">
      <Header />
      <Footer />
    </section>
  );
}

export default Foods;
