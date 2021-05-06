import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory} from "react-router";
import * as actions from "../store/actions/index";
const NewTopic = (props) => {
  let history = useHistory();

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
      <h1>New Topic</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" aria-label="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    onNewTopic: (topicForm, history) => {
      dispatch(actions.newTopic(topicForm, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTopic);
