import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import auth from "./store/reducers/auth";
import posts from "./store/reducers/posts"
import topics from "./store/reducers/topics"
import sidebar from "./store/reducers/sidebar"
import comments from "./store/reducers/comments"
import flash from "./store/reducers/flash"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: auth,
  posts: posts,
  comments: comments,
  topics: topics,
  sidebar: sidebar,
  flash: flash,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
