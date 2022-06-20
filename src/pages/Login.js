import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
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
            />
          </label>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-block mb-4"
          data-testid="login-submit-btn"
        >
          Enter
        </button>
      </form>
    </section>
  );
}

export default Login;
