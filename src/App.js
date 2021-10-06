// import React, { useState, useEffect } from 'react';
// import Blog from './components/Blog';
// import Notification from './components/Notification';
// import blogService from './services/blogs';
// import loginService from './services/login';

// const App = async () => {
// 	const [ blogs, setBlogs ] = useState([]);
// 	const [ newBlog, setNewBlog ] = useState('');
// 	const [ username, setUsername ] = useState('');
// 	const [ password, setPassword ] = useState('');
// 	const [ user, setUser ] = useState(null);
// 	const [ errorMessage, setErrorMessage ] = useState(null);

// 	useEffect(() => {
// 		blogService.getAll().then((blogs) => setBlogs(blogs));
// 	}, []);

// 	const addBlog = (event) => {
// 		event.preventDefault();
// 		const blogObject = {
// 			title: newBlog,
// 			date: new Date().toISOString(),
// 			important: Math.random() > 0.5
// 		};

// 		blogService.create(blogObject).then((returnedNote) => {
// 			setBlogs(blogs.concat(returnedNote));
// 			setNewBlog('');
// 		});
// 	};

// 	const handleBlogChange = (event) => {
// 		console.log(event.target.value);
// 		setNewBlog(event.target.value);
// 	};

// 	const handleLogin = (event) => {
// 		event.preventDefault();
// 		console.log('logging in with', username, password);
// 	};

// 	try {
// 		const user = await loginService.login({
// 			username,
// 			password
// 		});

// 		blogService.setToken(user.token);
// 		setUser(user);
// 		setUsername('');
// 		setPassword('');
// 	} catch (exception) {
// 		setErrorMessage('Wrong credentials');
// 		setTimeout(() => {
// 			setErrorMessage(null);
// 		}, 5000);
// 	}

// 	const loginForm = () => (
// 		<form onSubmit={handleLogin}>
// 			<div>
// 				username
// 				<input
// 					type="text"
// 					value={username}
// 					name="Username"
// 					onChange={({ target }) => setUsername(target.value)}
// 				/>
// 			</div>
// 			<div>
// 				password
// 				<input
// 					type="password"
// 					value={password}
// 					name="Password"
// 					onChange={({ target }) => setPassword(target.value)}
// 				/>
// 			</div>
// 			<button type="submit">login</button>
// 		</form>
// 	);

// 	const blogForm = () => (
// 		<form onSubmit={addBlog}>
// 			<input value={newBlog} onChange={handleBlogChange} />
// 			<button type="submit">save</button>
// 		</form>
// 	);

// 	return (
// 		<div>
// 			<Notification message={errorMessage} />

// 			{user === null ? (
// 				loginForm()
// 			) : (
// 				<div>
// 					<p>{user.name} logged-in</p>
// 					{blogForm()}
// 				</div>
// 			)}
// 			<h2>blogs</h2>

// 			<form onSubmit={handleLogin}>
// 				<div>
// 					username
// 					<input
// 						type="text"
// 						value={username}
// 						name="Username"
// 						onChange={({ target }) => setUsername(target.value)}
// 					/>
// 				</div>
// 				<div>
// 					password
// 					<input
// 						type="password"
// 						value={password}
// 						name="Password"
// 						onChange={({ target }) => setPassword(target.value)}
// 					/>
// 				</div>
// 				<button type="submit">login</button>
// 			</form>
// 			{blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
// 		</div>
// 	);
// };

// export default App;

import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const [ blogs, setBlogs ] = useState([]);
	const [ newBlog, setNewBlog ] = useState('');
	const [ showAll, setShowAll ] = useState(false);
	const [ errorMessage, setErrorMessage ] = useState(null);

	const [ username, setUsername ] = useState('newusertime');
	const [ password, setPassword ] = useState('darkness33');

	const [ newUser, setNewUser ] = useState(null);

	useEffect(() => {
		blogService.getAll().then((initialBlogs) => {
			setBlogs(initialBlogs);
		});
	}, []);

	const addBlog = (event) => {
		event.preventDefault();
		console.log('addBlog Triggered');
		const blogObject = {
			title: newBlog
		};

		blogService.create(blogObject).then((returnedBlog) => {
			setBlogs(blogs.concat(returnedBlog));
			console.log(blogs, 'BLOGS IN CREATE');
			console.log(returnedBlog, 'returnedBlog');
			setNewBlog('');
		});
	};

	const toggleImportanceOf = (id) => {
		const blog = blogs.find((n) => n.id === id);
		const changedBlog = { ...blog, important: !blog.important };

		blogService
			.update(id, changedBlog)
			.then((returnedBlog) => {
				setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
			})
			.catch((error) => {
				setErrorMessage(`Blog '${blog.content}' was already removed from server`);
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
			});
	};

	const handleBlogChange = (event) => {
		console.log(event.target.value);
		setNewBlog(event.target.value);
	};

	const blogsToShow = showAll ? blogs : blogs.filter((blog) => blog.important);

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

	const blogForm = () => (
		<form onSubmit={addBlog}>
			<input value={newBlog} onChange={handleBlogChange} />
			<button type="submit">save</button>
		</form>
	);
	console.log(newUser, 'NEWUSER');
	console.log(blogs, 'BLOGS 249');
	const showBlogs = blogs.filter((blog) => blog.user?.username === newUser?.username);
	console.log(showBlogs, 'SHOWBLOGS');

	return (
		<div>
			<h1>Blogs</h1>
			<Notification message={errorMessage} />

			{newUser === null ? (
				loginForm()
			) : (
				<div>
					<p>{newUser.name} logged in</p>
					{blogForm()}
					{showBlogs.map((item) => {
						return <h1>{item.title}</h1>;
					})}
					{/* <p> */}
					{/* {newUser.blogs.map((item) => {
							return <p>{item.title}</p>;
						})} */}
					{/* </p> */}
				</div>
			)}

			<div>
				<button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
			</div>
			<ul>
				{blogsToShow.map((blog) => (
					<Blog key={blog.id} blog={blog} toggleImportance={() => toggleImportanceOf(blog.id)} />
				))}
			</ul>
		</div>
	);
};

export default App;
