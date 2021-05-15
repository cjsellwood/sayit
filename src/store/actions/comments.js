import * as actionTypes from "../actions/actionTypes";
import base from "../../base";
import {setError, setSuccess, setLoading} from "./flash";

// Add comment to post
export const addComment = (comment) => {
  return {
    type: actionTypes.ADD_COMMENT,
    comment,
  };
};

// Submit new comment
export const newComment = (commentForm, post_id) => {
  return (dispatch) => {
    dispatch(setLoading(true))

    const token = localStorage.getItem("token");
    fetch(`${base}/comments/new`, {
      method: "POST",
      body: JSON.stringify({ ...commentForm, post_id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // If error on backend throw to catch block
        if (data.error) {
          throw new Error(data.error);
        }

        // Add to state
        dispatch(addComment(data.comment));

        dispatch(setLoading(false))
        dispatch(setSuccess(data.message))
      })
      .catch((error) => {
        dispatch(setLoading(false))
        dispatch(setError(error.message))
      });
  };
};

// Set comments of one post
export const setSinglePostComments = (comments) => {
  return {
    type: actionTypes.SET_SINGLE_POST_COMMENTS,
    comments,
  };
};

// Toggle display of comment reply form
export const toggleReplyForm = (comment_id) => {
  return {
    type: actionTypes.TOGGLE_REPLY_FORM,
    comment_id,
  };
};

// Reset submitted comment reply's input and close input form
export const resetReplyInput = (comment_id) => {
  return {
    type: actionTypes.RESET_REPLY_INPUT,
    comment_id,
  };
};

// Submit comment to backend
export const commentReply = (text, post_id, parent) => {
  return (dispatch) => {
    dispatch(setLoading(true))
    const token = localStorage.getItem("token");
    fetch(`${base}/comments/new`, {
      method: "POST",
      body: JSON.stringify({ text, post_id, parent }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // If error on backend throw to catch block
        if (data.error) {
          throw new Error(data.error);
        }

        // Add to state
        dispatch(addComment(data.comment));

        // Reset input
        dispatch(resetReplyInput(parent));

        // Close input form
        dispatch(toggleReplyForm(parent));

        dispatch(setLoading(false))
        dispatch(setSuccess(data.message))
      })
      .catch((error) => {
        dispatch(setLoading(false))
        dispatch(setError(error.message))
      });
  };
};

// Handle input of comment reply
export const replyInput = (value, comment_id) => {
  return {
    type: actionTypes.REPLY_INPUT,
    value,
    comment_id,
  };
};

// Set comment to deleted in state
export const setDeletedComment = (comment_id) => {
  return {
    type: actionTypes.SET_DELETED_COMMENT,
    comment_id,
  };
};

// Delete comment from database
export const deleteComment = (comment_id) => {
  return (dispatch) => {
    dispatch(setLoading(true))
    const token = localStorage.getItem("token");
    fetch(`${base}/comments/${comment_id}/delete`, {
      method: "DELETE",
      body: JSON.stringify({ comment_id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // If error on backend throw to catch block
        if (data.error) {
          throw new Error(data.error);
        }

        // Remove from state
        dispatch(setDeletedComment(comment_id));

        dispatch(setLoading(false))
        dispatch(setSuccess(data.message))
      })
      .catch((error) => {
        dispatch(setLoading(false));
        dispatch(setError(error.message))
      });
  };
};

// Toggle comment edit form
export const toggleEditComment = (comment_id, canceled) => {
  return {
    type: actionTypes.TOGGLE_EDIT_COMMENT,
    comment_id,
    canceled,
  };
};

// Handle comment editing text box
export const editCommentInput = (value, comment_id) => {
  return {
    type: actionTypes.EDIT_COMMENT_INPUT,
    value,
    comment_id,
  };
};

// Submit edited comment to backend
export const editComment = (text, comment_id) => {
  return (dispatch) => {
    dispatch(setLoading(true))
    const token = localStorage.getItem("token");
    fetch(`${base}/comments/${comment_id}/edit`, {
      method: "PATCH",
      body: JSON.stringify({ text, comment_id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // If error on backend throw to catch block
        if (data.error) {
          throw new Error(data.error);
        }

        // Close input form
        dispatch(toggleEditComment(comment_id));

        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false))
        dispatch(setError(error.message))
      });
  };
};

// Toggle showing of comment and its' children
export const toggleShowComment = (comment_id) => {
  return {
    type: actionTypes.TOGGLE_SHOW_COMMENT,
    comment_id,
  };
};
