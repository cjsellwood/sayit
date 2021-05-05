import React from "react";
import {connect} from "react-redux"
import {Link} from "react-router-dom"

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <button>Login</button>
        </li>
        <li>
          <button>Logout</button>
        </li>
      </ul>
      <p>{props.isAuth ? "Logged In" : "Not Logged In"}</p>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
