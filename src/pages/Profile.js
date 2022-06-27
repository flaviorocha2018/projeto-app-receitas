import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/Context';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const { setTitle, setIconShow } = useContext(RecipesContext);
  const history = useHistory();
  const renderEmailUser = () => {
    if (localStorage.length > 0) {
      return (JSON.parse(localStorage.getItem('user'))).email;
    }
  };
  const userEmail = renderEmailUser();

  useEffect(() => {
    setTitle({ title: 'Profile' });
    setIconShow({ iconShow: false });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <section className="">
      <Header />
      <p
        data-testid="profile-email"
        className="email-profile"
      >
        { userEmail }
      </p>
      <section className="btn-profile">
        <button
          type="button"
          className="cat-btns"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          className="cat-btns"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          className="cat-btns"
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
        >
          Logout
        </button>
      </section>
      <Footer />
    </section>
  );
}

export default Profile;
