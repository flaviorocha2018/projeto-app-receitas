import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/Context';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explore() {
  const { setTitle, setIconShow } = useContext(RecipesContext);
  const history = useHistory();
  useEffect(() => {
    setIconShow({ iconShow: false });
    if (history.location.pathname === '/explore/foods') {
      setTitle({ title: 'Explore Foods' });
    } else setTitle({ title: 'Explore Drinks' });
  }, []);
  return (
    <section className="">
      <Header />
      <Footer />
    </section>
  );
}

export default Explore;
