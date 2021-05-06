import * as actionTypes from "../actions/actionTypes"

// Submit new post
export const newPost = (postForm, history) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/posts/new", {
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
    fetch("http://localhost:3000/newtopic", {
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
  }
}

// Get posts
export const getPosts = () => {
  return (dispatch) => {
    fetch("http://localhost:3000/posts")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // If error on backend throw to catch block
        if (data.error) {
          throw new Error(data.error);
        }

        // Add to state
        dispatch(loadPosts(data.posts))

        // Redirect
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
