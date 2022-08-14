import { Button, Group } from "@mantine/core";
import * as React from "react";
import ReplyComponent from "./ReplyComponent";

export const CommentCard = ({ comment, padding = 0 }: any) => {
  const [edit, setEdit] = React.useState(false);

  const handleClick = () => {
    setEdit(true);
  };

  return (
    <div
      style={{ marginLeft: `${padding}px`, margin: "1rem" }}
      className="border-l-4"
    >
      <p className="text-lg font-mono">{comment.text}</p>
      {comment.children.length > 0 &&
        comment.children.map((childComment: any, index: any) => (
          <CommentCard
            key={index}
            comment={childComment}
            padding={padding + 20}
          />
        ))}

      {!edit && (
        <Button onClick={handleClick} radius="xl" size="xs">
          Reply
        </Button>
      )}
      {edit && <ReplyComponent parentId={comment.id} setEdit={setEdit} />}
    </div>
  );
};

export default CommentCard;
