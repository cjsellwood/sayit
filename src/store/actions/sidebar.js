import * as actionTypes from "../actions/actionTypes";

// Set sidebar content
export const setSidebar = (isHome, name, description) => {
  return {
    type: actionTypes.SET_SIDEBAR,
    isHome,
    name,
    description,
  };
};
