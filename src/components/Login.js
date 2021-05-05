import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import {useHistory} from "react-router-dom"

const Login = (props) => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  let history = useHistory();

  // Change register details when inputs change
  const handleInput = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  // Submit register form handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Submit to backend
    props.onUserLogin(loginForm, history);
  };

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={loginForm.username}
            onChange={handleInput}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={loginForm.password}
            onChange={handleInput}
            required
          />
        </div>
        <button type="submit" aria-label="submit">
          Login
        </button>
      </form>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserLogin: (loginForm, history) => {
      dispatch(actions.userLogin(loginForm, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
