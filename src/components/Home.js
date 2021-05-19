import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import dateSince from "./functions/dateSince";
import Votes from "./helpers/Votes";

const Home = (props) => {
  useEffect(() => {
    // Fetch posts on first load or if from a different set of posts
    if (
      !props.history.length ||
      props.history[props.history.length - 1] !== "home"
    ) {
      props.onGetPosts();
    }

    // Set sidebar to home content
    props.onSetSidebar(true, "", "");

    // eslint-disable-next-line
  }, []);

  const postsDisplay = props.posts.map((post, index) => {
    return (
      <li key={post.post_id}>
        <div className="post-number">
          <p>{index + 1}</p>
        </div>
        <Votes
          post_id={post.post_id}
          votes={post.votes}
          user_vote={post.user_vote}
        />
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
            </Link>{" "}
            in{" "}
            <Link className="post-topic" to={`/topics/${post.topic}`}>
              {post.topic}
            </Link>
          </p>
        </div>
      </li>
    );
  });

  return (
    <section className="Home">
      {props.history[props.history.length - 1] === "home" ? (
        <ul className="posts-list">{postsDisplay}</ul>
      ) : null}
    </section>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  user_id: state.auth.user_id,
  loading: state.flash.loading,
  history: state.posts.history,
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
