import * as actionTypes from "../actions/actionTypes";
import base from "../../base";

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

        dispatch(setAddedTopic(data.topic));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
