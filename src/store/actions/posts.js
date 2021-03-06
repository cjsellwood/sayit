import * as actionTypes from "../actions/actionTypes";
import base from "../../base";
import { setSinglePostComments } from "./comments";
import { setError, setSuccess, setLoading } from "./flash";
import jwt_decode from "jwt-decode";

export const resetHistory = () => {
  return {
    type: actionTypes.RESET_HISTORY,
  };
};

// Submit new post
export const newPost = (postForm, history) => {
  return (dispatch) => {
    dispatch(setLoading(true));

    const token = localStorage.getItem("token");
    postForm.topic = postForm.topic.split(" ").join("").toLowerCase();

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
        // If error on backend throw to catch block
        if (data.error) {
          throw new Error(data.error);
        }

        // Ensure that post will be included on posts reload
        dispatch(resetHistory());

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
export const loadPosts = (posts, pageName) => {
  return {
    type: actionTypes.LOAD_POSTS,
    posts,
    pageName,
  };
};

export const loadMorePosts = (posts, pageName) => {
  return {
    type: actionTypes.LOAD_MORE_POSTS,
    posts,
    pageName,
  };
};

// Get posts
export const getPosts = (order, filter, page) => {
  return (dispatch) => {
    if (page === "allLoaded") {
      return;
    }

    dispatch(setLoading(true));

    if (!page) {
      dispatch(loadPosts([]));
    }

    // Get user id if logged in
    const token = localStorage.getItem("token");
    let query = `?order=${order}&filter=${filter}&offset=${
      !page ? 0 : page * 25
    }`;
    if (token) {
      const user_id = jwt_decode(token).sub;
      query += `&user_id=${user_id}`;
    }

    fetch(`${base}/posts${query}`)
      .then((response) => response.json())
      .then((data) => {
        // If error on backend throw to catch block
        if (data.error) {
          throw new Error(data.error);
        }

        // Add to state
        if (!page) {
          dispatch(loadPosts(data.posts, "home"));
        } else {
          dispatch(loadMorePosts(data.posts, "home"));
        }

        dispatch(setLoading(false));
      })
      .catch((error) => {
        if (error.message === "No posts found") {
          dispatch(loadPosts([], "home"));
        } else if (error.message === "No more posts found") {
          dispatch(loadMorePosts([], "home"));
        }

        dispatch(setError(error.message));
        dispatch(setLoading(false));
      });
  };
};

// Get posts for a single topic
export const getTopicPosts = (topic, order, filter, page) => {
  return (dispatch) => {
    if (page === "allLoaded") {
      return;
    }

    dispatch(setLoading(true));

    if (!page) {
      dispatch(loadPosts([]));
    }

    // Get user id if logged in
    const token = localStorage.getItem("token");
    let query = `?order=${order}&filter=${filter}&offset=${
      !page ? 0 : page * 25
    }`;
    if (token) {
      const user_id = jwt_decode(token).sub;
      query += `&user_id=${user_id}`;
    }

    fetch(`${base}/posts/topics/${topic}${query}`)
      .then((response) => response.json())
      .then((data) => {
        // If error on backend throw to catch block
        if (data.error) {
          throw new Error(data.error);
        }

        // Add to state
        if (!page) {
          dispatch(loadPosts(data.posts, "TOPIC: " + topic));
        } else {
          dispatch(loadMorePosts(data.posts, "TOPIC: " + topic));
        }

        dispatch(setLoading(false));
      })
      .catch((error) => {
        if (error.message === "No posts found") {
          dispatch(loadPosts([], "TOPIC: " + topic));
        } else if (error.message === "No more posts found") {
          dispatch(loadMorePosts([], "TOPIC: " + topic));
        }
        dispatch(setError(error.message));
        dispatch(setLoading(false));
      });
  };
};

// Set single post
export const setSinglePost = (post) => {
  return {
    type: actionTypes.SET_SINGLE_POST,
    post,
  };
};

// Get single post
export const getSinglePost = (post_id) => {
  return (dispatch) => {
    dispatch(setLoading(true));

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
export const getSearchPosts = (query, order, filter, page) => {
  return (dispatch) => {
    if (page === "allLoaded") {
      return;
    }

    dispatch(setLoading(true));

    if (!page) {
      dispatch(loadPosts([]));
    }

    const q = query;

    // Get user id if logged in
    const token = localStorage.getItem("token");
    query += `&order=${order}&filter=${filter}&offset=${!page ? 0 : page * 25}`;
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
        if (!page) {
          dispatch(loadPosts(data.posts, "SEARCH: " + q));
        } else {
          dispatch(loadMorePosts(data.posts, "SEARCH: " + q));
        }
        dispatch(setLoading(false));
      })
      .catch((error) => {
        if (error.message === "No posts found") {
          dispatch(loadPosts([], "SEARCH: " + q));
        } else if (error.message === "No more posts found") {
          dispatch(loadMorePosts([], "SEARCH: " + q));
        }
        dispatch(setError(error.message));
        dispatch(setLoading(false));
      });
  };
};

// Get posts from submitted search
export const getUserPosts = (username, order, filter, page) => {
  return (dispatch) => {
    if (page === "allLoaded") {
      return;
    }

    dispatch(setLoading(true));

    if (!page) {
      dispatch(loadPosts([]));
    }

    // Get user id if logged in
    const token = localStorage.getItem("token");
    let query = `?order=${order}&filter=${filter}&offset=${
      !page ? 0 : page * 25
    }`;
    if (token) {
      const user_id = jwt_decode(token).sub;
      query += `&user_id=${user_id}`;
    }

    fetch(`${base}/posts/user/${username}${query}`)
      .then((response) => response.json())
      .then((data) => {
        // If error on backend throw to catch block
        if (data.error) {
          throw new Error(data.error);
        }

        // Add to state
        if (!page) {
          dispatch(loadPosts(data.posts, "USERNAME: " + username));
        } else {
          dispatch(loadMorePosts(data.posts, "USERNAME: " + username));
        }

        dispatch(setLoading(false));
      })
      .catch((error) => {
        if (error.message === "No posts found") {
          dispatch(loadPosts([], "USERNAME: " + username));
        } else if (error.message === "No more posts found") {
          dispatch(loadMorePosts([]), "USERNAME: " + username);
        }
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
      })
      .catch((error) => {
        dispatch(setError(error.message));
      });
  };
};

// Change posts display order
export const changeOrder = (order) => {
  return {
    type: actionTypes.CHANGE_ORDER,
    order,
  };
};

// Change posts time filter
export const changeFilter = (filter) => {
  return {
    type: actionTypes.CHANGE_FILTER,
    filter,
  };
};

// Sort posts in state
export const sortPosts = (order) => {
  return {
    type: actionTypes.SORT_POSTS,
    order,
  };
};
