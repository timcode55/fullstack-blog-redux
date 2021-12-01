import { handleNotification } from "./notificationReducer";
import blogService from "../services/blogs";
const userReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_USER":
      return [...state, action.data];
    case "GET_USERS":
      return [...state, action.data];
  }
  return state;
};

export const handleUser = (user) => {
  console.log(user, "USER IN HANDLEUSER");
  try {
    return {
      type: "SET_USER",
      data: user
    };
  } catch (exception) {
    dispatch(handleNotification("Wrong Credentials", "error"));
    setTimeout(() => {
      dispatch(handleNotification("", ""));
    }, 5000);
  }
};

export const getUsers = () => {
  return async (dispatch) => {
    const users = await blogService.getUsers();
    dispatch({
      type: "GET_USERS",
      data: users
    });
  };
};

export const handleLogOut = (e) => {
  window.localStorage.clear();
  setLogged(false);
};

export default userReducer;
