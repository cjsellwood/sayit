import * as actionTypes from "../actions/actionTypes";

const initialState = {
  posts: [],
  post: {},
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
    post: { ...action.post, editing: false },
  };
};

const toggleEditPost = (state, action) => {
  const post = { ...state.post };

  // Set post to editing
  post.editing = !post.editing;

  // If was canceled reset to original
  if (action.canceled) {
    post.text = post.original;
  }

  // Set original value so can be used if canceled
  post.original = post.text;

  return {
    ...state,
    post,
  };
};

const editPostInput = (state, action) => {
  const post = { ...state.post };

  post.text = action.value;

  return {
    ...state,
    post,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_POSTS:
      return loadPosts(state, action);
    case actionTypes.SET_SINGLE_POST:
      return setSinglePost(state, action);
    case actionTypes.TOGGLE_EDIT_POST:
      return toggleEditPost(state, action);
    case actionTypes.EDIT_POST_INPUT:
      return editPostInput(state, action);
    default:
      return state;
  }
};

export default reducer;
