import "./App.css";
import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import * as actions from "./store/actions/index";
import ScrollToTop from "./components/ScrollToTop";
import Nav from "./components/helpers/Nav";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import NewPost from "./components/NewPost";
import NewTopic from "./components/NewTopic";
import Topic from "./components/Topic";
import Post from "./components/Post";
import Topics from "./components/Topics";
import Sidebar from "./components/helpers/Sidebar";
import SearchPosts from "./components/SearchPosts";

const App = (props) => {
  // Check if user has a valid token in local storage
  const isLoggedIn = () => {
    const expiration = localStorage.getItem("expires");
    return expiration && Number(expiration) > Date.now();
  };

  // Authorize user if they have a valid token
  useEffect(() => {
    if (isLoggedIn()) {
      const decoded = jwt_decode(localStorage.getItem("token"));
      props.onAuthorize(decoded.sub);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <ScrollToTop />
      <Nav />
      <div className="main-grid">
        <main>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/newpost">
              <NewPost />
            </Route>
            <Route path="/newtopic">
              <NewTopic />
            </Route>
            <Route path="/search">
              <SearchPosts />
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
        </main>
        {props.registerModal ? <Register /> : null}
        {props.loginModal ? <Login /> : null}
        <Sidebar />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    registerModal: state.auth.registerModal,
    loginModal: state.auth.loginModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthorize: (user_id) => {
      dispatch(actions.authorize(user_id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
