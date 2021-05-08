import * as actionTypes from "../actions/actionTypes";

const initialState = {
  posts: [],
  post: {},
  comments: [],
};

const loadPosts = (state, action) => {
  return {
    ...state,
    posts: action.posts,
  };
};

const setSinglePost = (state, action) => {
  return {
    ...state,
    post: action.post,
    comments: action.comments
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_POSTS:
      return loadPosts(state, action);
    case actionTypes.SET_SINGLE_POST:
      return setSinglePost(state, action);
    default:
      return state;
  }
};

export default reducer;
