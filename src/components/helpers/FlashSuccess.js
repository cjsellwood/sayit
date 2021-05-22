import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const FlashSuccess = (props) => {
  let successDisplay = null;

  useEffect(() => {
    // Clear any old timeouts
    clearTimeout(props.timeout);

    // Hide message after 5 seconds
    const startTimeout = () => {
      props.onSetTimeout(
        setTimeout(() => {
          props.onSetSuccess("");
        }, 5000)
      );
    };

    if (props.success !== "") {
      startTimeout();
    }

    // eslint-disable-next-line
  }, [props.success]);

  if (props.success !== "") {
    successDisplay = (
      <div className="Flash success">
        <h1>{props.success}</h1>
      </div>
    );
  }
  return successDisplay;
};

const mapStateToProps = (state) => {
  return {
    success: state.flash.success,
    timeout: state.flash.timeout,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetSuccess: (success) => {
      dispatch(actions.setSuccess(success));
    },
    onSetTimeout: (timeout) => {
      dispatch(actions.setTimeout(timeout))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlashSuccess);
