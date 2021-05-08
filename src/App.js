import "./App.css";
import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import ScrollToTop from "./components/ScrollToTop";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import NewPost from "./components/NewPost";
import NewTopic from "./components/NewTopic";
import Topic from "./components/Topic";
import Post from "./components/Post";
import Topics from "./components/Topics";

const App = (props) => {
  // Check if user has a valid token in local storage
  const isLoggedIn = () => {
    const expiration = localStorage.getItem("expires");
    return expiration && Number(expiration) > Date.now();
  };

  // Authorize user if they have a valid token
  useEffect(() => {
    if (isLoggedIn()) {
      props.onAuthorize();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <ScrollToTop />
      <Nav />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/newpost">
          <NewPost />
        </Route>
        <Route path="/newtopic">
          <NewTopic />
        </Route>
        <Route path="/topics" exact>
          <Topics />
        </Route>
        <Route path="/topics/:topic" exact>
          <Topic />
        </Route>
        <Route path="/topics/:topic/:post_id" exact>
          <Post />
        </Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthorize: () => {
      dispatch(actions.authorize());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
