import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import dateSince from "./functions/dateSince";
import Votes from "./helpers/Votes";
import PostsOptions from "./helpers/PostsOptions";

const Home = (props) => {
  const [loaded, setLoaded] = useState(false);
  // Load posts again with the different order or filter
  useEffect(() => {
    // Return posts from server if not loaded all posts
    if (loaded && props.posts.length % 25 === 0) {
      props.onGetPosts(props.order, props.filter);
      // Otherwise sort posts in state
    } else if (loaded && props.posts.length % 25 !== 0) {
      props.onSortPosts(props.order);
    }
    // eslint-disable-next-line
  }, [props.order]);

  useEffect(() => {
    // Fetch if filter changes
    if (loaded) {
      props.onGetPosts(props.order, props.filter);
    } 
    // eslint-disable-next-line
  }, [props.filter]);

  useEffect(() => {
    // Fetch posts on first load or if from a different set of posts
    if (
      !props.history.length ||
      props.history[props.history.length - 1] !== "home"
    ) {
      console.log("fetch on page change");
      props.onGetPosts(props.order, props.filter);
    }
    setLoaded(true);

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
        <React.Fragment>
          <PostsOptions />
          <ul className="posts-list">{postsDisplay}</ul>
        </React.Fragment>
      ) : null}
    </section>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  user_id: state.auth.user_id,
  loading: state.flash.loading,
  history: state.posts.history,
  order: state.posts.order,
  filter: state.posts.filter,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onGetPosts: (order, filter) => {
      dispatch(actions.getPosts(order, filter));
    },
    onSetSidebar: (isHome, name, description) => {
      dispatch(actions.setSidebar(isHome, name, description));
    },
    onSortPosts: (order) => {
      dispatch(actions.sortPosts(order));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
