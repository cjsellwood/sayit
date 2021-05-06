import React, {useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";

const Topic = (props) => {
  const { topic } = useParams();

  // Get posts on first run or if topic changes
  useEffect(() => {
    props.onGetTopicPosts(topic);

    // eslint-disable-next-line
  }, [topic])

  const postsDisplay = props.posts.map(post => {
    return (
      <li key={post.post_id}>
        <div to="/">
          <Link to={`/topics/${post.topic}/${post.post_id}`}>{post.title}</Link>
          <p>
            User: {post.user_id} - {post.username}
          </p>
          <p>{post.text}</p>
          <p>
            Time: {new Date(post.time).toLocaleTimeString()}{" "}
            {new Date(post.time).toLocaleDateString()}
          </p>
        </div>
      </li>
    )
  })

  return (
    <section>
      <h1>{topic}</h1>
      <ul>
        {postsDisplay}
      </ul>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetTopicPosts: (topic) => {
      dispatch(actions.getTopicPosts(topic));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Topic);
