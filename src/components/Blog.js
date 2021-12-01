import React, { useRef } from "react";
import Togglable from "./Togglable";
import { useParams, Link } from "react-router-dom";

const Blog = ({ blog, addLikes, deleteBlog }) => {
  console.log(blog, "BLOG");
  const viewBlogRef = useRef(null);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const id = useParams().id;
  console.log(typeof id, "ID IN USE PARAMS");
  const getBlogs = blog.find((n) => n.id === id);
  console.log(getBlogs, "GETBLOGS");
  return (
    <div>
      <h1>{getBlogs.username} </h1>
      <h1>Added Blogs</h1>
      {getBlogs.blogs.map((item) => {
        return (
          <Link to={`/blogs/${item.id}`}>
            <h1>{item.title}</h1>
          </Link>
        );
      })}
    </div>
  );
};

export default Blog;
