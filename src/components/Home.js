import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

const Home = (props) => {
  // Fetch posts on first load
  useEffect(() => {
    props.onGetPosts();
    // eslint-disable-next-line
  }, []);

  const postsDisplay = props.posts.map((post) => {
    return (
      <li key={post.post_id}>
        <Link to="/">
          <h3>{post.title}</h3>
          <p>
            User: {post.user_id} - {post.username}
          </p>
          <p>
            Topic: {post.topic_id} - {post.topic}
          </p>
          <p>{post.text}</p>
          <p>
            Time: {new Date(post.time).toLocaleTimeString()}{" "}
            {new Date(post.time).toLocaleDateString()}
          </p>
        </Link>
      </li>
    );
  });

  return (
    <div>
      <h1>Home</h1>
      <Link to="/newpost">New Post</Link>
      <br></br>
      <Link to="/newtopic">New Topic</Link>
      <h2>All posts</h2>
      <ul>{postsDisplay}</ul>
    </div>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
