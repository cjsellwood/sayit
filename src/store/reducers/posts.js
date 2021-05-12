import * as actionTypes from "../actions/actionTypes";

const initialState = {
  posts: [],
  post: {},
  comments: [],
  topics: [],
  sidebar: {
    isHome: true,
    name: "",
    description: "",
  },
};

// Helper function to duplicate comments array
const duplicateComments = (comments) => {
  const duplicate = [];
  for (let comment of comments) {
    duplicate.push({ ...comment });
  }
  return duplicate;
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
    comment.editing = false;
    comment.show = true;
  }
  return {
    ...state,
    post: { ...action.post, editing: false },
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
  comments[index].username = "[deleted]";

  return {
    ...state,
    comments,
  };
};

const toggleEditComment = (state, action) => {
  const comments = duplicateComments(state.comments);

  const index = comments.findIndex(
    (comment) => comment.comment_id === Number(action.comment_id)
  );

  // Set chosen comment to editing mode
  comments[index].editing = !comments[index].editing;

  // If was canceled reset to original
  if (action.canceled) {
    comments[index].text = comments[index].original;
  }

  // Set original value so can be used if canceled
  comments[index].original = comments[index].text;

  return {
    ...state,
    comments,
  };
};

const editCommentInput = (state, action) => {
  const comments = duplicateComments(state.comments);

  const index = comments.findIndex(
    (comment) => comment.comment_id === Number(action.comment_id)
  );

  comments[index].text = action.value;

  return {
    ...state,
    comments,
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

const setSidebar = (state, action) => {
  return {
    ...state,
    sidebar: {
      isHome: action.isHome,
      name: action.name,
      description: action.description,
    },
  };
};

const setAddedTopic = (state, action) => {
  const topics = [];
  for (let topic of state.topics) {
    topics.push({ ...topic });
  }

  return {
    ...state,
    topics: [...topics, action.topic],
  };
};

const toggleShowComment = (state, action) => {
  const comments = duplicateComments(state.comments);

  const index = comments.findIndex(
    (comment) => comment.comment_id === Number(action.comment_id)
  );

  comments[index].show = !comments[index].show;

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
    case actionTypes.SET_DELETED_COMMENT:
      return setDeletedComment(state, action);
    case actionTypes.TOGGLE_EDIT_COMMENT:
      return toggleEditComment(state, action);
    case actionTypes.EDIT_COMMENT_INPUT:
      return editCommentInput(state, action);
    case actionTypes.TOGGLE_EDIT_POST:
      return toggleEditPost(state, action);
    case actionTypes.EDIT_POST_INPUT:
      return editPostInput(state, action);
    case actionTypes.SET_SIDEBAR:
      return setSidebar(state, action);
    case actionTypes.SET_ADDED_TOPIC:
      return setAddedTopic(state, action);
    case actionTypes.TOGGLE_SHOW_COMMENT:
      return toggleShowComment(state, action);
    default:
      return state;
  }
};

export default reducer;
