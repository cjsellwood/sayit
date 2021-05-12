import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../store/actions/index";
import AuthHide from "../components/helpers/AuthHide";
import AuthShow from "../components/helpers/AuthShow";

const Nav = (props) => {
  return (
    <nav className="Nav">
      <ul>
        {props.sidebar.isHome ? 
        <li>
          <Link to="/">Sayit</Link>
        </li> :
        <li>
          <Link to={`/topics/${props.sidebar.name}`}>{props.sidebar.name}</Link>
        </li>
        }
        
        <AuthHide>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </AuthHide>
        <AuthHide>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </AuthHide>
        <AuthShow>
          <li>
            <button onClick={props.onDeauthorize}>Logout</button>
          </li>
        </AuthShow>
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    sidebar: state.sidebar.sidebar
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeauthorize: () => {
      dispatch(actions.deauthorize());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
