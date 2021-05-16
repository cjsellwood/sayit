import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const Votes = (props) => {
  const voteUp = () => {
    // Display error if not logged in
    if (!props.isAuth) {
      return props.onSetError("Login to vote");
    }

    // If already voted set to not voted again
    if (props.user_vote === 1) {
      return props.onPostVote(0, props.post_id);
    }

    props.onPostVote(1, props.post_id);
  };

  const voteDown = () => {
    // Display error if not logged in
    if (!props.isAuth) {
      return props.onSetError("Login to vote");
    }

    // If already voted set to not voted again
    if (props.user_vote === -1) {
      return props.onPostVote(0, props.post_id);
    }

    props.onPostVote(-1, props.post_id);
  };

  return (
    <div className="post-votes">
      <svg
        onClick={voteUp}
        className={props.user_id && props.user_vote === 1 ? "vote-up" : null}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
      >
        <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
      </svg>
      <p>{props.votes}</p>
      <svg
        onClick={voteDown}
        className={props.user_id && props.user_vote === -1 ? "vote-down" : null}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
      >
        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
      </svg>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  user_id: state.auth.user_id,
});

const mapDispatchToProps = (dispatch) => ({
  onSetError: (error) => {
    dispatch(actions.setError(error));
  },
  onPostVote: (vote, post_id) => {
    dispatch(actions.postVote(vote, post_id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Votes);
