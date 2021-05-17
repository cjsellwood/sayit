import * as actionTypes from "../actions/actionTypes";
import base from "../../base";
import { setSinglePostComments } from "./comments";
import { setError, setSuccess, setLoading } from "./flash";
import jwt_decode from "jwt-decode";

// Submit new post
export const newPost = (postForm, history) => {
  return (dispatch) => {
    dispatch(setLoading(true));
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

        // Redirect
        history.push(`/topics/${postForm.topic}/${data.post_id}`);

        dispatch(setLoading(false));
        dispatch(setSuccess(data.message));
      })
      .catch((error) => {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
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
    dispatch(setLoading(true));
    dispatch(loadPosts([]));

    // Get user id if logged in
    const token = localStorage.getItem("token");
    let query = "";
    if (token) {
      const user_id = jwt_decode(token).sub;
      query = `?user_id=${user_id}`;
    }

    fetch(`${base}/posts${query}`)
      .then((response) => response.json())
      .then((data) => {
        // If error on backend throw to catch block
        if (data.error) {
          throw new Error(data.error);
        }

        // Add to state
        dispatch(loadPosts(data.posts));

        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
      });
  };
};

// Get posts for a single topic
export const getTopicPosts = (topic) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    dispatch(loadPosts([]));

    // Get user id if logged in
    const token = localStorage.getItem("token");
    let query = "";
    if (token) {
      const user_id = jwt_decode(token).sub;
      query += `?user_id=${user_id}`;
    }

    fetch(`${base}/posts/topics/${topic}${query}`)
      .then((response) => response.json())
      .then((data) => {
        // If error on backend throw to catch block
        if (data.error) {
          throw new Error(data.error);
        }

        // Add to state
        dispatch(loadPosts(data.posts));

        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
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
    dispatch(setLoading(true));
    dispatch(setSinglePost({}));

    // Get user id if logged in
    const token = localStorage.getItem("token");
    let query = "";
    if (token) {
      const user_id = jwt_decode(token).sub;
      query += `?user_id=${user_id}`;
    }

    fetch(`${base}/posts/${post_id}${query}`)
      .then((response) => response.json())
      .then((data) => {
        // If error on backend throw to catch block
        if (data.error) {
          throw new Error(data.error);
        }

        // Add posts to state
        dispatch(setSinglePost(data.post));

        // Add comments to state
        dispatch(setSinglePostComments(data.comments));

        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
      });
  };
};

// Delete a post
export const deletePost = (post_id, history, topic) => {
  return (dispatch) => {
    dispatch(setLoading(true));
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
        // If error on backend throw to catch block
        if (data.error) {
          throw new Error(data.error);
        }

        // Redirect
        history.push(`/topics/${topic}`);

        dispatch(setLoading(false));
        dispatch(setSuccess(data.message));
      })
      .catch((error) => {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
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
    dispatch(setLoading(true));
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
        // If error on backend throw to catch block
        if (data.error) {
          throw new Error(data.error);
        }

        // Close input form
        dispatch(toggleEditPost());

        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
      });
  };
};

// Get posts from submitted search
export const getSearchPosts = (query) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    dispatch(loadPosts([]));

    // Get user id if logged in
    const token = localStorage.getItem("token");
    if (token) {
      const user_id = jwt_decode(token).sub;
      query += `&user_id=${user_id}`;
    }

    fetch(`${base}/posts/search?q=${query}`)
      .then((response) => response.json())
      .then((data) => {
        // If error on backend throw to catch block
        if (data.error) {
          throw new Error(data.error);
        }

        // Add to state
        dispatch(loadPosts(data.posts));

        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
      });
  };
};

// Get posts from submitted search
export const getUserPosts = (username) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    dispatch(loadPosts([]));

    // Get user id if logged in
    const token = localStorage.getItem("token");
    let query = "";
    if (token) {
      const user_id = jwt_decode(token).sub;
      query = `?user_id=${user_id}`;
    }

    fetch(`${base}/posts/user/${username}${query}`)
      .then((response) => response.json())
      .then((data) => {
        // If error on backend throw to catch block
        if (data.error) {
          throw new Error(data.error);
        }

        // Add to state
        dispatch(loadPosts(data.posts));

        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
      });
  };
};

export const setPostVote = (vote, post_id) => {
  return {
    type: actionTypes.SET_POST_VOTE,
    vote,
    post_id,
  };
};

export const setSinglePostVote = (vote, post_id) => {
  return {
    type: actionTypes.SET_SINGLE_POST_VOTE,
    vote,
    post_id,
  };
};

// Vote on a post
export const postVote = (vote, post_id, single_post) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    const token = localStorage.getItem("token");

    fetch(`${base}/posts/${post_id}/vote`, {
      method: "POST",
      body: JSON.stringify({ post_id, vote }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // If error on backend throw to catch block
        if (data.error) {
          throw new Error(data.error);
        }

        // Set single post vote if on single post page
        if (single_post) {
          dispatch(setSinglePostVote(vote, post_id));
        } else {
          dispatch(setPostVote(vote, post_id));
        }

        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
      });
  };
};
