import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import {useHistory} from "react-router-dom"

const Register = (props) => {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  let history = useHistory();

  // Change register details when inputs change
  const handleInput = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  // Submit register form handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Submit to backend
    props.onUserRegister(registerForm, history);
  };

  return (
    <section>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={registerForm.username}
            onChange={handleInput}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={registerForm.password}
            onChange={handleInput}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={registerForm.confirmPassword}
            onChange={handleInput}
            required
          />
        </div>
        <button type="submit" aria-label="submit">
          Register
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
    onUserRegister: (registerForm, history) => {
      dispatch(actions.userRegister(registerForm, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
