import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import * as actions from "../store/actions/index";

const NewPost = (props) => {
  let history = useHistory();

  const [postForm, setPostForm] = useState({
    title: "",
    text: "",
    topic: "",
  });

  // Handle text field changes
  const handleInput = (e) => {
    setPostForm({
      ...postForm,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Submission of form
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onNewPost(postForm, history);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title*</label>
          <input
            type="text"
            name="title"
            value={postForm.title}
            onChange={handleInput}
            required
          />
        </div>
        <div>
          <label htmlFor="text">Text</label>
          <input
            type="text"
            name="text"
            value={postForm.text}
            onChange={handleInput}
            required
          />
        </div>
        <div>
          <label htmlFor="topic">Topic*</label>
          <input
            type="text"
            name="topic"
            value={postForm.topic}
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
    onNewPost: (postForm, history) => {
      dispatch(actions.newPost(postForm, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
