import "./App.css";
import { Switch, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Register from "./components/Register";

const App = () => {
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
      </Switch>
    </div>
  );
};

export default App;
