import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AuthShow from "./AuthShow";

const Sidebar = (props) => {
  return (
    <aside className={`sidebar ${props.show ? "open" : ""}`}>
      <form>
        <div>
          <label htmlFor="search">Search</label>
          <input type="text" name="search" id="search" placeholder="search" />
        </div>
      </form>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
