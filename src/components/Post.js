import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as actions from "../store/actions/index";

const Post = (props) => {
  const { post_id, topic } = useParams();

  let history = useHistory();

  useEffect(() => {
    props.onGetSinglePost(post_id, topic, history);

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

  const [commentForm, setCommentForm] = useState({
    text: "",
  });

  // Display comments by newest for now
  const commentsDisplay = props.comments.map(comment => {
    return (<div key={comment.comment_id}>
      <p>{comment.text}</p>
      <p>
          User: {comment.user_id} - {comment.username}
        </p>
      <p>
          Time: {new Date(comment.time).toLocaleTimeString()}{" "}
          {new Date(comment.time).toLocaleDateString()}
        </p>
    </div>)
  })

  // Handle text field changes
  const handleInput = (e) => {
    setCommentForm({
      ...commentForm,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Submission of form
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onNewComment(commentForm, post_id);

    // Reset to blank
    setCommentForm({
      text: "",
    });
  };

  return (
    <section>
      {postDisplay}
      <div>
        <h2>Comments</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="comment">New Comment</label>
            <br />
            <textarea
              type="text"
              name="text"
              value={commentForm.text}
              onChange={handleInput}
            />
          </div>
          <button type="submit" aria-label="submit">
            save
          </button>
        </form>
        {commentsDisplay}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  post: state.posts.post,
  comments: state.posts.comments,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onSetSinglePost: (post) => {
      dispatch(actions.setSinglePost(post));
    },
    onGetSinglePost: (post_id) => {
      dispatch(actions.getSinglePost(post_id));
    },
    onNewComment: (commentForm, post_id) => {
      dispatch(actions.newComment(commentForm, post_id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
