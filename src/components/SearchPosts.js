import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import dateSince from "./functions/dateSince";
import Votes from "./helpers/Votes";
import PostsOptions from "./helpers/PostsOptions";

const SearchPosts = (props) => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const query = params.get("q");

  const [loaded, setLoaded] = useState(false);

  // Load posts again with the different order or filter
  useEffect(() => {
    if (loaded && (props.posts.length < 25 || props.page === "allLoaded")) {
      // Sort posts in state if all posts loaded
      props.onSortPosts(props.order);
    } else if (loaded) {
      // Return posts from server if not loaded all posts
      props.onGetSearchPosts(query, props.order, props.filter);
    }
    // eslint-disable-next-line
  }, [props.order]);

  useEffect(() => {
    // Fetch if filter changes
    if (loaded) {
      props.onGetSearchPosts(query, props.order, props.filter);
      // window.scrollTo(0,0);
    }
    // eslint-disable-next-line
  }, [props.filter]);

  useEffect(() => {
    // Fetch posts on first load or if search changes
    if (props.history !== "SEARCH: " + query) {
      props.onGetSearchPosts(query, props.order, props.filter);
    }
    setLoaded(true);

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
    <section>
      {props.history === "SEARCH: " + query ? (
        <React.Fragment>
          <h1 className="page-title">Search: {query}</h1>
          <PostsOptions />
          <ul className="posts-list">{postsDisplay}</ul>
        </React.Fragment>
      ) : null}
      {props.page !== "allLoaded" && props.posts.length >= 25 ? (
        <div
          className="load-more"
          onClick={() =>
            props.onGetSearchPosts(query, props.order, props.filter, props.page)
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

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  history: state.posts.history,
  order: state.posts.order,
  filter: state.posts.filter,
  page: state.posts.page,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onGetSearchPosts: (query, order, filter, page) => {
      dispatch(actions.getSearchPosts(query, order, filter, page));
    },
    onSetSidebar: (isHome, name, description) => {
      dispatch(actions.setSidebar(isHome, name, description));
    },
    onSortPosts: (order) => {
      dispatch(actions.sortPosts(order));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPosts);
