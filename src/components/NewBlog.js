import React, { useRef } from "react";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";

const NewBlog = () => {
  const blogFormRef = useRef(null);

  return (
    <div>
      <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
    </div>
  );
};

export default NewBlog;
