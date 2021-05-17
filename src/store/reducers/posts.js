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

const setPostVote = (state, action) => {
  const posts = [];
  for (let post of state.posts) {
    posts.push({ ...post });
  }

  const index = posts.findIndex((post) => post.post_id === action.post_id);

  // Set new user vote
  posts[index].user_vote = action.vote;

  // Change total votes based on users previous vote or new vote
  const previousVote = state.posts[index].user_vote;

  if (previousVote === 1 && action.vote === -1) {
    posts[index].votes -= 2;
  } else if (previousVote === -1 && action.vote === 1) {
    posts[index].votes += 2;
  } else if (previousVote === 1 || action.vote === -1) {
    posts[index].votes -= 1;
  } else if (previousVote === -1 || action.vote === 1) {
    posts[index].votes += 1;
  }

  return {
    ...state,
    posts,
  };
};

const setSinglePostVote = (state, action) => {
  const post = { ...state.post };

  // Set new user vote
  post.user_vote = action.vote;

  // Change total votes based on users previous vote or new vote
  const previousVote = state.post.user_vote;

  if (previousVote === 1 && action.vote === -1) {
    post.votes -= 2;
  } else if (previousVote === -1 && action.vote === 1) {
    post.votes += 2;
  } else if (previousVote === 1 || action.vote === -1) {
    post.votes -= 1;
  } else if (previousVote === -1 || action.vote === 1) {
    post.votes += 1;
  }

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
    case actionTypes.SET_POST_VOTE:
      return setPostVote(state, action);
    case actionTypes.SET_SINGLE_POST_VOTE:
      return setSinglePostVote(state, action);
    default:
      return state;
  }
};

export default reducer;
