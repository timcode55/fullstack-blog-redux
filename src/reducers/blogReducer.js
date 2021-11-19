const initialState = [
  {
    title: "Walking in the Mountains",
    author: "Tim",
    url: "www.mountains.com",
    likes: 0
  }
];

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_BLOG":
      console.log(state, "STATE IN BLOGREDUCER ON ADD_BLOG");
      return [...state, action.data];
  }
  return state;
};

export const createBlog = (blog) => {
  console.log(blog, "BLOG***************************");
  return {
    type: "ADD_BLOG",
    data: {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: 0
    }
  };
};

export default blogReducer;
