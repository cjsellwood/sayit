import React, { useEffect } from "react";
import { Link, useParams} from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import dateSince from "./functions/dateSince"

const UserPosts = (props) => {

  const params = useParams();

  const {username} = useParams();

  console.log(params)  
  useEffect(() => {
    // Fetch posts on first load
    props.onGetUserPosts(username);

    // Set sidebar to home content
    props.onSetSidebar(true, "", "");

    // eslint-disable-next-line
  }, [username]);

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
    onGetUserPosts: (username) => {
      dispatch(actions.getUserPosts(username));
    },
    onSetSidebar: (isHome, name, description) => {
      dispatch(actions.setSidebar(isHome, name, description));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);
