import React from "react";
import {Link} from "react-router-dom"

const Home = (props) => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/newpost">New Post</Link>
      <br></br>
      <Link to="/newtopic">New Topic</Link>
      <h2>
      All posts

      </h2>
      <ul>
        <li>Post 1</li>
        <li>Post 2</li>
        <li>Post 3</li>
      </ul>
    </div>
  );
};

export default Home;
