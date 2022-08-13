//@ts-nocheck
import "../../styles/comment.module.css";
import * as helper from "./helper";
import * as React from "react";
import CommentProvider from "./CommentProvider";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "add_comment":
      return helper.addCommentToState(state, action.payload);
    case "add_child_comment":
      return helper.addChildComment([...state], action.reply, action.parentId);

    default:
      throw new Error("Invalid action type");
  }
};

export default function Comment() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  let context = { state, dispatch };
  return (
    <CommentProvider value={context}>
      <div className="max-w-2xl flex flex-col justify-center items-center">
      <h2 className="text-gray-900 font-bold text-center">Comments</h2>
      <CommentForm />
      <CommentList />
      </div>
    </CommentProvider>
  );
}
