import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/Context';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreMain() {
  const { setTitle, setIconShow, setSearchInput } = useContext(RecipesContext);
  const history = useHistory();

  useEffect(() => {
    setTitle({ title: 'Explore' });
    setIconShow({ iconShow: false });
    setSearchInput({ searchInput: '' });
  }, []);

  return (
    <section className="">
      <Header />
      <div className="explore-btns">
        <button
          type="button"
          className="cat-btns"
          data-testid="explore-foods"
          onClick={ () => { history.push('/explore/foods'); } }
        >
          Explore Foods
        </button>
        <button
          type="button"
          className="cat-btns"
          data-testid="explore-drinks"
          onClick={ () => { history.push('/explore/drinks'); } }
        >
          Explore Drinks
        </button>
      </div>
      <Footer />
    </section>
  );
}

export default ExploreMain;
