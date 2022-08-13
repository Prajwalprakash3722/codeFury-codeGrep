import * as React from "react";

const CommentContext = React.createContext(null);

const CommentProvider = ({ children, value }:any) => (
  <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
);

export const getContext = () => React.useContext(CommentContext);

export default CommentProvider;
