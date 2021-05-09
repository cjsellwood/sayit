import React from "react";
import { connect } from "react-redux";

const AuthShow = (props) => {
  // Only show if the user was the creator of post or comment
  if (props.user_id === props.creator_id) {
    return <React.Fragment>{props.children}</React.Fragment>;
  } else {
    return null;
  }
};

const mapStateToProps = (state) => ({
  user_id: state.auth.user_id
});

export default connect(mapStateToProps)(AuthShow);
