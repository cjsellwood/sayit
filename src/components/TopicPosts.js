import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import dateSince from "./functions/dateSince";
import Votes from "./helpers/Votes";
import PostsOptions from "./helpers/PostsOptions";

const TopicPosts = (props) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded && (props.posts.length < 25 || props.page === "allLoaded")) {
      // Sort posts in state if all posts loaded
      props.onSortPosts(props.order);
    } else if (loaded) {
      // Return posts from server if not loaded all posts
      props.onGetTopicPosts(topic, props.order, props.filter);
    }
    // eslint-disable-next-line
  }, [props.order]);

  useEffect(() => {
    // Fetch if filter changes
    if (loaded) {
      props.onGetTopicPosts(topic, props.order, props.filter);
      // window.scrollTo(0,0);
    }
    // eslint-disable-next-line
  }, [props.filter]);

  let { topic } = useParams();
  topic = topic.toLowerCase();

  // Get posts on first run or if topic changes
  useEffect(() => {
    if (props.history !== "TOPIC: " + topic) {
      props.onGetTopicPosts(topic, props.order, props.filter);
    }
    setLoaded(true);

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
          <Votes
            post_id={post.post_id}
            votes={post.votes}
            user_vote={post.user_vote}
          />
        </div>
        <div>
          <div className="post-title">
            <Link to={`/topics/${post.topic}/${post.post_id}`}>
              {post.title}
            </Link>
          </div>
          <p className="post-subtitle">
            submitted {dateSince(post.time)} by{" "}
            <Link className="post-username" to={`/users/${post.username}`}>
              {post.username}
            </Link>
          </p>
        </div>
      </li>
    );
  });

  return (
    <section>
      {props.history === "TOPIC: " + topic ? (
        <React.Fragment>
          <h1 className="page-title">{topic}</h1>
          <PostsOptions/>
          <ul className="posts-list">{postsDisplay}</ul>
        </React.Fragment>
      ) : null}
      {props.page !== "allLoaded" && props.posts.length >= 25 ? (
        <div
          className="load-more"
          onClick={() =>
            props.onGetTopicPosts(topic, props.order, props.filter, props.page)
          }
        >
          <button className="basic-button" aria-label="load more posts">
            More Posts
          </button>
        </div>
      ) : null}
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
    topics: state.topics.topics,
    error: state.flash.error,
    loading: state.flash.loading,
    history: state.posts.history,
    order: state.posts.order,
    filter: state.posts.filter,
    page: state.posts.page,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetTopicPosts: (topic, order, filter, page) => {
      dispatch(actions.getTopicPosts(topic, order, filter, page));
    },
    onAddTopic: (topic) => {
      dispatch(actions.addTopic(topic));
    },
    onSetSidebar: (isHome, name, description) => {
      dispatch(actions.setSidebar(isHome, name, description));
    },
    onSortPosts: (order) => {
      dispatch(actions.sortPosts(order));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicPosts);
