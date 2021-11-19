import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";

const NewBlog = (props) => {
  const dispatch = useDispatch();

  const addBlog = (blog) => {
    console.log(blog, "BLOG IN ADDBLOG");
    dispatch(createBlog(blog));
  };

  const blogFormRef = useRef(null);

  return (
    <div>
      <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    </div>
  );
};

export default NewBlog;
