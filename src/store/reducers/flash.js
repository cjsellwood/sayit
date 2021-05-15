import * as actionTypes from "../actions/actionTypes";

const initialState = {
  success: "",
  error: "",
  loading: false,
  timeout: null,
};

const setError = (state, action) => {
  return {
    ...state,
    error: action.error,
    success: "",
  };
};

const setSuccess = (state, action) => {
  return {
    ...state,
    success: action.success,
    error: "",
  };
};

const setLoading = (state, action) => {
  // Clear message if loading
  const messages = {};
  if (action.loading) {
    messages.error = "";
    messages.success = "";
  }

  return {
    ...state,
    ...messages,
    loading: action.loading,
  };
};

const setTimeout = (state, action) => {
  return {
    ...state,
    timeout: action.timeout,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ERROR:
      return setError(state, action);
    case actionTypes.SET_SUCCESS:
      return setSuccess(state, action);
    case actionTypes.SET_LOADING:
      return setLoading(state, action);
    case actionTypes.SET_TIMEOUT:
      return setTimeout(state, action);
    default:
      return state;
  }
};

export default reducer;
