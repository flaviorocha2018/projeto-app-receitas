import React, { useEffect, useContext } from 'react';
import RecipesContext from '../context/Context';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreMain() {
  const { setTitle, setIconShow } = useContext(RecipesContext);
  useEffect(() => {
    setTitle({ title: 'Explore' });
    setIconShow({ iconShow: false });
  }, []);
  return (
    <section className="">
      <Header />
      <Footer />
    </section>
  );
}

export default ExploreMain;
