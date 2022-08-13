import { Button, Group, Input } from "@mantine/core";
import * as React from "react";
import { getContext } from "./CommentProvider";

export const CommentForm = () => {
  //@ts-ignore
  const { dispatch } = getContext();
  const [comment, setComment] = React.useState("");

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setComment(e.target.value);
  };

  const handleClick = () => {
    dispatch({ type: "add_comment", payload: comment });
    setComment("");
  };

  return (
    <Group>
      <Input
        type="text"
        name="comment"
        onChange={handleChange}
        value={comment}
        />
      <Button type="submit" onClick={handleClick}>
        submit
      </Button>
  </Group>
  );
};

export default CommentForm;
