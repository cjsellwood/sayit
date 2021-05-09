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
  const comments = action.comments;
  for (let comment of comments) {
    comment.reply = "";
    comment.showReply = false;
  }
  return {
    ...state,
    post: action.post,
    comments: action.comments,
  };
};

const addComment = (state, action) => {
  return {
    ...state,
    comments: [...state.comments, action.comment],
  };
};

const setTopics = (state, action) => {
  return {
    ...state,
    topics: action.topics,
  };
};

const toggleReplyForm = (state, action) => {
  const comments = [];
  for (let comment of state.comments) {
    comments.push({ ...comment });
  }

  const index = comments.findIndex(
    (comment) => comment.comment_id === Number(action.comment_id)
  );

  comments[index].showReply = !comments[index].showReply;

  return {
    ...state,
    comments,
  };
};

const replyInput = (state, action) => {
  const comments = [];
  for (let comment of state.comments) {
    comments.push({ ...comment });
  }

  const index = comments.findIndex(
    (comment) => comment.comment_id === Number(action.comment_id)
  );

  comments[index].reply = action.value;

  return {
    ...state,
    comments,
  };
};

const resetReplyInput = (state, action) => {
  const comments = [];
  for (let comment of state.comments) {
    comments.push({ ...comment });
  }

  const index = comments.findIndex(
    (comment) => comment.comment_id === Number(action.comment_id)
  );

  comments[index].reply = "";
  // comments[index].showReply = false;

  return {
    ...state,
    comments,
  };
};

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
    case actionTypes.TOGGLE_REPLY_FORM:
      return toggleReplyForm(state, action);
    case actionTypes.REPLY_INPUT:
      return replyInput(state, action);
    case actionTypes.RESET_REPLY_INPUT:
      return resetReplyInput(state, action);
    default:
      return state;
  }
};

export default reducer;
