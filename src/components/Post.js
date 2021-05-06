import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as actions from "../store/actions/index";

const Post = (props) => {
  const { post_id, topic } = useParams();

  let history = useHistory();

  // Load from state if in it else fetch from backend
  useEffect(() => {
    const filtered = props.posts.filter((post) => {
      return post.post_id === Number(post_id);
    });

    if (filtered.length) {
      props.onSetSinglePost(filtered[0], topic, history);
    } else {
      props.onGetSinglePost(post_id, topic, history);
    }

    // If topic in url wrong redirect to correct page
    if (props.post.post_id && props.post.topic !== topic) {
      history.replace(`/topics/${props.post.topic}/${post_id}`);
    }

    // eslint-disable-next-line
  }, [post_id, props.post.post_id]);

  let postDisplay = [];


  // If post set and the post ids' match, display post
  if (props.post.post_id && Number(props.post.post_id) === Number(post_id)) {
    postDisplay = (
      <div>
        <h1>{props.post.title}</h1>
        <p>{props.post.text}</p>
        <p>
          User: {props.post.user_id} - {props.post.username}
        </p>
        <p>
          Time: {new Date(props.post.time).toLocaleTimeString()}{" "}
          {new Date(props.post.time).toLocaleDateString()}
        </p>
      </div>
    );
  }

  return <section>{postDisplay}</section>;
};

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  post: state.posts.post,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onSetSinglePost: (post) => {
      dispatch(actions.setSinglePost(post));
    },
    onGetSinglePost: (post_id) => {
      dispatch(actions.getSinglePost(post_id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
