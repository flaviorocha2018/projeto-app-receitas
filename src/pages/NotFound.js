import React from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function NotFound() {
  const history = useHistory();
  return (
    <section>
      <h1 className="error-header">Not Found</h1>
      <img
        alt="Error"
        src="https://neilpatel.com/wp-content/uploads/2019/05/ilustracao-sobre-o-error-404-not-found.jpeg"
        className="error-image"
      />
      <button
        type="button"
        onClick={ () => history.push('/foods') }
        className="home-button"
      >
        Return to home page
      </button>
    </section>
  );
}

export default NotFound;
