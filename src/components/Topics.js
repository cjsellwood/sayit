import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import "./Topics.css";

const Topics = (props) => {
  useEffect(() => {
    // Get list of topics
    props.onGetTopics();

    // Set sidebar to home content
    props.onSetSidebar(true, "", "");

    window.scrollTo(0, 0);

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

  return (
    <section>
      <h1 className="page-title">Topics</h1>
      <ul className="topics-list">{topicsDisplay}</ul>
    </section>
  );
};

const mapStateToProps = (state) => ({
  topics: state.topics.topics,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onGetTopics: () => {
      dispatch(actions.getTopics());
    },
    onSetSidebar: (isHome, name, description) => {
      dispatch(actions.setSidebar(isHome, name, description));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Topics);
