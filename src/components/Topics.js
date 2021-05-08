import React, { useEffect } from "react";
import {Link } from "react-router-dom"
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

const Topics = (props) => {
  useEffect(() => {
    // Get list of topics
    props.onGetTopics();
    // eslint-disable-next-line
  }, []);

  const topicsDisplay = props.topics.map((topic) => {
    return (
      <li key={topic.topic_id}>
        <Link to={`/topics/${topic.name}`}>{topic.name}</Link>
        <p>{topic.description}</p>
      </li>
    );
  });

  return <section><h1>Topics</h1>{topicsDisplay}</section>;
};

const mapStateToProps = (state) => ({
  topics: state.posts.topics,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onGetTopics: () => {
      dispatch(actions.getTopics());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Topics);
