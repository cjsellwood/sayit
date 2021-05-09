import React from "react";
import { connect } from "react-redux";

const AuthHide = (props) => {
  // Only show to user that are not logged in
  if (!props.isAuth) {
    return <React.Fragment>{props.children}</React.Fragment>;
  } else {
    return null;
  }
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps)(AuthHide);
