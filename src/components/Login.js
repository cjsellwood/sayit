import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import { useHistory } from "react-router-dom";

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

  // Handle clicking on modal without children being effected
  const modalClick = (e) => {
    if (e.currentTarget === e.target) {
      props.onToggleLoginModal();
    }
  };

  return (
    <section className="modal-wrapper" onClick={modalClick}>
      <div>
        <h1>Login</h1>
        <button
          className="modal-close-button"
          onClick={props.onToggleLoginModal}
          aria-label="close form"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
        <form className="auth-form" onSubmit={handleSubmit}>
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
          <button className="basic-button" type="submit" aria-label="submit" disabled={props.loading ? "disabled" : null}>
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.flash.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserLogin: (loginForm, history) => {
      dispatch(actions.userLogin(loginForm, history));
    },
    onToggleLoginModal: () => {
      dispatch(actions.toggleLoginModal());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
