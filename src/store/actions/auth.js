import * as actionTypes from "../actions/actionTypes";

// Authorize user
export const authorize = () => {
  return {
    type: actionTypes.AUTHORIZE,
  };
};

// Deauthorize user
export const deauthorize = () => {
  return {
    type: actionTypes.DEAUTHORIZE,
  };
};

// Handle login submission to backend
export const userLogin = () => {
  return dispatch => {

  }
}

// Handle register user submission to backend
export const userRegister = () => {
  return dispatch => {
    
  }

}