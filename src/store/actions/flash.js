import * as actionTypes from "./actionTypes";

export const setError = (error) => {
  return {
    type: actionTypes.SET_ERROR,
    error,
  };
};

export const setSuccess = (success) => {
  return {
    type: actionTypes.SET_SUCCESS,
    success,
  };
};

export const setLoading = (loading) => {
  return {
    type: actionTypes.SET_LOADING,
    loading,
  }
}

export const setTimeout = (timeout) => {
  return {
    type: actionTypes.SET_TIMEOUT,
    timeout
  }
}