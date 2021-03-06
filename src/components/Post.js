import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import * as actions from "../store/actions/index";
import Comment from "./helpers/Comment";
import AuthShow from "./helpers/AuthShow";
import AuthCreator from "./helpers/AuthCreator";
import dateSince from "./functions/dateSince";
import "./Post.css";
import Votes from "./helpers/Votes";

const Post = (props) => {
  const { post_id, topic } = useParams();

  let history = useHistory();

  useEffect(() => {
    // Fetch only if post undefined or wrong post
    if (!props.post.post_id || props.post.post_id !== Number(post_id)) {
      props.onGetSinglePost(post_id, topic, history);
      window.scrollTo(0, 0)
    }

    // If topic in url wrong redirect to correct page
    if (
      props.post.post_id &&
      props.post.post_id === Number(post_id) &&
      props.post.topic !== topic
    ) {
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

  // Submit post after editing
  const submitPostEdit = (e) => {
    e.preventDefault();
    props.onEditPost(props.post.text, props.post.post_id);
  };

  let postDisplay = [];

  // If post set and the post ids' match, display post
  if (props.post.post_id && Number(props.post.post_id) === Number(post_id)) {
    let postContentDisplay = null;
    const imgPattern = /.(jpg|jpeg|png|gif|gifv|webp)$/;

    // Change displayed post content if has a link in it
    if (props.post.text.includes("<<<Link>>>")) {
      const link = props.post.text.replace("<<<Link>>>", "");

      // Parse for embedded iframe if youtube link
      if (link.includes("youtube.com") || link.includes("youtu.be")) {
        const idPattern = /[A-Za-z0-9]{11}/;
        const id = link.match(idPattern);

        const timePattern = /(t=\d+)|(start=\d+)/;
        const time = link.match(timePattern);
        let start = "";
        if (time) {
          start = time[0].split("=")[1];
        }
        // Update if valid video
        if (id) {
          const src = `https://www.youtube.com/embed/${id[0]}?start=${start}`;
          // Set iframe
          postContentDisplay = (
            <iframe
              src={src}
              title={props.post.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          );
        }
      } else if (imgPattern.test(link)) {
        // Show img if ends with image extension
        postContentDisplay = (
          <img
            src={props.post.text.replace("<<<Link>>>", "")}
            alt={props.post.title}
          />
        );
        // Else just show link
      } else {
        postContentDisplay = (
          <a href={props.post.text.replace("<<<Link>>>", "")}>
            {props.post.text.replace("<<<Link>>>", "")}
          </a>
        );
      }
    } else {
      postContentDisplay = <p>{props.post.text}</p>;
    }

    // Display of whole post
    postDisplay = (
      <div className="single-post">
        <div className="post-votes">
          <Votes
            post_id={props.post.post_id}
            votes={props.post.votes}
            user_vote={props.post.user_vote}
            single_post={true}
          />
        </div>
        <div className="post-details">
          <div className="post-title">
            <Link to={`/topics/${props.post.topic}/${props.post.post_id}`}>
              {props.post.title}
            </Link>
          </div>
          <p className="post-subtitle">
            submitted {dateSince(props.post.time)} by{" "}
            <Link
              className="props.post-username"
              to={`/users/${props.post.username}`}
            >
              {props.post.username}
            </Link>
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
                <button
                  className="basic-button"
                  type="submit"
                  disabled={props.loading ? "disabled" : false}
                >
                  Submit
                </button>
                <button
                  className="basic-button"
                  type="button"
                  aria-label="cancel"
                  disabled={props.loading ? "disabled" : false}
                  onClick={() => props.onToggleEditPost(true)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="post-text">{postContentDisplay}</div>
          )}
          <AuthCreator creator_id={props.post.user_id}>
            <div className="comment-buttons">
              <button
                type="button"
                aria-label="delete post"
                disabled={props.loading ? "disabled" : false}
                onClick={() => props.onDeletePost(post_id, history, topic)}
              >
                Delete
              </button>
              <button
                type="button"
                aria-label="edit post"
                disabled={props.loading ? "disabled" : false}
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
      {!props.post.post_id || props.post.post_id !== Number(post_id) ? null : (
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
              <button
                className="basic-button"
                type="submit"
                aria-label="submit"
                disabled={props.loading ? "disabled" : false}
              >
                Submit
              </button>
            </form>
          </AuthShow>
          <ul>{commentsDisplay}</ul>
        </div>
      )}
    </section>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  post: state.posts.post,
  comments: state.comments.comments,
  topics: state.topics.topics,
  loading: state.flash.loading,
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
