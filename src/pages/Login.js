import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [email, setEmail] = useState({ email: '' });
  const [password, setPassword] = useState({ password: '' });
  const [enterBtn, setEnterBtn] = useState({ enterBtn: true });
  const history = useHistory();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'email') setEmail({ email: value });
    if (name === 'password') setPassword({ password: value });
  };

  const handleClick = () => {
    const TOKEN_TEST = 1;
    localStorage.setItem('mealsToken', TOKEN_TEST);
    localStorage.setItem('cocktailsToken', TOKEN_TEST);
    localStorage.setItem('user', JSON.stringify(email));
    history.push('/foods');
  };

  const validateEmail = (input) => {
    const result = /^[^\s@]+@[^\s@]+\.com/;
    return result.test(input);
  };

  useEffect(() => {
    const MIN_LENGTH = 6;
    if (validateEmail(email.email) && password.password.length > MIN_LENGTH) {
      setEnterBtn({ enterBtn: false });
    } else setEnterBtn({ enterBtn: true });
  }, [email, password]);

  return (
    <section className="">
      <form>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="email-input">
            Email address
            <input
              type="email"
              id="email-input"
              className="form-control"
              data-testid="email-input"
              name="email"
              value={ email.email }
              onChange={ handleChange }
            />
          </label>
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="password-input">
            Password
            <input
              type="password"
              id="password-input"
              className="form-control"
              data-testid="password-input"
              name="password"
              value={ password.password }
              onChange={ handleChange }
            />
          </label>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-block mb-4"
          data-testid="login-submit-btn"
          disabled={ enterBtn.enterBtn }
          onClick={ () => handleClick() }
        >
          Enter
        </button>
      </form>
    </section>
  );
}

export default Login;
