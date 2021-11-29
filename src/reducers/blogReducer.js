import axios from "axios";
import blogs from "../services/blogs";
import blogService from "../services/blogs";

const initialState = [
  {
    title: "Walking in the Mountains",
    author: "Tim",
    url: "www.mountains.com",
    likes: 0
  },
  {
    title: "Making Money in 2021",
    author: "Influencer Jones",
    url: "www.money.com",
    likes: 0
  },
  {
    title: "How to Beat the High Cost of Living",
    author: "Dabney Coleman",
    url: "www.highcost.com",
    likes: 0
  }
];

// const getData = async () => {
//   // await axios.get("http://localhost:3003/api/blogs").then((response) => {
//   //   console.log(response.data, "RESPONSE.DATA");
//   // });

//   setTimeout(() => {
//     blogService.getAll().then((initialBlogs) => {
//       console.log(initialBlogs, "INITIALBLOGS ON UE");
//       initialState = initialBlogs;
//     });
//   }, 500);
// };
// getData();
// const initialState = getData();

// console.log(getData(), "GETDATA");

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_BLOG":
      console.log(state, "STATE IN BLOGREDUCER ON ADD_BLOG");
      return [...state, action.data];
    case "INIT_BLOGS":
      return [...state, action.data];
    case "ADD_LIKES":
      return [...state, action.data];
  }
  return state;
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    console.log(blogs, "GETTING DB BLOGS");
    dispatch({
      type: "INIT_BLOGS",
      data: blogs
    });
  };
};

export const incLikes = (id, likeBlog) => {
  return async (dispatch) => {
    const blog = await blogService.update(id, likeBlog);
    blog.likes += 1;
    console.log(blog, "BLOG IN INCLIKES");
    dispatch({
      type: "ADD_LIKES",
      data: blog
    });
  };
};

export const createBlog = (blog) => {
  // console.log(blog, "BLOG***************************");
  // axios.post("http://localhost:3003/api/blogs", { blog });
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch({
      type: "ADD_BLOG",
      data: newBlog
    });
  };
};

export default blogReducer;
