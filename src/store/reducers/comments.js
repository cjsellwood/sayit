import * as actionTypes from "../actions/actionTypes";

const initialState = {
  comments: [],
};

// Helper function to duplicate comments array
const duplicateComments = (comments) => {
  const duplicate = [];
  for (let comment of comments) {
    duplicate.push({ ...comment });
  }
  return duplicate;
};

const setSinglePostComments = (state, action) => {
  const comments = action.comments;
  for (let comment of comments) {
    comment.reply = "";
    comment.showReply = false;
    comment.editing = false;
    comment.show = true;
  }
  return {
    ...state,
    comments: action.comments,
  };
};

const addComment = (state, action) => {
  return {
    ...state,
    comments: [
      ...state.comments,
      {
        ...action.comment,
        reply: "",
        showReply: false,
        editing: false,
        show: true,
      },
    ],
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
    case actionTypes.SET_SINGLE_POST_COMMENTS:
      return setSinglePostComments(state, action);
    case actionTypes.ADD_COMMENT:
      return addComment(state, action);
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
    case actionTypes.TOGGLE_SHOW_COMMENT:
      return toggleShowComment(state, action);
    default:
      return state;
  }
};

export default reducer;
