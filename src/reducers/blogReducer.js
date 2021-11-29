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

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_BLOG":
      console.log(state, "STATE IN BLOGREDUCER ON ADD_BLOG");

      return [state[0].concat(action.data)];
    case "INIT_BLOGS":
      return [...state, action.data];
    case "ADD_LIKES":
      let new_array = [...state][0].map((element) => {
        let updateLikes = element.likes;
        return element.id === action.id
          ? { ...element, likes: (updateLikes += 1) }
          : element;
      });
      return [[...new_array]];
    case "REMOVE_BLOG":
      let updateArray = [...state][0].filter((item) => {
        return item.id !== action.id;
      });
      return [[...updateArray]];
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

export const removeBlog = (id) => {
  return async (dispatch) => {
    dispatch({
      type: "REMOVE_BLOG",
      id
    });
  };
};

export const incLikes = (id, likeBlog) => {
  console.log(id, "ID IN INCLIKES");
  return async (dispatch) => {
    const blog = await blogService.update(id, likeBlog);
    blog.likes += 1;
    console.log(blog, "BLOG IN INCLIKES");
    dispatch({
      type: "ADD_LIKES",
      data: blog,
      id
    });
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch({
      type: "ADD_BLOG",
      data: newBlog
    });
  };
};

export default blogReducer;
