import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import * as actions from "../store/actions/index";
import Comment from "./helpers/Comment";
import AuthShow from "./helpers/AuthShow";
import AuthCreator from "./helpers/AuthCreator";

const Post = (props) => {
  const { post_id, topic } = useParams();

  let history = useHistory();

  useEffect(() => {
    // Fetch only if post undefined or wrong post
    if (!props.post.post_id || props.post.post_id !== Number(post_id)) {
      props.onGetSinglePost(post_id, topic, history);
    }

    // If topic in url wrong redirect to correct page
    if (props.post.post_id && props.post.topic !== topic) {
      history.replace(`/topics/${props.post.topic}/${post_id}`);
    }

    // Find index of topic in state
    const topicIndex = props.topics.findIndex(
      (topic) => topic.name === props.post.topic
    );

    // If post defined and topic not in state, fetch and add it
    if (props.post.topic && topicIndex === -1) {
      props.onAddTopic(props.post.topic);
    }

    // If post defined and topic in state, display topic in sidebar
    if (props.post.topic && topicIndex !== -1) {
      props.onSetSidebar(
        false,
        props.topics[topicIndex].name,
        props.topics[topicIndex].description
      );
    }

    // eslint-disable-next-line
  }, [post_id, props.post.topic, props.topics]);

  useEffect(() => {
    // eslint-disable-next-line
  }, [post_id]);

  let postDisplay = [];

  // Submit post after editing
  const submitPostEdit = (e) => {
    e.preventDefault();
    props.onEditPost(props.post.text, props.post.post_id);
  };

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

  // If post set and the post ids' match, display post
  if (props.post.post_id && Number(props.post.post_id) === Number(post_id)) {
    postDisplay = (
      <div className="single-post">
        <div className="post-votes">
          <p>Votes</p>
        </div>
        <div className="post-details">
          <div className="post-title">
            <Link to={`/topics/${props.post.topic}/${props.post.post_id}`}>
              {props.post.title}
            </Link>
          </div>
          <p className="post-subtitle">
            submitted {dateSince(props.post.time)} by{" "}
            <span className="comment-username">{props.post.username}</span>
          </p>
          {props.post.editing ? (
            <form className="edit-post-form" onSubmit={submitPostEdit}>
              <label htmlFor="editPost" aria-label="edit post" />
              <textarea
                id="editPost"
                name="text"
                value={props.post.text.toString()}
                onChange={(e) => props.onEditPostInput(e.target.value)}
              ></textarea>
              <div>
                <button className="basic-button" type="submit">
                  Submit
                </button>
                <button
                  className="basic-button"
                  type="button"
                  aria-label="cancel"
                  onClick={() => props.onToggleEditPost(true)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="post-text">
              <p>{props.post.text}</p>
            </div>
          )}
        <AuthCreator creator_id={props.post.user_id}>
          <div className="comment-buttons">
            <button
              // className="basic-button"
              type="button"
              aria-label="delete post"
              onClick={() => props.onDeletePost(post_id, history, topic)}
            >
              Delete
            </button>
            <button
              // className="basic-button"
              type="button"
              aria-label="edit post"
              onClick={() => props.onToggleEditPost()}
            >
              Edit
            </button>
          </div>
        </AuthCreator>
        </div>
      </div>
    );
  }

  const [commentForm, setCommentForm] = useState({
    text: "",
  });

  // Get comments with no parent
  const topLevelComments = props.comments.filter((comment) => !comment.parent);

  // Display comments by newest for now
  const commentsDisplay = topLevelComments.map((comment) => {
    return (
      <Comment
        allComments={props.comments}
        comment={comment}
        key={comment.comment_id}
        post_id={post_id}
      />
    );
  });

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
      <div className="comments-section">
        <h2>Comments</h2>
        <AuthShow>
          <form className="new-comment-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="newComment" aria-label="new comment"></label>
              <textarea
                name="text"
                id="newComment"
                placeholder="New Comment"
                value={commentForm.text}
                onChange={handleInput}
                required
              />
            </div>
            <button className="basic-button" type="submit" aria-label="submit">
              Submit
            </button>
          </form>
        </AuthShow>
        <ul>{commentsDisplay}</ul>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  post: state.posts.post,
  comments: state.posts.comments,
  topics: state.posts.topics,
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
    onDeletePost: (post_id, history, topic) => {
      dispatch(actions.deletePost(post_id, history, topic));
    },
    onToggleEditPost: (canceled) => {
      dispatch(actions.toggleEditPost(canceled));
    },
    onEditPostInput: (value) => {
      dispatch(actions.editPostInput(value));
    },
    onEditPost: (text, post_id) => {
      dispatch(actions.editPost(text, post_id));
    },
    onSetSidebar: (isHome, name, description) => {
      dispatch(actions.setSidebar(isHome, name, description));
    },
    onAddTopic: (topic) => {
      dispatch(actions.addTopic(topic));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
