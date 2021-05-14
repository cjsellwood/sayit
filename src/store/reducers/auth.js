import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isAuth: false,
  user_id: null,
  registerModal: false,
  loginModal: false,
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

const toggleRegisterModal = (state, action) => {
  return {
    ...state,
    registerModal: !state.registerModal
  }
}

const toggleLoginModal = (state, action) => {
  return {
    ...state,
    loginModal: !state.loginModal
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHORIZE:
      return authorize(state, action);
    case actionTypes.DEAUTHORIZE:
      return deauthorize(state, action);
    case actionTypes.TOGGLE_REGISTER_MODAL:
      return toggleRegisterModal(state, action);
    case actionTypes.TOGGLE_LOGIN_MODAL:
      return toggleLoginModal(state, action);
    default:
      return state;
  }
};

export default reducer;
