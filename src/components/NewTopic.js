import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import * as actions from "../store/actions/index";
import "./NewTopic.css";

const NewTopic = (props) => {
  let history = useHistory();

  useEffect(() => {
    // Set sidebar to home content
    props.onSetSidebar(true, "", "");

    // eslint-disable-next-line
  }, []);

  const [topicForm, setTopicForm] = useState({
    name: "",
    description: "",
  });

  // Handle text field changes
  const handleInput = (e) => {
    setTopicForm({
      ...topicForm,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Submission of form
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onNewTopic(topicForm, history);
  };

  return (
    <section>
      <h1 className="page-title">New Topic</h1>
      <form className="auth-form new-topic-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name*</label>
          <input
            type="text"
            name="name"
            value={topicForm.name}
            onChange={handleInput}
            required
          />
        </div>
        <div>
          <label htmlFor="text">Description*</label>
          <input
            type="text"
            name="description"
            value={topicForm.description}
            onChange={handleInput}
            required
          />
        </div>
        <button
          className="basic-button"
          type="submit"
          aria-label="submit"
          disabled={props.loading ? "disabled" : false}
        >
          Submit
        </button>
      </form>
    </section>
  );
};

const mapStateToProps = (state) => ({
  loading: state.flash.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onNewTopic: (topicForm, history) => {
      dispatch(actions.newTopic(topicForm, history));
    },
    onSetSidebar: (isHome, name, description) => {
      dispatch(actions.setSidebar(isHome, name, description));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTopic);
