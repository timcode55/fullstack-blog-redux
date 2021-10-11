import React, { useState, useEffect, useRef } from "react";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import Blog from "./components/Blog";
import axios from "axios";
import "./App.css";

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [logged, setLogged] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [updatedList, setUpdatedList] = useState(false);
  const [username, setUsername] = useState("newusertime");
  const [password, setPassword] = useState("darkness33");
  const [type, setType] = useState("");
  const [newUser, setNewUser] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      blogService.getAll().then((initialBlogs) => {
        console.log(initialBlogs, "INITIALBLOGS ON UE");
        setBlogs(initialBlogs);
      });
    }, 500);
  }, [updatedList]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setNewUser(user);
      blogService.setToken(user.token);
      setLogged(true);
    }
  }, []);

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };
    console.log(hideWhenVisible, "hideWhenVisible*****");
    console.log(showWhenVisible, "showWhenVisible*****");
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Enter Login</button>
        </div>
        <div style={showWhenVisible}>
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

  const blogFormRef = useRef(null);

  const createBlog = async (blog) => {
    blogFormRef.current.toggleVisibility();
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url
    };
    console.log(blogObject, "blogobject*****");
    axios.post(
      "http://localhost:3003/api/blogs",
      { token: newUser.token },
      blogObject
    );
    blogService.create(blogObject);
    setBlogs(blogs.concat(blogObject));
    setUpdatedList(!updatedList);
    setErrorMessage(
      `A new blog ${blogObject.title} by ${blogObject.author} added`
    );
    setType("blog");
    setTimeout(() => {
      setErrorMessage(null);
      setType(null);
    }, 5000);
    console.log(blogs, "BLOGS 98*******");
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

  const showBlogs = blogs.filter(
    (blog) => blog.user?.username === newUser?.username
  );

  // const handleDeleteRender = async (id) => {
  // 	await axios.delete(`http://localhost:3001/api/persons/${id}`).then((response) => {});
  // 	setUpdateRender(() => !updateRender);
  // };

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} type={type} />

      {newUser === null || !loggedIn ? (
        loginForm()
      ) : (
        <div>
          <h4>{newUser.name} logged in</h4>
          {loggedIn && <button onClick={() => handleLogOut()}>Logout </button>}
          <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {loggedIn &&
            logged &&
            showBlogs.map((item) => {
              return (
                <div className="blog-details">
                  <Blog blog={item} />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default App;
