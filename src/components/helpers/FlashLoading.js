import React from "react";
import { connect } from "react-redux";
import "./Flash.css";

const FlashLoading = (props) => {
  let errorDisplay = null;
  if (props.loading) {
    errorDisplay = (
      <div className="Flash loading">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return errorDisplay;
};

const mapStateToProps = (state) => {
  return {
    loading: state.flash.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FlashLoading);
