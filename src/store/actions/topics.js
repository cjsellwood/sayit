import * as actionTypes from "../actions/actionTypes";
import base from "../../base";
import { setError, setSuccess, setLoading } from "./flash";

// Submit new topic
export const newTopic = (topicForm, history) => {
  return (dispatch) => {
    dispatch(setLoading(true));

    const token = localStorage.getItem("token");

    // Remove spaces from topic name and make lowercase
    topicForm.name = topicForm.name.split(" ").join("").toLowerCase();

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
        history.push(`/topics/${topicForm.name}`);

        // Set loading and success message
        dispatch(setLoading(true));
        dispatch(setSuccess(data.message));
      })
      .catch((error) => {
        dispatch(setLoading(false));
        dispatch(setError(error.message));
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
    dispatch(setLoading(true));
    // dispatch(setTopics([]));

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

        // Stop loading
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
        dispatch(setError(error.message));
      });
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
    dispatch(setLoading(true));

    fetch(`${base}/posts/singletopic`, {
      method: "POST",
      body: JSON.stringify({ topic }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // If error on backend throw to catch block
        if (data.error) {
          throw new Error(data.error);
        }
        dispatch(setAddedTopic(data.topic));

        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
        dispatch(setError(error.message));
      });
  };
};
