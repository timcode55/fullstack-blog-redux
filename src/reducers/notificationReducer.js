const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return [action.data];
  }
  return state;
};

export const handleNotification = (notification, type) => {
  return {
    type: "SET_NOTIFICATION",
    data: [notification, type]
  };
};

export default notificationReducer;
