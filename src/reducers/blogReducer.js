import axios from "axios";
// import blogService from "../services/blogs";

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

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_BLOG":
      console.log(state, "STATE IN BLOGREDUCER ON ADD_BLOG");
      return [...state, action.data];
  }
  return state;
};

export const createBlog = (blog) => {
  // console.log(blog, "BLOG***************************");
  // axios.post("http://localhost:3003/api/blogs", { blog });
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
