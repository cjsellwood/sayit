import * as actionTypes from "../actions/actionTypes";
import base from "../../base";
import { setSinglePostComments } from "./comments";

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

        // Add posts to state
        dispatch(setSinglePost(data.post));

        // Add comments to state
        dispatch(setSinglePostComments(data.comments));
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

// Get posts from submitted search
export const getSearchPosts = (query) => {
  return (dispatch) => {
    fetch(`${base}/posts/search?q=${query}`)
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
}