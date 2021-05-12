import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import AuthCreator from "./AuthCreator";
import AuthShow from "./AuthShow";

const Comment = (props) => {
  // Submit reply to a comment
  const submitCommentReply = (e) => {
    e.preventDefault();
    props.onCommentReply(
      props.comment.reply,
      props.post_id,
      props.comment.comment_id
    );
  };

  // Submit comment after editing
  const submitCommentEdit = (e) => {
    e.preventDefault();
    props.onEditComment(props.comment.text, props.comment.comment_id);
  };

  // Filter comments that have this comment as it's parent
  const replies = props.allComments.filter(
    (comment) => comment.parent === props.comment.comment_id
  );

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

  // Change content when hiding comment
  let commentContent = null;
  if (props.comment.show) {
    commentContent = (
      <React.Fragment>
        {props.comment.editing ? (
          <form onSubmit={submitCommentEdit}>
            <div>
              <label htmlFor="editComment" />
              <textarea
                name="text"
                id="editComment"
                value={props.comment.text}
                onChange={(e) =>
                  props.onEditCommentInput(
                    e.target.value,
                    props.comment.comment_id
                  )
                }
              ></textarea>
            </div>
            <button type="submit">Submit</button>
            <button
              type="button"
              onClick={() =>
                props.onToggleEditComment(props.comment.comment_id, true)
              }
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className="comment-text">
            <p>{props.comment.text}</p>
          </div>
        )}
        <div className="comment-buttons">
          <AuthShow>
            <button
              data-index={props.index}
              onClick={() => props.onToggleReplyForm(props.comment.comment_id)}
            >
              Reply
            </button>
            <AuthCreator creator_id={props.comment.user_id}>
              <button
                type="button"
                aria-label="delete"
                onClick={() => props.onDeleteComment(props.comment.comment_id)}
              >
                Delete
              </button>
              <button
                type="edit"
                aria-label="edit"
                onClick={() =>
                  props.onToggleEditComment(props.comment.comment_id)
                }
              >
                Edit
              </button>
            </AuthCreator>
            {props.comment.showReply ? (
              <form onSubmit={submitCommentReply}>
                <div>
                  <label htmlFor="commentReply">Reply To Comment</label>
                  <textarea
                    name="comment"
                    id="commentReply"
                    value={props.comment.reply}
                    onChange={(e) =>
                      props.onReplyInput(
                        e.target.value,
                        props.comment.comment_id
                      )
                    }
                  ></textarea>
                </div>
                <button type="submit" aria-label="submit">
                  Submit
                </button>
                <button
                  type="button"
                  aria-label="cancel"
                  onClick={() =>
                    props.onToggleReplyForm(props.comment.comment_id)
                  }
                >
                  Cancel
                </button>
              </form>
            ) : null}
          </AuthShow>
        </div>
        <ul>
          {replies.map((comment) => {
            return (
              <Comment
                allComments={props.allComments}
                comment={comment}
                post_id={props.post_id}
                key={comment.comment_id}
                onToggleReplyForm={props.onToggleReplyForm}
                onReplyInput={props.onReplyInput}
                onCommentReply={props.onCommentReply}
                onDeleteComment={props.onDeleteComment}
                onToggleEditComment={props.onToggleEditComment}
                onEditCommentInput={props.onEditCommentInput}
                onEditComment={props.onEditComment}
                onToggleShowComment={props.onToggleShowComment}
              />
            );
          })}
        </ul>
      </React.Fragment>
    );
  }

  return (
    <li className="child" key={props.comment.comment_id}>
      <p className="comment-subtitle">
        <button
          onClick={() => props.onToggleShowComment(props.comment.comment_id)}
        >
          {props.comment.show ? "[–]" : "[+]"}
        </button>
        <span className="comment-username">
          {props.comment.username}
        </span>
        {dateSince(props.comment.time)}
      </p>
      {props.comment.show ? commentContent : null}
    </li>
  );
};

const mapStateToProps = (state) => ({
  // allComments: state.posts.comments,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleReplyForm: (index) => {
      dispatch(actions.toggleReplyForm(index));
    },
    onCommentReply: (text, post_id, parent) => {
      dispatch(actions.commentReply(text, post_id, parent));
    },
    onReplyInput: (value, comment_id) => {
      dispatch(actions.replyInput(value, comment_id));
    },
    onDeleteComment: (comment_id) => {
      dispatch(actions.deleteComment(comment_id));
    },
    onToggleEditComment: (comment_id, canceled) => {
      dispatch(actions.toggleEditComment(comment_id, canceled));
    },
    onEditCommentInput: (value, comment_id) => {
      dispatch(actions.editCommentInput(value, comment_id));
    },
    onEditComment: (text, comment_id) => {
      dispatch(actions.editComment(text, comment_id));
    },
    onToggleShowComment: (comment_id) => {
      dispatch(actions.toggleShowComment(comment_id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
