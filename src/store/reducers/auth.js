import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isAuth: false,
};

const authorize = (state, action) => {
  return {
    ...state,
    isAuth: true,
  };
};

const deauthorize = (state, action) => {
  return {
    ...state,
    isAuth: false,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHORIZE:
      return authorize(state, action);
    case actionTypes.DEAUTHORIZE:
      return deauthorize(state, action);
    default:
      return state;
  }
};

export default reducer;
