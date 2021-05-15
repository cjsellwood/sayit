import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import "./Flash.css";

const FlashError = (props) => {
  let errorDisplay = null;

  useEffect(() => {
    // Clear any old timeouts
    clearTimeout(props.timeout);

    // Hide message after 5 seconds
    const startTimeout = () => {
      props.onSetTimeout(
        setTimeout(() => {
          props.onSetError("");
        }, 5000)
      );
    };

    if (props.error !== "") {
      startTimeout();
    }

    // eslint-disable-next-line
  }, [props.error]);

  if (props.error !== "") {
    errorDisplay = (
      <div className="Flash error" onClick={() => props.onSetError("")}>
        <h1>{props.error}</h1>
      </div>
    );
  }

  return errorDisplay;
};

const mapStateToProps = (state) => {
  return {
    error: state.flash.error,
    timeout: state.flash.timeout,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetError: (error) => {
      dispatch(actions.setError(error));
    },
    onSetTimeout: (timeout) => {
      dispatch(actions.setTimeout(timeout))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlashError);
