import React, { useState, useEffect, useRef } from "react";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import NewBlog from "./components/NewBlog";
// import BlogForm from "./components/BlogForm";
import Blog from "./components/Blog";
import axios from "axios";
import { createStore } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { createBlog, initializeBlogs, incLikes } from "./reducers/blogReducer";
import blogReducer from "./reducers/blogReducer";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  console.log(blogs, "BLOGS");
  const notification = useSelector((state) => state.notification);
  const type = useSelector((state) => state.notification);
  console.log(notification, "notification");
  console.log(type, "type");
  const [loginVisible, setLoginVisible] = useState(false);
  // const [blogs, setBlogs] = useState([]);
  const [logged, setLogged] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [updatedList, setUpdatedList] = useState(false);
  // const [username, setUsername] = useState("steelcasedude");
  // const [password, setPassword] = useState("chairsrock33");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [type, setType] = useState("");
  const [newUser, setNewUser] = useState(null);
  const [render, setRender] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      dispatch(initializeBlogs());
    }, 500);
  }, [
    dispatch
    // updatedList,
    // render
  ]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setNewUser(user);
      blogService.setToken(user.token);
      setLogged(true);
    }
  }, []);

  // const blogReducer = (state = [], action) => {
  //   switch (action.type) {
  //     case "ADD_BLOG":
  //       return state.concat(action.data);
  //   }
  //   return state;
  // };

  const store = createStore(blogReducer);

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };
    return (
      <div>
        <div>
          <Togglable buttonLabel="login">
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleLogin={handleLogin}
            />
          </Togglable>
          {/* <button onClick={() => setLoginVisible(false)}>cancel</button> */}
        </div>
      </div>
    );
  };

  // const blogFormRef = useRef(null);

  // const createBlog = async (blog) => {
  //   // const blogObject = {
  //   //   title: blog.title,
  //   //   author: blog.author,
  //   //   url: blog.url,
  //   //   likes: 0
  //   // };

  //   return {
  //     type: "ADD_BLOG",
  //     data: {
  //       title: blog.title,
  //       author: blog.author,
  //       url: blog.url,
  //       likes: 0
  //     }
  //   };

  //   store.dispatch({
  //     type: "ADD_BLOG",
  //     data: {
  //       title: blog.title,
  //       author: blog.author,
  //       url: blog.url,
  //       likes: 0
  //     }
  //   });
  //   blogFormRef.current.toggleVisibility();

  //   // console.log(blogObject, "blogobject*****");
  //   axios.post(
  //     "http://localhost:3003/api/blogs",
  //     { token: newUser.token },
  //     blogObject
  //   );
  //   blogService.create(blogObject);
  //   setBlogs(blogs.concat(blogObject));
  //   setUpdatedList(!updatedList);
  //   setErrorMessage(
  //     `A new blog ${blogObject.title} by ${blogObject.author} added`
  //   );
  //   setType("blog");
  //   setTimeout(() => {
  //     setErrorMessage(null);
  //     setType(null);
  //   }, 5000);
  //   console.log(blogs, "BLOGS 98*******");
  //   return blogObject;
  // };

  // const addBlog = (blog) => {
  //   dispatch(createBlog(blog));
  // };

  const addLikes = async (blog, id) => {
    const likes = blog.likes;
    console.log(blog, "BLOG IN ADDLIKES");
    axios.put(`http://localhost:3003/api/blogs/${id}`, {
      token: newUser.token,
      likes
    });
    const newBlog = await dispatch(incLikes(id, blog));
    console.log(newBlog, "newblog");
    setRender(!render);
  };

  const deleteBlog = (id) => {
    axios.delete(`http://localhost:3003/api/blogs/${id}`, {
      token: newUser.token
    });
    setRender(!render);
  };

  const handleLogin = async (event) => {
    console.log("handlelogin called");
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });
      console.log(user, "USER199******");
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setLogged(true);
      blogService.setToken(user.token);
      setNewUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong credentials");
      setType("error");
      setTimeout(() => {
        setErrorMessage(null);
        setType(null);
      }, 5000);
    }
  };

  const handleLogOut = (e) => {
    window.localStorage.clear();
    setLogged(false);
  };

  const loggedIn = window.localStorage.getItem("loggedBlogappUser");

  // const showBlogs = blogs
  //   .filter((blog) => blog.user?.username === newUser?.username)
  //   .sort((a, b) => (a.likes > b.likes ? 1 : -1));
  const showBlogs = blogs[0]?.sort((a, b) => (a.likes > b.likes ? 1 : -1));

  console.log(showBlogs, "SHOWBLOGS");
  console.log(store.getState(), "STORE");
  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notification} type={type} />

      {newUser === null || !loggedIn ? (
        loginForm()
      ) : (
        <div>
          <h4>{newUser.name} logged in</h4>
          {loggedIn && <button onClick={() => handleLogOut()}>Logout </button>}
          {/* <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable> */}
          <NewBlog />
          {loggedIn &&
            logged &&
            showBlogs?.map((item) => {
              return (
                <div className="blog-details" key={item.title}>
                  <Blog
                    blog={item}
                    addLikes={addLikes}
                    deleteBlog={deleteBlog}
                  />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default App;
