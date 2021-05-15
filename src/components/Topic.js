import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import dateSince from "./functions/dateSince";

const Topic = (props) => {
  const { topic } = useParams();

  // Get posts on first run or if topic changes
  useEffect(() => {
    props.onGetTopicPosts(topic);
    // eslint-disable-next-line
  }, [topic]);

  useEffect(() => {
    // Find index of topic in state
    let topicIndex = -1;
    if (props.topics.length) {
      topicIndex = props.topics.findIndex(
        (topicState) => topicState && topicState.name === topic
      );
    }

    // If topic not in state, fetch and add it
    if (topicIndex === -1) {
      props.onAddTopic(topic);
    }

    // If post defined and topic in state, display topic in sidebar
    if (topicIndex !== -1) {
      props.onSetSidebar(
        false,
        props.topics[topicIndex].name,
        props.topics[topicIndex].description
      );
    }

    // eslint-disable-next-line
  }, [topic, props.topics]);

  const postsDisplay = props.posts.map((post, index) => {
    return (
      <li key={post.post_id}>
        <div className="post-number">
          <p>{index + 1}</p>
        </div>
        <div className="post-votes">
          <p>Votes</p>
        </div>
        <div>
          <div className="post-title">
            <Link to={`/topics/${post.topic}/${post.post_id}`}>
              {post.title}
            </Link>
          </div>
          <p className="post-subtitle">
            submitted {dateSince(post.time)} by
            <span className="comment-username"> {post.username}</span>
          </p>
        </div>
      </li>
    );
  });

  return (
    <section>
      <ul className="posts-list">{postsDisplay}</ul>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
    topics: state.topics.topics,
    error: state.flash.error,
    loading: state.flash.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetTopicPosts: (topic) => {
      dispatch(actions.getTopicPosts(topic));
    },
    onAddTopic: (topic) => {
      dispatch(actions.addTopic(topic));
    },
    onSetSidebar: (isHome, name, description) => {
      dispatch(actions.setSidebar(isHome, name, description));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Topic);
