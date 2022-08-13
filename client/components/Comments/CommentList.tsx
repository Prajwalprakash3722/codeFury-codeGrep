import * as React from "react";
// import { getContext } from "./CommentProvider";
import CommentCard from "./CommentCard";
import { getContext } from "./CommentProvider";
export const CommentList = () => {
  //@ts-ignore
  const { state } = getContext();
  return (
    <>
      {state?.map((comment: any, index: any) => (
        <CommentCard key={index} comment={comment} />
      ))}
    </>
  );
};

export default CommentList;
