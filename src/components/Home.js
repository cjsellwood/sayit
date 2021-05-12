import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

const Home = (props) => {
  useEffect(() => {
    // Fetch posts on first load
    props.onGetPosts();

    // Set sidebar to home content
    props.onSetSidebar(true, "", "");

    // eslint-disable-next-line
  }, []);

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
            submitted {dateSince(post.time)} by{" "}
            <span className="post-username">{post.username}</span> in{" "}
            <Link to={`/topics/${post.topic}`}>{post.topic}</Link>
          </p>
        </div>
      </li>
    );
  });

  return (
    <section className="Home">
      <ul className="posts-list">{postsDisplay}</ul>
    </section>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onGetPosts: () => {
      dispatch(actions.getPosts());
    },
    onSetSidebar: (isHome, name, description) => {
      dispatch(actions.setSidebar(isHome, name, description));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
