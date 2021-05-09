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
        history.push("/");
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
    comments
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
  }
}

// Submit new comment
export const newComment = (commentForm, post_id) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    fetch(`${base}/comments/new`, {
      method: "POST",
      body: JSON.stringify({...commentForm, post_id}),
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
        dispatch(addComment(data.comment))
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
  }
}

// Get list of topics
export const getTopics = () => {
  return dispatch => {
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
  }
}

// Toggle display of comment reply form
export const toggleReplyForm = comment_id => {
  return {
    type: actionTypes.TOGGLE_REPLY_FORM,
    comment_id,
  }
}