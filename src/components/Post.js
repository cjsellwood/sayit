import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as actions from "../store/actions/index";
import Comment from "./helpers/Comment";
import AuthShow from "./helpers/AuthShow";
import AuthCreator from "./helpers/AuthCreator";

const Post = (props) => {
  const { post_id, topic } = useParams();

  let history = useHistory();

  console.log(post_id, topic);

  useEffect(() => {
    // Fetch only if post undefined or wrong post
    if (!props.post.post_id || props.post.post_id !== Number(post_id)) {
      console.log("-----------fetching post");
      props.onGetSinglePost(post_id, topic, history);
    }

    // If topic in url wrong redirect to correct page
    console.log(props.post.post_id, props.post.topic, topic);
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

  // If post set and the post ids' match, display post
  if (props.post.post_id && Number(props.post.post_id) === Number(post_id)) {
    postDisplay = (
      <div>
        <h1>{props.post.title}</h1>
        {props.post.editing ? (
          <form onSubmit={submitPostEdit}>
            <label htmlFor="editPost" />
            <textarea
              id="editPost"
              name="text"
              value={props.post.text}
              onChange={(e) => props.onEditPostInput(e.target.value)}
            ></textarea>
            <button type="submit">Submit</button>
            <button
              type="button"
              aria-label="cancel"
              onClick={() => props.onToggleEditPost(true)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <p>{props.post.text}</p>
        )}

        <p>
          User: {props.post.user_id} - {props.post.username}
        </p>
        <p>
          Time: {new Date(props.post.time).toLocaleTimeString()}{" "}
          {new Date(props.post.time).toLocaleDateString()}
        </p>
        <AuthCreator creator_id={props.post.user_id}>
          <button
            type="button"
            aria-label="delete post"
            onClick={() => props.onDeletePost(post_id, history, topic)}
          >
            Delete
          </button>
          <button
            type="button"
            aria-label="edit post"
            onClick={() => props.onToggleEditPost()}
          >
            Edit
          </button>
        </AuthCreator>
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
      <div>
        <h2>Comments</h2>
        <AuthShow>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="newComment">New Comment</label>
              <textarea
                name="text"
                id="newComment"
                value={commentForm.text}
                onChange={handleInput}
              />
            </div>
            <button type="submit" aria-label="submit">
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
