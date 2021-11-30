import React, { useRef } from "react";
import Togglable from "./Togglable";

const User = ({ user }) => {
  const viewUserRef = useRef(null);

  const userStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div style={userStyle} className="blog">
      {user.name}
      <Togglable buttonLabel="View" ref={viewUserRef}>
        <h1>{user.name}</h1>
        {/* <h1>Likes {blog.likes}</h1> */}
        {/* <button onClick={() => addLikes(blog, blog.id)}>Like</button>
        <h1>{blog.author}</h1>
        <button onClick={() => deleteBlog(blog.id)}>Remove</button> */}
      </Togglable>
    </div>
  );
};

export default User;
