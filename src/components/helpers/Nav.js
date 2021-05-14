import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";
import AuthHide from "./AuthHide";
import AuthShow from "./AuthShow";
import "./Nav.css"

const Nav = (props) => {
  return (
    <nav className="Nav">
      <ul>
        {props.sidebar.isHome ? (
          <li>
            <Link to="/">Sayit</Link>
          </li>
        ) : (
          <li>
            <Link to={`/topics/${props.sidebar.name}`}>
              {props.sidebar.name}
            </Link>
          </li>
        )}

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
        <button
          className="menu-button"
          onClick={props.onToggleSidebar}
          aria-label="toggle-sidebar"
        >
          {props.sidebarShow ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          )}
        </button>
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    sidebar: state.sidebar.sidebar,
    sidebarShow: state.sidebar.show,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeauthorize: () => {
      dispatch(actions.deauthorize());
    },
    onToggleSidebar: () => {
      dispatch(actions.toggleSidebar());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
