import React from "react";
import { connect } from "react-redux";

const AuthShow = (props) => {
  // Only show to logged in users
  if (props.isAuth) {
    return <React.Fragment>{props.children}</React.Fragment>;
  } else {
    return null;
  }
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps)(AuthShow);
