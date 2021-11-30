import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { handleNotification } from "../reducers/notificationReducer";

const BlogForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const blog = {
      title: title,
      author: author,
      url: url,
      likes: 0
    };
    dispatch(createBlog(blog));
    dispatch(handleNotification(title, "blog"));
    setTimeout(() => {
      dispatch(handleNotification("", ""));
    }, 5000);

    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="formDiv">
        <h1>Add a New Blog</h1>
        title:{" "}
        <input
          onChange={handleTitleChange}
          value={title || ""}
          className="title"
        />
        author:{" "}
        <input
          onChange={handleAuthorChange}
          value={author || ""}
          className="author"
        />
        url:{" "}
        <input onChange={handleUrlChange} value={url || ""} className="url" />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default BlogForm;
