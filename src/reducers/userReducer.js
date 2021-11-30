import { handleNotification } from "./notificationReducer";

const userReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_USER":
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

export const handleLogOut = (e) => {
  window.localStorage.clear();
  setLogged(false);
};

export default userReducer;
