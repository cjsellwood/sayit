import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AuthShow from "./AuthShow";
import AuthHide from "./AuthHide";
import * as actions from "../../store/actions/index";
import "./Sidebar.css";

const Sidebar = (props) => {
  return (
    <aside
      className={`sidebar ${props.show ? "open" : ""}`}
      onClick={props.onToggleSidebar}
    >
      <form>
        <div>
          <label htmlFor="search">Search</label>
          <input type="text" name="search" id="search" placeholder="search" />
        </div>
      </form>
      <AuthHide>
        <li>
          <button
            className="basic-button"
            onClick={(e) => {
              // e.stopPropagation();
              props.onToggleRegisterModal();
            }}
            aria-label="register"
          >
            Register
          </button>
        </li>
      </AuthHide>
      <AuthHide>
        <li>
          <button
            className="basic-button"
            onClick={(e) => {
              // e.stopPropagation();
              props.onToggleLoginModal();
            }}
            aria-label="login"
          >
            Login
          </button>
        </li>
      </AuthHide>
      <AuthShow>
        <li>
          <button
            className="basic-button"
            onClick={props.onDeauthorize}
            aria-label="logout"
          >
            Logout
          </button>
        </li>
      </AuthShow>
      <Link to="/topics">Topics</Link>
      <AuthShow>
        <Link to="/newpost">New Post</Link>
        <br />
        {props.sidebar.isHome ? <Link to="/newtopic">New Topic</Link> : null}
        <br />
      </AuthShow>

      <h3>{props.sidebar.name}</h3>
      <p>{props.sidebar.description}</p>
    </aside>
  );
};

const mapStateToProps = (state) => ({
  sidebar: state.sidebar.sidebar,
  show: state.sidebar.show,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleSidebar: () => {
      dispatch(actions.toggleSidebar());
    },
    onDeauthorize: () => {
      dispatch(actions.deauthorize());
    },
    onToggleLoginModal: () => {
      dispatch(actions.toggleLoginModal());
    },
    onToggleRegisterModal: () => {
      dispatch(actions.toggleRegisterModal());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
