export const randomId = () => Math.random().toString().substring(2, 7);

const createComment = (commentText, parentId = null) => ({
  parentId: parentId,
  id: randomId(),
  text: commentText,
  children: []
});

export const addCommentToState = (state, commentText) => [
  ...state,
  createComment(commentText)
];

export const addChildComment = (commentList, text, parentId) => {
  if (commentList.length > 0) {
    for (let comment of commentList) {
      if (comment.id === parentId) {
        comment.children.push(createComment(text));
      } else {
        addChildComment(comment.children, text, parentId);
      }
    }
  } else {
    commentList.push(createComment(text));
  }
  return commentList;
};
