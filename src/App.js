import "./App.css";
import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import ScrollToTop from "./components/ScrollToTop";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login"
import NewPost from "./components/NewPost"

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
          <Login/>
        </Route>
        <Route path="/new">
          <NewPost/>
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
