import * as actionTypes from "../actions/actionTypes";

const initialState = {
  sidebar: {
    isHome: true,
    name: "",
    description: "",
  },
};

const setSidebar = (state, action) => {
  return {
    ...state,
    sidebar: {
      isHome: action.isHome,
      name: action.name,
      description: action.description,
    },
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SIDEBAR:
      return setSidebar(state, action);
    default:
      return state;
  }
};

export default reducer;
