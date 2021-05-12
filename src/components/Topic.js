import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";

const Topic = (props) => {
  const { topic } = useParams();

  // Get posts on first run or if topic changes
  useEffect(() => {
    props.onGetTopicPosts(topic);

    // Find index of topic in state
    const topicIndex = props.topics.findIndex(
      (topicState) => topicState.name === topic
    );

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

  const dateSince = (date) => {
    const duration = (Date.now() - new Date(date)) / 1000;
    if (duration < 60) {
      return `${duration.toFixed(0)} seconds ago`;
    } else if (duration < 60 * 60) {
      return `${(duration / 60).toFixed(0)} minutes ago`;
    } else if (duration < 60 * 60 * 24) {
      return `${(duration / (60 * 60)).toFixed(0)} hours ago`;
    } else if (duration < 60 * 60 * 24 * 365) {
      return `${(duration / (60 * 60 * 24)).toFixed(0)} days ago`;
    } else {
      return `${(duration / (60 * 60 * 24 * 365)).toFixed(0)} years ago`;
    }
  };

  const postsDisplay = props.posts.map((post) => {
    return (
      <li key={post.post_id}>
        <div to="/">
          <div className="post-title">
            <Link to={`/topics/${post.topic}/${post.post_id}`}>
              {post.title}
            </Link>
          </div>
          <p className="post-subtitle">submitted {dateSince(post.time)} by {post.username}</p>
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
    topics: state.posts.topics,
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
