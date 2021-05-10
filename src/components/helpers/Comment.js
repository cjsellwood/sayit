import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import AuthCreator from "./AuthCreator";
import AuthShow from "./AuthShow";

const Comment = (props) => {
  const submitCommentReply = (e) => {
    e.preventDefault();
    props.onCommentReply(
      props.comment.reply,
      props.post_id,
      props.comment.comment_id
    );
  };

  // Filter comments that have this comment as it's parent
  const replies = props.allComments.filter(
    (comment) => comment.parent === props.comment.comment_id
  );

  return (
    <li className="child" key={props.comment.comment_id}>
      <p>{props.comment.text}</p>
      <p>
        User: {props.comment.user_id} - {props.comment.username}
      </p>
      <p>
        Time: {new Date(props.comment.time).toLocaleTimeString()}{" "}
        {new Date(props.comment.time).toLocaleDateString()}
      </p>
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
          <button type="edit" aria-label="edit">
            Edit
          </button>
        </AuthCreator>
        {props.comment.showReply ? (
          <form onSubmit={submitCommentReply}>
            <div>
              <label htmlFor="comment">Reply To Comment</label>
              <textarea
                value={props.comment.reply}
                onChange={(e) =>
                  props.onReplyInput(e.target.value, props.comment.comment_id)
                }
              ></textarea>
            </div>
            <button type="submit" aria-label="submit">
              Submit
            </button>
            <button
              type="button"
              aria-label="cancel"
              onClick={() => props.onToggleReplyForm(props.comment.comment_id)}
            >
              Cancel
            </button>
          </form>
        ) : null}
      </AuthShow>
      <ul>
        {replies.map((comment) => {
          return (
            <Comment
              allComments={props.allComments}
              comment={comment}
              key={comment.comment_id}
              onToggleReplyForm={props.onToggleReplyForm}
              onReplyInput={props.onReplyInput}
              onCommentReply={props.onCommentReply}
              onDeleteComment={props.onDeleteComment}
              post_id={props.post_id}
            />
          );
        })}
      </ul>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
