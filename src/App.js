

import React, { useState, useEffect } from 'react';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const [ blogs, setBlogs ] = useState([]);
	const [ logged, setLogged ] = useState(false);
	const [ errorMessage, setErrorMessage ] = useState(null);

	const [ username, setUsername ] = useState('newusertime');
	const [ password, setPassword ] = useState('darkness33');
  const [ title, setTitle ] = useState('');
  const [ author, setAuthor ] = useState('');
  const [ url, setUrl ] = useState('');

	const [ newUser, setNewUser ] = useState(null);

	useEffect(() => {
		blogService.getAll().then((initialBlogs) => {
			setBlogs(initialBlogs);
		});
	}, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setNewUser(user)
      blogService.setToken(user.token)
      setLogged(true)
    }
  }, [])

	const addBlog = async (event) => {
		event.preventDefault();
		console.log('addBlog Triggered');
		const blogObject = {
			title: title,
      author: author,
      url: url
		};
    console.log(blogObject, 'blogobject*****')
		blogService.create(blogObject);
			setBlogs(blogs.concat(blogObject));
			console.log(blogs, 'BLOGS IN CREATE');
			// setNewBlog('');
	
	};

	

	console.log(username, 'USERNAME');
	console.log(password, 'password ');

	const handleLogin = async (event) => {
		console.log('handlelogin called');
		event.preventDefault();
		try {
			const user = await loginService.login({
				username,
				password
			});
			console.log(user, 'USER199******');
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setLogged(true)
			blogService.setToken(user.token);
			setNewUser(user);
			setUsername('');
			setPassword('');
		} catch (exception) {
			setErrorMessage('wrong credentials');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

  const handleLogOut = (e) => {
    window.localStorage.clear()
    setLogged(false)
  }

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	);

  const handleTitle = (e) => {
		setTitle(e.target.value);
	};
  const handleAuthor = (e) => {
		setAuthor(e.target.value);
	};
  const handleUrl = (e) => {
		setUrl(e.target.value);
	};

	const blogForm = () => (
		<form onSubmit={addBlog}>
      <h1>Add a New Blog</h1>

      title: <input onChange={handleTitle} value={title || ''} />
      author: <input onChange={handleAuthor} value={author || ''} />
      url: <input onChange={handleUrl} value={url || ''} />
			<button type="submit">save</button>
		</form>
	);

  const loggedIn = window.localStorage.getItem('loggedBlogappUser')
 
	console.log(newUser, 'NEWUSER');
	console.log(blogs, 'BLOGS 249');
	const showBlogs = blogs.filter((blog) => blog.user?.username === newUser?.username);
	console.log(showBlogs, 'SHOWBLOGS');
	console.log(loggedIn,  'loggedIn******');
	console.log(logged,  'logged146****');

	return (
		<div>
			<h1>Blogs</h1>
			<Notification message={errorMessage} />

			{newUser === null || !loggedIn ? (
				loginForm()
			) : (
				<div>
					<h4>{newUser.name} logged in</h4>
          {loggedIn && <button onClick={() => handleLogOut()}>Logout </button>}
          {blogForm()}
					{loggedIn && logged && showBlogs.map((item) => {
            return <h2 key={item.id}>{item.title}</h2>;
					})}
					
				</div>
			)}

			
		</div>
	);
};

export default App;
