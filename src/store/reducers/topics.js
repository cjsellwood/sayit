import * as actionTypes from "../actions/actionTypes";

const initialState = {
  topics: [],
};

const setTopics = (state, action) => {
  return {
    ...state,
    topics: action.topics,
  };
};

const setAddedTopic = (state, action) => {
  const topics = [];
  for (let topic of state.topics) {
    topics.push({ ...topic });
  }

  return {
    ...state,
    topics: [...topics, action.topic],
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TOPICS:
      return setTopics(state, action);
    case actionTypes.SET_ADDED_TOPIC:
      return setAddedTopic(state, action);
    default:
      return state;
  }
};

export default reducer;
