import * as actionTypes from "../actions/actionTypes";

const initialState = {
  posts: [],
};

const loadPosts = (state, action) => {
  return {
    ...state,
    posts: action.posts,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_POSTS:
      return loadPosts(state, action);
    default:
      return state;
  }
};

export default reducer;
