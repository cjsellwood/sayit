import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import AuthShow from "./AuthShow";
import AuthHide from "./AuthHide";
import * as actions from "../../store/actions/index";
import "./Sidebar.css";

const Sidebar = (props) => {
  const [search, setSearch] = useState("");

  // Handle input in search bar
  const searchInput = (e) => {
    setSearch(e.target.value);
  };

  let history = useHistory();

  // Handle search bar submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    history.push(`/search?q=${search}`);

    setSearch("");
  };

  return (
    <aside
      className={`sidebar ${props.show ? "open" : ""}`}
      onClick={props.onToggleSidebar}
    >
      <form onSubmit={handleSearchSubmit}>
        <div className="search-bar">
          <label htmlFor="search"></label>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="search"
            value={search}
            onChange={searchInput}
            required
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
          <button type="submit" aria-label="search">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>
      </form>
      <div className="sidebar-links">
        <Link to="/topics">Topics</Link>
        <AuthShow>
          <Link
            to={{ pathname: "/newpost", state: { topic: props.sidebar.name } }}
          >
            New Post
          </Link>
          {props.sidebar.isHome ? <Link to="/newtopic">New Topic</Link> : null}
        </AuthShow>
      </div>
      <ul className="auth-links">
        <AuthHide>
          <li>
            <button
              className="basic-button"
              disabled={props.loading ? "disabled" : false}
              onClick={props.onToggleRegisterModal}
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
              disabled={props.loading ? "disabled" : false}
              onClick={props.onToggleLoginModal}
              aria-label="login"
            >
              Login
            </button>
          </li>
        </AuthHide>
        <AuthShow>
          <li>
            <button
              disabled={props.loading ? "disabled" : false}
              className="basic-button"
              onClick={props.onUserLogout}
              aria-label="logout"
            >
              Logout
            </button>
          </li>
        </AuthShow>
      </ul>
      <div className="sidebar-topic">
        <Link to={`/topics/${props.sidebar.name}`}>{props.sidebar.name}</Link>
        <p>{props.sidebar.description}</p>
      </div>
    </aside>
  );
};

const mapStateToProps = (state) => ({
  sidebar: state.sidebar.sidebar,
  show: state.sidebar.show,
  loading: state.flash.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleSidebar: () => {
      dispatch(actions.toggleSidebar());
    },
    onUserLogout: () => {
      dispatch(actions.userLogout());
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
