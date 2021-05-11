import * as actionTypes from "../actions/actionTypes";
import base from "../../base";

// Submit new post
export const newPost = (postForm, history) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    fetch(`${base}/posts/new`, {
      method: "POST",
      body: JSON.stringify(postForm),
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

        // Redirect
        history.push(`/topics/${postForm.topic}/${data.post_id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Submit new topic
export const newTopic = (topicForm, history) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    fetch(`${base}/newtopic`, {
      method: "POST",
      body: JSON.stringify(topicForm),
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

        // Redirect
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Load posts
export const loadPosts = (posts) => {
  return {
    type: actionTypes.LOAD_POSTS,
    posts,
  };
};

// Get posts
export const getPosts = () => {
  return (dispatch) => {
    fetch(`${base}/posts`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // If error on backend throw to catch block
        if (data.error) {
          throw new Error(data.error);
        }

        // Add to state
        dispatch(loadPosts(data.posts));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Get posts for a single topic
export const getTopicPosts = (topic) => {
  return (dispatch) => {
    fetch(`${base}/posts/topics/${topic}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // If error on backend throw to catch block
        if (data.error) {
          throw new Error(data.error);
        }

        // Add to state
        dispatch(loadPosts(data.posts));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Set single post
export const setSinglePost = (post, comments) => {
  return {
    type: actionTypes.SET_SINGLE_POST,
    post,
    comments,
  };
};

// Get single post
export const getSinglePost = (post_id) => {
  return (dispatch) => {
    fetch(`${base}/posts/${post_id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // If error on backend throw to catch block
        if (data.error) {
          throw new Error(data.error);
        }

        // Add to state
        dispatch(setSinglePost(data.post, data.comments));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

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
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Set topics in state
export const setTopics = (topics) => {
  return {
    type: actionTypes.SET_TOPICS,
    topics,
  };
};

// Get list of topics
export const getTopics = () => {
  return (dispatch) => {
    fetch(`${base}/posts/topics`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // If error on backend throw to catch block
        if (data.error) {
          throw new Error(data.error);
        }

        // Add to state
        dispatch(setTopics(data.topics));
      })
      .catch((error) => {
        console.log(error);
      });
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
      })
      .catch((error) => {
        console.log(error);
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
      })
      .catch((error) => {
        console.log(error);
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
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Delete a post
export const deletePost = (post_id, history, topic) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    fetch(`${base}/posts/${post_id}/delete`, {
      method: "DELETE",
      body: JSON.stringify({ post_id }),
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

        // Redirect
        history.push(`/topics/${topic}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Toggle comment edit form
export const toggleEditPost = (canceled) => {
  return {
    type: actionTypes.TOGGLE_EDIT_POST,
    canceled,
  };
};

// Handle comment editing text box
export const editPostInput = (value, post_id) => {
  return {
    type: actionTypes.EDIT_POST_INPUT,
    value,
    post_id,
  };
};

// Submit edited post to backend
export const editPost = (text, post_id) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    fetch(`${base}/posts/${post_id}/edit`, {
      method: "PATCH",
      body: JSON.stringify({ text, post_id }),
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
        dispatch(toggleEditPost());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Set sidebar content
export const setSidebar = (isHome, name, description) => {
  return {
    type: actionTypes.SET_SIDEBAR,
    isHome,
    name,
    description,
  };
};

// Set added topic in state
export const setAddedTopic = (topic) => {
  return {
    type: actionTypes.SET_ADDED_TOPIC,
    topic,
  };
};

// Fetch topic information
export const addTopic = (topic) => {
  return (dispatch) => {
    fetch(`${base}/posts/singletopic`, {
      method: "POST",
      body: JSON.stringify({ topic }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // If error on backend throw to catch block
        if (data.error) {
          throw new Error(data.error);
        }

        console.log("Fetched TOPIC", data.topic)

        dispatch(setAddedTopic(data.topic));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
