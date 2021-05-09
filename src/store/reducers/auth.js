import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isAuth: false,
  user_id: null,
};

const authorize = (state, action) => {
  return {
    ...state,
    isAuth: true,
    user_id: action.user_id,
  };
};

const deauthorize = (state, action) => {
  return {
    ...state,
    isAuth: false,
    user_id: null,
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
