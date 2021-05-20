import React from "react";
import "./PageNotFound.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <h1>Page Not Found</h1>
      <Link to="/">Return Home</Link>
    </div>
  );
};

export default PageNotFound;
