import React from "react";
import { connect } from "react-redux";
import "./PostsOptions.css";
import * as actions from "../../store/actions/index";

const PostsOptions = (props) => {
  return (
    <div>
      <form className="posts-options-form">
        <div>
          <label htmlFor="order-select"></label>
          <select
            id="order-select"
            value={props.order}
            onChange={(e) => props.onChangeOrder(e.target.value)}
          >
            <option value="most">Most Votes</option>
            <option value="least">Least Votes</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        <div>
          <label htmlFor="filter-select"></label>
          <select
            id="filter-select"
            value={props.filter}
            onChange={(e) => props.onChangeFilter(e.target.value)}
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
            <option value="all">All</option>
          </select>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    order: state.posts.order,
    filter: state.posts.filter,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onChangeOrder: (order) => {
      dispatch(actions.changeOrder(order));
    },
    onChangeFilter: (filter) => {
      dispatch(actions.changeFilter(filter));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsOptions);
