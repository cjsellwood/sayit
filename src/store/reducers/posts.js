import * as actionTypes from "../actions/actionTypes";

const initialState = {
  posts: [],
  post: {},
  comments: [],
  topics: [],
};

// Helper function to duplicate comments array
const duplicateComments = (comments) => {
  const duplicate = [];
  for (let comment of comments) {
    duplicate.push({ ...comment });
  }
  return duplicate
}

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
  const comments = duplicateComments(state.comments);

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
  const comments = duplicateComments(state.comments);

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
  const comments = duplicateComments(state.comments);

  const index = comments.findIndex(
    (comment) => comment.comment_id === Number(action.comment_id)
  );

  comments[index].reply = "";

  return {
    ...state,
    comments,
  };
};

const setDeletedComment = (state, action) => {
  const comments = duplicateComments(state.comments);

  const index = comments.findIndex(
    (comment) => comment.comment_id === Number(action.comment_id)
  );
  
  // Set displayed comment text to deleted values
  comments[index].text = "[deleted]";
  comments[index].user_id = 11;
  comments[index].username = "[deleted]"

  return {
    ...state,
    comments,
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
    case actionTypes.TOGGLE_REPLY_FORM:
      return toggleReplyForm(state, action);
    case actionTypes.REPLY_INPUT:
      return replyInput(state, action);
    case actionTypes.RESET_REPLY_INPUT:
      return resetReplyInput(state, action);
    case actionTypes.SET_DELETED_COMMENT:
      return setDeletedComment(state, action);
    default:
      return state;
  }
};

export default reducer;
