import * as actionTypes from "../actions/actionTypes";

const initialState = {
  posts: [],
  post: {},
  comments: [],
  topics: [],
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

const addComment = (state, action) => {
  return {
    ...state,
    comments: [...state.comments, action.comment]
  }
}

const setTopics = (state, action) => {
  return {
    ...state,
    topics: action.topics,
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_POSTS:
      return loadPosts(state, action);
    case actionTypes.SET_SINGLE_POST:
      return setSinglePost(state, action);
    case actionTypes.ADD_COMMENT:
      return addComment(state, action);
    case actionTypes.SET_TOPICS:
      return setTopics(state, action);
    default:
      return state;
  }
};

export default reducer;
