const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      console.log(state, "STATE IN notificationReducer");
      return action.data;
  }
  return state;
};

export const handleNotification = (notification, type) => {
  console.log(notification, "NOTIFICATION");
  return {
    type: "SET_NOTIFICATION",
    data: notification,
    data: type
  };
};

export default notificationReducer;
