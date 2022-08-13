import * as React from "react";
import { getContext } from "./CommentProvider";
import { Button, CloseButton, Group } from "@mantine/core";
import { Input } from "@mantine/core";

export const ReplyComponent = ({ parentId, setEdit }: any) => {
  const [reply, setReply] = React.useState("");
  //@ts-ignore
  const { dispatch } = getContext();
  const handleSubmit = () => {
    dispatch({ type: "add_child_comment", reply, parentId });
    setEdit(false);
  };

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setReply(e.target.value);
  };

  return (
    <>
      <Group>
        <Input
          placeholder="Reply here"
          name="reply-box"
          value={reply}
          onChange={handleChange}
        />
        <Button type="submit" onClick={handleSubmit}>
          Add Comment
        </Button>
        <CloseButton
          aria-label="Close modal"
          onClick={() => {
            setEdit((edit:boolean) => !edit);
          }}
        />
      </Group>
    </>
  );
};

export default ReplyComponent;
