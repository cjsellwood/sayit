import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import * as actions from "../store/actions/index";

const NewLinkPost = (props) => {
  let history = useHistory();

  const [postForm, setPostForm] = useState({
    title: "",
    text: "",
    topic: "",
  });

  useEffect(() => {
    // If coming from a specific topic, pre fill in state
    if (history.location.state) {
      setPostForm({
        ...postForm,
        topic: history.location.state.topic,
      });
    }
    // eslint-disable-next-line
  }, []);

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
    postForm.text = "<<<Link>>>" + postForm.text;
    props.onNewPost(postForm, history);
  };

  return (
    <section>
      <h1 className="page-title">New Link Post</h1>
      <form className="auth-form new-post-form" onSubmit={handleSubmit}>
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
          <label htmlFor="text">Link* (page, image or youtube)</label>
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
        <button className="basic-button" type="submit" aria-label="submit">
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

export default connect(mapStateToProps, mapDispatchToProps)(NewLinkPost);
