import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import dateSince from "./functions/dateSince";
import Votes from "./helpers/Votes";

const SearchPosts = (props) => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const query = params.get("q");

  useEffect(() => {
    // Fetch posts on first load or if search changes
    if (
      !props.history.length ||
      props.history[props.history.length - 1] !== "SEARCH: " + query
    ) {
      props.onGetSearchPosts(query);
    }

    // Set sidebar to home content
    props.onSetSidebar(true, "", "");

    // eslint-disable-next-line
  }, [query]);

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
            </Link>{" "}
            in <Link to={`/topics/${post.topic}`}>{post.topic}</Link>
          </p>
        </div>
      </li>
    );
  });

  return (
    <section className="Home">
      {props.history[props.history.length - 1] === "SEARCH: " + query ? (
        <h1 className="page-title">Search: {query}</h1>
      ) : null}
      <ul className="posts-list">{postsDisplay}</ul>
    </section>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  history: state.posts.history,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onGetSearchPosts: (query) => {
      dispatch(actions.getSearchPosts(query));
    },
    onSetSidebar: (isHome, name, description) => {
      dispatch(actions.setSidebar(isHome, name, description));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPosts);
