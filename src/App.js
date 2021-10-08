import React, { useState, useEffect } from "react";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
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
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
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

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url
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
    setErrorMessage(`A new blog ${title} by ${author} added`);
    setType("blog");
    setTimeout(() => {
      setErrorMessage(null);
      setType(null);
    }, 5000);
    setTitle("");
    setAuthor("");
    setUrl("");
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

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleAuthor = (e) => {
    setAuthor(e.target.value);
  };
  const handleUrl = (e) => {
    setUrl(e.target.value);
  };

  // const blogForm = () => (
  //   <form onSubmit={addBlog}>
  //     <h1>Add a New Blog</h1>
  //     title: <input onChange={handleTitle} value={title || ""} />
  //     author: <input onChange={handleAuthor} value={author || ""} />
  //     url: <input onChange={handleUrl} value={url || ""} />
  //     <button type="submit">save</button>
  //   </form>
  // );

  const loggedIn = window.localStorage.getItem("loggedBlogappUser");

  console.log(newUser, "NEWUSER");
  console.log(blogs, "BLOGS 249");
  const showBlogs = blogs.filter(
    (blog) => blog.user?.username === newUser?.username
  );
  console.log(showBlogs, "SHOWBLOGS");
  console.log(loggedIn, "loggedIn******");
  console.log(logged, "logged146****");
  console.log(updatedList, "updatedList****");

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
          <Togglable buttonLabel="new note">
            <BlogForm
              addBlog={addBlog}
              handleTitle={handleTitle}
              handleAuthor={handleAuthor}
              handleUrl={handleUrl}
              title={title}
              author={author}
              url={url}
            />
          </Togglable>
          {loggedIn &&
            logged &&
            showBlogs.map((item) => {
              return <h2 key={item.id}>{item.title}</h2>;
            })}
        </div>
      )}
    </div>
  );
};

export default App;
