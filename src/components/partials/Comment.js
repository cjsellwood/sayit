import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

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
      <button
        data-index={props.index}
        onClick={() => props.onToggleReplyForm(props.comment.comment_id)}
      >
        Reply
      </button>
      {props.comment.showReply ? (
        <form onSubmit={submitCommentReply}>
          <div>
            <label htmlFor="comment">Reply To Comment</label>
            <textarea
              value={props.comment.reply}
              onChange={(e) => props.onReplyInput(e.target.value, props.comment.comment_id)}
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
      dispatch(actions.replyInput(value, comment_id))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
